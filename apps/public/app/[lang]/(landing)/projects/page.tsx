import type {GetApiPublicProjectProjectListData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getPublicProjectsApi} from "@repo/actions/upwithcrowd/public-project/action";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language/core/Default";
import LandingHero from "@/components/landing-hero";
import FilterSelector from "./_components/filter-selector";
import ListedProjectCard from "./_components/listed-project-card";
import SearchBar from "./_components/search-bar";
import SortSelector from "./_components/sort-selector";
import Pagination from "./_components/pagination";

async function getApiRequests(params: GetApiPublicProjectProjectListData) {
  try {
    const requiredRequests = await Promise.all([getPublicProjectsApi({...params, maxResultCount: 10})]);
    const optionalRequests = await Promise.allSettled([]);
    return {requiredRequests, optionalRequests};
  } catch (error) {
    if (!isRedirectError(error)) {
      return structuredError(error);
    }
    throw error;
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: {lang: string};
  searchParams: GetApiPublicProjectProjectListData;
}) {
  const {lang} = params;
  const title = "Yenilikçi Projeleri Keşfet";
  const description =
    "Yaratıcılık ve inovasyon dünyasını keşfedin. Geleceği şekillendiren ve dünya çapında toplulukları etkileyen projelere destek olun.";
  const {languageData} = await getResourceData(lang);
  const apiRequests = await getApiRequests(searchParams);
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [projectsResponse] = apiRequests.requiredRequests;
  const projects = projectsResponse.data.items || [];
  const totalCount = projectsResponse.data.totalCount || 0;
  return (
    <div className="bg-background min-h-screen">
      <section className="px-4 py-8 md:px-6 md:py-12 lg:py-20">
        <div className="container mx-auto">
          <LandingHero description={description} title={title} />
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SearchBar />
            <div className="flex flex-wrap items-center gap-4">
              <FilterSelector />
              <SortSelector />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <ListedProjectCard
                key={project.id}
                project={{
                  id: project.id,
                  projectName: project.projectName,
                  projectEndDate: project.projectEndDate || new Date().toISOString(),
                  fundableAmount: project.fundableAmount,
                  fundNominalAmount: project.fundNominalAmount,
                  fundCollectionType: project.fundCollectionType?.toString() || "",
                  url: project.filePath || "",
                  totalInvestment: project.totalInvestment || 0,
                }}
              />
            ))}
          </div>
          <Pagination maxResultCount={10} totalCount={totalCount} />
        </div>
      </section>
    </div>
  );
}
