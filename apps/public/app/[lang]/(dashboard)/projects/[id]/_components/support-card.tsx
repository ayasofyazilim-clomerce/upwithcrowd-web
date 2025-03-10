"use client";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Wallet} from "lucide-react";
import {Input} from "@/components/ui/input";
import {formatCurrency} from "@repo/ui/utils";

export default function SupportCard({
  donationOptions,
  selectedDonation,
}: {
  donationOptions: number[];
  selectedDonation: number;
}) {
  return (
    <Card className="border-none bg-transparent p-4 pb-6 shadow-none md:p-0 md:pb-0">
      <CardContent className="p-0">
        <h3 className="mb-4 text-xl font-semibold">Projeyi Destekle</h3>
        <div className="mb-4 grid grid-cols-3 gap-4">
          {donationOptions.map((amount) => (
            <Button disabled key={amount} variant={selectedDonation === amount ? "default" : "outline"}>
              {formatCurrency(amount)}
            </Button>
          ))}
        </div>
        <div className="relative mb-4">
          <Wallet className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <Input className="pl-9" disabled placeholder="Özel miktar girin" type="text" />
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Button className="w-full" disabled>
          Preview Mode - {formatCurrency(selectedDonation)} Destek Ol
        </Button>
      </CardFooter>
    </Card>
  );
}
