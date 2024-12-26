import { Card, CardContent } from "#/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Project Creator",
    comment:
      "CrowdFund made it easy for me to bring my eco-friendly product to market. The support from the community was incredible!",
    avatar: "/placeholder.svg",
  },
  {
    name: "Michael Lee",
    role: "Backer",
    comment:
      "I love being part of projects that make a difference. CrowdFund connects me with innovative ideas I'm excited to support.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Emily Chen",
    role: "Nonprofit Leader",
    comment:
      "Thanks to CrowdFund, we were able to fund our community outreach program and make a real impact in our local area.",
    avatar: "/placeholder.svg",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-muted px-6 py-12 md:py-20">
      <div className="container mx-auto">
        <h2 className="mb-10 text-center text-3xl font-bold">
          What Our Community Says
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <p className="mb-4">"{testimonial.comment}"</p>
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
          ))}
        </div>
      </div>
    </section>
  );
}
