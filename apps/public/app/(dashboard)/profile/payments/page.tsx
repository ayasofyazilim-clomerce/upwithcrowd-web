import PaymentsPage from "./client";
import EmptyPaymentsState from "../_components/empty-payments-state";
import {getApiPaymentTransactionApi} from "@/actions/upwithcrowd/payment/action";
import {getProjectApi} from "@/actions/upwithcrowd/project/action";

export default async function Page() {
  const paymentsResponse = await getApiPaymentTransactionApi({
    maxResultCount: 100,
  });

  if (paymentsResponse.type !== "success") return <>{paymentsResponse.message}</>;

  const projectsResponse = await getProjectApi();

  if (projectsResponse.type !== "success") {
    return <>{projectsResponse.message}</>;
  }

  const projects = projectsResponse.data.items || [];

  const payments =
    paymentsResponse.data.items?.map((payment) => {
      const project = projects.find((project) => project.id === payment.projectID);

      return {
        ...payment,
        projectName: project?.projectName || "Unknown Project",
      };
    }) ?? [];

  // Show empty state if there are no payments
  if (payments.length === 0) {
    return <EmptyPaymentsState />;
  }

  return <PaymentsPage payments={payments} />;
}
