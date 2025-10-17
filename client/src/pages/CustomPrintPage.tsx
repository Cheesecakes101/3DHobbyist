import { useState } from "react";
import Header from "@/components/Header";
import CustomPrintForm from "@/components/CustomPrintForm";
import ShoppingCartDrawer from "@/components/ShoppingCartDrawer";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Settings, Zap } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import printerImage from "@assets/generated_images/3D_printer_in_action_45da8a35.png";

export default function CustomPrintPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getCartItemCount } = useCart();

  const steps = [
    {
      icon: Upload,
      title: "Upload Your Files",
      description: "Upload 3D models (.STL, .OBJ) or images (.JPEG, .PNG) of what you want printed",
    },
    {
      icon: Settings,
      title: "Specify Requirements",
      description: "Tell us about material preferences, quantity, and special requirements",
    },
    {
      icon: Zap,
      title: "Get Your Quote",
      description: "Receive a detailed quote within 24 hours and approve to start printing",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={getCartItemCount()} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="flex-1">
        <section className="relative py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl" data-testid="text-custom-print-title">
                Custom 3D Printing
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Have a unique design? We'll bring it to life with precision and quality
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <img
                  src={printerImage}
                  alt="3D Printer in action"
                  className="rounded-lg w-full"
                  data-testid="img-printer"
                />
                <div className="mt-8 space-y-6">
                  <h2 className="font-display text-2xl font-bold">How It Works</h2>
                  {steps.map((step, index) => (
                    <Card key={index} data-testid={`card-step-${index}`}>
                      <CardContent className="flex gap-4 p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <step.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{step.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-display text-2xl font-bold mb-6">Request a Quote</h2>
                    <CustomPrintForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      <ShoppingCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}
