"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ChevronRight, Rocket, Coins, BookOpen, Users, Layout, CreditCard} from "lucide-react";
import Link from "next/link";
import {useState} from "react";

export default function ProjectOnboarding() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const steps = [
    {
      id: "basics",
      icon: <Rocket className="h-6 w-6" />,
      title: "Temel Bilgiler",
      description: "Proje temelleri",
      content: "Projenizin başlığı, kategorisi, ekibi, konumu ve zaman çizelgesi gibi temel bilgilerini tanımlayın.",
      tips: [
        "Net ve kısa bir proje başlığı seçin",
        "Uygun proje kategorilerini belirleyin",
        "Proje konumunu ve süresini ayarlayın",
        "Proje kapsamını tanımlayın",
      ],
    },
    {
      id: "about",
      icon: <BookOpen className="h-6 w-6" />,
      title: "Hakkımızda",
      description: "Ekip ve geçmiş",
      content: "Hikayenizi anlatın ve ekibinizi potansiyel destekçilere tanıtın.",
      tips: [
        "Ekip üyelerini tanıtın",
        "Deneyiminizi paylaşın",
        "Başarılarınızı vurgulayın",
        "Motivasyonunuzu açıklayın",
      ],
    },
    {
      id: "funding",
      icon: <Coins className="h-6 w-6" />,
      title: "Finansman Detayları",
      description: "Finansal kurulum",
      content: "Projeniz için finansman hedeflerini, zaman çizelgesini ve gereksinimleri yapılandırın.",
      tips: [
        "Finansman hedefini belirleyin",
        "Finansman süresini tanımlayın",
        "Minimum katkı miktarını belirleyin",
        "Ödül kademelerini planlayın",
      ],
    },
    {
      id: "documents",
      icon: <Layout className="h-6 w-6" />,
      title: "Belgeler",
      description: "Proje belgeleri",
      content: "Proje teklifinizi destekleyecek gerekli belgeleri yükleyin.",
      tips: [
        "İş planını ekleyin",
        "Teknik belgeleri ekleyin",
        "Yasal belgeleri sağlayın",
        "Proje zaman çizelgesini paylaşın",
      ],
    },
    {
      id: "images",
      icon: <Layout className="h-6 w-6" />,
      title: "Görseller",
      description: "Görsel içerik",
      content: "Projenizi sergilemek için etkileyici görseller ekleyin.",
      tips: [
        "Yüksek kaliteli görseller yükleyin",
        "Proje maketlerini ekleyin",
        "Ekip fotoğrafları ekleyin",
        "Proje ilerlemesini gösterin",
      ],
    },
    {
      id: "faq",
      icon: <Users className="h-6 w-6" />,
      title: "SSS",
      description: "Sık sorulan sorular",
      content: "Destekçilerden gelebilecek potansiyel soruları yanıtlayın.",
      tips: ["Yaygın soruları yanıtlayın", "Proje risklerini açıklayın", "Endişeleri giderin", "Net bilgiler sağlayın"],
    },
    {
      id: "terms",
      icon: <CreditCard className="h-6 w-6" />,
      title: "Şartlar ve Koşullar",
      description: "Yasal gereklilikler",
      content: "Proje şartlarını ve koşullarını gözden geçirin ve kabul edin.",
      tips: [
        "Şartları dikkatlice okuyun",
        "Yükümlülükleri anlayın",
        "Koşulları kabul edin",
        "Yasal gereklilikleri inceleyin",
      ],
    },
    {
      id: "finish",
      icon: <Rocket className="h-6 w-6" />,
      title: "Projeyi Tamamla",
      description: "Son gönderim",
      content: "Projenizi gözden geçirin ve onay için gönderin.",
      tips: [
        "Tüm bölümleri gözden geçirin",
        "Gereklilikleri kontrol edin",
        "Bilgileri doğrulayın",
        "İnceleme için gönderin",
      ],
    },
  ];

  return (
    <div className="container mx-auto flex h-auto px-4 md:px-0">
      <section className="mx-auto w-full max-w-7xl p-0 md:p-8">
        <div className="mb-8 max-w-2xl text-left">
          <h1 className="mb-2 text-2xl font-bold md:text-3xl">Projenizi Oluşturmaya Başlayın</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Başarılı bir proje oluşturmanız için size rehberlik edeceğiz. Her adımda önemli noktaları ve ipuçlarını
            bulabilirsiniz.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="from-primary/0 via-primary/50 to-primary/0 absolute bottom-0 left-2 top-0 z-0 w-0.5 bg-gradient-to-b md:left-8" />

          {steps.map((step, index) => (
            <div className="relative mb-8 last:mb-0" key={step.id}>
              {/* Timeline Dot */}
              <div
                className={`border-background absolute left-0 z-10 h-4 w-4 rounded-full border-4 transition-all duration-300 ease-in-out md:left-6 md:h-5 md:w-5
                ${activeStep === step.id ? "bg-primary scale-125" : "bg-muted"}`}
                style={{top: "24px"}}
              />

              <Card
                className="ml-8 transition-all duration-300 ease-in-out hover:shadow-lg md:ml-16"
                onMouseEnter={() => {
                  setActiveStep(step.id);
                }}
                onMouseLeave={() => {
                  setActiveStep(null);
                }}>
                <CardHeader>
                  <div className="flex items-center gap-2 md:gap-4">
                    <div
                      className={`rounded-full p-1.5 md:p-2 ${activeStep === step.id ? "bg-primary text-primary-foreground" : "bg-muted"} transition-colors duration-300`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle className="text-base md:text-lg">{step.title}</CardTitle>
                        <span className="text-muted-foreground text-xs md:text-sm">Step {index + 1}</span>
                      </div>
                      <CardDescription className="text-xs md:text-sm">{step.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm md:text-base">{step.content}</p>
                  <div className="bg-muted rounded-lg p-3 md:p-4">
                    <h4 className="mb-2 text-sm font-medium md:text-base">Önemli İpuçları:</h4>
                    <ul className="space-y-2">
                      {step.tips.map((tip, i) => (
                        <li className="text-muted-foreground flex items-center gap-2 text-xs md:text-sm" key={i}>
                          <div className="bg-primary h-1 w-1 rounded-full" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}

          <div className="mx-auto flex flex-col gap-4 pt-4 md:mx-0 md:ml-16 md:flex-row">
            <Link className="w-full md:w-auto" href="/projects/new/basics/?type=Project">
              <Button className="bg-primary hover:bg-primary/90 w-full gap-2 md:w-auto" size="lg">
                Proje Oluşturmaya Başla
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button className="w-full gap-2 md:w-auto" disabled size="lg" variant="outline">
              Kurumsal Proje Oluştur
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
