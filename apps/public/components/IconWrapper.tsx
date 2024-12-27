"use client";
import { cn } from "@/lib/utils";

export function IconWrapper({
  icon: Icon,
  className,
  iconClassName,
}: {
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div
      className={cn(
        "bg-primary flex size-14 items-center justify-center rounded-full",
        className,
      )}
    >
      <Icon className={cn("text-white", iconClassName)} />
    </div>
  );
}
