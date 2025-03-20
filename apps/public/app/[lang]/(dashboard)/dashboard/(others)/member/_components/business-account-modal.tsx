"use client";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {BadgeCheck, Building2, CircleUserRound} from "lucide-react";
import {useRouter} from "next/navigation";

interface BusinessAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BusinessAccountModal({isOpen, onClose}: BusinessAccountModalProps) {
  const router = useRouter();
  const handleModalClose = () => {
    router.replace("/dashboard/member/settings#document");
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Building2 className="primary h-8 w-8" />
            Kurumsal Hesap Oluşturuldu
          </DialogTitle>
          <DialogDescription>
            Kurumsal hesabınız başarıyla oluşturuldu. Artık araçlarımızla işletmenizi yönetmeye hazırsınız.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-muted-foreground text-sm">
            Kullanıcı Doğrula butonuna tıklayarak Kurumsal Hesabınızı doğrulayabilir ve doğrulanmış hesaplara özel
            fırsatlardan yararlanabilirsiniz.
          </p>
        </div>
        <DialogFooter>
          <Button className="w-full bg-amber-400 sm:w-auto" onClick={onClose}>
            Profilim
            <CircleUserRound className="ml-2 h-5 w-5" />
          </Button>
          <Button className="w-full sm:w-auto" onClick={handleModalClose}>
            Kullanıcı Doğrula
            <BadgeCheck className="ml-2 h-5 w-5" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
