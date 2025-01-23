"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";

interface FundableAmountProps {
  onChange?: (value: number) => void;
}

export default function FundableAmount({ onChange }: FundableAmountProps) {
  return (
    <div className="">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-md font-medium">
            Fundable Amount
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              €
            </span>
            <Input
              type="number"
              id="amount"
              placeholder="0"
              className="pl-7"
              min="0"
              onChange={(e) => onChange?.(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-emerald-500" />
          <a
            href="#"
            className="text-md text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            Use our calculator to estimate total costs, including taxes and
            fees.
          </a>
        </div>
      </div>
    </div>
  );
}
