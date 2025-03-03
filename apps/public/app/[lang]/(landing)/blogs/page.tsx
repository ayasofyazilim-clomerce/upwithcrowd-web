import Link from "next/link";
import Image from "next/image";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import LandingHero from "@/components/landing-hero";
import {getBaseLink} from "@/utils/lib";

// Mock data for blog posts
const blogPosts = [
  {
    slug: "basarili-kitlesel-fonlama-icin-10-ipucu",
    title: "Başarılı Kitlesel Fonlama için 10 İpucu",
    excerpt:
      "Başarılı bir kitlesel fonlama kampanyası yürütmenin ve fikirlerinizi hayata geçirmenin sırlarını öğrenin.",
    image: "/placeholder.svg",
    date: "2023-06-01",
    category: "Kitlesel Fonlama",
    readTime: "5 dk okuma",
  },
  {
    slug: "kitlesel-fonlamanin-gelecegi",
    title: "Kitlesel Fonlamanın Geleceği",
    excerpt:
      "Kitlesel fonlama ve çevrimiçi bağış toplama yöntemlerinin geleceğini şekillendiren yeni trendleri ve teknolojileri keşfedin.",
    image: "/placeholder.svg",
    date: "2023-05-15",
    category: "Sektör Analizi",
    readTime: "7 dk okuma",
  },
  {
    slug: "yenilikci-projeler",
    title: "Öne Çıkan: Fark Yaratan Yenilikçi Projeler",
    excerpt:
      "Dünya çapında toplumsal değişim yaratmak için kitlesel fonlamayı kullanan ilham verici projeleri keşfedin.",
    image: "/placeholder.svg",
    date: "2023-05-01",
    category: "Proje Vitrini",
    readTime: "6 dk okuma",
  },
  {
    slug: "kar-amaci-gutmeyen-kuruluslar-icin-kitlesel-fonlama",
    title: "Kar Amacı Gütmeyen Kuruluşlar için Kitlesel Fonlama Rehberi",
    excerpt:
      "Kar amacı gütmeyen kuruluşların amaçlarını desteklemek ve etkilerini artırmak için kitlesel fonlamayı nasıl etkili kullanabileceklerini öğrenin.",
    image: "/placeholder.svg",
    date: "2023-04-20",
    category: "STK",
    readTime: "8 dk okuma",
  },
  {
    slug: "projeniz-etrafinda-topluluk-olusturmak",
    title: "Kitlesel Fonlama Projeniz Etrafında Topluluk Oluşturmak",
    excerpt:
      "Destekçilerinizle etkileşim kurmanın ve kitlesel fonlama kampanyanız etrafında kalıcı bir topluluk oluşturmanın stratejilerini keşfedin.",
    image: "/placeholder.svg",
    date: "2023-04-10",
    category: "Topluluk",
    readTime: "6 dk okuma",
  },
  {
    slug: "kitlesel-fonlama-hukuki-hususlar",
    title: "Kitlesel Fonlama Kampanyaları için Hukuki Hususlar",
    excerpt:
      "Kitlesel fonlamanın yasal düzenlemeler ve en iyi uygulamalar konusundaki kapsamlı rehberiyle hukuki boyutunu öğrenin.",
    image: "/placeholder.svg",
    date: "2023-03-25",
    category: "Hukuk",
    readTime: "7 dk okuma",
  },
];

export default function Page({params}: {params: {lang: string}}) {
  const {lang} = params;
  const title = "UPwithCrowd Blog";
  const description = "Kitlesel fonlama dünyasından içgörüler, ipuçları ve hikayeler";
  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <LandingHero description={description} title={title} />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link href={getBaseLink(`blogs/${post.slug}`, lang)} key={post.slug}>
              <Card className="h-full transition-shadow duration-300 hover:shadow-lg">
                <Image
                  alt={post.title}
                  className="h-48 w-full rounded-t-lg object-cover"
                  height={200}
                  src={post.image}
                  width={300}
                />
                <CardContent className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <Badge>{post.category}</Badge>
                    <span className="text-muted-foreground text-sm">{post.readTime}</span>
                  </div>
                  <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <p className="text-muted-foreground text-sm">{new Date(post.date).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
