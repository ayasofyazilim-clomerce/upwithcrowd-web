import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PasswordStepProps {
  value: {
    password: string;
    confirmPassword: string;
  };
  onChange: (value: { password: string; confirmPassword: string }) => void;
  error?: string;
}

export function PasswordStep({ value, onChange, error }: PasswordStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create your password
        </h1>
        <p className="text-muted-foreground">
          Make sure your password is secure
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={value.password}
            onChange={(e) => onChange({ ...value, password: e.target.value })}
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={value.confirmPassword}
            onChange={(e) =>
              onChange({ ...value, confirmPassword: e.target.value })
            }
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
}
