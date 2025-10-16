import { Box, Pencil, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ServicesSection() {
  const services = [
    {
      icon: Box,
      title: "3D Printing",
      description: "High-quality PLA prints with excellent finish and durability for any project size.",
    },
    {
      icon: Pencil,
      title: "Custom Design",
      description: "Expert CAD design services to bring your concepts to life with precision and creativity.",
    },
    {
      icon: Zap,
      title: "Rapid Prototyping",
      description: "Fast turnaround times for prototypes and iterations to accelerate your product development.",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl" data-testid="text-services-title">
            Our Services
          </h2>
          <p className="mt-4 text-muted-foreground" data-testid="text-services-description">
            Comprehensive 3D printing solutions tailored to your needs
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="hover-elevate transition-all" data-testid={`card-service-${index}`}>
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
