import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import LandingHero from "@/components/landing-hero";

const faqItems = [
  {
    id: "kitle-fonlamasi",
    question: "Kitle fonlaması nedir?",
    answer:
      "Kitle fonlaması, arkadaşlar, aile, müşteriler ve bireysel yatırımcıların toplu çabasıyla sermaye artırma yöntemidir. Bu yaklaşım, büyük bir birey topluluğunun toplu çabalarından yararlanır - öncelikle sosyal medya ve kitle fonlaması platformları aracılığıyla çevrimiçi olarak - ve daha geniş erişim ve görünürlük için ağlarını kullanır.",
  },
  {
    id: "upwithcrowd-nasil-calisir",
    question: "UPwithCrowd nasıl çalışır?",
    answer:
      "UPwithCrowd, proje yaratıcılarının fikirlerini sergileyebilecekleri ve destekçilerin inandıkları projeleri destekleyebilecekleri bir platform sunar. Yaratıcılar bir fonlama hedefi ve son tarih belirler. Proje fonlama hedefine ulaşırsa, destekçilerin kredi kartlarından kampanya sonunda ücret tahsil edilir. Proje fonlama hedefine ulaşmazsa, kimsenin kartından ücret tahsil edilmez.",
  },
  {
    id: "upwithcrowd-projeleri",
    question: "UPwithCrowd'da hangi tür projeleri fonlayabilirim?",
    answer:
      "UPwithCrowd, teknoloji, sanat, film, müzik, yayıncılık, oyunlar ve daha fazlası dahil olmak üzere farklı kategorilerde çeşitli projeleri destekler. Net bir hedefi olan ve olumlu etki yaratabilecek yenilikçi ve yaratıcı projeleri teşvik ediyoruz.",
  },
  {
    id: "upwithcrowd-proje-baslatma",
    question: "UPwithCrowd'da nasıl proje başlatabilirim?",
    answer:
      "Bir proje başlatmak için önce bir hesap oluşturmanız, ardından 'Proje Başlat' düğmesine tıklamanız gerekir. Projeniz hakkında ayrıntılar vereceğiniz, fonlama hedefinizi belirleyeceğiniz, destekçiler için ödüller oluşturacağınız ve projenizi incelemeye sunacağınız bir süreç boyunca yönlendirileceksiniz.",
  },
  {
    id: "bagis-vergiden-dusurulebilir-mi",
    question: "Bağışım vergiden düşürülebilir mi?",
    answer:
      "Çoğu durumda, UPwithCrowd projelerine yapılan katkılar vergiden düşürülemez. UPwithCrowd bir 501(c)(3) kuruluşu değildir. Bununla birlikte, bazı projeler kar amacı gütmeyen kuruluşlar tarafından yürütülüyor olabilir. Bu durumlarda, katkınızın vergiden düşürülüp düşürülemeyeceğini belirlemek için doğrudan proje yaratıcısıyla iletişime geçmelisiniz.",
  },
  {
    id: "proje-fonlama-hedefi",
    question: "Bir proje fonlama hedefine ulaşmazsa ne olur?",
    answer:
      "Bir proje son tarihe kadar fonlama hedefine ulaşmazsa, destekçilerden para tahsil edilmez ve proje yaratıcısı hiçbir şey almaz. Bu, hem yaratıcıları hem de destekçileri koruyan ya hep ya hiç fonlama modelimizin bir parçasıdır.",
  },
  {
    id: "upwithcrowd-para-kazanma",
    question: "UPwithCrowd nasıl para kazanır?",
    answer:
      "UPwithCrowd, yaratıcılar için toplanan fonlara %5 ücret uygular. Ödeme işlemcimiz ayrıca her taahhüt için %3 + 0,20TL ücret alır. Bu ücretler yalnızca başarıyla fonlanan projeler için geçerlidir.",
  },
];

export default function Page() {
  const title = "Sıkça Sorulan Sorular";
  const description =
    "UPwithCrowd hakkında, nasıl çalıştığı ve nasıl dahil olabileceğiniz konusunda sık sorulan soruların cevaplarını bulun.";

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <LandingHero description={description} title={title} />

        <Accordion className="mx-auto w-full max-w-3xl" collapsible type="single">
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </div>
  );
}
