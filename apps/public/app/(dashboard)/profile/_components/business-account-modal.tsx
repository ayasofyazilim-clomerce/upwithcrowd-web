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
            Business Account Created
          </DialogTitle>
          <DialogDescription>
            Your business account has been successfully created. You&apos;re all set to start managing your business
            with our tools.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-muted-foreground text-sm">
            Congratulations on setting up your business account! We look forward to helping you grow your business.
          </p>
        </div>
        <DialogFooter>
          <Button className="w-full sm:w-auto" onClick={onClose}>
            Explore Dashboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
