import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language/core/Default";
import {getCategoryApi, getTypeApi} from "@/actions/upwithcrowd/category-project/action";
import BasicsClient from "./client";

async function getApiRequests() {
  try {
    const requiredRequests = await Promise.all([]);
    const optionalRequests = await Promise.allSettled([getCategoryApi()]);
    return {requiredRequests, optionalRequests};
  } catch (error) {
    if (!isRedirectError(error)) {
      return structuredError(error);
    }
    throw error;
  }
}

export default async function BasicsPage({params}: {params: {lang: string}}) {
  const {lang} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests();
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }

  const [categoryResponse] = apiRequests.optionalRequests;
  // Fetch both data in parallel
  const [typeResponse] = await Promise.all([getTypeApi()]);

  const pageData = {
    category: categoryResponse.status === "fulfilled" ? categoryResponse.value.data : null,
    type: typeof typeResponse.data === "string" ? null : typeResponse.data,
  };

  return (
    <div>
      <BasicsClient data={pageData} />
    </div>
  );
}
