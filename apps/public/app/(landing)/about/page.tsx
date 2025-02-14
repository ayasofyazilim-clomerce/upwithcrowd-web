import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Lightbulb, Users, Target, Heart} from "lucide-react";
import ExpertTeam from "@/components/expert-team";
import Testimonials from "@/components/testimonials";
import BlogPreview from "@/components/blog-preview";
import CallToAction from "@/components/call-to-action";
import LandingHero from "@/components/landing-hero";

const goals = [
  {
    icon: Lightbulb,
    title: "Inspire Innovation",
    description:
      "We provide a platform for creative minds to showcase their groundbreaking ideas and turn them into reality.",
  },
  {
    icon: Users,
    title: "Build Community",
    description:
      "Our platform fosters connections between creators and backers, building a supportive community of innovators.",
  },
  {
    icon: Target,
    title: "Drive Impact",
    description:
      "We aim to fund projects that make a real difference, creating positive change in communities worldwide.",
  },
  {
    icon: Heart,
    title: "Empower Creators",
    description:
      "Empowering innovators and changemakers to bring their ideas to life through the power of community support.",
  },
];

const title = "About UPwithCrowd";
const description =
  "Empowering innovators and changemakers to bring their ideas to life through the power of community support.";

export default function Page() {
  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <LandingHero description={description} title={title} />
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {goals.map((goal, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <goal.icon className="text-primary mx-auto mb-4 h-12 w-12" />
                <h3 className="mb-2 text-xl font-semibold">{goal.title}</h3>
                <p className="text-muted-foreground">{goal.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-16 flex flex-col items-center gap-8 lg:flex-row">
          <div className="lg:w-1/2">
            <Image
              alt="UPwithCrowd in action"
              className="rounded-lg shadow-lg"
              height={400}
              src="/placeholder.svg"
              width={600}
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">Join Our Mission</h2>
            <p className="mb-6 text-lg">
              At UPwithCrowd, we believe in the power of collective support to bring innovative ideas to life. Whether you're a creator with a groundbreaking project or a backer looking to support the next big thing, you're in the right place. Join us in shaping the future, one project at a time.
            </p>
            <Button size="lg">Start Your Project</Button>
          </div>
        </div>

        <ExpertTeam />
        <Testimonials />
        <BlogPreview />
        <div className="mt-16 rounded-lg">
          <CallToAction />
        </div>
      </main>
    </div>
  );
}
