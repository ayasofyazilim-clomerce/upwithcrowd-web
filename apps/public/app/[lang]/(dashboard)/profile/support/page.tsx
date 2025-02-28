import {getTaskApi} from "@/actions/upwithcrowd/tasks/action";
import SupportClient from "./client";

export default async function SupportPage() {
  const response = await getTaskApi();
  return <SupportClient taskResponse={response.data} />;
}
