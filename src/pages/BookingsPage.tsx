import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, User, Users, MapPin, Clock, Loader2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { getBookings, getRoomById, getErrorMessage } from "@/api/api";

const BookingsPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login", {
        state: { message: "Please sign in to view your bookings" },
      });
      return;
    }

    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    setLoading(true);
    setError("");

    try {
      // Fetch bookings using Axios
      const bookingsData = await getBookings();

      // Fetch room details for each booking
      const bookingsWithRooms = await Promise.all(
        bookingsData.map(async (booking: any) => {
          try {
            const roomData = await getRoomById(booking.room);
            return {
              ...booking,
              roomDetails: roomData,
              roomError: null,
            };
          } catch (error) {
            console.error(`Error fetching room ${booking.room}:`, error);
            // Room doesn't exist or error occurred
            return {
              ...booking,
              roomDetails: null,
              roomError: "Room information unavailable",
            };
          }
        })
      );

      setBookings(bookingsWithRooms);
    } catch (err: any) {
      console.error("Error fetching bookings:", err);
      
      // Handle authentication errors
      if (err.response?.status === 401) {
        localStorage.removeItem("user");
        navigate("/login", {
          state: { message: "Session expired. Please sign in again." },
        });
      } else {
        setError(getErrorMessage(err));
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your bookings...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-20 min-h-screen">
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-8">
              <h1 className="font-serif text-4xl font-medium mb-2">
                My Bookings
              </h1>
              <p className="text-muted-foreground">
                View and manage your hotel reservations
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg border border-red-200 bg-red-50">
                <p className="text-sm text-red-600">{error}</p>
                <Button
                  onClick={fetchBookings}
                  variant="outline"
                  size="sm"
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            )}

            {bookings.length === 0 ? (
              <div className="text-center py-16">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="font-serif text-2xl mb-2">No Bookings Yet</h2>
                <p className="text-muted-foreground mb-6">
                  You haven't made any bookings. Start exploring our rooms!
                </p>
                <Link to="/rooms">
                  <Button variant="luxury">Browse Rooms</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-card rounded-xl overflow-hidden border luxury-shadow hover:shadow-lg transition-shadow"
                  >
                    {/* Room Image */}
                    {booking.roomDetails?.image_url ? (
                      <div className="relative h-48 bg-charcoal">
                        <img
                          src={booking.roomDetails.image_url}
                          alt={booking.roomDetails.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="relative h-48 bg-charcoal flex items-center justify-center">
                        <AlertCircle className="h-12 w-12 text-ivory-light" />
                      </div>
                    )}

                    {/* Booking Details */}
                    <div className="p-6 space-y-4">
                      {/* Room Name */}
                      <div>
                        {booking.roomDetails ? (
                          <>
                            <h3 className="font-serif text-xl font-medium mb-1">
                              {booking.roomDetails.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {booking.roomDetails.room_type}
                            </p>
                          </>
                        ) : (
                          <>
                            <h3 className="font-serif text-xl font-medium mb-1">
                              Room #{booking.room}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-amber-600">
                              <AlertCircle className="h-4 w-4" />
                              <span>Room details unavailable</span>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Dates */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">Check-in:</span>
                          <span className="font-medium">
                            {format(new Date(booking.check_in), "MMM dd, yyyy")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">Check-out:</span>
                          <span className="font-medium">
                            {format(new Date(booking.check_out), "MMM dd, yyyy")}
                          </span>
                        </div>
                      </div>

                      {/* Guest Info */}
                      <div className="space-y-2 pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.guest_name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {booking.guests}{" "}
                            {booking.guests === 1 ? "Guest" : "Guests"}
                          </span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                              booking.confirmed
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            <Clock className="h-3 w-3" />
                            {booking.confirmed ? "Confirmed" : "Pending"}
                          </span>
                          {booking.roomDetails && (
                            <Link to={`/rooms/${booking.room}`}>
                              <Button variant="ghost" size="sm">
                                View Room
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Booking Date */}
                      <p className="text-xs text-muted-foreground pt-2">
                        Booked on{" "}
                        {format(new Date(booking.created_at), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default BookingsPage;