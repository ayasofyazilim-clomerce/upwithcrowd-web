import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-8">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
              </div>
              <Button className="w-full mt-4">Reset Password</Button>
            </form>
          </CardContent>
          <CardFooter>
            <Link href="/login" className="text-sm text-primary hover:underline">
              Remember your password? Log In
            </Link>
          </CardFooter>
        </Card>
        <div className="flex-1 hidden md:block">
          <Image
            src="/placeholder.svg?height=600&width=600"
            alt="Forgot password illustration"
            width={600}
            height={600}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}

