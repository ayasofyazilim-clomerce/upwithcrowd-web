"use client";

import type {Session} from "@repo/utils/auth";
import {NovuProvider} from "@repo/ui/providers/novu";
import {SessionProvider} from "@repo/utils/auth";
import {Toaster} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import dynamic from "next/dynamic";
import {Skeleton} from "@/components/ui/skeleton";
import type {Member} from "./member";

const MemberProvider = dynamic(() => import("./member"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});
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
