import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
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
                  <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                    Email
                  </label>
                  <Input id="email" placeholder="Enter your email" required type="email" />
                </div>
              </div>
              <Button className="mt-4 w-full">Reset Password</Button>
            </form>
          </CardContent>
          <CardFooter>
            <Link className="text-primary text-sm hover:underline" href="/login">
              Remember your password? Log In
            </Link>
          </CardFooter>
        </Card>
        <div className="hidden flex-1 md:block">
          <Image
            alt="Forgot password illustration"
            className="h-full w-full rounded-lg object-cover"
            height={600}
            src="https://placehold.co/200x200"
            width={600}
          />
        </div>
      </div>
    </div>
  );
}
