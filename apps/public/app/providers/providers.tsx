"use client";

import { Session, SessionProvider } from "@repo/utils/auth";

interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null;
}

export default function Providers({ children, session }: ProvidersProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
