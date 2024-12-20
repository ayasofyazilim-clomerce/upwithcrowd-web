import NextAuth, { AuthError, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"

const TOKEN_URL = `${process.env.AUTH_URL}/connect/token`;
const OPENID_URL = `${process.env.AUTH_URL}/.well-known/openid-configuration`;

type Token = {
  access_token: string
  token_type: string
  expires_in: number
  id_token: string
  refresh_token: string
}

// create a function to check object is of type Token 
function isToken(obj: unknown): obj is Token {
  if (typeof obj !== 'object' || obj === null) return false;
  return 'access_token' in obj;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null
        let scopes = "openid profile email";
        const openId_response = await fetch(OPENID_URL);
        console.log(credentials)
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
        user = json;
        // if (isToken(json)) {
        //   let user: User = { email: "" + credentials.email }
        //   // const userResponse = await fetch(`${process.env.BASE_URL}/api/user`, {
        //   //   headers: {
        //   //     Authorization: `Bearer ${json.access_token}`,
        //   //   },
        //   // });
        //   // user = await userResponse.json();
        //   // return { user: json, token: json } as User;
        //   return json;
        // }
        if ("error" in json && "error_description" in json) {
          // return { error: json.error + ": " + json.error_description }; 
          throw new AuthError(json.error + ": " + json.error_description);
        }
        console.log("user", user)

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }
        // id?: string
        // name?: string | null
        // email?: string | null
        // image?: string | null


        // return user object with their profile data
        return user
      },
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      // `session.user.address` is now a valid property, and will be type-checked
      // in places like `useSession().data.user` or `auth().user`
      console.log("session", session, token, user)
      return {
        ...session,
        user: {
          ...session.user,
        },
      }
    },
  },

})