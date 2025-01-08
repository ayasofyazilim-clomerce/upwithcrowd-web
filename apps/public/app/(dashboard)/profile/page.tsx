"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChevronRight,
  Bell,
  HelpCircle,
  FileText,
  Shield,
  BellDot,
  Link2,
  Building2,
  Plus,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

import { getMembership } from "../../../actions/upwithcrowd/my-member/actions";
import { UpwithCrowd_Members_ListMemberResponseDto } from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import ProfileTypeSwitch from "./_components/ProfileTypeSwitch";
import { handleSignOut } from "@/app/(auth)/login/action";
import { useSession } from "@/app/providers/session";

// Mock user data
const userData = {
  name: "John",
  surname: "Doe",
  email: "john.doe@example.com",
  profileImage: "/placeholder.svg",
};

export default function Page() {
  const { session } = useSession();
  const [showAccountDialog, setShowAccountDialog] = useState(false);
  const currentUser = session?.user;
  const [profileImage, setProfileImage] = useState(userData.profileImage);
  const [myMember, setMyMember] =
    useState<UpwithCrowd_Members_ListMemberResponseDto[]>();
  useEffect(() => {
    void getMembership().then((result) => {
      if (!result || !result.items) return;
      const myMember = result.items;
      setMyMember(myMember);
    });
  }, [session]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAccountClick = (accountId: number) => {
    console.log(`Switching to account ${accountId}`);
    // Here you would typically implement account switching logic
  };

  return (
    <div className="bg-background min-h-screen">
      {showAccountDialog && (
        <Dialog open={showAccountDialog} onOpenChange={setShowAccountDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chose your profile type?</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <p className="text-muted-foreground">
                You can add a new account to your profile.
              </p>
            </DialogDescription>
            <ProfileTypeSwitch />
          </DialogContent>
        </Dialog>
      )}
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex w-full flex-col gap-4 md:w-1/3">
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="relative mb-4 h-32 w-32">
                <Image
                  src={profileImage}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h2 className="text-lg font-semibold">{currentUser?.name}</h2>
              <Label htmlFor="profileImage" className="cursor-pointer">
                <Button variant="outline" className="mt-2">
                  Change Profile Picture
                </Button>
              </Label>
              <Input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </CardContent>
          </Card>
          <Button
            variant="outline"
            className="mx-auto"
            onClick={() => handleSignOut()}
          >
            Sign out
          </Button>

          <div className="space-y-4">
            {typeof myMember !== "undefined" &&
              myMember.length > 0 &&
              myMember.map((membership) => (
                <Card
                  key={membership.id}
                  className="hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => handleAccountClick(Number(membership.id))}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="mb-2 font-semibold">
                          {membership.name} {membership.surname}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {membership.mail}
                        </p>
                      </div>
                      <ChevronRight className="text-muted-foreground h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          <Button
            className="w-full"
            variant="outline"
            onClick={() => setShowAccountDialog(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Account
          </Button>
        </div>

        <div className="w-full md:w-2/3">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="mb-4 text-xl font-semibold">Your account</h2>
                  <div className="space-y-2">
                    <Link
                      href="/inbox"
                      className="hover:bg-muted flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="bg-muted rounded-full p-2">
                            <Bell className="h-5 w-5" />
                          </div>
                          <div className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
                        </div>
                        <span>Inbox</span>
                      </div>
                      <ChevronRight className="text-muted-foreground h-5 w-5" />
                    </Link>
                    <Link
                      href="/help"
                      className="hover:bg-muted flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <HelpCircle className="h-5 w-5" />
                        </div>
                        <span>Help</span>
                      </div>
                      <ChevronRight className="text-muted-foreground h-5 w-5" />
                    </Link>
                    <Link
                      href="/documents"
                      className="hover:bg-muted flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <FileText className="h-5 w-5" />
                        </div>
                        <span>Statements and documents</span>
                      </div>
                      <ChevronRight className="text-muted-foreground h-5 w-5" />
                    </Link>
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-xl font-semibold">Settings</h2>
                  <div className="space-y-2">
                    <Link
                      href="/settings/security"
                      className="hover:bg-muted flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <Shield className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span>Security and privacy</span>
                          <span className="text-muted-foreground text-sm">
                            Change your security and privacy settings.
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="text-muted-foreground h-5 w-5" />
                    </Link>
                    <Link
                      href="/settings/notifications"
                      className="hover:bg-muted flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <BellDot className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span>Display and notifications</span>
                          <span className="text-muted-foreground text-sm">
                            Customise your app display and choose how you get
                            updates.
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="text-muted-foreground h-5 w-5" />
                    </Link>
                    <Link
                      href="/settings/integrations"
                      className="hover:bg-muted flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <Link2 className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span>Integrations and tools</span>
                          <span className="text-muted-foreground text-sm">
                            Connect your account to third-party software.
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="text-muted-foreground h-5 w-5" />
                    </Link>
                    <Link
                      href="/settings/payment"
                      className="hover:bg-muted flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <Building2 className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span>Payment methods</span>
                          <span className="text-muted-foreground text-sm">
                            Manage saved cards and bank accounts that are linked
                            to this account.
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="text-muted-foreground h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
