"use client";

import {Input} from "@/components/ui/input";
import {useFormState} from "react-dom";
import {Label} from "@/components/ui/label";
import {PasswordInput} from "@repo/ayasofyazilim-ui/molecules/password-input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import SubmitButton from "./submit-button";
import {createUser} from "./action";

const initialState = {
  message: "",
};
export default function SignupPage() {
  const [state, formAction] = useFormState(createUser<typeof initialState>, initialState);

  return (
    <>
      <h2 className="text-primary mb-4 text-center text-2xl font-bold md:text-3xl">Create an account</h2>
      <form action={formAction} className="w-full space-y-4" method="post">
        <div className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" placeholder="Enter your username" required type="text" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input autoComplete="email" id="email" name="email" placeholder="Enter your email" required type="email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <PasswordInput id="password" name="password" placeholder="Create a password" required type="password" />
          </div>
        </div>
        <SubmitButton />
        {state.message ? <p className="mt-4 text-sm text-red-500">{state.message}</p> : null}
      </form>
      <span className="text-muted-foreground text-sm">
        Already have an account?
        <Button asChild className="ml-2 p-0 underline" variant="link">
          <Link href="/login">Login</Link>
        </Button>
      </span>
    </>
  );
}
