import {getProfileImageApi} from "@repo/actions/upwithcrowd/profile/actions";
import {getUserMembersApi} from "@repo/actions/upwithcrowd/user-members/actions";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {signOutServer} from "@repo/utils/auth";
import {auth} from "@repo/utils/auth/next-auth";
import {isRedirectError} from "next/dist/client/components/redirect";
import {Inter} from "next/font/google";
import {myProfileApi} from "@repo/actions/core/AccountService/actions";
import {getLocalizationResources} from "@/utils/lib";
import {getResourceData} from "@/language/core/Default";
import "../globals.css";
import {LocaleProvider} from "../providers/locale";
import type {Member} from "../providers/member";
import Providers from "../providers/providers";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "UPwithCrowd",
  description: "Empowering ideas through crowdfunding",
};

function findActiveMember(memberList: Member[], memberIdFromSession?: string | string[]) {
  if (memberList.length === 0) return null;

  // Eğer backend'den member listesi geldiyse ama session'da bu member id yoksa kullanıcı ilk defa member oluşturmuş demektir.
  // İlk member oluşturulduğunda backend bu member'ı aktif member olarak kaydediyor.
  // Bu sebeple memberIdFromSession gelmediğinde ilk member'ı aktif member olarak set edebiliriz.
  if (!memberIdFromSession) {
    return memberList[0];
  }

  if (Array.isArray(memberIdFromSession)) {
    return (
      memberList.find((memberFromDB) => memberIdFromSession.find((member) => member === memberFromDB.id)) ||
      memberList[0]
    );
  }
  return memberList.find((memberFromDB) => memberFromDB.id === memberIdFromSession) || memberList[0];
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
          <body className={inter.className}>
            <ErrorComponent languageData={languageData} message={apiRequests.message} signOutServer={signOutServer} />;
          </body>
        </html>
      );
    }
    const [memberResponse, profileImageResponse] = apiRequests.optionalRequests;
    const profileImage = profileImageResponse.status === "fulfilled" ? profileImageResponse.value.data : undefined;
    members = memberResponse.status === "fulfilled" ? memberResponse.value.data : [];

    const activeMember = findActiveMember(members, session.user?.member_id);
    if (profileImage) {
      const activeMemberIndex = members.findIndex((_member) => _member.id === activeMember?.id);
      if (activeMember && activeMemberIndex !== -1) {
        members[activeMemberIndex].profileImage = profileImage;
      }
    }
    member = activeMember;
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
