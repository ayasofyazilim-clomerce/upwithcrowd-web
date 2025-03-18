"use client";
import {toast} from "@/components/ui/sonner";
import type {UpwithCrowd_Members_ListMemberResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {putMemberSwitchByIdApi} from "@repo/actions/upwithcrowd/member/put-action";
import {useSession} from "@repo/utils/auth";
import {useRouter} from "next/navigation";
import {createContext, useContext, useEffect, useState} from "react";

export type Member = UpwithCrowd_Members_ListMemberResponseDto & {
  profileImage?: string;
};
export interface MemberContent {
  currentMember: Member | null;
  members: Member[];
  setCurrentMember: (c: Member) => void;
  setMembers: (m: Member[]) => void;
}
export const MemberContext = createContext<MemberContent>({
  currentMember: null,
  members: [],
  setCurrentMember: () => {
    //
  },
  setMembers: () => {
    //
  },
});
export const useMember = () => useContext(MemberContext);

export default function MemberProvider({
  children,
  currentMember,
  members,
}: {
  children: React.ReactNode;
  currentMember: Member | null;
  members: Member[];
}) {
  const [__member, setCurrentMember] = useState<Member | null>(currentMember);
  const [memberList, setMemberList] = useState<Member[]>(members);
  const {sessionUpdate} = useSession();
  const router = useRouter();
  let _currentMember = currentMember;
  if (typeof window !== "undefined") {
    if (window.sessionStorage.getItem("current_member")) {
      //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- we know it's a Member
      _currentMember = JSON.parse(window.sessionStorage.getItem("current_member") || "");
    }
  }

  const saveMember = (_member: Member) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("current_member", JSON.stringify(_member));
    }
    void putMemberSwitchByIdApi({id: _member.id}).then((res) => {
      if (res.type === "success") {
        setCurrentMember(_member);
        void sessionUpdate({
          info: {
            member_id: _member.id,
            member_type: _member.type,
          },
        }).finally(() => {
          router.refresh();
        });
      } else {
        toast.error("Cannot switch member at the moment. Please try again later.");
      }
    });
  };
  const saveMembers = (_members: Member[]) => {
    setMemberList(_members);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && _currentMember) {
      window.sessionStorage.setItem("current_member", JSON.stringify(_currentMember));
    }
  }, [_currentMember]);

  return (
    <MemberContext.Provider
      value={{
        currentMember: _currentMember,
        members: memberList,
        setCurrentMember: saveMember,
        setMembers: saveMembers,
      }}>
      {children}
    </MemberContext.Provider>
  );
}
