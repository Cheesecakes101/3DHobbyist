import ToasterCheck from "@/components/ui/toaster";
console.log("✅ Toaster imported successfully", ToasterCheck);
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/contexts/CartContext";
import VideoBackground from "@/components/VideoBackground";
import CustomCursor from "@/components/CustomCursor";
import HomePage from "@/pages/HomePage";
import StorePage from "@/pages/StorePage";
import CustomPrintPage from "@/pages/CustomPrintPage";
import CheckoutPage from "@/pages/CheckoutPage";
import AboutPage from "@/pages/AboutPage";
import AdminPage from "@/pages/AdminPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/store" component={StorePage} />
      <Route path="/custom-print" component={CustomPrintPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <ThemeProvider>
            <VideoBackground />
            <CustomCursor />
            <Toaster />
            <Router />
          </ThemeProvider>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
