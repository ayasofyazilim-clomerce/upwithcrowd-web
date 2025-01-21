"use client";

import { Session, SessionProvider } from "@repo/utils/auth";
import { Member, MemberProvider } from "./member";

interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null;
  currentMember: Member | null;
  members?: Member[];
}

export default function Providers({
  children,
  session,
  currentMember,
  members,
}: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <MemberProvider currentMember={currentMember} members={members}>
        {children}
      </MemberProvider>
    </SessionProvider>
  );
}
