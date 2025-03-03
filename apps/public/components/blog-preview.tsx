import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    title: "Başarılı Kitle Fonlaması için 10 İpucu",
    image: "/placeholder.svg",
    excerpt:
      "Başarılı bir kitle fonlama kampanyası yürütmenin ve fikirlerinizi hayata geçirmenin sırlarını öğrenin. Uzmanlardan içgörüler edinin ve kampanyanızın potansiyelini en üst düzeye çıkarın.",
    slug: "basarili-kitle-fonlamasi-10-ipucu",
  },
  {
    title: "Kitle Fonlamasının Geleceği",
    image: "/placeholder.svg",
    excerpt: "Kitle fonlaması ve çevrimiçi fon toplama alanını şekillendiren yeni trendleri ve teknolojileri keşfedin.",
    slug: "kitle-fonlamasinin-gelecegi",
  },
  {
    title: "Öne Çıkanlar: Fark Yaratan Yenilikçi Projeler",
    image: "/placeholder.svg",
    excerpt:
      "Dünya çapında topluluklarda olumlu değişim yaratmak için kitle fonlamasını kullanan ilham verici projeleri keşfedin.",
    slug: "fark-yaratan-yenilikci-projeler",
  },
];

export default function BlogPreview() {
  return (
    <section className="bg-muted px-6 py-12 md:py-20">
      <div className="container mx-auto">
        <h2 className="mb-10 text-center text-3xl font-bold">Blog&apos;dan Son Yazılar</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <div
              className="bg-background flex flex-col justify-between overflow-hidden rounded-lg shadow-md"
              key={index}>
              <Image alt={post.title} className="h-48 w-full object-cover" height={200} src={post.image} width={300} />
              <div className="grid grid-rows-[auto_1fr_auto] p-6">
                <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                <Button className="mt-4 self-start">
                  <Link href={`/blog/${post.slug}`}>Devamını Oku</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
