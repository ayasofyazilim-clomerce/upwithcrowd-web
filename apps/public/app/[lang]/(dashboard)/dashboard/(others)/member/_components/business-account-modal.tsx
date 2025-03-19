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
import {Building2} from "lucide-react";

interface BusinessAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BusinessAccountModal({isOpen, onClose}: BusinessAccountModalProps) {
  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
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
            Kurumsal hesabınızı oluşturduğunuz için tebrikler! İşletmenizin büyümesine yardımcı olmak için
            sabırsızlanıyoruz.
          </p>
        </div>
        <DialogFooter>
          <Button className="w-full sm:w-auto" onClick={onClose}>
            Paneli Keşfet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
