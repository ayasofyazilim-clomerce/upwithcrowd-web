import Link from "next/link";
import { Briefcase, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProfileTypeSwitch() {
  return (
    <div className="flex flex-row justify-center gap-4">
      <Link href="/profile/new/business">
        <Card className="border border-gray-200 p-2 transition-shadow duration-300 hover:shadow-xl">
          <CardHeader className="flex flex-col items-center p-2 pb-0">
            <Briefcase size={40} className="mb-2 text-gray-700" />
            <CardTitle className="text-gray-800 ">Business Account</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <CardDescription className="text-center text-gray-600">
              Manage your business profile
            </CardDescription>
          </CardContent>
        </Card>
      </Link>
      <Link href="/profile/new/personal">
        <Card className="border border-gray-200 p-2 transition-shadow duration-300 hover:shadow-xl">
          <CardHeader className="flex flex-col items-center p-2 pb-0">
            <User size={40} className="mb-2 text-gray-700" />
            <CardTitle className="text-gray-800">Personal Account</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <CardDescription className="text-center text-gray-600">
              Manage your personal profile
            </CardDescription>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
