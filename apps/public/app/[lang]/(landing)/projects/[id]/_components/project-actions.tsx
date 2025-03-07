"use client";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ConfirmationDialog} from "@repo/ayasofyazilim-ui/molecules/confirmation-dialog";
import {handlePutResponse} from "@repo/utils/api";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {putProjectStatusByIdApi} from "@/actions/upwithcrowd/project/put-action";

function ProjectActions({projectId}: {projectId: string}) {
  const router = useRouter();
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold md:text-2xl">Proje Aksiyonları</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row flex-wrap gap-4">
          <Link href={`/projects/${projectId}/basics`}>
            <Button className="w-full rounded-md md:w-auto md:rounded-full" size="lg" type="button">
              Projeyi Düzenle
            </Button>
          </Link>
          <ConfirmationDialog
            cancelText="Vazgeç"
            confirmText="Sil"
            description="Bu işlem geri alınamaz. Devam etmek istediğinize emin misiniz?"
            onConfirm={async () => {
              const response = await putProjectStatusByIdApi({id: projectId, status: "Cancelled"});
              handlePutResponse(response, router);
            }}
            title="Projeyi Sil"
            type="danger">
            <Button
              className="w-full rounded-md md:w-auto md:rounded-full"
              size="lg"
              type="button"
              variant="destructive">
              Projeyi Sil
            </Button>
          </ConfirmationDialog>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectActions;
