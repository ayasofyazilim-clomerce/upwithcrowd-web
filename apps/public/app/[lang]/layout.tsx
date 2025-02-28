import {Inter} from "next/font/google";
import "../globals.css";
import {auth} from "@repo/utils/auth/next-auth";
import {isRedirectError} from "next/dist/client/components/redirect";
import {structuredError} from "@repo/utils/api";
import ErrorComponent from "@repo/ui/components/error-component";
import {signOutServer} from "@repo/utils/auth";
import {getApiMemberApi, getProfileImageApi} from "@/actions/upwithcrowd/member/actions";
import {myProfileApi} from "@/actions/core/AccountService/actions";
import {getLocalizationResources} from "@/utils/lib";
import {getResourceData} from "@/language/core/Default";
import Providers from "../providers/providers";
import type {Member} from "../providers/member";
import {LocaleProvider} from "../providers/locale";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "UPwithCrowd",
  description: "Empowering ideas through crowdfunding",
};

async function getApiRequests() {
  try {
    const requiredRequests = await Promise.all([myProfileApi()]);

    const optionalRequests = await Promise.allSettled([]);
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
          <body className={inter.className}>
            <ErrorComponent languageData={languageData} message={apiRequests.message} signOutServer={signOutServer} />;
          </body>
        </html>
      );
    }
    const memberResponse = await getApiMemberApi();
    const profileImageResponse = await getProfileImageApi();
    if (memberResponse.type === "success") {
      members = memberResponse.data.items || [];
      if (profileImageResponse.type === "success") {
        members = members.map((_member) => {
          if (_member.id === session.user?.member_id) {
            return {..._member, profileImage: profileImageResponse.data};
          }
          return _member;
        });
      }
      member =
        members.find((x) => {
          if (Array.isArray(session.user?.member_id)) {
            return session.user.member_id.find((y) => y === x.id);
          }
          return x.id === session.user?.member_id;
        }) || null;
      if (member && profileImageResponse.type === "success") {
        member = {...member, profileImage: profileImageResponse.data};
      }
    }
  }
  const resources = await getLocalizationResources(lang);
  return (
    <html lang="en">
      <body className={inter.className}>
        <LocaleProvider lang={lang} resources={resources}>
          <Providers currentMember={member} key={session?.user?.email} members={members} session={session}>
            {children}
          </Providers>
        </LocaleProvider>
      </body>
    </html>
  );
}
