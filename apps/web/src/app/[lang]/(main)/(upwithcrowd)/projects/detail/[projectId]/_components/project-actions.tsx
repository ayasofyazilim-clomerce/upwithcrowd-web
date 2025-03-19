"use client";
import {Button} from "@/components/ui/button";
import type {UpwithCrowd_Projects_ProjectStatus} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {putProjectStatusByIdApi} from "@repo/actions/upwithcrowd/project/put-action";
import {handlePutResponse} from "@repo/utils/api";
import {ArrowRight} from "lucide-react";
import {useRouter} from "next/navigation";

function ProjectActions({projectId}: {projectId: string}) {
  const router = useRouter();
  function handleOnClick(status: UpwithCrowd_Projects_ProjectStatus) {
    void putProjectStatusByIdApi({
      id: projectId,
      status,
    }).then((response) => {
      handlePutResponse(response, router);
    });
  }
  return (
    <div className="flex flex-1 flex-row gap-3">
      <Button
        className="border-destructive text-destructive hover:text-destructive-foreground hover:bg-destructive h-12 justify-between gap-6 transition-all"
        onClick={() => {
          handleOnClick("Rejected");
        }}
        variant="outline">
        Projeyi reddet <ArrowRight className="h-5 w-5" />
      </Button>
      <Button
        className="border-primary text-primary hover:text-primary-foreground hover:bg-primary h-12 justify-between gap-6 transition-all"
        onClick={() => {
          handleOnClick("Approved");
        }}
        variant="outline">
        Projeyi onayla <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
}

export default ProjectActions;
