import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { MapPin, DollarSign, Target } from 'lucide-react'

// Mock data for projects
const projects = [
  {
    id: 1,
    title: "Eco-Friendly Water Purifier",
    image: "/placeholder.svg?height=200&width=300",
    location: "San Francisco, CA",
    badge: "Environment",
    goal: 50000,
    raised: 35000,
  },
  {
    id: 2,
    title: "Solar-Powered Education Kits",
    image: "/placeholder.svg?height=200&width=300",
    location: "Nairobi, Kenya",
    badge: "Education",
    goal: 30000,
    raised: 22500,
  },
  {
    id: 3,
    title: "Community Garden Initiative",
    image: "/placeholder.svg?height=200&width=300",
    location: "London, UK",
    badge: "Community",
    goal: 20000,
    raised: 15000,
  },
  {
    id: 4,
    title: "Affordable 3D-Printed Prosthetics",
    image: "/placeholder.svg?height=200&width=300",
    location: "Berlin, Germany",
    badge: "Healthcare",
    goal: 40000,
    raised: 28000,
  },
  {
    id: 5,
    title: "Sustainable Fashion Marketplace",
    image: "/placeholder.svg?height=200&width=300",
    location: "Paris, France",
    badge: "Fashion",
    goal: 60000,
    raised: 45000,
  },
  {
    id: 6,
    title: "Urban Beekeeping Network",
    image: "/placeholder.svg?height=200&width=300",
    location: "New York, USA",
    badge: "Environment",
    goal: 25000,
    raised: 18750,
  },
  {
    id: 7,
    title: "AI-Powered Language Learning App",
    image: "/placeholder.svg?height=200&width=300",
    location: "Tokyo, Japan",
    badge: "Education",
    goal: 80000,
    raised: 60000,
  },
  {
    id: 8,
    title: "Micro-Lending Platform for Entrepreneurs",
    image: "/placeholder.svg?height=200&width=300",
    location: "Mumbai, India",
    badge: "Finance",
    goal: 100000,
    raised: 75000,
  },
  {
    id: 9,
    title: "Ocean Plastic Recycling Initiative",
    image: "/placeholder.svg?height=200&width=300",
    location: "Sydney, Australia",
    badge: "Environment",
    goal: 70000,
    raised: 52500,
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-12 md:py-20 px-6">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Discover Innovative Projects</h1>
          <p className="text-lg md:text-xl mb-12 text-center max-w-2xl mx-auto">
            Explore a world of creativity and innovation. Support projects that are shaping the future and making a difference in communities around the globe.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const fundedPercentage = (project.raised / project.goal) * 100
              return (
                <Link href={`/projects/${project.id}`} key={project.id}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                        {project.badge}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {project.location}
                      </div>
                      <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
                      <Card className="bg-muted-foreground/5 p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Funded: {fundedPercentage.toFixed(0)}%</span>
                          <span className="text-sm text-muted-foreground">30 days left</span>
                        </div>
                        <Progress value={fundedPercentage} className="mb-4" />
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <DollarSign className="w-5 h-5 text-primary mr-2" />
                            <div>
                              <p className="font-semibold">${project.raised.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">raised</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Target className="w-5 h-5 text-primary mr-2" />
                            <div>
                              <p className="font-semibold">${project.goal.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">goal</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </CardContent>
                    <CardFooter className="bg-muted-foreground/5 p-6">
                      <Button className="w-full">View Project</Button>
                    </CardFooter>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

