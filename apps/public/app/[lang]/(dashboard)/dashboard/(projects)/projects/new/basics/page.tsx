import {getCategoryApi, getTypeApi} from "@repo/actions/upwithcrowd/category-project/action";
import {getSectorApi} from "@repo/actions/upwithcrowd/sector/actions";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language/core/Default";
import BasicsClient from "./client";

async function getApiRequests() {
  try {
    const requiredRequests = await Promise.all([]);
    const optionalRequests = await Promise.allSettled([getCategoryApi(), getTypeApi(), getSectorApi()]);
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

  const [categoryResponse, typeResponse, sectorResponse] = apiRequests.optionalRequests;

  const pageData = {
    category: categoryResponse.status === "fulfilled" ? categoryResponse.value.data : null,
    type: typeResponse.status === "fulfilled" ? typeResponse.value.data : null,
    sector: sectorResponse.status === "fulfilled" ? sectorResponse.value.data : null,
  };

  return (
    <div>
      <BasicsClient data={pageData} />
    </div>
  );
}
