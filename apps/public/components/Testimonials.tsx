import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Project Creator",
    comment:
      "UPwithCrowd made it easy for me to bring my eco-friendly product to market. The support from the community was incredible!",
    avatar: "/placeholder.svg",
  },
  {
    name: "Michael Lee",
    role: "Backer",
    comment:
      "I love being part of projects that make a difference. UPwithCrowd connects me with innovative ideas I'm excited to support.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Emily Chen",
    role: "Nonprofit Leader",
    comment:
      "Thanks to UPwithCrowd, we were able to fund our community outreach program and make a real impact in our local area.",
    avatar: "/placeholder.svg",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-primary/10 rounded-t-lg px-4 py-8 md:px-6 md:py-12 lg:py-32">
      <div className="container mx-auto">
        <h2 className="mb-6 text-center text-3xl font-bold md:mb-10 md:text-4xl">
          What Our Community Says
        </h2>
        <Carousel
          className="mx-auto w-full max-w-6xl"
          opts={{
            loop: true,
            align: "start",
          }}
        >
          <CarouselContent className="m-0">
            {testimonials.map((testimonial) => (
              <CarouselItem
                className="basis-full p-2 sm:basis-1/2 sm:p-4 md:p-8"
                key={testimonial.name}
              >
                <Card className="h-full min-h-60 rounded-3xl border-none bg-white/80 shadow-xl">
                  <CardContent className="relative flex h-full flex-col justify-evenly p-4 md:p-6">
                    <div className="mb-2 flex w-max items-center gap-1 rounded-3xl bg-yellow-400 p-2 md:mb-4">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className="size-3 text-white md:size-4"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm md:text-base">
                      &quot;{testimonial.comment}&quot;
                    </p>
                    <div className="mt-4 flex items-center">
                      <Avatar className="mr-3 size-10 md:mr-4 md:size-12">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold md:text-base">
                          {testimonial.name}
                        </p>
                        <p className="text-muted-foreground text-xs md:text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-muted-foreground hover:text-primary hover:border-primary/50 size-10 shadow-lg md:size-12" />
          <CarouselNext className="text-muted-foreground hover:text-primary hover:border-primary/50 size-10 shadow-lg md:size-12" />
        </Carousel>
      </div>
    </section>
  );
}
