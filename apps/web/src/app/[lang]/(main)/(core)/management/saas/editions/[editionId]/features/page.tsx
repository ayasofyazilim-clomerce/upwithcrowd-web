"use server";

import {isErrorOnRequest} from "@repo/utils/api";
import {isUnauthorized} from "@repo/utils/policies";
import ErrorComponent from "@repo/ui/components/error-component";
import {getFeaturesApi} from "@repo/actions/core/AdministrationService/actions";
import {getEditionDetailsByIdApi} from "@repo/actions/core/SaasService/actions";
import {getResourceData} from "src/language-data/core/SaasService";
import Form from "./_components/form";

export default async function Page({params}: {params: {lang: string; editionId: string}}) {
  const {lang, editionId} = params;
  const {languageData} = await getResourceData(lang);
  await isUnauthorized({
    requiredPolicies: ["Saas.Editions.ManageFeatures"],
    lang,
  });

  const editionDetailsResponse = await getEditionDetailsByIdApi(editionId);
  if (isErrorOnRequest(editionDetailsResponse, lang, false)) {
    return <ErrorComponent languageData={languageData} message={editionDetailsResponse.message} />;
  }

  const featuresResponse = await getFeaturesApi({
    providerName: "E",
    providerKey: editionId,
  });
  if (isErrorOnRequest(featuresResponse, lang, false)) {
    return <ErrorComponent languageData={languageData} message={featuresResponse.message} />;
  }

  return (
    <>
      <Form featuresData={featuresResponse.data} languageData={languageData} />
      <div className="hidden" id="page-title">
        {`${languageData.Edition} (${editionDetailsResponse.data.displayName})`}
      </div>
      <div className="hidden" id="page-description">
        {languageData["Edition.Features.Description"]}
      </div>
    </>
  );
}
