import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function CallToAction() {
  return (
    <section className="py-12 md:py-20 px-6">
      <div className="container mx-auto">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Bring Your Ideas to Life?</h2>
            <p className="text-lg md:text-xl mb-8">Join our community of innovators and start your crowdfunding journey today.</p>
            <Button size="lg" variant="secondary">
              Start Your Project
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

