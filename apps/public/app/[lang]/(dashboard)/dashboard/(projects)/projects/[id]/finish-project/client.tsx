"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Info} from "lucide-react";
import type {UpwithCrowd_Projects_ProjectsDetailResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import type {JSONContent} from "@repo/ayasofyazilim-ui/organisms/tiptap";
import TipTapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import {useParams, useRouter} from "next/navigation";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {handlePutResponse} from "@repo/utils/api";
import {putProjectStatusByIdApi} from "@repo/actions/upwithcrowd/project/put-action";
import FundingTable from "../_components/funding-card";
import ProjectSummary from "../_components/project-summary";
import MobileSupportDrawer from "../_components/mobile-support-card";

export default function ProjectDetails({data}: {data: UpwithCrowd_Projects_ProjectsDetailResponseDto}) {
  const {id: projectId} = useParams<{id: string}>();
  const router = useRouter();
  const [currentImageIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(true);
  const fundedPercentage = 0;

  const previewDonationOptions = [10, 25, 50];
  const previewSelectedAmount = 25;

  const handleFinishProject = () => {
    void putProjectStatusByIdApi({
      id: projectId,
      status: "Pending",
    }).then((response) => {
      handlePutResponse(response, router, `/projects/${projectId}`);
    });
  };

  return (
    <div className="bg-muted w-full overflow-hidden pb-24 md:pb-0">
      <section className="mx-auto w-full max-w-7xl p-4 md:p-8">
        <div className="flex flex-col gap-8 md:gap-20 lg:flex-row">
          <div className="lg:w-3/5">
            <ProjectSummary
              basics={data}
              currentImageIndex={currentImageIndex}
              editLinks={{
                basics: `/projects/${projectId}/basics/?type=project`,
                content: `/projects/${projectId}/basics/?type=project`,
              }}
              fundedPercentage={fundedPercentage}
              funding={data}
            />

            <TipTapEditor
              canEditable={false}
              editorClassName="mt-8"
              editorContent={data.projectContent ? (JSON.parse(data.projectContent) as JSONContent) : {}}
              mode="preview"
            />
          </div>
          <div className="lg:w-1/3">
            <MobileSupportDrawer donationOptions={previewDonationOptions} selectedDonation={previewSelectedAmount} />
            <FundingTable data={data} editLink={`/projects/${projectId}/funding`} />
            <div className="mt-6">
              {data.privilege ? (
                <div className="mb-8">
                  <div className="flex items-start gap-2">
                    <h2 className="mb-2 text-xl font-bold md:text-2xl">Ayrıcalıklar</h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="h-4 w-4"
                          onClick={() => {
                            router.push(`/projects/${projectId}/funding`);
                          }}
                          size="icon"
                          variant="ghost">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Bu bölümü düzenlemek için tıklayın</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p>{data.privilege}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Modal */}
      <Dialog onOpenChange={setWelcomeModalOpen} open={welcomeModalOpen}>
        <DialogContent className="w-[90%] max-w-[90%] p-4 sm:max-w-[500px] sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl">Proje Önizleme Sayfasına Hoş Geldiniz!</DialogTitle>
            <DialogDescription className="space-y-3 pt-4 text-sm sm:text-base">
              <p>
                Bu sayfa, projenizin lansman öncesi önizlemesini göstermektedir. Burada daha önceki adımlarda girdiğiniz
                tüm bilgileri bir arada görebilirsiniz.
              </p>
              <p>
                Önizleme sayfasında: - Proje detaylarınızı - Görsellerinizi - İçerik düzeninizi - Destek paketlerinizi -
                Finansman hedeflerinizi görebilir ve son kontrollerinizi yapabilirsiniz.
              </p>
              <p>
                Her şey istediğiniz gibi görünüyorsa, sayfanın sağ alt köşesindeki &quot;Projeyi Tamamla&quot; butonunu
                kullanarak projenizi lansmana gönderebilirsiniz.
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setWelcomeModalOpen(false);
              }}>
              Anladım
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Fixed bottom-right link component */}
      <div className="fixed bottom-16 left-4 right-4 z-40 ">
        <Button
          className="w-full rounded-lg md:w-auto md:rounded-full"
          onClick={() => {
            setDialogOpen(true);
          }}
          size="lg">
          Projeyi Tamamla
        </Button>
      </div>

      <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
        <DialogContent className="w-[90%] max-w-[90%] p-4 sm:max-w-[425px] sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl">Projeyi Tamamla</DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Projeyi tamamlamak istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setDialogOpen(false);
              }}
              variant="outline">
              İptal
            </Button>
            <Button onClick={handleFinishProject}>Devam Et</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
