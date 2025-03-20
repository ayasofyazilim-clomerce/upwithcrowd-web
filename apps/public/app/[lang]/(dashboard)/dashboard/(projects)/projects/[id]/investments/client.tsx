"use client";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import type {
  PagedResultDto_ListProjectInvestorDto,
  UpwithCrowd_Projects_ProjectStatisticsDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {formatCurrency} from "@repo/ui/utils";
import {Award, Banknote, Goal, PieChart, Users} from "lucide-react";
import Link from "next/link";
import {useParams} from "next/navigation";
import {getBaseLink} from "@/utils/lib";
import {Section} from "../../new/_components/section";
import TextWithTitle from "../../new/_components/text-with-title";
import ProjectInvestorTable from "../_components/table";

interface ProjectInvestorProps {
  investorResponse: PagedResultDto_ListProjectInvestorDto;
  statsResponse: UpwithCrowd_Projects_ProjectStatisticsDto;
}

export default function ProjectInvestorClient({investorResponse, statsResponse}: ProjectInvestorProps) {
  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  };
  const params = useParams();
  const {lang, id} = params;

  // id ve lang değişkenlerinin string olmasını garanti altına alıyoruz
  const safeLang = Array.isArray(lang) ? lang[0] : lang;
  const safeId = Array.isArray(id) ? id[0] : id;

  const baseLink = getBaseLink("dashboard", safeLang);

  return (
    <div className="bg-muted w-full overflow-auto p-8">
      <TextWithTitle
        classNames={{
          container: "mb-4 sm:mb-8",
          title: "text-2xl sm:text-3xl",
          text: "text-base sm:text-lg",
        }}
        text="Projenize yapılan yatırımlar hakkında her bilgiye buradan ulaşabilirsiniz."
        title="Yatırımlar"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="relative pt-6 text-center">
            <div className="bg-primary/10 absolute -left-4 -top-4 rounded-full p-2">
              <Banknote className="text-primary h-6 w-6" />
            </div>
            <div className="text-muted-foreground text-sm font-medium">Toplam Yatırım</div>
            <div className="mt-2 text-2xl font-bold">{formatCurrency(statsResponse.totalInvestment)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="relative pt-6 text-center">
            <div className="bg-primary/10 absolute -left-4 -top-4 rounded-full p-2">
              <Users className="text-primary h-6 w-6" />
            </div>
            <div className="text-muted-foreground text-sm font-medium">Toplam Yatırımcı</div>
            <div className="mt-2 text-2xl font-bold">{statsResponse.investorCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="relative pt-6 text-center">
            <div className="bg-primary/10 absolute -left-4 -top-4 rounded-full p-2">
              <Award className="text-primary h-6 w-6" />
            </div>
            <div className="text-muted-foreground text-sm font-medium">Nitelikli Yatırımcı</div>
            <div className="mt-2 text-2xl font-bold">{statsResponse.qualifiedInvestorCount}</div>
            <div className="text-muted-foreground pt-4 text-xs">
              Toplam yatırımcıların{" "}
              {formatPercentage((statsResponse.qualifiedInvestmentRate ?? 0) / (statsResponse.investorCount || 1))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="relative pt-6 text-center">
            <div className="bg-primary/10 absolute -left-4 -top-4 rounded-full p-2">
              <PieChart className="text-primary h-6 w-6" />
            </div>
            <div className="text-muted-foreground text-sm font-medium">Nitelikli Yatırım Oranı</div>
            <div className="mt-2 text-2xl font-bold">
              {formatPercentage(statsResponse.qualifiedInvestmentRate ?? 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="relative pt-6 text-center">
            <div className="bg-primary/10 absolute -left-4 -top-4 rounded-full p-2">
              <Goal className="text-primary h-6 w-6" />
            </div>
            <div className="text-muted-foreground text-sm font-medium">Yatırım Tamamlanma</div>
            <div className="mt-2 text-2xl font-bold">{formatPercentage((statsResponse.investmentRate ?? 0) / 100)}</div>
            <div className="bg-secondary mt-2 h-2 w-full rounded-full">
              <div
                className="bg-primary h-2 rounded-full"
                style={{width: `${Math.min(statsResponse.investmentRate ?? 0, 100)}%`}}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Section
        className="md:grid-cols-1"
        text="Projenize yatırım yapan yatırımcıların bilgilerini görüntüleyin."
        title="Proje Yatırımcıları">
        <ProjectInvestorTable investorResponse={investorResponse} />
      </Section>
      <Link className="w-full" href={`${baseLink}/projects/${safeId}/finish-project`}>
        <Button className="w-full">Devam Et</Button>
      </Link>
    </div>
  );
}
