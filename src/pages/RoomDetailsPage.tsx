import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Check, Calendar, ArrowLeft, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getRoomById, checkAvailability, createBooking } from "@/api/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const RoomDetailsPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [user, setUser] = useState<any>(null);

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setGuestName(`${userData.first_name} ${userData.last_name}`);
      setGuestEmail(userData.email);
    }
  }, []);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getRoomById(Number(roomId));
        setRoom(data);
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const isFormValid = () => {
    if (!checkIn || !checkOut) return false;
    if (!guestName.trim() || !guestEmail.trim()) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(guestEmail)) return false;

    if (numberOfGuests < 1 || numberOfGuests > room?.max_guests) return false;

    return true;
  };

  const handleReserve = async () => {
    if (!user) {
      alert("Please sign in to make a booking.");
      navigate("/login");
      return;
    }

    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    if (!guestName.trim() || !guestEmail.trim()) {
      alert("Please provide guest name and email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(guestEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (numberOfGuests < 1 || numberOfGuests > room.max_guests) {
      alert(`Number of guests must be between 1 and ${room.max_guests}.`);
      return;
    }

    setBookingLoading(true);

    const checkInStr = checkIn.toISOString().split("T")[0];
    const checkOutStr = checkOut.toISOString().split("T")[0];

    try {
      const isAvailable = await checkAvailability(
        room.id,
        checkInStr,
        checkOutStr
      );

      if (!isAvailable) {
        alert("Room is not available for these dates");
        return;
      }

      const bookingData = {
        room: room.id,
        check_in: checkInStr,
        check_out: checkOutStr,
        guest_name: guestName.trim(),
        guest_email: guestEmail.trim(),
        guests: numberOfGuests,
        user: user.id || 1, // Fallback user ID
        confirmed: false
      };

      await createBooking(bookingData);

      alert("Booking successful!");
      navigate("/bookings");
    } catch (error: any) {
      console.error("Booking failed:", error);

      if (error.response?.status === 401) {
        alert("Please log in to make a booking.");
        navigate("/login");
      } else {
        alert(error.message || "An error occurred during booking.");
      }
    } finally {
      setBookingLoading(false);
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!room) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-serif text-3xl mb-4">Room Not Found</h1>
            <Link to="/rooms">
              <Button>Back to Rooms</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Rooms
          </Link>
        </div>

        <section className="relative h-[50vh] bg-charcoal">
          <img
            src={
              room.image_url ||
              "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
            }
            alt={room.name}
            className="w-full h-full object-cover"
          />
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <p className="text-primary uppercase tracking-widest text-sm">
                  {room.room_type}
                </p>
                <h1 className="font-serif text-4xl font-medium mb-4">
                  {room.name}
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  Up to {room.max_guests} Guests
                </div>
              </div>

              <p className="text-muted-foreground">{room.description}</p>

              {room.amenities?.length > 0 && (
                <div>
                  <h2 className="text-2xl font-serif mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {room.amenities.map((a: string, i: number) => (
                      <div key={i} className="flex gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="sticky top-28 bg-card p-6 rounded-xl border">
              <div className="text-center mb-6 pb-6 border-b">
                <p className="text-4xl font-serif text-primary">
                  ₦{formatPrice(room.price_per_night)}
                  <span className="text-base text-muted-foreground">/night</span>
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="guestName" className="text-sm font-medium mb-2 block">
                    Guest Name
                  </Label>
                  <Input
                    id="guestName"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="John Doe"
                    disabled={bookingLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="guestEmail" className="text-sm font-medium mb-2 block">
                    Guest Email
                  </Label>
                  <Input
                    id="guestEmail"
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="john@example.com"
                    disabled={bookingLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="numberOfGuests" className="text-sm font-medium mb-2 block">
                    Number of Guests
                  </Label>
                  <Input
                    id="numberOfGuests"
                    type="number"
                    min="1"
                    max={room.max_guests}
                    value={numberOfGuests}
                    onChange={(e) => setNumberOfGuests(parseInt(e.target.value) || 1)}
                    disabled={bookingLoading}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Maximum: {room.max_guests} guests
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Check-in</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                        disabled={bookingLoading}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select check-in"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        disabled={(d) => d < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Check-out</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                        disabled={bookingLoading}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select check-out"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        disabled={(d) => d < new Date() || (checkIn && d <= checkIn)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Button
                className="w-full"
                variant="luxury"
                onClick={handleReserve}
                disabled={!room.available || bookingLoading || !isFormValid()}
              >
                {bookingLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : !room.available ? (
                  "Unavailable"
                ) : !isFormValid() ? (
                  "Complete All Fields"
                ) : (
                  "Reserve Room"
                )}
              </Button>

              {!user && (
                <p className="text-center text-xs text-muted-foreground mt-4">
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>{" "}
                  to auto-fill your details
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default RoomDetailsPage;