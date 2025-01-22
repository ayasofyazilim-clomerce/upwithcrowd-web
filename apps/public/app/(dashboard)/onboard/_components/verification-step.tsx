import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface VerificationStepProps {
  value: {
    method: "tc" | "edevlet";
    value: string;
  };
  onChange: (value: { method: "tc" | "edevlet"; value: string }) => void;
  error?: string;
}

export function VerificationStep({
  value,
  onChange,
  error,
}: VerificationStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Verify your identity
        </h1>
        <p className="text-muted-foreground">
          Choose your preferred verification method
        </p>
      </div>

      <RadioGroup
        value={value.method}
        onValueChange={(method: "tc" | "edevlet") =>
          onChange({ ...value, method })
        }
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="tc" id="tc" />
          <Label htmlFor="tc">TC Kimlik No</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="edevlet" id="edevlet" />
          <Label htmlFor="edevlet">e-Devlet</Label>
        </div>
      </RadioGroup>

      {value.method === "tc" && (
        <div className="space-y-2">
          <Label htmlFor="tc-number">TC Kimlik No</Label>
          <Input
            id="tc-number"
            value={value.value}
            onChange={(e) => onChange({ ...value, value: e.target.value })}
            placeholder="Enter your TC Kimlik No"
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
      )}

      {value.method === "edevlet" && (
        <div className="space-y-2">
          <Label htmlFor="edevlet-id">e-Devlet ID</Label>
          <Input
            id="edevlet-id"
            value={value.value}
            onChange={(e) => onChange({ ...value, value: e.target.value })}
            placeholder="Enter your e-Devlet ID"
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
      )}
    </div>
  );
}
