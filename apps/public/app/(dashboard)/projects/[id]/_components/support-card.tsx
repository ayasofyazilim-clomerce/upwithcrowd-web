"use client";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {DollarSign, Info} from "lucide-react";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useRouter} from "next/navigation";

function InfoButton({href}: {href: string}) {
  const router = useRouter();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="h-4 w-4"
            onClick={() => {
              router.push(href);
            }}
            size="icon"
            variant="ghost">
            <Info className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to edit this section</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface SupportCardProps {
  editLink: string;
}

export default function SupportCard({editLink}: SupportCardProps) {
  const donationOptions = [10, 25, 50, 100, 250, 500];
  const [selectedDonation, setSelectedDonation] = useState(donationOptions[0]);
  const [customAmount, setCustomAmount] = useState("");

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(value);
    if (value) {
      setSelectedDonation(Number(value));
    }
  };

  return (
    <Card className="border-none bg-transparent p-0 shadow-none">
      <CardContent className="p-0">
        <div className="flex items-start gap-2">
          <h3 className="mb-4 text-xl font-semibold">Support this project</h3>
          <InfoButton href={editLink} />
        </div>

        <div className="mb-4 grid grid-cols-3 gap-4">
          {donationOptions.map((amount) => (
            <Button
              key={amount}
              onClick={() => {
                setSelectedDonation(amount);
              }}
              variant={selectedDonation === amount ? "default" : "outline"}>
              ${amount}
            </Button>
          ))}
        </div>
        <div className="relative mb-4">
          <DollarSign className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <Input
            className="bg-white pl-9"
            onChange={handleCustomAmountChange}
            placeholder="Enter custom amount"
            type="text"
            value={customAmount}
          />
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Button className="w-full">Donate ${selectedDonation} Now</Button>
      </CardFooter>
    </Card>
  );
}
