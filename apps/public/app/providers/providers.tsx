"use client";

import type {Session} from "@repo/utils/auth";
import {SessionProvider} from "@repo/utils/auth";
import {Toaster} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import type {Member} from "./member";
import {MemberProvider} from "./member";

interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null;
  currentMember: Member | null;
  members: Member[];
}

export default function Providers({children, session, currentMember, members}: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <TooltipProvider>
        <Toaster richColors />
        <MemberProvider currentMember={currentMember} members={members}>
          {children}
        </MemberProvider>
      </TooltipProvider>
    </SessionProvider>
  );
}
