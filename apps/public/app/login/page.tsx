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
import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";
import SingOut from "./signout";

export default function LoginPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-6xl flex-col gap-8 md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              action={async (formData: FormData) => {
                "use server";
                try {
                  await signIn("credentials", {
                    redirect: false,
                    email: formData.get("email"),
                    password: formData.get("password"),
                  });
                } catch (error) {
                  if (error instanceof Error) {
                    console.log("error 1", typeof error);
                    console.log(
                      "error 1",
                      error.name,
                      error.message.split(
                        "Read more at https://errors.authjs.",
                      )[0],
                    );
                  }
                }
              }}
            >
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
              <Button className="mt-4 w-full">Log In</Button>
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
