"use client";
import { putMemberSwitchByIdApi } from "@/actions/upwithcrowd/member/put-action";
import { toast } from "@/components/ui/sonner";
import { UpwithCrowd_Members_ListMemberResponseDto } from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import { createContext, useContext, useState } from "react";
export type Member = UpwithCrowd_Members_ListMemberResponseDto;
export type MemberContent = {
  currentMember: Member | null;
  members?: Member[];
  setCurrentMember: (c: Member) => void;
  setMembers: (m: Member[]) => void;
};
export const MemberContext = createContext<MemberContent>({
  currentMember: null,
  members: [],
  setCurrentMember: () => {},
  setMembers: () => {},
});
export const useMember = () => useContext(MemberContext);

export const MemberProvider = ({
  children,
  currentMember,
  members,
}: {
  children: React.ReactNode;
  currentMember: Member | null;
  members?: Member[];
}) => {
  let _currentMember = currentMember;
  if (
    typeof window !== "undefined" &&
    window.sessionStorage.getItem("current_member")
  ) {
    _currentMember = JSON.parse(
      window.sessionStorage.getItem("current_member") || "",
    );
  }
  const [member, setCurrentMember] = useState<Member | null>(_currentMember);
  const [memberList, setMembers] = useState<Member[] | undefined>(members);
  const saveMember = (member: Member) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("current_member", JSON.stringify(member));
    }
    void putMemberSwitchByIdApi({ id: member.id }).then((res) => {
      if (res.type === "success") {
        setCurrentMember(member);
      } else {
        toast.error(
          "Cannot switch member at the moment. Please try again later.",
        );
      }
    });
  };
  const saveMembers = (members: Member[]) => {
    setMembers(members);
  };
  return (
    <MemberContext.Provider
      value={{
        currentMember: member,
        members: memberList,
        setCurrentMember: saveMember,
        setMembers: saveMembers,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
};
