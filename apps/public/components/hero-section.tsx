import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import UPWC from "@public/upwc.png";
import Banner from "@public/banner.png";

export default function HeroSection() {
  return (
    <section
      className="relative h-[calc(100dvh-6rem)] px-6 py-12 md:py-20"
      style={{
        backgroundImage: `url('${Banner.src}')`,
        backgroundSize: "100%",
        backgroundPosition: "center",
      }}>
      <div className="container relative z-10 mx-auto flex flex-col items-center justify-between md:h-full md:flex-row">
        <div className="mb-8 max-w-2xl text-center md:mb-0 md:text-left">
          <h1 className="mb-4 text-3xl font-bold md:text-6xl">Projelerinizi hayata geçirmek için kitlesel fonlama</h1>
          <p className="text-muted-foreground text-md mb-6 tracking-wide md:text-lg">
            Yaratıcı fikirlere ve yenilikçi projelere finansman sağlamak için güvenilir bir platform sunuyoruz. Kitlesel
            fonlama sayesinde projelerinizi geniş kitlelere ulaştırarak hayallerinizi gerçeğe dönüştürebilirsiniz.
          </p>
          <Link href="/projects">
            <Button size="lg">Projeleri Keşfet</Button>
          </Link>
        </div>
        <div
          className="ring-primary/30 relative flex aspect-square
         w-full max-w-lg items-center justify-center rounded-[25px] rounded-tl-[100px] bg-white ring-4">
          <Image alt="Crowdfunding illustration" className="object-cover" height={400} src={UPWC.src} width={400} />
        </div>
      </div>
    </section>
  );
}
