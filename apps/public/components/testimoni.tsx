import {Card, CardContent} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Star} from "lucide-react";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Ayşe Yılmaz",
    role: "Proje Sahibi",
    comment:
      "UPwithCrowd sayesinde çevre dostu ürünümü pazara sunmak çok kolay oldu. Topluluktan gelen destek inanılmazdı!",
    avatar: "https://placehold.co/300x300",
  },
  {
    name: "Mehmet Demir",
    role: "Destekçi",
    comment:
      "Fark yaratan projelerin bir parçası olmayı seviyorum. UPwithCrowd, desteklemekten heyecan duyduğum yenilikçi fikirlerle beni buluşturuyor.",
    avatar: "https://placehold.co/300x300",
  },
  {
    name: "Zeynep Kaya",
    role: "STK Lideri",
    comment:
      "UPwithCrowd sayesinde, topluluk destek programımızı finanse edebildik ve bölgemizde gerçek bir etki yaratmayı başardık.",
    avatar: "https://placehold.co/300x300",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-primary/10 px-4 py-8 md:px-6 md:py-12 lg:py-32">
      <div className="container mx-auto">
        <h2 className="mb-6 text-center text-3xl font-bold md:mb-10 md:text-4xl">Topluluk Ne Diyor?</h2>
        <div className="relative">
          <Carousel
            className="mx-auto w-full max-w-6xl"
            opts={{
              loop: true,
              align: "start",
            }}>
            <CarouselContent className="m-0">
              {testimonials.map((testimonial) => (
                <CarouselItem className="basis-full p-2 sm:basis-1/2 sm:p-4 md:p-8" key={testimonial.name}>
                  <Card className="h-full min-h-60 rounded-3xl border-none bg-white/80 shadow-md md:shadow-xl">
                    <CardContent className="relative flex h-full flex-col justify-evenly p-4 md:p-6">
                      <div className="mb-2 flex w-max items-center gap-1 rounded-3xl bg-yellow-400 p-2 md:mb-4">
                        {Array.from({length: 5}).map((_, index) => (
                          <Star className="size-3 text-white md:size-4" key={index} />
                        ))}
                      </div>
                      <p className="text-muted-foreground text-sm md:text-base">&quot;{testimonial.comment}&quot;</p>
                      <div className="mt-4 flex items-center">
                        <Avatar className="mr-3 size-10 md:mr-4 md:size-12">
                          <AvatarImage alt={testimonial.name} src={testimonial.avatar} />
                          <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold md:text-base">{testimonial.name}</p>
                          <p className="text-muted-foreground text-xs md:text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-muted-foreground hover:text-primary hover:border-primary/50 absolute left-0 size-10 -translate-x-1/2 shadow-lg md:size-12" />
            <CarouselNext className="text-muted-foreground hover:text-primary hover:border-primary/50 absolute right-0 size-10 translate-x-1/2 shadow-lg md:size-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
