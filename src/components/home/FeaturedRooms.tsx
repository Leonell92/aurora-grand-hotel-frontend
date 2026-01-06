import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import { getRooms } from "@/api/api";
import { formatPrice } from "@/lib/utils";

export const FeaturedRooms = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();
        // Show only first 3 rooms as featured
        setRooms(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-ivory-dark">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-muted-foreground">Loading rooms...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-ivory-dark">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-widest text-sm mb-2">
            Featured Rooms
          </p>
          <h2 className="font-serif text-4xl font-medium mb-4">
            Our Signature Accommodations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience luxury and comfort in our carefully curated selection of rooms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="group bg-card rounded-xl overflow-hidden luxury-shadow hover:shadow-xl transition-all duration-300"
            >
              {/* Room Image */}
              <div className="relative h-64 bg-charcoal overflow-hidden">
                <img
                  src={
                    room.image_url ||
                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
                  }
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Room Details */}
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-primary uppercase tracking-widest text-xs mb-2">
                    {room.room_type}
                  </p>
                  <h3 className="font-serif text-2xl font-medium mb-2">
                    {room.name}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {room.description}
                  </p>
                </div>

                {/* Room Features */}
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Up to {room.max_guests}</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-2xl font-serif text-primary">
                      ₦{formatPrice(room.price_per_night)}
                    </p>
                    <p className="text-xs text-muted-foreground">per night</p>
                  </div>
                  <Link to={`/rooms/${room.id}`}>
                    <Button variant="luxury" className="group/btn">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Rooms CTA */}
        <div className="text-center">
          <Link to="/rooms">
            <Button variant="outline" size="lg">
              View All Rooms
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};