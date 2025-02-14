"use client";

import {useState, useTransition} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {
  Bell,
  BellDot,
  BriefcaseBusiness,
  Building2,
  Camera,
  ChevronRight,
  Copy,
  FileText,
  HelpCircle,
  Link2,
  LogOut,
  Shield,
  CopyCheck,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {toast} from "@/components/ui/sonner";
import {useRouter} from "next/navigation";
import {postProfileImageApi} from "@/actions/upwithcrowd/member/post-action";
import {handleSignOut} from "@/app/(auth)/login/action";
import {useMember} from "@/app/providers/member";

export default function ProfileClient() {
  const {currentMember, members, setCurrentMember, setMembers} = useMember();
  const [isPending, startTransition] = useTransition();
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  if (currentMember === null) return null;
  const handleCopy = () => {
    if (currentMember.id) {
      void navigator.clipboard.writeText(currentMember.id);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Remove data:image/[type];base64, prefix
        const base64Content = base64String.split(",")[1];

        startTransition(() => {
          void postProfileImageApi({
            requestBody: base64Content,
          })
            .then((response) => {
              if (response.type === "success") {
                toast.success("Profile image uploaded successfully.");
              } else {
                toast.error("Error uploading image.");
              }
            })
            .finally(() => {
              router.push("/profile");
            });
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex w-full flex-col gap-4 md:w-1/3">
          <Card className="bg-muted flex w-full max-w-md items-center justify-center">
            <CardContent className="flex flex-col items-center p-8">
              <div className="relative mb-6">
                <div className="relative h-24 w-24">
                  <Image
                    alt="Profile"
                    className="rounded-full bg-[#e5e5e5] object-cover"
                    fill
                    src={
                      currentMember.profileImage
                        ? `data:image/jpeg;base64,${currentMember.profileImage}`
                        : "/placeholder.svg"
                    }
                  />
                </div>
                <Button
                  className="bg-primary absolute bottom-0 right-0 cursor-pointer rounded-full p-1.5"
                  disabled={isPending}
                  onClick={() => document.getElementById("profileImage")?.click()}>
                  <Camera className="text-muted h-4 w-4" />
                </Button>
              </div>
              <h2 className="mb-1 text-2xl font-bold">
                {currentMember.type === "Organization"
                  ? currentMember.title
                  : `${currentMember.name || "Your Name"} ${currentMember.surname}`}
              </h2>
              <p className="text-muted-foreground mb-4">
                {currentMember.type === "Organization" ? "Your business account" : "Your personal account"}
              </p>
            </CardContent>
          </Card>
          <ScrollArea className="mb-2 h-72">
            <div className="space-y-4 pr-2">
              {typeof members !== "undefined" &&
                members.length > 0 &&
                members
                  .filter((member) => member.id !== currentMember.id)
                  .map((membership) => (
                    <Card
                      className="hover:bg-muted cursor-pointer transition-colors"
                      key={membership.id}
                      onClick={() => {
                        setCurrentMember(membership);
                        setMembers(members);
                      }}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="mb-2 font-semibold">
                              {membership.type === "Organization"
                                ? membership.title
                                : `${membership.name} ${membership.surname}`}
                            </h3>
                            <p className="text-muted-foreground text-sm">{membership.mail}</p>
                            <p className="text-muted-foreground text-sm">{membership.type}</p>
                          </div>
                          <ChevronRight className="text-muted-foreground h-5 w-5" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
            </div>
          </ScrollArea>
          <Card className="hover:bg-muted cursor-pointer text-nowrap border-dashed shadow-none transition-colors hover:border-none hover:shadow-md">
            <Link href="/profile/new/business">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <BriefcaseBusiness className="text-primary h-8 w-8" />
                  <span className="font-semibold">Add New Business Account</span>
                </div>
                <ChevronRight className="text-muted-foreground h-5 w-5" />
              </CardContent>
            </Link>
          </Card>
          <div className="text-muted-foreground flex w-full items-center justify-center gap-2 text-center">
            <p>Membership Id: {currentMember.id}</p>
            <Button className="cursor-pointer" onClick={handleCopy} type="button">
              {isCopied ? <CopyCheck className="h-5 w-5 " /> : <Copy className="h-5 w-5" />}
            </Button>
          </div>
          <div className="flex w-full items-center justify-center">
            <Button
              className="flex w-1/3 items-center justify-center rounded-full text-red-500 hover:text-red-700 "
              onClick={() => void handleSignOut()}
              variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="mb-4 text-xl font-semibold">Your account</h2>
                  <div className="space-y-2">
                    <Link className="hover:bg-muted flex items-center justify-between rounded-lg p-2" href="/inbox">
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
                      className="hover:bg-muted flex items-center justify-between rounded-lg p-2"
                      href="/profile/settings">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="bg-muted rounded-full p-2">
                            <Settings className="h-5 w-5" />
                          </div>
                        </div>
                        <span>Settings</span>
                      </div>
                      <ChevronRight className="text-muted-foreground h-5 w-5" />
                    </Link>
                    <Link className="hover:bg-muted flex items-center justify-between rounded-lg p-2" href="/help">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <HelpCircle className="h-5 w-5" />
                        </div>
                        <span>Help</span>
                      </div>
                      <ChevronRight className="text-muted-foreground h-5 w-5" />
                    </Link>
                    <Link className="hover:bg-muted flex items-center justify-between rounded-lg p-2" href="/documents">
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
                      className="hover:bg-muted flex items-center justify-between rounded-lg p-2"
                      href="/settings/security">
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
                      className="hover:bg-muted flex items-center justify-between rounded-lg p-2"
                      href="/settings/notifications">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <BellDot className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span>Display and notifications</span>
                          <span className="text-muted-foreground text-sm">
                            Customise your app display and choose how you get updates.
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="text-muted-foreground h-5 w-5" />
                    </Link>
                    <Link
                      className="hover:bg-muted flex items-center justify-between rounded-lg p-2"
                      href="/settings/integrations">
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
                      className="hover:bg-muted flex items-center justify-between rounded-lg p-2"
                      href="/settings/payment">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <Building2 className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span>Payment methods</span>
                          <span className="text-muted-foreground text-sm">
                            Manage saved cards and bank accounts that are linked to this account.
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
      <input accept="image/*" className="hidden" id="profileImage" onChange={handleImageChange} type="file" />
    </div>
  );
}
