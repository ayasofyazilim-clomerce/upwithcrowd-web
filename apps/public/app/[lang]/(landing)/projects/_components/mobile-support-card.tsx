"use client";

import React, {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer";
import {useMediaQuery} from "../hooks/use-media-query";
import SupportCard from "./support-card";

export default function MobileSupportDrawer({
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
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (isDesktop) {
      setOpen(false);
    }
  }, [isDesktop]);

  if (isDesktop) {
    return (
      <SupportCard
        customAmount={customAmount}
        donationOptions={donationOptions}
        handleCustomAmountChange={handleCustomAmountChange}
        isLoading={isLoading}
        onDonate={onDonate}
        selectedDonation={selectedDonation}
        setSelectedDonation={setSelectedDonation}
      />
    );
  }

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <Button className="fixed bottom-4 left-4 right-4 z-50" size="lg">
          Support this project
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <SupportCard
            customAmount={customAmount}
            donationOptions={donationOptions}
            handleCustomAmountChange={handleCustomAmountChange}
            isLoading={isLoading}
            onDonate={onDonate}
            selectedDonation={selectedDonation}
            setSelectedDonation={setSelectedDonation}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
