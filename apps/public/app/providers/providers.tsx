"use client";

import {Session, SessionProvider} from "@repo/utils/auth";
import {Member, MemberProvider} from "./member";
import {Toaster} from "@/components/ui/sonner";

interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null;
  currentMember: Member | null;
  members: Member[];
}

export default function Providers({children, session, currentMember, members}: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <Toaster richColors />
      <MemberProvider currentMember={currentMember} members={members}>
        {children}
      </MemberProvider>
    </SessionProvider>
  );
}
