"use server";

import ProjectCard from "@repo/ui/upwithcrowd/project/project-card";
import { redirect } from "next/navigation";
import { ProjectStatusEnums } from "src/enums/project";
import { getResourceData } from "src/language-data/Projects/projects";
import { getProjectServiceClient } from "src/lib";
import { getBaseLink } from "src/utils";
import ProjectForm from "./form";

export default async function Page({ params }: { params: any }) {
  const { projectId } = params;
  const { languageData } = await getResourceData(params.lang);

  const client = await getProjectServiceClient();
  const { project: projectData } =
    await client.projectPublic.getApiProjectServicePublicProjectsDetailById({
      id: projectId,
    });
  if (!projectData) {
    redirect(`/app/${params.type}/projects`);
  }

  const projectURL = getBaseLink(
    "projects",
    true,
    params.lang,
    true,
    params.type,
  );
  return (
    <div className="flex flex-row gap-3 relative w-full">
      <div className="basis-full">
        <ProjectForm
          languageData={languageData}
          projectData={projectData}
          projectId={projectId}
        />
      </div>
      <div className="basis-2/5 min-w-72">
        <ProjectCard
          ProjectStatusEnums={ProjectStatusEnums}
          languageData={languageData}
          project={projectData}
          projectURL={`${projectURL}/${projectId}`}
        />
      </div>
    </div>
  );
}
