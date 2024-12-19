import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb, Heart, Shield } from 'lucide-react'

const services = [
  {
    icon: Lightbulb,
    title: "Idea Validation",
    description: "Get feedback and support for your project ideas from a diverse community.",
  },
  {
    icon: Heart,
    title: "Fundraising",
    description: "Raise funds from backers who believe in your vision and want to support your cause.",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Enjoy peace of mind with our secure and transparent funding process.",
  },
]

export default function ServicesSection() {
  return (
    <section className="py-12 md:py-20 px-6 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <service.icon className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

