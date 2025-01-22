export type AccountType = "personal" | "business";

export interface FormData {
  accountType: AccountType;
  country: string;
  verification: {
    method: "tc" | "edevlet";
    value: string;
  };
  password: string;
  confirmPassword: string;
}
