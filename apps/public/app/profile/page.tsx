"use client";

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, Bell, HelpCircle, FileText, Shield, BellDot, Link2, Building2, Plus } from 'lucide-react'
import { useSession } from 'next-auth/react';
import { getMembership } from './actions';
import { GetApiMymemberResponse } from '@ayasofyazilim/saas/upwithcrowdService';

// Mock user data
const userData = {
  name: "John",
  surname: "Doe",
  email: "john.doe@example.com",
  profileImage: "/placeholder.svg"
}

// Mock user accounts
const userAccounts = [
  { id: 1, name: "John", surname: "Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane", surname: "Doe", email: "jane.doe@example.com" },
]

export default function ProfilePage() {
  const { data: session } = useSession();
  const currentUser = session?.user;
  const [profileImage, setProfileImage] = useState(userData.profileImage)
  const [myMember, setMyMember] = useState<GetApiMymemberResponse>();
  useEffect(() => {
    void getMembership().then((result) => {
      if (!result || typeof result.items !== "undefined" ) return;
      console.log("myMember client", result);
      setMyMember(result.items);
    });
  }, [session]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAccountClick = (accountId: number) => {
    console.log(`Switching to account ${accountId}`)
    // Here you would typically implement account switching logic
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">User Profile</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 space-y-4">
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src={profileImage}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h2 className="font-semibold text-lg">{currentUser?.name}</h2>
                <Label htmlFor="profileImage" className="cursor-pointer">
                  <Button variant="outline" className="mt-2">Change Profile Picture</Button>
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

            <div className="space-y-4">
              {typeof myMember !== "undefined" && myMember.length > 0 && myMember.map((membership) => (
                <Card
                  key={membership.id}
                  className="transition-colors hover:bg-muted cursor-pointer"
                  onClick={() => handleAccountClick(Number(membership.id))}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold mb-2">{membership.name} {membership.surname}</h3>
                        <p className="text-sm text-muted-foreground">{membership.mail}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
              {currentUser &&
                <Card
                  key={currentUser?.id || 1}
                  className="transition-colors hover:bg-muted cursor-pointer"
                  onClick={() => handleAccountClick( Number(currentUser?.id) )}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold mb-2">{currentUser.name}</h3>
                        <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              }
            </div>

            <Button className="w-full" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add New Account
            </Button>
          </div>

          <div className="w-full md:w-2/3">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Your account</h2>
                    <div className="space-y-2">
                      <Link href="/inbox" className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="p-2 bg-muted rounded-full">
                              <Bell className="w-5 h-5" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
                          </div>
                          <span>Inbox</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </Link>
                      <Link href="/help" className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-full">
                            <HelpCircle className="w-5 h-5" />
                          </div>
                          <span>Help</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </Link>
                      <Link href="/documents" className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-full">
                            <FileText className="w-5 h-5" />
                          </div>
                          <span>Statements and documents</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </Link>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Settings</h2>
                    <div className="space-y-2">
                      <Link href="/settings/security" className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-full">
                            <Shield className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col">
                            <span>Security and privacy</span>
                            <span className="text-sm text-muted-foreground">Change your security and privacy settings.</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </Link>
                      <Link href="/settings/notifications" className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-full">
                            <BellDot className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col">
                            <span>Display and notifications</span>
                            <span className="text-sm text-muted-foreground">Customise your app display and choose how you get updates.</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </Link>
                      <Link href="/settings/integrations" className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-full">
                            <Link2 className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col">
                            <span>Integrations and tools</span>
                            <span className="text-sm text-muted-foreground">Connect your account to third-party software.</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </Link>
                      <Link href="/settings/payment" className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-full">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col">
                            <span>Payment methods</span>
                            <span className="text-sm text-muted-foreground">Manage saved cards and bank accounts that are linked to this account.</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

