import {Button} from "@/components/ui/button";
import type {
  GetApiProjectData,
  UpwithCrowd_Projects_FundCollectionType,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getCategoryApi} from "@repo/actions/upwithcrowd/category-project/action";
import {getSectorApi} from "@repo/actions/upwithcrowd/sector/actions";
import {getProjectApi} from "@repo/actions/upwithcrowd/project/action";
import {structuredError} from "@repo/utils/api";
import {Plus} from "lucide-react";
import {isRedirectError} from "next/dist/client/components/redirect";
import Link from "next/link";
import EmptyProjectsState from "../_components/empty-projects-state";
import ListedProjectCard from "../_components/listed-project-card";
import FilterSelector from "./_components/filter-selector";
import ProjectSearch from "./_components/project-search";
import SortSelector from "./_components/sort-selector";

async function getApiRequests(searchParams: GetApiProjectData) {
  try {
    const requiredRequests = await Promise.all([getProjectApi(searchParams)]);
    const optionalRequests = await Promise.allSettled([getCategoryApi(), getSectorApi()]);
    return {requiredRequests, optionalRequests};
  } catch (error) {
    if (!isRedirectError(error)) {
      return structuredError(error);
    }
    throw error;
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: {
    sortField?: string;
    sortOrder?: string;
    fundCollectionType?: UpwithCrowd_Projects_FundCollectionType;
    search?: string;
    categoryIds?: string;
    sectorId?: string;
  };
}) {
  const apiRequests = await getApiRequests({
    maxResultCount: 100,
    sorting:
      searchParams.sortField && searchParams.sortOrder
        ? `${searchParams.sortField} ${searchParams.sortOrder}`
        : undefined,
    fundCollectionType: searchParams.fundCollectionType || undefined,
    projectName: searchParams.search,
    categoryIds:
      searchParams.categoryIds && searchParams.categoryIds !== "all" ? [searchParams.categoryIds] : undefined,
    sectorId: searchParams.sectorId && searchParams.sectorId !== "all" ? searchParams.sectorId : undefined,
  });

  if ("message" in apiRequests) {
    return <EmptyProjectsState />;
  }
  const [projectsResponse] = apiRequests.requiredRequests;
  const [categoriesResponse, sectorResponse] = apiRequests.optionalRequests;

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ProjectSearch />

            <FilterSelector
              categories={categoriesResponse.status === "fulfilled" ? categoriesResponse.value.data.items || [] : []}
              sectors={sectorResponse.status === "fulfilled" ? sectorResponse.value.data.items || [] : []}
            />
            <SortSelector />
            <Link className="w-full sm:w-auto md:ml-auto" href="/dashboard/projects/new">
              <Button className="h-full w-full sm:w-auto">
                Yeni Proje Oluştur <Plus className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        <section className="pb-6">
          {projectsResponse.data.items && projectsResponse.data.items.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
              {projectsResponse.data.items.map((project) => (
                <ListedProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyProjectsState />
          )}
        </section>
      </div>
    </div>
  );
}
