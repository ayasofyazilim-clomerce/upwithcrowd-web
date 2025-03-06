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
import {signOutServer} from "@repo/utils/auth";
import {postProfileImageApi} from "@/actions/upwithcrowd/member/post-action";
import {useMember} from "@/app/providers/member";
import {getBaseLink} from "@/utils/lib";

export default function ProfileClient() {
  const {currentMember, members, setCurrentMember, setMembers} = useMember();
  const [isPending, startTransition] = useTransition();
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  if (!currentMember) return null;

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
                toast.success("Profile fotoğrafı başarıyla yüklendi.");
              } else {
                toast.error("Fotoğraf yüklenirken bir hata oluştu.");
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
    <div className="bg-background min-h-screen px-4 py-6 md:p-0">
      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        <div className="flex w-full flex-col gap-4 md:w-1/3">
          <Card className="bg-muted w-full md:max-w-md">
            <CardContent className="flex flex-col items-center p-6 md:p-8">
              <div className="relative mb-4 md:mb-6">
                <div className="relative h-20 w-20 md:h-24 md:w-24">
                  <Image
                    alt="Profil"
                    className="rounded-full bg-[#e5e5e5] object-cover"
                    fill
                    src={
                      currentMember.profileImage
                        ? `data:image/jpeg;base64,${currentMember.profileImage}`
                        : "https://placehold.co/200x200"
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
              <h2 className="mb-1 text-center text-xl font-bold md:text-2xl">
                {currentMember.type === "Organization"
                  ? currentMember.title
                  : `${currentMember.name || "Adınız"} ${currentMember.surname}`}
              </h2>
              <p className="text-muted-foreground mb-4 text-center text-sm md:text-base">
                {currentMember.type === "Organization" ? "İş hesabınız" : "Kişisel hesabınız"}
              </p>
            </CardContent>
          </Card>

          {typeof members !== "undefined" && members.length > 0 && (
            <ScrollArea className="mb-4 max-h-60 md:mb-2 md:max-h-72">
              <div className="space-y-4">
                {members
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
          )}

          <Card className="hover:bg-muted w-full cursor-pointer text-nowrap border-dashed shadow-none transition-colors hover:border-none hover:shadow-md">
            <Link href={getBaseLink("profile/new/business")}>
              <CardContent className="flex items-center justify-between p-4 md:p-6">
                <div className="flex items-center gap-4">
                  <BriefcaseBusiness className="text-primary h-8 w-8" />
                  <span className="font-semibold">Yeni İş Hesabı Ekle</span>
                </div>
                <ChevronRight className="text-muted-foreground h-5 w-5" />
              </CardContent>
            </Link>
          </Card>

          <div className="text-muted-foreground flex w-full flex-col items-center justify-center gap-2 px-2 text-center text-sm md:flex-row md:px-0 md:text-base">
            <p className="break-all">Üye Id: {currentMember.id}</p>
            <Button
              className="text-muted-foreground hover:text-primary cursor-pointer border-none bg-transparent shadow-none transition-transform hover:scale-110 hover:bg-transparent md:ml-2"
              onClick={handleCopy}
              type="button">
              {isCopied ? <CopyCheck className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </Button>
          </div>

          <div className="flex w-full items-center justify-center px-2 md:px-0">
            <Button
              className="flex w-full items-center justify-center rounded-full text-red-500 hover:text-red-700 md:w-1/3"
              onClick={() => {
                window.sessionStorage.removeItem("current_member");
                void signOutServer();
              }}
              variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Çıkış yap
            </Button>
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h2 className="mb-3 text-lg font-semibold md:mb-4 md:text-xl">Hesabınız</h2>
                  <div className="space-y-2">
                    <Link className="hover:bg-muted flex items-center justify-between rounded-lg p-2" href="/inbox">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="bg-muted rounded-full p-2">
                            <Bell className="h-5 w-5" />
                          </div>
                          <div className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
                        </div>
                        <span>Gelen Kutusu</span>
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
                        <span>Ayarlar</span>
                      </div>
                      <ChevronRight className="text-muted-foreground h-5 w-5" />
                    </Link>
                    <Link className="hover:bg-muted flex items-center justify-between rounded-lg p-2" href="/help">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <HelpCircle className="h-5 w-5" />
                        </div>
                        <span>Yardım</span>
                      </div>
                      <ChevronRight className="text-muted-foreground h-5 w-5" />
                    </Link>
                    <Link className="hover:bg-muted flex items-center justify-between rounded-lg p-2" href="/documents">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <FileText className="h-5 w-5" />
                        </div>
                        <span>Ekstreler ve belgeler</span>
                      </div>
                      <ChevronRight className="text-muted-foreground h-5 w-5" />
                    </Link>
                  </div>
                </div>

                <div>
                  <h2 className="mb-3 text-lg font-semibold md:mb-4 md:text-xl">Ayarlar</h2>
                  <div className="space-y-2">
                    <Link
                      className="hover:bg-muted flex items-center justify-between rounded-lg p-2"
                      href="/settings/security">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <Shield className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span>Güvenlik ve gizlilik</span>
                          <span className="text-muted-foreground text-sm">
                            Güvenlik ve gizlilik ayarlarınızı değiştirin.
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
                          <span>Görünüm ve bildirimler</span>
                          <span className="text-muted-foreground text-sm">
                            Uygulama görünümünü özelleştirin ve nasıl güncelleme alacağınızı seçin.
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
                          <span>Entegrasyonlar ve araçlar</span>
                          <span className="text-muted-foreground text-sm">
                            Hesabınızı üçüncü parti yazılımlara bağlayın.
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
                          <span>Ödeme yöntemleri</span>
                          <span className="text-muted-foreground text-sm">
                            Bu hesaba bağlı kayıtlı kartları ve banka hesaplarını yönetin.
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
