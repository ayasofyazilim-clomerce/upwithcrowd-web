import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {PlusCircle, FolderPlus} from "lucide-react";
import Link from "next/link";

export default function EmptyProjectsState() {
  return (
    <Card className="mx-auto w-full">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-primary/10 mb-6 rounded-full p-4">
          <FolderPlus className="text-primary h-12 w-12" />
        </div>

        <h3 className="mb-2 text-2xl font-semibold tracking-tight">Henüz Hiç Projeniz Yok</h3>

        <p className="text-muted-foreground mb-6 max-w-md">
          İlk projenizi oluşturarak UPwithCrowd&apos;un fırsatlarından yararlanmaya başlayın. Hemen yeni bir proje
          oluşturun!
        </p>

        <Button asChild className="gap-2" size="lg">
          <Link href="/projects/new">
            <PlusCircle className="h-5 w-5" />
            Yeni Proje Oluştur
          </Link>
        </Button>

        <div className="text-muted-foreground mt-8 grid gap-4 text-sm">
          <p className="flex items-center justify-center gap-2">
            <span className="bg-primary/50 h-2 w-2 rounded-full" />
            Sınırsız proje oluşturma
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="bg-primary/50 h-2 w-2 rounded-full" />
            Detaylı proje yönetim araçları
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="bg-primary/50 h-2 w-2 rounded-full" />
            7/24 teknik destek
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
