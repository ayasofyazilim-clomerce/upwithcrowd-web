import {getApiPaymentTransactionApi} from "@/actions/upwithcrowd/payment/action";
import {getPublicProjectsApi} from "@/actions/upwithcrowd/public-project/actions";
import EmptyPaymentsState from "../_components/empty-payments-state";
import PaymentsPage from "./client";

export default async function Page() {
  const paymentsResponse = await getApiPaymentTransactionApi({
    maxResultCount: 100,
  });

  if (paymentsResponse.type !== "success") return <>{paymentsResponse.message}</>;

  const projectsResponse = await getPublicProjectsApi();

  if (projectsResponse.type !== "success") {
    return <>{projectsResponse.message}</>;
  }

  const projects = projectsResponse.data.items || [];

  const payments =
    paymentsResponse.data.items?.map((payment) => {
      const project = projects.find((projectItem) => projectItem.id === payment.projectID);

      return {
        ...payment,
        projectName: project?.projectName || "Unknown Project",
      };
    }) ?? [];

  // Show empty state if there are no payments
  if (payments.length === 0) {
    return <EmptyPaymentsState />;
  }

  // Get the first project ID or use a default
  const firstProjectID = projects[0]?.id || "";
  // Set a default amount (you may want to calculate this based on your requirements)
  const defaultAmount = 0;

  return <PaymentsPage amount={defaultAmount} payments={payments} projectID={firstProjectID} />;
}
