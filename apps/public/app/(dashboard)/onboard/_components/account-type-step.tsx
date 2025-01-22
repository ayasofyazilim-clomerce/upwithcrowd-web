import { Card, CardContent } from "@/components/ui/card";
import { Home, Briefcase } from "lucide-react";
import { AccountType } from "../types";

interface AccountTypeStepProps {
  value: AccountType;
  onChange: (value: AccountType) => void;
}

export function AccountTypeStep({ value, onChange }: AccountTypeStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          What kind of account would you like to open today?
        </h1>
        <p className="text-muted-foreground">
          You can add another account later on, too.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card
          className={`hover:bg-accent cursor-pointer transition-colors ${
            value === "personal" ? "border-primary" : ""
          }`}
          onClick={() => onChange("personal")}
        >
          <CardContent className="space-y-2 p-16 text-center">
            <Home className="text-primary mx-auto h-16 w-16" />
            <h3 className="text-lg font-semibold">Personal account</h3>
            <p className="text-muted-foreground text-sm">
              Send, spend, and receive around the world for less.
            </p>
          </CardContent>
        </Card>

        <Card
          className={`hover:bg-accent cursor-pointer transition-colors ${
            value === "business" ? "border-primary" : ""
          }`}
          onClick={() => onChange("business")}
        >
          <CardContent className="space-y-2 p-16 text-center">
            <Briefcase className="text-primary mx-auto h-16 w-16" />
            <h3 className="text-lg font-semibold">Business account</h3>
            <p className="text-muted-foreground text-sm">
              Do business or freelance work internationally.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
