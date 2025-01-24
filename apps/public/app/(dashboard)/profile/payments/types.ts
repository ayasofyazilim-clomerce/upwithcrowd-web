import { UpwithCrowd_Payment_ListPaymentTransactionDto } from "@ayasofyazilim/upwithcrowd-saas/UPWCService";

export type Payment = {
  projectName: string;
} & UpwithCrowd_Payment_ListPaymentTransactionDto;
