import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookingWidget } from "./BookingWidget";
import { AmenitiesSlideshow } from "./AmenitiesSlideshow";
import heroImage from "@/assets/hero-lobby.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-gold-light font-medium tracking-[0.3em] uppercase text-sm mb-4 animate-fade-up">
            Welcome to
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-primary-foreground mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Aurora Grand Hotel & Resort
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 font-light mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Where Luxury Meets Tranquility
          </p>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            Experience unparalleled elegance in the heart of the city. Our award-winning
            hotel offers a sanctuary of refined comfort, exceptional service, and
            unforgettable moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Link to="/rooms">
              <Button variant="hero" size="xl">
                Explore Rooms
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="hero-outline" size="xl">
                Our Story
              </Button>
            </Link>
          </div>
        </div>

        {/* Amenities Slideshow */}
        <AmenitiesSlideshow />

        {/* Booking Widget */}
        <div className="max-w-5xl mx-auto animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <BookingWidget />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-gold-light rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
