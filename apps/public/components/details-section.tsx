import Image from "next/image";
import {Clock, Users, Target} from "lucide-react";

export default function DetailsSection() {
  return (
    <section className="px-6 py-12 md:py-20">
      <div className="container mx-auto flex flex-col justify-between md:flex-row md:gap-8 lg:gap-16">
        <div className="grid w-full grid-cols-2 gap-4 lg:gap-8">
          <Image
            alt="Project details"
            className="-translate-y-10 rounded-lg shadow-lg"
            height={525}
            src="https://placehold.co/290x525"
            width={290}
          />
          <Image
            alt="Project details"
            className="rounded-lg shadow-lg"
            height={525}
            src="https://placehold.co/290x525"
            width={290}
          />
        </div>
        <div className="md-text-left space-y-8 text-center md:text-left">
          <h2 className="mt-6 text-2xl font-bold md:mt-0 md:text-5xl">
            We are the Powerful, Free Fundraising Platform
          </h2>
          <div className="text-muted-foreground space-y-4">
            <p>
              Amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim,
              metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas
              eget condimentum velit, sit amet feugiat risus sem sollicitudin lectus.
            </p>
            <p>
              Consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget
              condimentum.
            </p>
          </div>
          <div className="grid gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:flex-row md:items-start">
              <Clock className="text-primary mb-2 h-8 w-8 md:mb-0 md:mr-2" />
              <span>Quick Setup</span>
            </div>
            <div className="flex flex-col items-center md:flex-row md:items-start">
              <Users className="text-primary mb-2 h-8 w-8 md:mb-0 md:mr-2" />
              <span>Global Reach</span>
            </div>
            <div className="flex flex-col items-center md:flex-row md:items-start">
              <Target className="text-primary mb-2 h-8 w-8 md:mb-0 md:mr-2" />
              <span>Goal Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
