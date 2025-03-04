"use server";
import {auth} from "@repo/utils/auth/next-auth";
import Header from "@/components/header";

export default async function Layout({children}: {children: React.ReactNode}) {
  const session = await auth();
  let notification;
  if (session && process.env.NOVU_APP_IDENTIFIER && process.env.NOVU_APP_URL) {
    notification = {
      appId: process.env.NOVU_APP_IDENTIFIER,
      appUrl: process.env.NOVU_APP_URL,
      subscriberId: session.user?.sub || "",
      langugageData: {},
    };
  }
  return (
    <section className="h-full">
      <Header appName={process.env.APPLICATION_NAME || "UPWITHCROWD"} notification={notification} />
      {children}
    </section>
  );
}
