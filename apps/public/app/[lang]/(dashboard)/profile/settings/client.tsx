"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {toast} from "@/components/ui/sonner";
import type {UpwithCrowd_Members_SaveMemberDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {useMember} from "@/app/providers/member";
import {putMemberApiById} from "@/actions/upwithcrowd/member/put-action";
import {IndividualForm} from "../_components/indiviual-form";
import {OrganizationForm} from "../_components/organization-form";

export default function EditPersonalAccount() {
  const {setCurrentMember, currentMember} = useMember();
  async function onSubmit(values: unknown) {
    try {
      const result = await putMemberApiById({
        id: currentMember?.id || "",
        requestBody: {
          ...(values as UpwithCrowd_Members_SaveMemberDto),
          type: currentMember?.type || "Organization",
          isValidated: true,
        },
      });

      if (result.type === "success") {
        //@ts-expect-error we know it's a Member
        //eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- This is safe
        setCurrentMember({...currentMember, ...values});
        toast.success("Your account has been updated successfully.");
      } else {
        toast.error(result.message || "An error occurred while updating your account.");
      }
    } catch (error) {
      toast.error("There was an error updating your account. Please try again.");
    }
  }

  return (
    <Card className="mx-auto w-full p-2 sm:p-6">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-bold sm:text-2xl">Edit Your Account</CardTitle>
        <CardDescription className="text-sm sm:text-base">Update your account details below.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:gap-6">
        {currentMember?.type === "Organization" ? (
          <OrganizationForm onSubmit={onSubmit} />
        ) : (
          <IndividualForm onSubmit={onSubmit} />
        )}
      </CardContent>
    </Card>
  );
}
