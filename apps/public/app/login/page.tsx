"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import SingOut from "./signout";
import SubmitButton from "./loading";
import { useFormState } from "react-dom";
import { signInForm } from "./action";
const initialState = {
  message: "",
};
export default function LoginPage() {
  const [state, formAction] = useFormState(
    signInForm<typeof initialState>,
    initialState,
  );

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-6xl flex-col gap-8 md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={formAction}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="text"
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
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              <SubmitButton />
              {state.message && state.message.length > 1 && (
                <div className="mt-4 text-sm text-red-500">{state.message}</div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link
              href="/forgot-password"
              className="text-primary text-sm hover:underline"
            >
              Forgot Password?
            </Link>
            <Link
              href="/signup"
              className="text-primary text-sm hover:underline"
            >
              Don't have an account? Sign Up
            </Link>
            <SingOut></SingOut>
          </CardFooter>
        </Card>
        <div className="hidden flex-1 md:block">
          <Image
            src="/placeholder.svg"
            alt="Login illustration"
            width={600}
            height={600}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
