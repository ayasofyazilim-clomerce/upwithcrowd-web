import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Lightbulb, Users, Target, Heart } from 'lucide-react'
import ExpertTeam from '@/components/ExpertTeam'
import Testimonials from '@/components/Testimonials'
import BlogPreview from '@/components/BlogPreview'
import CallToAction from '@/components/CallToAction'

const goals = [
  {
    icon: Lightbulb,
    title: "Inspire Innovation",
    description: "We provide a platform for creative minds to showcase their groundbreaking ideas and turn them into reality."
  },
  {
    icon: Users,
    title: "Build Community",
    description: "Our platform fosters connections between creators and backers, building a supportive community of innovators."
  },
  {
    icon: Target,
    title: "Drive Impact",
    description: "We aim to fund projects that make a real difference, creating positive change in communities worldwide."
  },
  {
    icon: Heart,
    title: "Empower Creators",
    description: "We give creators the tools and resources they need to bring their visions to life and achieve their goals."
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">About CrowdFund</h1>
        <p className="text-lg md:text-xl mb-12 text-center max-w-2xl mx-auto">
          Empowering innovators and changemakers to bring their ideas to life through the power of community support.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {goals.map((goal, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <goal.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{goal.title}</h3>
                <p className="text-muted-foreground">{goal.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 mb-16">
          <div className="lg:w-1/2">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="CrowdFund in action"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-lg mb-6">
              At CrowdFund, we believe in the power of collective support to bring innovative ideas to life. 
              Whether you're a creator with a groundbreaking project or a backer looking to support the next big thing, 
              you're in the right place. Join us in shaping the future, one project at a time.
            </p>
            <Button size="lg">Start Your Project</Button>
          </div>
        </div>

        <ExpertTeam />
        <Testimonials />
        <BlogPreview />
      </main>
      <CallToAction />
    </div>
  )
}

