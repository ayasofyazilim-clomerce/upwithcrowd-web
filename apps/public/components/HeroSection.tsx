import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section className="py-12 md:py-20 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-lg mb-8 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Empower Change Through Crowdfunding</h1>
          <p className="text-lg md:text-xl mb-6">Join our community of innovators and changemakers. Fund projects that matter and make a difference in the world.</p>
          <Button size="lg">Explore Projects</Button>
        </div>
        <div className="relative w-full md:w-96 h-64 md:h-96">
          <Image
            src="/placeholder.svg"
            alt="Crowdfunding illustration"
            fill
            className="rounded-tl-[100px] object-cover"
          />
        </div>
      </div>
    </section>
  )
}

