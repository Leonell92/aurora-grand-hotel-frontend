import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function BookingWidget() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    // TODO: Pass booking data to API
    navigate("/rooms");
  };

  return (
    <div className="bg-background/95 backdrop-blur-md rounded-xl p-6 shadow-lg border border-border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Check-in Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Check-in</label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 bg-secondary rounded-lg border border-border hover:border-primary/50 transition-colors text-left",
                  !checkIn && "text-muted-foreground"
                )}
              >
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-medium">
                  {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Check-out</label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 bg-secondary rounded-lg border border-border hover:border-primary/50 transition-colors text-left",
                  !checkOut && "text-muted-foreground"
                )}
              >
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-medium">
                  {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select date"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) => date < new Date() || (checkIn && date <= checkIn)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Guests</label>
          <div className="flex items-center gap-3 px-4 py-3 bg-secondary rounded-lg border border-border">
            <Users className="h-5 w-5 text-primary" />
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="flex-1 bg-transparent font-medium focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button
            variant="luxury"
            size="lg"
            className="w-full h-[52px]"
            onClick={handleSearch}
          >
            <Search className="h-5 w-5 mr-2" />
            Check Availability
          </Button>
        </div>
      </div>
    </div>
  );
}
