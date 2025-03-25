import {auth} from "@repo/utils/auth/next-auth";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default async function Layout({children}: {children: React.ReactNode}) {
  const session = await auth();
  let notification;
  if (session && process.env.NOVU_APP_IDENTIFIER && process.env.NOVU_APP_URL) {
    notification = {
      appId: process.env.NOVU_APP_IDENTIFIER,
      appUrl: process.env.NOVU_APP_URL,
      subscriberId: session.user?.member_id || "",
      langugageData: {},
    };
  }

  return (
    <section className="overflow-hidden">
      <Header notification={notification} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </section>
  );
}
