import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-display text-lg font-bold">3D Hobbyist</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Professional 3D printing and design services for hobbyists, students, and professionals.
            </p>
            <div className="mt-4 flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" data-testid="button-social-facebook">
                <SiFacebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" data-testid="button-social-instagram">
                <SiInstagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" data-testid="button-social-twitter">
                <SiX className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/store">
                  <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-store">
                    Store
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/custom-print">
                  <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-custom">
                    Custom Print
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">
                    About Us
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@3dhobbyist.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Newsletter</h4>
            <p className="mt-4 text-sm text-muted-foreground">
              Get updates on new products and special offers
            </p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1"
                data-testid="input-newsletter"
              />
              <Button type="submit" data-testid="button-subscribe">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} 3D Hobbyist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
