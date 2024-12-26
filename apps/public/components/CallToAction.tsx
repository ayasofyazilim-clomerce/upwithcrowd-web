import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";

export default function CallToAction() {
  return (
    <section className="px-6 py-12 md:py-20">
      <div className="container mx-auto">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center md:p-12">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Ready to Bring Your Ideas to Life?
            </h2>
            <p className="mb-8 text-lg md:text-xl">
              Join our community of innovators and start your crowdfunding
              journey today.
            </p>
            <Button size="lg" variant="secondary">
              Start Your Project
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
