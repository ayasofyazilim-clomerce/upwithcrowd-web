import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Wallet, ArrowRight} from "lucide-react";
import Link from "next/link";

export default function EmptyPaymentsState() {
  return (
    <Card className="mx-auto w-full">
      <CardContent className="flex flex-col items-center justify-center px-4 py-8 text-center sm:px-6 sm:py-12">
        <div className="bg-primary/10 mb-4 rounded-full p-3 sm:mb-6 sm:p-4">
          <Wallet className="text-primary h-8 w-8 sm:h-12 sm:w-12" />
        </div>

        <h3 className="mb-2 text-xl font-semibold tracking-tight sm:text-2xl">Henüz Yatırımınız Yok</h3>

        <p className="text-muted-foreground mb-4 max-w-md text-sm sm:mb-6 sm:text-base">
          UPwithCrowd ile yatırım yolculuğunuza başlayın. İlgi alanlarınıza uygun yenilikçi projeleri keşfedin ve
          fırsatlara yatırım yapın.
        </p>

        <Button asChild className="gap-2" size="lg">
          <Link href="/projects">
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            Projeleri Keşfet
          </Link>
        </Button>

        <div className="text-muted-foreground mt-6 grid gap-3 text-xs sm:mt-8 sm:gap-4 sm:text-sm">
          <p className="flex items-center justify-center gap-2">
            <span className="bg-primary/50 h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2" />
            Çeşitli yatırım fırsatları
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="bg-primary/50 h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2" />
            Güvenli ödeme işlemleri
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="bg-primary/50 h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2" />
            Gerçek zamanlı yatırım takibi
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
