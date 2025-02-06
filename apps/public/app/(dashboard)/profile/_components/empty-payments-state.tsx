import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Wallet, ArrowRight} from "lucide-react";
import Link from "next/link";

export default function EmptyPaymentsState() {
  return (
    <Card className="mx-auto w-full">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-primary/10 mb-6 rounded-full p-4">
          <Wallet className="text-primary h-12 w-12" />
        </div>

        <h3 className="mb-2 text-2xl font-semibold tracking-tight">No Investments Yet</h3>

        <p className="text-muted-foreground mb-6 max-w-md">
          Start your investment journey with UPwithCrowd. Discover innovative projects and invest in opportunities that
          match your interests.
        </p>

        <Button asChild size="lg" className="gap-2">
          <Link href="/projects">
            <ArrowRight className="h-5 w-5" />
            Explore Projects
          </Link>
        </Button>

        <div className="text-muted-foreground mt-8 grid gap-4 text-sm">
          <p className="flex items-center justify-center gap-2">
            <span className="bg-primary/50 h-2 w-2 rounded-full" />
            Diverse investment opportunities
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="bg-primary/50 h-2 w-2 rounded-full" />
            Secure payment processing
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="bg-primary/50 h-2 w-2 rounded-full" />
            Real-time investment tracking
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
