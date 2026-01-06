import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Mail, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingsAndRooms = async () => {
      try {
        // Fetch bookings
        const bookingsResponse = await fetch("http://127.0.0.1:8000/api/bookings/");
        const bookingsData = await bookingsResponse.json();

        // Fetch all rooms
        const roomsResponse = await fetch("http://127.0.0.1:8000/api/rooms/");
        const roomsData = await roomsResponse.json();

        // Create a map of room ID to room data
        const roomsMap = {};
        roomsData.forEach((room) => {
          roomsMap[room.id] = room;
        });

        setBookings(bookingsData);
        setRooms(roomsMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingsAndRooms();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-20 min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-to-b from-secondary to-background py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-center mb-4">
              My Bookings
            </h1>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              View and manage your hotel reservations
            </p>
          </div>
        </section>

        {/* Bookings List */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            {bookings.length === 0 ? (
              <div className="text-center py-16">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="font-serif text-2xl mb-2">No Bookings Yet</h2>
                <p className="text-muted-foreground mb-6">
                  Start planning your stay by browsing our available rooms
                </p>
                <Link to="/rooms">
                  <Button variant="luxury" size="lg">
                    Browse Rooms
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => {
                  const room = rooms[booking.room];
                  
                  return (
                    <div
                      key={booking.id}
                      className="bg-card rounded-xl overflow-hidden border border-border luxury-shadow hover:shadow-xl transition-shadow"
                    >
                      <div className="grid md:grid-cols-3 gap-0">
                        {/* Room Image */}
                        <div className="relative h-48 md:h-full">
                          <img
                            src={
                              room?.image_url ||
                              "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
                            }
                            alt={room?.name || "Room"}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 right-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                booking.confirmed
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {booking.confirmed ? "Confirmed" : "Pending"}
                            </span>
                          </div>
                        </div>

                        {/* Booking Details */}
                        <div className="md:col-span-2 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <p className="text-sm text-primary font-medium tracking-wider uppercase mb-1">
                                {room?.room_type || "Room"}
                              </p>
                              <h3 className="font-serif text-2xl font-medium">
                                {room?.name || "Room"}
                              </h3>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-serif font-semibold text-primary">
                                ₦{room?.price_per_night || "0"}
                              </p>
                              <p className="text-xs text-muted-foreground">per night</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex items-start gap-3">
                              <Calendar className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                  Check-in
                                </p>
                                <p className="font-medium">
                                  {format(new Date(booking.check_in), "MMM dd, yyyy")}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <Calendar className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                  Check-out
                                </p>
                                <p className="font-medium">
                                  {format(new Date(booking.check_out), "MMM dd, yyyy")}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              {booking.guests} {booking.guests === 1 ? "Guest" : "Guests"}
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              {booking.guest_email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Booked {format(new Date(booking.created_at), "MMM dd, yyyy")}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                              Booking ID: #{booking.id}
                            </p>
                            <div className="flex gap-2">
                              <Link to={`/rooms/${booking.room}`}>
                                <Button variant="outline" size="sm">
                                  View Room
                                </Button>
                              </Link>
                              {!booking.confirmed && (
                                <Button variant="luxury" size="sm">
                                  Confirm Booking
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default BookingsPage;