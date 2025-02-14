"use client";
import {toast} from "@/components/ui/sonner";
import type {UpwithCrowd_Members_ListMemberResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {useRouter} from "next/navigation";
import {createContext, useContext, useState} from "react";
import {putMemberSwitchByIdApi} from "@/actions/upwithcrowd/member/put-action";

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

export function MemberProvider({
  children,
  currentMember,
  members,
}: {
  children: React.ReactNode;
  currentMember: Member | null;
  members: Member[];
}) {
  let _currentMember = currentMember;
  if (window.sessionStorage.getItem("current_member")) {
    _currentMember = JSON.parse(window.sessionStorage.getItem("current_member") || "");
  }
  const [member, setCurrentMember] = useState<Member | null>(_currentMember);
  const [memberList, setMemberList] = useState<Member[]>(members);
  const router = useRouter();
  const saveMember = (_member: Member) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("current_member", JSON.stringify(_member));
    }
    void putMemberSwitchByIdApi({id: _member.id}).then((res) => {
      if (res.type === "success") {
        setCurrentMember(_member);
        router.refresh();
      } else {
        toast.error("Cannot switch member at the moment. Please try again later.");
      }
    });
  };
  const saveMembers = (_members: Member[]) => {
    setMemberList(_members);
  };
  return (
    <MemberContext.Provider
      value={{
        currentMember: member,
        members: memberList,
        setCurrentMember: saveMember,
        setMembers: saveMembers,
      }}>
      {children}
    </MemberContext.Provider>
  );
}
