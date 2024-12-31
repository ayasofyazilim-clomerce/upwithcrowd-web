import { cn } from "@/lib/utils";

export default function TextWithTitle({
  title,
  text,
  classNames,
}: {
  title: string;
  text: string | string[];
  classNames?: {
    text?: string;
    title?: string;
    container?: string;
  };
}) {
  return (
    <div className={cn("flex flex-col gap-2", classNames?.container)}>
      <h2 className={cn("text-lg font-bold", classNames?.title)}>{title}</h2>
      <div className="flex flex-col gap-4">
        {Array.isArray(text) ? (
          text.map((t, index) => (
            <p key={index} className={cn("text-sm", classNames?.text)}>
              {t}
            </p>
          ))
        ) : (
          <p className={cn("text-sm", classNames?.text)}>{text}</p>
        )}
      </div>
    </div>
  );
}
