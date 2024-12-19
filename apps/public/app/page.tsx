import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import FeaturedProjects from '../components/FeaturedProjects'
import DetailsSection from '../components/DetailsSection'
import ServicesSection from '../components/ServicesSection'
import MissionSection from '../components/MissionSection'
import OrganizationNumbers from '../components/OrganizationNumbers'
import Testimonials from '../components/Testimonials'
import ExpertTeam from '../components/ExpertTeam'
import BlogPreview from '../components/BlogPreview'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <FeaturedProjects />
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
  )
}

