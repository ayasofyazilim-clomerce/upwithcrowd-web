"use client";

import {Toaster} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {NovuProvider} from "@repo/ui/providers/novu";
import type {Session} from "@repo/utils/auth";
import {SessionProvider} from "@repo/utils/auth";
import type {Member} from "./member";
import MemberProvider from "./member";

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
          <NovuProvider
            appId={process.env.NOVU_APP_IDENTIFIER || ""}
            appUrl={process.env.NOVU_APP_URL || ""}
            subscriberId={session?.user?.sub || "67b8674f58411ad400a054e9"}>
            {children}
          </NovuProvider>
        </MemberProvider>
      </TooltipProvider>
    </SessionProvider>
  );
}
