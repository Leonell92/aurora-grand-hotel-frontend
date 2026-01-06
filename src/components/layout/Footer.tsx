import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";

const footerLinks = {
  explore: [
    { name: "Rooms & Suites", href: "/rooms" },
    { name: "Dining", href: "/about" },
    { name: "Spa & Wellness", href: "/about" },
    { name: "Events", href: "/contact" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/about" },
    { name: "Press", href: "/contact" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-charcoal text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Contact */}
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-semibold">
                Aurora <span className="text-gold-light font-light">Grand</span>
              </h3>
              <p className="mt-2 text-sm text-primary-foreground/70">
                Where Luxury Meets Tranquility
              </p>
            </div>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold-light shrink-0 mt-0.5" />
                <span>123 Luxury Avenue, Downtown District, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold-light shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold-light shrink-0" />
                <span>info@auroragrand.com</span>
              </div>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-gold-light transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-gold-light transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Stay Connected</h4>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Subscribe to receive exclusive offers and updates.
            </p>
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-charcoal-light border border-primary-foreground/20 rounded-md text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-gold-light transition-colors"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-gold-dark transition-colors">
                Join
              </button>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-charcoal-light rounded-full hover:bg-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-charcoal-light rounded-full hover:bg-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-charcoal-light rounded-full hover:bg-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Aurora Grand Hotel. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-xs text-primary-foreground/60 hover:text-gold-light transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
