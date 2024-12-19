import Image from 'next/image'
import { Clock, Users, Target } from 'lucide-react'

export default function DetailsSection() {
  return (
    <section className="py-12 md:py-20 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <Image
            src="/placeholder.svg"
            alt="Project details"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
        <div className="w-full md:w-1/2 md:ml-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Bringing Ideas to Life</h2>
          <p className="text-lg mb-8">Our platform connects visionary creators with passionate backers, fostering innovation and positive change in communities worldwide.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-primary mr-2" />
              <span>Quick Setup</span>
            </div>
            <div className="flex items-center">
              <Users className="w-8 h-8 text-primary mr-2" />
              <span>Global Reach</span>
            </div>
            <div className="flex items-center">
              <Target className="w-8 h-8 text-primary mr-2" />
              <span>Goal Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

