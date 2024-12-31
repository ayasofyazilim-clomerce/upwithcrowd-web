"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@repo/ayasofyazilim-ui/molecules/password-input";
import Link from "next/link";
import { useFormState } from "react-dom";
import { signInForm } from "./action";
import SubmitButton from "./loading";
const initialState = {
  message: "",
};
export default function Page() {
  const [state, formAction] = useFormState(
    signInForm<typeof initialState>,
    initialState,
  );
  return (
    <>
      <h2 className="text-primary mb-4 text-center text-2xl font-bold md:text-3xl">
        Welcome back
      </h2>
      <form action={formAction} className="w-full space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="text"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <SubmitButton />
        {state.message && state.message.length > 1 && (
          <div className="mt-4 text-sm text-red-500">{state.message}</div>
        )}
      </form>
      <span className="text-muted-foreground text-sm">
        Don&apos;t have an account?
        <Button variant="link" asChild className="ml-2 p-0 underline">
          <Link href="/signup">Sign up</Link>
        </Button>
      </span>
    </>
  );
}
