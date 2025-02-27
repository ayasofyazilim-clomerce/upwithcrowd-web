import {Button} from "@/components/ui/button";
import type {
  GetApiProjectData,
  UpwithCrowd_Projects_FundCollectionType,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {Plus} from "lucide-react";
import Link from "next/link";
import {isRedirectError} from "next/dist/client/components/redirect";
import {structuredError} from "@repo/utils/api";
import ErrorComponent from "@repo/ui/components/error-component";
import {getProjectApi} from "@/actions/upwithcrowd/project/action";
import EmptyProjectsState from "../_components/empty-projects-state";
import ListedProjectCard from "../_components/listed-project-card";
import FilterSelector from "./_components/filter-selector";
import ProjectSearch from "./_components/project-search";
import SortSelector from "./_components/sort-selector";

async function getApiRequests(searchParams: GetApiProjectData) {
  try {
    const requiredRequests = await Promise.all([getProjectApi(searchParams)]);
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
  searchParams,
}: {
  searchParams: {
    sortField?: string;
    sortOrder?: string;
    fundCollectionType?: UpwithCrowd_Projects_FundCollectionType;
    dateFilter?: string;
    search?: string;
  };
}) {
  const getDateFilter = (filter?: string) => {
    const now = new Date();
    switch (filter) {
      case "7d":
        now.setDate(now.getDate() + 7);
        return now.toISOString();
      case "15d":
        now.setDate(now.getDate() + 15);
        return now.toISOString();
      case "30d":
        now.setDate(now.getDate() + 30);
        return now.toISOString();
      case "60d":
        now.setDate(now.getDate() + 60);
        return now.toISOString();
      default:
        return undefined;
    }
  };
  const apiRequests = await getApiRequests({
    maxResultCount: 100,
    sorting:
      searchParams.sortField && searchParams.sortOrder
        ? `${searchParams.sortField} ${searchParams.sortOrder}`
        : undefined,
    fundCollectionType: searchParams.fundCollectionType || undefined,
    projectEndDate: getDateFilter(searchParams.dateFilter),
    projectName: searchParams.search,
  });

  if ("message" in apiRequests) {
    return <ErrorComponent languageData={{SomethingWentWrong: "Something went wrong"}} message={apiRequests.message} />;
  }
  const [projectsResponse] = apiRequests.requiredRequests;

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <ProjectSearch />
            <FilterSelector />
            <SortSelector />
          </div>
          <Link className="w-full sm:w-auto" href="/projects/new">
            <Button className="w-full sm:w-auto" size="sm">
              Create New Project <Plus className="ml-2 h-5 w-5" />
            </Button>
          </Link>
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
