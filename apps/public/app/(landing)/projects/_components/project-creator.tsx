import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
export default function ProjectCreator() {
  return (
    <section className="w-full">
      <div className="container">
        <Card className="flex w-full flex-col items-center border-none bg-transparent shadow-none">
          <CardContent className="px-0">
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
              <div className="mb-4 text-center md:text-left">
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  <h3 className="text-xl font-semibold">John Doe</h3>
                  <Image
                    src={"https://placehold.co/32x32"}
                    alt={"project.creatorName"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
                <p className="text-muted-foreground mb-4">
                  Environmentalist & Inventor
                </p>
                <div className="text-muted-foreground mb-2 flex items-center justify-center text-sm md:justify-start">
                  <MapPin className="mr-2 h-4 w-4" />
                  California, Bay Area
                </div>
                <div className="text-muted-foreground mb-2 flex items-center justify-center text-sm md:justify-start">
                  <Mail className="mr-2 h-4 w-4" />
                  johndoe@example.com
                </div>
                <div className="text-muted-foreground mb-4 flex items-center justify-center text-sm md:justify-start">
                  <Phone className="mr-2 h-4 w-4" />
                  +1 (555) 123-4567
                </div>
                <p className="mb-4 max-w-2xl">
                  John has been working on sustainable water solutions for over
                  a decade. His passion for clean water access drives him to
                  create innovative, eco-friendly technologies. With a
                  background in environmental engineering and years of field
                  experience, John has developed multiple patented water
                  purification systems that are now used in various parts of the
                  world.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
