import NextAuth, { AuthError, DefaultSession, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import { getUpwithcrowd } from "./utils/client";
import { GetApiAbpApplicationConfigurationResponse } from "@ayasofyazilim/upwithcrowd-saas/UPWCService";

const TOKEN_URL = `${process.env.NEXT_AUTH_URL}/connect/token`;
const OPENID_URL = `${process.env.NEXT_AUTH_URL}/.well-known/openid-configuration`;

type Token = {
  access_token: string;
  token_type: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
};

// create a function to check object is of type Token
function isToken(obj: unknown): obj is Token {
  if (typeof obj !== "object" || obj === null) return false;
  return "access_token" in obj;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = null;
        let scopes = "openid profile email";
        const openId_response = await fetch(OPENID_URL);
        const scopes_json = await openId_response.json();
        if ("scopes_supported" in scopes_json) {
          scopes = scopes_json.scopes_supported.join(" ");
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        // myHeaders.append("__tenant", credentials.tenantId || "");
        const urlencoded = new URLSearchParams();
        const urlEncodedContent: Record<string, string> = {
          grant_type: "password",
          client_id: "frontend",
          username: "" + credentials.email,
          password: "" + credentials.password,
          scope: scopes,
          client_secret: "frontend",
        };
        Object.keys(urlEncodedContent).forEach((key) => {
          urlencoded.append(key, urlEncodedContent[key]);
        });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
        };

        const response = await fetch(TOKEN_URL, requestOptions);
        const json = await response.json();
        if (isToken(json)) {
          const userReuqest = await fetch(
            `${process.env.BASE_URL}/api/abp/application-configuration?IncludeLocalizationResources=false`,
            {
              headers: {
                Authorization: `Bearer ${json.access_token}`,
              },
            },
          );
          const user_data: GetApiAbpApplicationConfigurationResponse =
            await userReuqest.json();
          const current_user = user_data.currentUser;
          // const upWithCrowdClient = await getUpwithcrowdAccount();
          // const profile_picture =
          //   await upWithCrowdClient.account.getApiAccountProfilePictureById({
          //     id: current_user?.id || "",
          //   });
          // const userAbp = appConfig.currentUser;
          const user: User = {
            email: current_user?.email || credentials.email + "",
            name: current_user?.userName || credentials.email + "",
            // image: profile_picture.fileContent || "",
            id: current_user?.id || "",
            access_token: json.access_token,
          };
          // console.log("user", user, json);

          // const user = {email: credentials.email, name: credentials.email, id: "1"}
          return { ...user, ...json };
        }
        if ("error" in json && "error_description" in json) {
          // return { error: json.error + ": " + json.error_description };
          throw new AuthError(json.error + ": " + json.error_description);
        }

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }
        // id?: string
        // name?: string | null
        // email?: string | null
        // image?: string | null
        // console.log("user", user);
        // return user object with their profile data
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // console.log("jwt", user);
      if (user?.access_token) {
        // User is available during sign-in
        token.access_token = user?.access_token;
      }
      return token;
    },
    session({ session, token, user }) {
      const localUser = session.user;
      return {
        ...session,
        user: {
          email: user?.email || localUser.email || "",
          name: user?.name || localUser.name || "",
          image: user?.image || localUser.image || "",
          id: user?.id || localUser.id || "",
          access_token: token.access_token + "",
        },
      };
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    verifyRequest: "/login",
    newUser: "/signup",
  },
});

declare module "next-auth" {
  interface Session {
    user: {
      access_token: string;
    } & DefaultSession["user"];
  }
  interface User {
    access_token?: string;
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}
