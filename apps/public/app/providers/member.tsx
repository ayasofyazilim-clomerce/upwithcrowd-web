"use client";
import {toast} from "@/components/ui/sonner";
import type {UpwithCrowd_Members_ListMemberResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {putMemberSwitchByIdApi} from "@repo/actions/upwithcrowd/member/put-action";
import {useSession} from "@repo/utils/auth";
import {createContext, useContext, useState} from "react";

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
  const _currentMember = currentMember;

  const saveMember = (_member: Member) => {
    void putMemberSwitchByIdApi({id: _member.id}).then((res) => {
      if (res.type === "success") {
        setCurrentMember(_member);
        void sessionUpdate({
          info: {
            member_id: _member.id,
            member_type: _member.type,
          },
        });
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
        currentMember: _currentMember,
        members: memberList,
        setCurrentMember: saveMember,
        setMembers: saveMembers,
      }}>
      {children}
    </MemberContext.Provider>
  );
}
