"use client";
import {putProjectStatusByIdApi} from "@repo/actions/upwithcrowd/project/put-action";
import {Button} from "@repo/ayasofyazilim-ui/atoms/button";
import {Card, CardContent, CardHeader, CardTitle} from "@repo/ayasofyazilim-ui/atoms/card";
import {ConfirmationDialog} from "@repo/ayasofyazilim-ui/molecules/confirmation-dialog";
import {handlePutResponse} from "@repo/utils/api";
import {useRouter} from "next/navigation";

function ProjectActions({projectId}: {projectId: string}) {
  const router = useRouter();

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold md:text-2xl">Proje Aksiyonları</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row flex-wrap gap-4">
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
          <ConfirmationDialog
            cancelText="Vazgeç"
            confirmText="Gönder"
            description="Bu işlem geri alınamaz. Devam etmek istediğinize emin misiniz?"
            onConfirm={async () => {
              const response = await putProjectStatusByIdApi({
                id: projectId,
                status: "Pending",
              });
              handlePutResponse(response, router);
            }}
            title="Projeyi Onaya Gönder"
            type="danger">
            <Button className="w-full rounded-md md:w-auto md:rounded-full" size="lg" type="button" variant="default">
              Projeyi Onaya Gönder
            </Button>
          </ConfirmationDialog>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectActions;
