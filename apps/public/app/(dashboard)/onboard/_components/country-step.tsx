import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CountryStepProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function CountryStep({ value, onChange, error }: CountryStepProps) {
  return (
    <div className="space-y-2">
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Where do you live most of the time?
        </h1>
        <p className="text-muted-foreground">
          By law, we may need to ask for proof of your address.
        </p>
      </div>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select your country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="TR">Turkey</SelectItem>
          <SelectItem value="US">United States</SelectItem>
          <SelectItem value="GB">United Kingdom</SelectItem>
          <SelectItem value="DE">Germany</SelectItem>
        </SelectContent>
      </Select>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}
