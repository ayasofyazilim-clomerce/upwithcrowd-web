import {getPublicProjectsApi} from "@repo/actions/upwithcrowd/public-project/action";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import BlogPreview from "@/components/blog-preview";
import CallToAction from "@/components/call-to-action";
import DetailsSection from "@/components/details-section";
import ExpertTeam from "@/components/expert-team";
import HeroSection from "@/components/hero-section";
import MissionsSection from "@/components/mission-section";
import OrganizationNumbers from "@/components/organization-numbers";
import {ProjectSlider} from "@/components/project-slider";
import ServicesSection from "@/components/services-section";
import Testimonials from "@/components/testimoni";

async function getApiRequests() {
  try {
    const requiredRequests = await Promise.all([getPublicProjectsApi()]);
    const optionalRequests = await Promise.allSettled([]);
    return {requiredRequests, optionalRequests};
  } catch (error) {
    if (!isRedirectError(error)) {
      return structuredError(error);
    }
    throw error;
  }
}

export default async function Page() {
  const apiRequests = await getApiRequests();

  return (
    <div className="bg-background min-h-screen">
      <main>
        <HeroSection />
        <ProjectSlider projects={"message" in apiRequests ? [] : apiRequests.requiredRequests[0].data.items || []} />
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
