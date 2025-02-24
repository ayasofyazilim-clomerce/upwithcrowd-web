import {Inter} from "next/font/google";
import "../globals.css";
import {auth} from "@repo/utils/auth/next-auth";
import {getApiMemberApi, getProfileImageApi} from "@/actions/upwithcrowd/member/actions";
import {getLocalizationResources} from "@/utils/lib";
import Providers from "../providers/providers";
import type {Member} from "../providers/member";
import {LocaleProvider} from "../providers/locale";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "UPwithCrowd",
  description: "Empowering ideas through crowdfunding",
};

export default async function RootLayout({children, params}: {children: React.ReactNode; params: {lang: string}}) {
  const session = await auth();
  let member: Member | null = null;
  let members: Member[] = [];
  if (session) {
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
  const {lang} = params;
  const resources = await getLocalizationResources(lang);
  return (
    <html lang="en">
      <body className={inter.className}>
        <LocaleProvider lang={lang} resources={resources}>
          <Providers currentMember={member} members={members} session={session}>
            {children}
          </Providers>
        </LocaleProvider>
      </body>
    </html>
  );
}
