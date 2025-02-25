import type {UpwithCrowd_Projects_FundCollectionType} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getPublicProjectsApi} from "@/actions/upwithcrowd/public-project/actions";
import LandingHero from "@/components/landing-hero";
import FilterSelector from "./_components/filter-selector";
import ListedProjectCard from "./_components/listed-project-card";
import SearchBar from "./_components/search-bar";
import SortSelector from "./_components/sort-selector";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    sorting?: string;
    fundCollectionType?: UpwithCrowd_Projects_FundCollectionType;
    dateFilter?: string;
    projectName?: string;
  };
}) {
  const title = "Discover Innovative Projects";
  const description =
    "Explore a world of creativity and innovation. Support projects that are shaping the future and making a difference in communities around the globe.";

  const reqBody = {};

  Object.keys(searchParams).forEach((key) => {
    if (searchParams[key as keyof typeof searchParams]) {
      Object.assign(reqBody, {[key]: searchParams[key as keyof typeof searchParams]});
    }
  });

  const projectsResponse = await getPublicProjectsApi(reqBody);

  if (projectsResponse.type !== "success") return <>Sonuç bulunamadı.</>;
  const projects = projectsResponse.data.items || [];

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
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
