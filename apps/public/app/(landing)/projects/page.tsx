import type { UpwithCrowd_Projects_FundCollectionType } from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import { getPublicProjectsApi } from "@/actions/upwithcrowd/public-project/actions";
import LandingHero from "@/components/landing-hero";
import FilterSelector from "./_components/filter-selector";
import ListedProjectCard from "./_components/listed-project-card";
import SearchBar from "./_components/search-bar";
import SortSelector from "./_components/sort-selector";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    sortField?: string;
    sortOrder?: string;
    fundCollectionType?: UpwithCrowd_Projects_FundCollectionType;
    dateFilter?: string;
    search?: string;
    page?: string;
  };
}) {
  const title = "Discover Innovative Projects";
  const description =
    "Explore a world of creativity and innovation. Support projects that are shaping the future and making a difference in communities around the globe.";
 

  const currentPage = Number(searchParams.page) || 1;
  const itemsPerPage = 12;

  const projectsResponse = await getPublicProjectsApi({
    maxResultCount: itemsPerPage,
    skipCount: (currentPage - 1) * itemsPerPage,
    sorting:
      searchParams.sortField && searchParams.sortOrder
  });

  if (projectsResponse.type !== "success") return <>yok</>;
  const projects = projectsResponse.data.items || [];

  return (
    <div className="bg-background min-h-screen">
      <section className="px-6 py-12 md:py-20">
        <div className="container mx-auto">
          <LandingHero description={description} title={title} />
          <div className="mb-6 flex items-center justify-between gap-4">
            <SearchBar />
            <div className="flex items-center gap-4">
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
                  projectTypes: project.projectTypes,
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
