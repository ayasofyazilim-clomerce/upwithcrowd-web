import { Button } from "#/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="mt-4 w-full" type="submit">
      Sign Up
    </Button>
  );
}
