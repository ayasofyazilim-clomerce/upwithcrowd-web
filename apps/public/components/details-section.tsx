import Image from "next/image";
import {Clock, Users, Target} from "lucide-react";

export default function DetailsSection() {
  return (
    <section className="px-6 py-12 md:py-20">
      <div className="container mx-auto flex flex-col justify-between md:flex-row md:gap-8 lg:gap-16">
        <div className="grid w-full grid-cols-2 gap-4 lg:gap-8">
          <Image
            alt="Proje detayları"
            className="-translate-y-10 rounded-lg shadow-lg"
            height={525}
            src="https://placehold.co/290x525"
            width={290}
          />
          <Image
            alt="Proje detayları"
            className="rounded-lg shadow-lg"
            height={525}
            src="https://placehold.co/290x525"
            width={290}
          />
        </div>
        <div className="md-text-left space-y-8 text-center md:text-left">
          <h2 className="mt-6 text-2xl font-bold md:mt-0 md:text-5xl">
            Biz Güçlü, Ücretsiz Bağış Toplama Platformuyuz
          </h2>
          <div className="text-muted-foreground space-y-4">
            <p>
              Platformumuz, bağış toplama sürecini kolaylaştırmak ve hızlandırmak için tasarlanmıştır. Herkesin
              katılımını teşvik eden kullanıcı dostu arayüzümüz ile projelerinizi geniş kitlelere ulaştırabilirsiniz.
            </p>
            <p>
              Güçlü altyapımız sayesinde, bağışlarınızı güvenli bir şekilde yönetebilir ve hedeflerinize ulaşmak için
              gerekli desteği alabilirsiniz. Bizimle, bağış toplama artık daha erişilebilir ve etkili.
            </p>
            <p>
              Platformumuz, kullanıcıların projelerini tanıtmalarına ve bağış toplama kampanyalarını yönetmelerine
              olanak tanır. Ayrıca, kampanyalarınızın başarısını artırmak için çeşitli araçlar ve kaynaklar sunuyoruz.
            </p>
          </div>
          <div className="grid gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:flex-row md:items-start">
              <Clock className="text-primary mb-2 h-8 w-8 md:mb-0 md:mr-2" />
              <span>Hızlı Kurulum</span>
            </div>
            <div className="flex flex-col items-center md:flex-row md:items-start">
              <Users className="text-primary mb-2 h-8 w-8 md:mb-0 md:mr-2" />
              <span>Küresel Erişim</span>
            </div>
            <div className="flex flex-col items-center md:flex-row md:items-start">
              <Target className="text-primary mb-2 h-8 w-8 md:mb-0 md:mr-2" />
              <span>Hedef Takibi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
