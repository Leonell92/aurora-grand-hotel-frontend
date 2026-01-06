import { Sparkles, Waves, UtensilsCrossed, Dumbbell, Bell, Wifi } from "lucide-react";
import { amenities } from "@/data/mockData";

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="h-8 w-8" />,
  Waves: <Waves className="h-8 w-8" />,
  UtensilsCrossed: <UtensilsCrossed className="h-8 w-8" />,
  Dumbbell: <Dumbbell className="h-8 w-8" />,
  Bell: <Bell className="h-8 w-8" />,
  Wifi: <Wifi className="h-8 w-8" />,
};

export function AmenitiesSection() {
  return (
    <section className="py-24 bg-ivory-dark">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">
            Hotel Amenities
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-6">
            World-Class Facilities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our exceptional range of amenities designed to enhance your stay 
            and create unforgettable experiences.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {amenities.map((amenity, index) => (
            <div
              key={amenity.id}
              className="group bg-background rounded-xl p-6 text-center hover-lift luxury-shadow animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                {iconMap[amenity.icon]}
              </div>
              <h3 className="font-serif text-lg font-medium text-foreground mb-2">
                {amenity.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
