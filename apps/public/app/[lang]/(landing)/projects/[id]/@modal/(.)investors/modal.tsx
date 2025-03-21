"use client";

import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {ScrollArea} from "@/components/ui/scroll-area";
import type {PagedResultDto_ListProjectInvestorDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {formatCurrency} from "@repo/ui/utils";
import {ChevronLeft, ChevronRight, Crown} from "lucide-react";
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";

function getInitialsFromMaskedName(name: string) {
  if (!name) return "";
  const parts = name.split(" ");
  return parts.map((part) => part[0]).join("");
}

export function Modal({investorData}: {investorData: PagedResultDto_ListProjectInvestorDto | null}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSkipCount = Number(searchParams.get("skipCount") || 0);
  const isNextPageAvailable = (investorData?.totalCount || 0) > currentSkipCount * 10 + 10;
  const isPreviousPageAvailable = currentSkipCount > 0;
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
      open>
      <DialogContent className="max-h-[80vh] sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            Tüm Yatırımcılar
            <span className="bg-primary/10 text-primary ml-3 rounded-full px-3 py-1 text-sm">
              {investorData?.totalCount || 0} Yatırımcı
            </span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(80vh-100px)] overflow-y-auto pr-1">
          <div className="grid gap-4 pb-4 sm:grid-cols-2">
            {investorData?.items?.map((investor) => (
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
                    <AvatarFallback>{getInitialsFromMaskedName(investor.name || "")}</AvatarFallback>
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
          {investorData?.totalCount ? (
            <div className="flex justify-between">
              {isPreviousPageAvailable ? (
                <div className="bg-background flex cursor-pointer items-center rounded-full border p-1 shadow-sm">
                  <Link
                    className="text-muted-foreground flex-1 cursor-pointer p-2 text-xs"
                    href={`?skipCount=${currentSkipCount - 10}`}
                    replace>
                    <span className="float-left">
                      <ChevronLeft className="size-4" />
                    </span>
                    Önceki sayfa
                  </Link>
                </div>
              ) : null}
              {isNextPageAvailable ? (
                <div className="bg-background ml-auto flex cursor-pointer items-center rounded-full border p-1 shadow-sm">
                  <Link
                    className="text-muted-foreground flex-1 cursor-pointer p-2 text-xs"
                    href={`?skipCount=${currentSkipCount + 10}`}
                    replace>
                    Sonraki sayfa
                    <span className="float-right">
                      <ChevronRight className="size-4" />
                    </span>
                  </Link>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">Henüz yatırımcı bulunmamaktadır.</p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
