"use client";
// import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { forwardRef, useState } from "react";
import { useMediaQuery } from "@/components/ui/useMediaQuery";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export const DatePicker = forwardRef<
  HTMLDivElement,
  {
    date?: Date;
    onChange: (date?: Date) => void;
    disabled?: boolean;
    dateRange?: CalendarProps["disabled"];
    className?: string;
    showIcon?: boolean;
    id?: string;
  }
>(function DatePickerCmp(
  { date, onChange, disabled, dateRange, className, showIcon, id },
  ref,
) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);

  const DesktopContent = (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={"outline"}
          size="icon"
          className={cn(
            "w-full text-left font-normal",
            !date && "text-muted-foreground",
            className,
          )}
        >
          {showIcon && <CalendarIcon className="h-4 w-4" />}
          {/* {date ? format(date, "PPP") : <span>Pick a date</span>} */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-max p-0" ref={ref}>
        <Calendar
          mode="single"
          id={id}
          classNames={{
            table: "w-max mx-auto",
          }}
          selected={date}
          onSelect={onChange}
          disabled={dateRange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );

  const MobileContent = (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          disabled={disabled}
          variant={"outline"}
          size="icon"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className,
          )}
        >
          {showIcon && <CalendarIcon className="h-4 w-4" />}
          {/* {date ? format(date, "PPP") : <span>Pick a date</span>} */}
        </Button>
      </DrawerTrigger>
      <DrawerContent ref={ref}>
        <div className="mt-4 border-t">
          <Calendar
            id={id}
            mode="single"
            selected={date}
            onSelect={onChange}
            disabled={dateRange}
            initialFocus
          />
        </div>
      </DrawerContent>
    </Drawer>
  );

  const Content = isDesktop ? DesktopContent : MobileContent;
  return Content;
});
