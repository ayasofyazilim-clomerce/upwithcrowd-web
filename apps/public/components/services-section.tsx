import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {services} from "@/_data/services";

export default function ServicesSection() {
  return (
    <section className="bg-muted px-6 py-12 md:py-20">
      <div className="container mx-auto">
        <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">Hizmetlerimiz</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <Card
              className="from-primary/10 hover:to-primary hover:from-primary transition-color group rounded-2xl border-none bg-gradient-to-b to-white p-8 text-center text-black shadow-lg hover:text-white"
              key={index}>
              <CardHeader className="flex items-center">
                <div className="bg-primary flex h-max w-max rounded-full p-4 group-hover:bg-white/10">
                  <service.icon className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-3xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground group-hover:text-white">
                <p>{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
