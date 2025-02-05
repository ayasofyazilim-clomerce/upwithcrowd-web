"use client";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {DollarSign} from "lucide-react";
import {Input} from "@/components/ui/input";

export default function SupportCard({
  donationOptions,
  selectedDonation,
  setSelectedDonation,
  customAmount,
  handleCustomAmountChange,
  onDonate,
  isLoading,
}: {
  donationOptions: number[];
  selectedDonation: number;
  setSelectedDonation: (amount: number) => void;
  customAmount: string;
  handleCustomAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDonate: (amount: number) => Promise<void>;
  isLoading: boolean;
}) {
  return (
    <Card className="border-none bg-transparent p-0 shadow-none">
      <CardContent className="p-0">
        <h3 className="mb-4 text-xl font-semibold">Support this project</h3>
        <div className="mb-4 grid grid-cols-3 gap-4">
          {donationOptions.map((amount) => (
            <Button
              key={amount}
              variant={selectedDonation === amount ? "default" : "outline"}
              onClick={() => setSelectedDonation(amount)}>
              ${amount}
            </Button>
          ))}
        </div>
        <div className="relative mb-4">
          <DollarSign className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Enter custom amount"
            value={customAmount}
            onChange={handleCustomAmountChange}
            className="pl-9"
          />
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Button className="w-full" onClick={() => onDonate(selectedDonation)} disabled={isLoading}>
          {isLoading ? "Processing..." : `Donate $${selectedDonation} Now`}
        </Button>
      </CardFooter>
    </Card>
  );
}
