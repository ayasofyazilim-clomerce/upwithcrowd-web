"use client";

import {Avatar, AvatarFallback} from "@repo/ayasofyazilim-ui/atoms/avatar";
import {ChevronRight} from "lucide-react";
import Link from "next/link";

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
  allInvestorsLink: string;
}

export function InvestorsDialog({previewInvestors, totalCount, allInvestorsLink}: InvestorsDialogProps) {
  return (
    <div>
      <Link href={allInvestorsLink}>
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
      </Link>
    </div>
  );
}
