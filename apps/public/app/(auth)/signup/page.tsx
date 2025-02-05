"use client";

import {Input} from "@/components/ui/input";
import {useFormState} from "react-dom";
import {createUser} from "./action";
import SubmitButton from "./SubmitButton";
import {Label} from "@/components/ui/label";
import {PasswordInput} from "@repo/ayasofyazilim-ui/molecules/password-input";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const initialState = {
  message: "",
};
export default function SignupPage() {
  const [state, formAction] = useFormState(createUser<typeof initialState>, initialState);

  return (
    <>
      <h2 className="text-primary mb-4 text-center text-2xl font-bold md:text-3xl">Create an account</h2>
      <form action={formAction} method="post" className="w-full space-y-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" name="username" placeholder="Enter your username" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" name="email" autoComplete="email" placeholder="Enter your email" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <PasswordInput id="password" type="password" name="password" placeholder="Create a password" required />
          </div>
        </div>
        <SubmitButton />
        {state.message && <p className="mt-4 text-sm text-red-500">{state.message}</p>}
      </form>
      <span className="text-muted-foreground text-sm">
        Already have an account?
        <Button variant="link" asChild className="ml-2 p-0 underline">
          <Link href="/login">Login</Link>
        </Button>
      </span>
    </>
  );
}
