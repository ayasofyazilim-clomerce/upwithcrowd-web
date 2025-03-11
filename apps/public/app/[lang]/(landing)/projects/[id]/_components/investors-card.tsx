"use client";

import {useState} from "react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {ChevronRight, Crown, Loader2} from "lucide-react";
import {formatCurrency} from "@repo/ui/utils";
import {ScrollArea} from "@/components/ui/scroll-area";

// Helper function to get initials from masked name
function getInitialsFromMaskedName(name: string) {
  if (!name) return "";
  const parts = name.split(" ");
  return parts.map((part) => part[0]).join("");
}

interface Investor {
  id: string;
  name: string;
  amount: number;
  memberQualidied: boolean;
}

interface InvestorsDialogProps {
  previewInvestors: Investor[];
  totalCount: number;
  fetchAllInvestors: () => Investor[];
}

export function InvestorsDialog({previewInvestors, totalCount, fetchAllInvestors}: InvestorsDialogProps) {
  const [open, setOpen] = useState(false);
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);

    if (newOpen && investors.length === 0) {
      setLoading(true);
      const allInvestors = fetchAllInvestors();
      setInvestors(allInvestors);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger asChild>
        <div className="bg-background flex cursor-pointer items-center rounded-full border p-1 shadow-sm">
          <div className="flex -space-x-1.5">
            {previewInvestors.slice(0, 4).map((investor) => (
              <Avatar
                className="ring-background border-primary/50 h-6 w-6 rounded-full border ring-1"
                key={investor.id}>
                <AvatarFallback className="text-[10px]">{getInitialsFromMaskedName(investor.name)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <p className="text-muted-foreground flex-1 cursor-pointer px-2 text-xs">
            Projenin <strong className="text-foreground font-medium">{totalCount}</strong> yatırımcısı var.
            <span className="float-right">
              <ChevronRight className="size-4" />
            </span>
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            Tüm Yatırımcılar
            <span className="bg-primary/10 text-primary ml-3 rounded-full px-3 py-1 text-sm">
              {totalCount} Yatırımcı
            </span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(80vh-100px)] overflow-y-auto pr-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="text-primary mb-2 h-8 w-8 animate-spin" />
              <p className="text-muted-foreground text-sm">Yatırımcılar yükleniyor...</p>
            </div>
          ) : (
            <div className="grid gap-4 pb-4 sm:grid-cols-2">
              {investors.map((investor) => (
                <div
                  className="hover:bg-accent/50 flex items-start space-x-4 rounded-lg border p-3 transition-all"
                  key={investor.id}>
                  <div className="relative">
                    {investor.memberQualidied ? (
                      <div className="absolute -right-1 -top-1 z-10">
                        <Crown className="h-4 w-4 text-yellow-500" />
                      </div>
                    ) : null}
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{getInitialsFromMaskedName(investor.name)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{investor.name}</p>
                    <p className="text-muted-foreground text-sm">{formatCurrency(investor.amount)}</p>
                    <div className="mt-1 flex flex-col gap-1 text-sm">
                      {investor.memberQualidied ? (
                        <span className="text-primary text-xs font-medium">Nitelikli Yatırımcı</span>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && investors.length === 0 && (
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">Henüz yatırımcı bulunmamaktadır.</p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
