import { cn } from "@/lib/utils";
import TextWithTitle from "./text-with-title";
import { Lightbulb } from "lucide-react";
import Link from "next/link";

const defaultTextWithTitleClassNames = {
  title: "text-black/80",
  text: "text-muted-foreground",
};
export function Section({
  children,
  title,
  text,
  className,
}: {
  children: React.ReactNode;
  title: string;
  text: string | string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid items-start gap-8 border-b py-8 md:grid-cols-3",
        className,
      )}
    >
      <TextWithTitle
        classNames={defaultTextWithTitleClassNames}
        title={title}
        text={text}
      />
      {children}
    </div>
  );
}

export function SectionHint({
  message,
  link,
}: {
  message: string;
  link?: {
    href: string;
    text: string;
  };
}) {
  return (
    <div className="text-primary mt-auto flex items-center gap-2 text-sm">
      <Lightbulb />
      {message}
      {link && <Link href={link.href}> {link.text}</Link>}
    </div>
  );
}
