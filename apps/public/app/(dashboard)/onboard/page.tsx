"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AccountTypeStep } from "./_components/account-type-step";
import { CountryStep } from "./_components/country-step";
import { VerificationStep } from "./_components/verification-step";
import { PasswordStep } from "./_components/password-step";
import type { FormData } from "./types";

export default function OnboardPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    accountType: "personal",
    country: "",
    verification: {
      method: "tc",
      value: "",
    },
    password: "",
    confirmPassword: "",
  });
  const [countryError, setCountryError] = useState<string | undefined>(
    undefined,
  );
  const [verificationError, setVerificationError] = useState<
    string | undefined
  >(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined,
  );

  const steps = [
    { title: "Account Type" },
    { title: "Country" },
    { title: "Verification" },
    { title: "Password" },
  ];

  const validateStep = () => {
    switch (step) {
      case 0:
        return !!formData.accountType;
      case 1:
        if (!formData.country) {
          setCountryError("Please select a country");
          return false;
        }
        setCountryError(undefined);
        return true;
      case 2:
        if (!formData.verification.value) {
          setVerificationError("Please enter your verification information");
          return false;
        }
        setVerificationError(undefined);
        return true;
      case 3:
        if (
          !formData.password ||
          formData.password !== formData.confirmPassword ||
          formData.password.length < 8
        ) {
          setPasswordError(
            formData.password !== formData.confirmPassword
              ? "Passwords don't match"
              : formData.password && formData.password.length < 8
                ? "Password must be at least 8 characters"
                : "Please enter a valid password",
          );
          return false;
        }
        setPasswordError(undefined);
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step === steps.length - 1) {
        // Handle form submission
        console.log("Form submitted:", formData);
        // Redirect to home page but there is no such transaction for now
        return;
      }
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="mx-auto mt-20 max-w-3xl">
      <div className="mb-16 flex items-center justify-between">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className={`flex items-center ${i < steps.length - 1 ? "flex-1" : ""}`}
          >
            <div
              className={`flex items-center justify-center font-medium ${
                i <= step ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {s.title}
            </div>
            {i < steps.length - 1 && (
              <div
                className={`mx-2 h-px flex-1 ${i < step ? "bg-primary" : "bg-muted"}`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="space-y-8">
        {step === 0 && (
          <AccountTypeStep
            value={formData.accountType}
            onChange={(value) =>
              setFormData({ ...formData, accountType: value })
            }
          />
        )}

        {step === 1 && (
          <CountryStep
            value={formData.country}
            onChange={(value) => {
              setFormData({ ...formData, country: value });
              setCountryError(undefined);
            }}
            error={countryError}
          />
        )}

        {step === 2 && (
          <VerificationStep
            value={formData.verification}
            onChange={(value) => {
              setFormData({ ...formData, verification: value });
              setVerificationError(undefined);
            }}
            error={verificationError}
          />
        )}

        {step === 3 && (
          <PasswordStep
            value={{
              password: formData.password,
              confirmPassword: formData.confirmPassword,
            }}
            onChange={({ password, confirmPassword }) => {
              setFormData({ ...formData, password, confirmPassword });
              setPasswordError(undefined);
            }}
            error={passwordError}
          />
        )}

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 0}
          >
            Previous
          </Button>
          <Button onClick={handleNext}>
            {step === steps.length - 1 ? "Submit" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
