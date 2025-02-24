import {ProjectSlider} from "@/components/project-slider";
import BlogPreview from "@/components/blog-preview";
import CallToAction from "@/components/call-to-action";
import DetailsSection from "@/components/details-section";
import ExpertTeam from "@/components/expert-team";
import HeroSection from "@/components/hero-section";
import MissionsSection from "@/components/mission-section";
import OrganizationNumbers from "@/components/organization-numbers";
import ServicesSection from "@/components/services-section";
import Testimonials from "@/components/testimoni";
import {getPublicProjectsApi} from "@/actions/upwithcrowd/public-project/actions";

export default async function Page() {
  const publicProjectsResponse = await getPublicProjectsApi({});
  return (
    <div className="bg-background min-h-screen">
      <main>
        <HeroSection />
        <ProjectSlider
          projects={publicProjectsResponse.type !== "success" ? [] : publicProjectsResponse.data.items || []}
        />
        <DetailsSection />
        <ServicesSection />
        <MissionsSection />
        <OrganizationNumbers />
        <Testimonials />
        <ExpertTeam />
        <BlogPreview />
        <CallToAction />
      </main>
    </div>
  );
}
