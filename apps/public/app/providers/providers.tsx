"use client";

import type {Session} from "@repo/utils/auth";
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
          {children}
        </MemberProvider>
      </TooltipProvider>
    </SessionProvider>
  );
}
