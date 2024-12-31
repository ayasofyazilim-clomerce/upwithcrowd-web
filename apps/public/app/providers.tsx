"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useMemo } from "react";

interface ProvidersProps {
  children: React.ReactNode;
  session?: Session | null;
  sessionKey?: number;
}

export default function Providers({
  children,
  session,
  sessionKey,
}: ProvidersProps) {
  const memoizedSessionKey = useMemo(() => {
    return sessionKey;
  }, [session, sessionKey]);

  return (
    <SessionProvider key={memoizedSessionKey} session={session}>
      {children}
    </SessionProvider>
  );
}
