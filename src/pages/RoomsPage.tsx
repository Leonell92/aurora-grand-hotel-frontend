import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, Loader2 } from "lucide-react";
import { getRooms, getErrorMessage } from "@/api/api";

const RoomsPage = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getRooms();
      setRooms(data);
    } catch (err: any) {
      console.error("Error fetching rooms:", err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return isNaN(numPrice) ? "0.00" : numPrice.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading rooms...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-20">
        <section className="relative h-[40vh] bg-charcoal">
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
            alt="Luxury hotel rooms"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="font-serif text-5xl font-medium mb-4">Our Rooms</h1>
              <p className="text-xl text-ivory-light">
                Choose from our selection of luxury accommodations
              </p>
            </div>
          </div>
        </section>

        {error && (
          <section className="py-8 bg-red-50">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={fetchRooms} variant="outline">
                  Try Again
                </Button>
              </div>
            </div>
          </section>
        )}

        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {rooms.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="font-serif text-2xl mb-2">No Rooms Available</h2>
                <p className="text-muted-foreground">
                  Please check back later or contact us for more information.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className="group bg-card rounded-xl overflow-hidden luxury-shadow hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-64 bg-charcoal overflow-hidden">
                      <img
                        src={
                          room.image_url ||
                          "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
                        }
                        alt={room.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {!room.available && (
                        <div className="absolute inset-0 bg-charcoal bg-opacity-75 flex items-center justify-center">
                          <span className="text-white font-medium text-lg">
                            Not Available
                          </span>
                        </div>
                      )}
                    </div>

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

                      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>Up to {room.max_guests}</span>
                        </div>
                      </div>

                      {room.amenities && room.amenities.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {room.amenities.slice(0, 3).map((amenity: string, index: number) => (
                              <span
                                key={index}
                                className="text-xs bg-ivory-dark text-charcoal px-2 py-1 rounded"
                              >
                                {amenity}
                              </span>
                            ))}
                            {room.amenities.length > 3 && (
                              <span className="text-xs text-muted-foreground px-2 py-1">
                                +{room.amenities.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <p className="text-2xl font-serif text-primary">
                            ₦{formatPrice(room.price_per_night)}
                          </p>
                          <p className="text-xs text-muted-foreground">per night</p>
                        </div>
                        <Link to={`/rooms/${room.id}`}>
                          <Button
                            variant="luxury"
                            className="group/btn"
                            disabled={!room.available}
                          >
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-ivory-dark">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="font-serif text-3xl mb-4">Need Help Choosing?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our concierge team is here to help you find the perfect room for your stay.
              Contact us for personalized recommendations.
            </p>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default RoomsPage;