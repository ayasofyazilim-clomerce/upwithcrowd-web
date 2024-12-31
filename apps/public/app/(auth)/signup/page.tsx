"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createUser } from "./action";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";

const initialState = {
  message: "",
};
export default function SignupPage() {
  const [state, formAction] = useFormState(
    createUser<typeof initialState>,
    initialState,
  );

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-6xl flex-col gap-8 md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={formAction} method="post">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    username
                  </label>
                  <Input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    required
                  />
                </div>
              </div>
              <SubmitButton></SubmitButton>
            </form>
            {state.message && (
              <p className="mt-4 text-sm text-red-500">{state.message}</p>
            )}
          </CardContent>
          <CardFooter>
            <Link
              href="/login"
              className="text-primary text-sm hover:underline"
            >
              Already have an account? Log In
            </Link>
          </CardFooter>
        </Card>
        <div className="hidden flex-1 md:block">
          <Image
            src="/placeholder.svg"
            alt="Signup illustration"
            width={600}
            height={600}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
