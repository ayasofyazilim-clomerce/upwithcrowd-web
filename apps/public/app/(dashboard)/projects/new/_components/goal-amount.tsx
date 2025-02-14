"use client";

import { Button } from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Calculator} from "lucide-react";

interface FundableAmountProps {
  onChange?: (value: number) => void;
}

export default function FundableAmount({onChange}: FundableAmountProps) {
  return (
    <div className="">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-md font-medium" htmlFor="amount">
            Fundable Amount
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
            <Input
              className="pl-7"
              id="amount"
              min="0"
              onChange={(e) => onChange?.(Number(e.target.value))}
              placeholder="0"
              type="number"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-emerald-500" />
          <Button className="text-md text-emerald-600 hover:text-emerald-700 hover:underline" type="button">
            Use our calculator to estimate total costs, including taxes and fees.
          </Button>
        </div>
      </div>
    </div>
  );
}
