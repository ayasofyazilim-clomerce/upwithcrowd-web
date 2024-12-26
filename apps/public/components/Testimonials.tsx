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
    <section className="bg-primary/10 px-6 py-12 md:py-32">
      <div className="container mx-auto">
        <h2 className="mb-10 text-center text-4xl font-bold">
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
              <CarouselItem className="basis-1/2 p-8" key={testimonial.name}>
                <Card className="h-full min-h-60 rounded-3xl border-none bg-white/80 shadow-xl">
                  <CardContent className="relative flex h-full flex-col justify-evenly p-6">
                    <div className="mb-4 flex w-max items-center gap-1 rounded-3xl bg-yellow-400 p-2">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="size-4 text-white" />
                      ))}
                    </div>
                    <p className="text-muted-foreground">
                      &quot;{testimonial.comment}&quot;
                    </p>
                    <div className="flex items-center">
                      <Avatar className="mr-4">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-muted-foreground hover:text-primary hover:border-primary/50 size-12 shadow-lg" />
          <CarouselNext className="text-muted-foreground hover:text-primary hover:border-primary/50 size-12 shadow-lg" />
        </Carousel>
      </div>
    </section>
  );
}
