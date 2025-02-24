import {getCategoryApi, getTypeApi} from "@/actions/upwithcrowd/category-project/action";
import BasicsClient from "./client";

export default async function BasicsPage() {
  // Fetch both data in parallel
  const [categoryResponse, typeResponse] = await Promise.all([getCategoryApi(), getTypeApi()]);

  const pageData = {
    category: typeof categoryResponse.data === "string" ? null : categoryResponse.data,
    type: typeof typeResponse.data === "string" ? null : typeResponse.data,
  };

  return (
    <div>
      <BasicsClient data={pageData} />
    </div>
  );
}
