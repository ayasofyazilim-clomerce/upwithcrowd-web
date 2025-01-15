import Credentials from "next-auth/providers/credentials";
export type Awaitable<T> = T | PromiseLike<T>;

import { AdapterUser } from "@auth/core/adapters";
import {
  fetchNewAccessTokenByRefreshToken,
  fetchToken,
  getUserData,
} from "./auth-actions";
import NextAuth, { AuthError } from "next-auth";
import { MyUser } from "./auth-types";
import { GetApiAbpApplicationConfigurationResponse } from "@ayasofyazilim/core-saas/AccountService";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
        tenant: {},
      },
      authorize: async (credentials) => {
        function authorizeError(message: string) {
          return Promise.reject(new AuthError(JSON.stringify(message)));
        }
        try {
          const signInResponse = await fetchToken({
            username: credentials?.username as string,
            password: credentials.password as string,
            tenantId: credentials.tenant as string,
          });
          if ("error" in signInResponse) {
          }
          if (signInResponse?.access_token && signInResponse.refresh_token) {
            //will be changed
            const userRequest = await fetch(
              `${process.env.BASE_URL}/api/abp/application-configuration?IncludeLocalizationResources=false`,
              {
                headers: {
                  Authorization: `Bearer ${signInResponse.access_token}`,
                },
              },
            );
            const user_data: GetApiAbpApplicationConfigurationResponse =
              await userRequest.json();
            const current_user = user_data.currentUser;
            return {
              userName: current_user?.userName || "",
              email: current_user?.email || "",
              name: current_user?.name || "",
              surname: current_user?.surName || "",
              access_token: signInResponse.access_token,
              refresh_token: signInResponse.refresh_token,
              expiration_date: signInResponse.expires_in * 1000 + Date.now(),
            };
          }
          return authorizeError("Unknown Error: No token provided");
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn({ user }) {
      if (user.userName) {
        return true;
      }
      return false;
    },
    async session({ session, token }) {
      if (token?.user) {
        const user = token?.user as AdapterUser & MyUser;
        if (user.expiration_date < Date.now()) {
          const { access_token, refresh_token, expires_in } =
            await fetchNewAccessTokenByRefreshToken(user.refresh_token || "");

          if (access_token && refresh_token) {
            user.access_token = access_token;
            user.refresh_token = refresh_token;
            user.expiration_date = expires_in * 1000 + Date.now();
          }
        }
        session.user = user;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
  },
});
