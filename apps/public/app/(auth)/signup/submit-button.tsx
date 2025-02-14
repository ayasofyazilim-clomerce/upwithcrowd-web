import {Button} from "@/components/ui/button";
import React from "react";
import {useFormStatus} from "react-dom";

export default function SubmitButton() {
  const {pending} = useFormStatus();

  return (
    <Button className="w-full" disabled={pending} type="submit">
      Sign Up
    </Button>
  );
}
