"use server";
import { auth } from "@/auth";
import "./globals.css";
import Providers from "./providers";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "UPwithCrowd",
//   description: "Empowering ideas through crowdfunding",
// };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const sessionKey = new Date().valueOf();
  return (
    <html lang="en">
      <body className={` flex min-h-screen flex-col`}>
        <Providers session={session} sessionKey={sessionKey}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
