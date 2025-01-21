"use client";
import { UpwithCrowd_Members_ListMemberResponseDto } from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import { createContext, useContext, useState } from "react";
export type Member = UpwithCrowd_Members_ListMemberResponseDto;
export type MemberContent = {
  currentMember: Member | null;
  members?: Member[];
  setCurrentMember: (c: Member) => void;
};
export const MemberContext = createContext<MemberContent>({
  currentMember: null,
  members: [],
  setCurrentMember: () => {},
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
  const [member, setCurrentMember] = useState<Member | null>(currentMember);

  const saveMember = (member: Member) => {
    window.localStorage.setItem("active_member", JSON.stringify(member));
    setCurrentMember(member);
  };
  return (
    <MemberContext.Provider
      value={{ currentMember: member, members, setCurrentMember: saveMember }}
    >
      {children}
    </MemberContext.Provider>
  );
};
