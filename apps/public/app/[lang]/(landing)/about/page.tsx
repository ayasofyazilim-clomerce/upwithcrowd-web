import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Heart, Lightbulb, Target, Users} from "lucide-react";
import Image from "next/image";
import BlogPreview from "@/components/blog-preview";
import CallToAction from "@/components/call-to-action";
import ExpertTeam from "@/components/expert-team";
import LandingHero from "@/components/landing-hero";
import Testimonials from "@/components/testimoni";

const goals = [
  {
    icon: Lightbulb,
    title: "İnovasyonu Teşvik Et",
    description:
      "Yaratıcı zihinlerin çığır açan fikirlerini sergileyebilecekleri ve gerçeğe dönüştürebilecekleri bir platform sunuyoruz.",
  },
  {
    icon: Users,
    title: "Topluluk Oluştur",
    description:
      "Platformumuz, yaratıcılar ile destekçiler arasında bağlantılar kurarak, yenilikçilerden oluşan destekleyici bir topluluk oluşturuyor.",
  },
  {
    icon: Target,
    title: "Etki Yarat",
    description: "Dünya çapında toplumlar üzerinde gerçek bir fark yaratan projeleri fonlamayı hedefliyoruz.",
  },
  {
    icon: Heart,
    title: "Yaratıcıları Güçlendir",
    description:
      "Topluluk desteğinin gücüyle yenilikçileri ve değişim yaratanları fikirlerini hayata geçirmeleri için güçlendiriyoruz.",
  },
];

const title = "UPwithCrowd Hakkında";
const description =
  "Topluluk desteğinin gücüyle yenilikçileri ve değişim yaratanları fikirlerini hayata geçirmeleri için güçlendiriyoruz.";

export default function Page() {
  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <LandingHero description={description} title={title} />
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {goals.map((goal, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <goal.icon className="text-primary mx-auto mb-4 h-12 w-12" />
                <h3 className="mb-2 text-xl font-semibold">{goal.title}</h3>
                <p className="text-muted-foreground">{goal.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-16 flex flex-col items-center gap-8 lg:flex-row">
          <div className="lg:w-1/2">
            <Image
              alt="UPwithCrowd çalışırken"
              className="rounded-lg shadow-lg"
              height={400}
              src="https://placehold.co/1080x1080"
              width={600}
            />
          </div>
          <div className="text-center md:text-left lg:w-1/2">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">Misyonumuza Katılın</h2>
            <p className="mb-6 text-lg">
              UPwithCrowd olarak, yenilikçi fikirleri hayata geçirmek için kolektif desteğin gücüne inanıyoruz. İster
              çığır açan bir projeye sahip bir yaratıcı, ister gelecekteki büyük bir şeyi desteklemek isteyen bir
              destekçi olun, doğru yerdesiniz. Geleceği şekillendirmek için bize katılın, bir proje bir adım.
            </p>
            <Button size="lg">Projenizi Başlatın</Button>
          </div>
        </div>

        <ExpertTeam />
        <Testimonials />
        <BlogPreview />
        <div className="mt-16 rounded-lg">
          <CallToAction />
        </div>
      </main>
    </div>
  );
}
