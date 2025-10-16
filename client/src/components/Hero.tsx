import { ArrowRight, Clock, Layers, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/3D_printed_objects_hero_image_87c5f882.png";

export default function Hero() {
  const features = [
    { icon: Clock, title: "5-24hr Delivery", description: "Quick turnaround" },
    { icon: Layers, title: "Multi-Material", description: "PLA, ABS, PETG" },
    { icon: Shield, title: "Confidential", description: "Secure files" },
  ];

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
        }}
      />
      
      <div className="container relative mx-auto px-4 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl" data-testid="text-hero-title">
            Professional 3D Printing & Design Services
          </h1>
          <p className="mt-6 text-lg text-gray-200" data-testid="text-hero-description">
            Transform your ideas into reality with our high-quality 3D printing services. 
            From custom prints to ready-made products, we deliver precision and quality.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" variant="default" asChild data-testid="button-browse-store">
              <Link href="/store">
                Browse Store <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30" asChild data-testid="button-custom-quote">
              <Link href="/custom-print">
                Get Custom Quote
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="bg-background/80 backdrop-blur-sm p-6 text-center border-white/20" data-testid={`card-feature-${index}`}>
              <feature.icon className="mx-auto h-8 w-8 text-primary" />
              <h3 className="mt-4 font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
