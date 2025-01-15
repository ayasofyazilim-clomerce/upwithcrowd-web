import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers/providers";
import { auth } from "../../../packages/utils/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UPwithCrowd",
  description: "Empowering ideas through crowdfunding",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen overflow-hidden`}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
