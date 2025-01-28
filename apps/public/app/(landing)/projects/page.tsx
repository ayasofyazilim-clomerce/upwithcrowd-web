import { getPublicProjectsApi } from "@/actions/upwithcrowd/public-project/actions";
import ListedProjectCard from "./_components/listed-project-card";
import LandingHero from "@/components/landing-hero";

export default async function Page() {
  const title = "Discover Innovative Projects";
  const description =
    "Explore a world of creativity and innovation. Support projects that are shaping the future and making a difference in communities around the globe.";
  const projectsResponse = await getPublicProjectsApi({
    maxResultCount: 100,
  });
  if (projectsResponse.type !== "success") return <>yok</>;
  const projects = projectsResponse.data.items || [];
  return (
    <div className="bg-background min-h-screen">
      <section className="px-6 py-12 md:py-20">
        <div className="container mx-auto">
          <LandingHero title={title} description={description} />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <ListedProjectCard
                key={project.id}
                project={{
                  id: project.id,
                  projectName: project.projectName,
                  projectEndDate:
                    project.projectEndDate || new Date().toISOString(), // Add default value
                  fundableAmount: project.fundableAmount,
                  fundNominalAmount: project.fundNominalAmount,
                  fundCollectionType:
                    project.fundCollectionType?.toString() || "",
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
