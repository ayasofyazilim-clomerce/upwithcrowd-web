"use server";

import {myProfileApi} from "@repo/actions/core/AccountService/actions";
import {getProfileImageApi} from "@repo/actions/upwithcrowd/profile/actions";
import {getUserMembersApi} from "@repo/actions/upwithcrowd/user-members/actions";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {signOutServer} from "@repo/utils/auth";
import {auth} from "@repo/utils/auth/next-auth";
import {GeistSans} from "geist/font/sans";
import type {Metadata} from "next";
import {isRedirectError} from "next/dist/client/components/redirect";
import {Suspense} from "react";
import {getLocalizationResources} from "@/utils/lib";
import {getResourceData} from "@/language/core/Default";
import "../globals.css";
import {LocaleProvider} from "../providers/locale";
import type {Member} from "../providers/member";
import Providers from "../providers/providers";

export async function generateMetadata(): Promise<Metadata> {
  await Promise.resolve();
  return {
    title: "UPwithCrowd",
    description: "Empowering ideas through crowdfunding",
  };
}

async function getApiRequests() {
  try {
    const requiredRequests = await Promise.all([myProfileApi()]);

    const optionalRequests = await Promise.allSettled([getUserMembersApi(), getProfileImageApi()]);
    return {requiredRequests, optionalRequests};
  } catch (error) {
    if (!isRedirectError(error)) {
      return structuredError(error);
    }
    throw error;
  }
}
export default async function RootLayout({children, params}: {children: React.ReactNode; params: {lang: string}}) {
  const {lang} = params;
  const session = await auth();
  const {languageData} = await getResourceData(lang);
  let member: Member | null = null;
  let members: Member[] = [];
  if (session) {
    const apiRequests = await getApiRequests();
    if ("message" in apiRequests) {
      return (
        <html lang="en">
          <body className={GeistSans.className}>
            <ErrorComponent
              clearSession
              languageData={languageData}
              message={apiRequests.message}
              signOutServer={signOutServer}
            />
            ;
          </body>
        </html>
      );
    }
    const [memberResponse, profileImageResponse] = apiRequests.optionalRequests;
    const profileImage = profileImageResponse.status === "fulfilled" ? profileImageResponse.value.data : undefined;
    members = memberResponse.status === "fulfilled" ? memberResponse.value.data : [];

    const activeMember = members.find((memberFromDB) => memberFromDB.id === session.user?.member_id);
    if (activeMember) {
      if (profileImage) {
        const activeMemberIndex = members.findIndex((_member) => _member.id === activeMember.id);
        if (activeMemberIndex !== -1) {
          members[activeMemberIndex].profileImage = profileImage;
        }
      }
      member = activeMember;
    }
  }

  const resources = await getLocalizationResources(lang);
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <LocaleProvider lang={lang} resources={resources}>
            <Providers currentMember={member} members={members} session={session}>
              {children}
            </Providers>
          </LocaleProvider>
        </Suspense>
      </body>
    </html>
  );
}
