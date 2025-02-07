"use client";

import {useMember} from "@/app/providers/member";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {toast} from "@/components/ui/sonner";
import {IndividualForm} from "../_components/indiviual-form";
import {OrganizationForm} from "../_components/organization-form";
import {putMemberApiById} from "@/actions/upwithcrowd/member/put-action";

export default function EditPersonalAccount() {
  const {setCurrentMember, currentMember} = useMember();
  //eslint-disable-next-line
  async function onSubmit(values: any) {
    try {
      const result = await putMemberApiById({
        id: currentMember?.id || "",
        requestBody: {
          ...values,
          type: currentMember?.type || "Organization",
          isValidated: true,
        },
      });

      if (result.type === "success") {
        // Update the current member in the context
        setCurrentMember({...currentMember, ...values});
        toast.success("Your account has been updated successfully.");
      } else {
        toast.error(result.message || "An error occurred while updating your account.");
      }
    } catch (error) {
      console.error("Error updating account:", error);
      toast.error("There was an error updating your account. Please try again.");
    }
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Edit Your Account</CardTitle>
        <CardDescription>Update your account details below.</CardDescription>
      </CardHeader>
      <CardContent>
        {currentMember?.type === "Organization" ? (
          <OrganizationForm onSubmit={onSubmit} />
        ) : (
          <IndividualForm onSubmit={onSubmit} />
        )}
      </CardContent>
    </Card>
  );
}
