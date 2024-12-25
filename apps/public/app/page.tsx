import { ProjectSlider } from "@/components/ProjectSlider";
import BlogPreview from "../components/BlogPreview";
import CallToAction from "../components/CallToAction";
import DetailsSection from "../components/DetailsSection";
import ExpertTeam from "../components/ExpertTeam";
import HeroSection from "../components/HeroSection";
import MissionSection from "../components/MissionSection";
import OrganizationNumbers from "../components/OrganizationNumbers";
import ServicesSection from "../components/ServicesSection";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <main>
        <HeroSection />
        <ProjectSlider />
        <DetailsSection />
        <ServicesSection />
        <MissionSection />
        <OrganizationNumbers />
        <Testimonials />
        <ExpertTeam />
        <BlogPreview />
        <CallToAction />
      </main>
    </div>
  );
}
