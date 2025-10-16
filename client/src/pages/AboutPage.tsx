import { useState } from "react";
import Header from "@/components/Header";
import ShoppingCartDrawer from "@/components/ShoppingCartDrawer";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Zap, Heart } from "lucide-react";

export default function AboutPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const values = [
    {
      icon: Award,
      title: "Quality First",
      description: "We never compromise on the quality of our prints. Every product is carefully inspected.",
    },
    {
      icon: Users,
      title: "Customer Focused",
      description: "Your satisfaction is our priority. We work closely with you to meet your exact needs.",
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Quick turnaround times without sacrificing quality. Most orders ready in 5-24 hours.",
    },
    {
      icon: Heart,
      title: "Passion Driven",
      description: "Started by hobbyists, for hobbyists. We understand your needs and budget constraints.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={0} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="flex-1">
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl" data-testid="text-about-title">
                About 3D Hobbyist
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                We're passionate about making 3D printing accessible and affordable for everyone. 
                Founded by enthusiasts who understand the challenges of high printing costs, 
                we're committed to providing professional-quality prints at prices that won't break the bank.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <Card key={index} className="text-center" data-testid={`card-value-${index}`}>
                  <CardContent className="pt-6">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 font-semibold">{value.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-bold text-center mb-8">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  3D Hobbyist was born from a simple frustration: the high cost of 3D printing services 
                  was preventing talented creators from bringing their ideas to life. As hobbyists ourselves, 
                  we knew there had to be a better way.
                </p>
                <p>
                  We started in a small workshop with a single 3D printer and a mission to make quality 
                  3D printing accessible to students, hobbyists, and small businesses. Today, we've grown 
                  into a trusted service provider, but our core values remain the same.
                </p>
                <p>
                  We believe that everyone deserves access to professional-quality 3D printing without 
                  the premium price tag. Whether you're a student working on a project, a hobbyist building 
                  your dream, or a professional prototyping your next product, we're here to help you succeed.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      <ShoppingCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={[]}
        onUpdateQuantity={() => {}}
        onRemove={() => {}}
      />
    </div>
  );
}
