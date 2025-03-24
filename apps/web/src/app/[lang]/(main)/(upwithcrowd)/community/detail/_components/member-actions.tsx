"use client";

import type {UpwithCrowd_Members_ListMemberResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {putMemberValidatedById} from "@repo/actions/upwithcrowd/member/put-action";
import {ActionButton, ActionList} from "@repo/ayasofyazilim-ui/molecules/action-button";
import {handlePutResponse} from "@repo/utils/api";
import {UserCheck, UserX} from "lucide-react";
import {useRouter} from "next/navigation";
import {useTransition} from "react";

export function MemberActions({member}: {member: UpwithCrowd_Members_ListMemberResponseDto}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  if (member.isValidated) return null;
  return (
    <ActionList>
      <ActionButton
        icon={UserCheck}
        loading={isPending}
        onClick={() => {
          startTransition(() => {
            void putMemberValidatedById({
              id: member.id,
              isValidated: true,
            }).then((response) => {
              handlePutResponse(response, router);
            });
          });
        }}
        text="Onayla"
      />
      <ActionButton
        icon={UserX}
        loading={isPending}
        onClick={() => {
          startTransition(() => {
            void putMemberValidatedById({
              id: member.id,
              isValidated: false,
            }).then((response) => {
              handlePutResponse(response, router);
            });
          });
        }}
        text="Reddet"
      />
    </ActionList>
  );
}
