"use client";

import React, {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer";
import {useMediaQuery} from "@/components/ui/useMediaQuery";
import SupportCard from "./support-card";

export default function MobileSupportDrawer({
  donationOptions,
  selectedDonation,
}: {
  donationOptions: number[];
  selectedDonation: number;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (isDesktop) {
      setOpen(false);
    }
  }, [isDesktop]);

  if (isDesktop) {
    return <SupportCard donationOptions={donationOptions} selectedDonation={selectedDonation} />;
  }

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <Button className="fixed bottom-4 left-4 right-4 z-50" size="lg">
          Projeyi Destekle
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <SupportCard donationOptions={donationOptions} selectedDonation={selectedDonation} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
