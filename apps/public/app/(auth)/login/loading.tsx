"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  const Wrapper = pending ? Skeleton : Fragment;
  return (
    <Wrapper {...(pending && { className: "h-9" })}>
      <Button
        className={cn(
          "w-full transition-all",
          pending && " invisible h-0 p-0 opacity-0",
        )}
        disabled={pending}
        type="submit"
      >
        Log In
      </Button>
    </Wrapper>
  );
}
