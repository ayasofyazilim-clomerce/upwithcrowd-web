import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  // const projectsResponse = await getMyProjectsApi({
  //   maxResultCount: 100,
  // });
  // if (projectsResponse.type !== "success")
  //   return <>Henüz Proje Oluşturmadınız!</>;
  // const projects =  [];
  return (
    <div className="bg-background min-h-screen">
      <Link
        className="mb-4 flex w-full items-center justify-end px-6"
        href={"/projects/new/basics"}
      >
        <Button size={"sm"}>
          Create New Project <Plus className="ml-2 h-5 w-5" />
        </Button>
      </Link>
      <section className="px-6 pb-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* {projects.map((project) => (
              <ListedProjectCard
                key={project.id}
                project={{
                  ...project,
                  fundCollectionType:
                    project.fundCollectionType?.toString() || "",
                }}
              />
            ))}
            
            This will be updated after backend update
            */}
          </div>
        </div>
      </section>
    </div>
  );
}
