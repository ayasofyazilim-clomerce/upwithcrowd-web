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

export default function ForgotPasswordPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-6xl flex-col gap-8 md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
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
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <Button className="mt-4 w-full">Reset Password</Button>
            </form>
          </CardContent>
          <CardFooter>
            <Link
              href="/login"
              className="text-primary text-sm hover:underline"
            >
              Remember your password? Log In
            </Link>
          </CardFooter>
        </Card>
        <div className="hidden flex-1 md:block">
          <Image
            src="/placeholder.svg"
            alt="Forgot password illustration"
            width={600}
            height={600}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
