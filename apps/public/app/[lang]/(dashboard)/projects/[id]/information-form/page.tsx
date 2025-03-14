import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {getApiFileTypeGroupFileTypeGroupRulesetApi} from "@repo/actions/upwithcrowd/file-type-group/actions";
import ErrorComponent from "@repo/ui/components/error-component";
import type {Ruleset} from "@repo/ui/upwithcrowd/file-upload";
import {FileUpload} from "@repo/ui/upwithcrowd/file-upload";
import {structuredError} from "@repo/utils/api";
import {auth} from "@repo/utils/auth/next-auth";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language/core/AccountService";
import TextWithTitle from "../../new/_components/text-with-title";

async function getApiRequests() {
  try {
    const session = await auth();
    const requiredRequests = await Promise.all([
      getApiFileTypeGroupFileTypeGroupRulesetApi({namespace: "ProjectInformationForm"}, session),
    ]);
    const optionalRequests = await Promise.allSettled([]);
    return {requiredRequests, optionalRequests};
  } catch (error) {
    if (!isRedirectError(error)) {
      return structuredError(error);
    }
    throw error;
  }
}

export default async function ImagesPage({
  params,
}: {
  params: {
    id: string;
    lang: string;
  };
}) {
  const {lang} = params;
  const {languageData} = await getResourceData(lang);
  const apiRequests = await getApiRequests();
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }

  const [fileTypeGroupTestResponse] = apiRequests.requiredRequests;

  return (
    <div className="bg-muted min-h-screen w-full">
      <section className="mx-auto w-full max-w-7xl p-4 md:p-8">
        <TextWithTitle
          classNames={{
            container: "mb-8",
            title: "text-3xl font-bold",
            text: "text-lg",
          }}
          text="Projenize ait dökümanları yükleyin."
          title="Proje Dökümanları"
        />
        <Card className="mb-4 w-full border-none shadow-none">
          <CardTitle className="px-6 py-2 text-xl  font-bold">Bilgi Formu</CardTitle>
          <CardContent className="">
            <FileUpload propertyId={params.id} ruleset={fileTypeGroupTestResponse.data as unknown as Ruleset} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
