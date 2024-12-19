import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn } from '@/auth'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-8">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={async (formData) => {
              "use server"
              try {
                await signIn("credentials", formData) 
              } catch (error) {
                console.log("error")
              }
            }}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input id="email" type="email" name="email" placeholder="Enter your email" required />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Input id="password" type="password" name="password" placeholder="Enter your password" required />
                </div>
              </div>
              <Button className="w-full mt-4">Log In</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot Password?
            </Link>
            <Link href="/signup" className="text-sm text-primary hover:underline">
              Don't have an account? Sign Up
            </Link>
          </CardFooter>
        </Card>
        <div className="flex-1 hidden md:block">
          <Image
            src="/placeholder.svg"
            alt="Login illustration"
            width={600}
            height={600}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}

