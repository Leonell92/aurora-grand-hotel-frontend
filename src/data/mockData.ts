// Mock data for the hotel website
// TODO: Replace with API integration

import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomExecutive from "@/assets/room-executive.jpg";
import roomPresidential from "@/assets/room-presidential.jpg";
import restaurant from "@/assets/restaurant.jpg";
import poolSpa from "@/assets/pool-spa.jpg";

export interface Room {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  pricePerNight: number;
  capacity: number;
  size: number;
  image: string;
  images: string[];
  amenities: string[];
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Booking {
  id: string;
  guestName: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  totalAmount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "guest" | "admin" | "staff";
  joinedDate: string;
  bookings: number;
}

export const rooms: Room[] = [
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    description: "Experience refined comfort in our elegantly appointed Deluxe Room. Featuring a plush king-size bed with premium linens, a spacious marble bathroom with rain shower, and stunning city views through floor-to-ceiling windows. Perfect for discerning travelers seeking a blend of luxury and convenience.",
    shortDescription: "Elegant comfort with stunning city views and premium amenities.",
    pricePerNight: 299,
    capacity: 2,
    size: 35,
    image: roomDeluxe,
    images: [roomDeluxe, roomExecutive, roomPresidential],
    amenities: ["King Bed", "City View", "Rain Shower", "Mini Bar", "Smart TV", "High-Speed WiFi", "Coffee Machine", "Room Service"],
    featured: true,
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    description: "Indulge in sophisticated luxury in our spacious Executive Suite. A separate living area with designer furnishings, a dedicated workspace, and panoramic city views create the perfect environment for both relaxation and productivity. The master bedroom features a sumptuous king bed and ensuite spa-inspired bathroom.",
    shortDescription: "Spacious suite with separate living area and panoramic views.",
    pricePerNight: 499,
    capacity: 2,
    size: 55,
    image: roomExecutive,
    images: [roomExecutive, roomDeluxe, roomPresidential],
    amenities: ["King Bed", "Living Area", "Work Desk", "Panoramic View", "Jacuzzi Tub", "Mini Bar", "Smart TV", "High-Speed WiFi", "Coffee Machine", "Butler Service"],
    featured: true,
  },
  {
    id: "presidential-suite",
    name: "Presidential Suite",
    description: "The pinnacle of luxury awaits in our magnificent Presidential Suite. This palatial residence features a grand living room, private dining area, master bedroom with walk-in closet, and a spa-like bathroom with separate soaking tub and rainfall shower. Personalized butler service ensures every moment is exceptional.",
    shortDescription: "Ultimate luxury with grand living spaces and butler service.",
    pricePerNight: 1299,
    capacity: 4,
    size: 120,
    image: roomPresidential,
    images: [roomPresidential, roomExecutive, roomDeluxe],
    amenities: ["Master Bedroom", "Living Room", "Dining Area", "Walk-in Closet", "Soaking Tub", "Rain Shower", "Butler Service", "Private Bar", "Smart Home", "Premium WiFi"],
    featured: true,
  },
  {
    id: "superior-room",
    name: "Superior Room",
    description: "A perfect blend of comfort and style, our Superior Room offers a restful retreat with modern amenities. The room features a comfortable queen bed, a well-appointed bathroom, and thoughtful touches that make your stay memorable.",
    shortDescription: "Comfortable retreat with modern amenities and style.",
    pricePerNight: 199,
    capacity: 2,
    size: 28,
    image: roomDeluxe,
    images: [roomDeluxe, roomExecutive],
    amenities: ["Queen Bed", "City View", "Shower", "Mini Bar", "Smart TV", "WiFi", "Coffee Machine"],
    featured: false,
  },
  {
    id: "family-suite",
    name: "Family Suite",
    description: "Designed with families in mind, our Family Suite offers generous space and convenience. Featuring a master bedroom and a separate kids' room, plus a comfortable living area, this suite ensures everyone enjoys their stay.",
    shortDescription: "Spacious suite perfect for families with children.",
    pricePerNight: 599,
    capacity: 4,
    size: 75,
    image: roomExecutive,
    images: [roomExecutive, roomDeluxe, roomPresidential],
    amenities: ["Master Bedroom", "Kids Room", "Living Area", "Two Bathrooms", "Smart TV", "WiFi", "Coffee Machine", "Mini Kitchen"],
    featured: false,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    location: "New York, USA",
    rating: 5,
    comment: "An absolutely stunning hotel with impeccable service. The attention to detail in every aspect of our stay was remarkable. The Executive Suite exceeded all our expectations.",
    date: "2024-12-15",
  },
  {
    id: "2",
    name: "James Chen",
    location: "Singapore",
    rating: 5,
    comment: "The Aurora Grand Hotel sets a new standard for luxury hospitality. From the moment we arrived, we were treated like royalty. The spa and dining experiences were world-class.",
    date: "2024-12-10",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    location: "Madrid, Spain",
    rating: 5,
    comment: "A truly magical experience. The Presidential Suite was breathtaking, and the butler service made our anniversary celebration unforgettable. We will definitely return.",
    date: "2024-12-05",
  },
];

export const amenities: Amenity[] = [
  {
    id: "spa",
    name: "Luxury Spa",
    description: "Rejuvenate mind and body at our award-winning spa",
    icon: "Sparkles",
  },
  {
    id: "pool",
    name: "Indoor Pool",
    description: "Swim in our heated infinity pool with city views",
    icon: "Waves",
  },
  {
    id: "restaurant",
    name: "Fine Dining",
    description: "Savor exquisite cuisine at our signature restaurant",
    icon: "UtensilsCrossed",
  },
  {
    id: "fitness",
    name: "Fitness Center",
    description: "State-of-the-art equipment available 24/7",
    icon: "Dumbbell",
  },
  {
    id: "concierge",
    name: "24/7 Concierge",
    description: "Personalized service around the clock",
    icon: "Bell",
  },
  {
    id: "wifi",
    name: "High-Speed WiFi",
    description: "Complimentary premium internet throughout",
    icon: "Wifi",
  },
];

export const mockBookings: Booking[] = [
  {
    id: "BK001",
    guestName: "John Smith",
    roomName: "Executive Suite",
    checkIn: "2024-12-20",
    checkOut: "2024-12-25",
    status: "confirmed",
    totalAmount: 2495,
  },
  {
    id: "BK002",
    guestName: "Emily Johnson",
    roomName: "Deluxe Room",
    checkIn: "2024-12-22",
    checkOut: "2024-12-24",
    status: "pending",
    totalAmount: 598,
  },
  {
    id: "BK003",
    guestName: "Michael Brown",
    roomName: "Presidential Suite",
    checkIn: "2024-12-18",
    checkOut: "2024-12-20",
    status: "completed",
    totalAmount: 2598,
  },
  {
    id: "BK004",
    guestName: "Sarah Davis",
    roomName: "Superior Room",
    checkIn: "2024-12-26",
    checkOut: "2024-12-28",
    status: "confirmed",
    totalAmount: 398,
  },
  {
    id: "BK005",
    guestName: "David Wilson",
    roomName: "Family Suite",
    checkIn: "2024-12-21",
    checkOut: "2024-12-27",
    status: "cancelled",
    totalAmount: 3594,
  },
];

export const mockUsers: User[] = [
  {
    id: "U001",
    name: "John Smith",
    email: "john.smith@email.com",
    role: "guest",
    joinedDate: "2024-01-15",
    bookings: 3,
  },
  {
    id: "U002",
    name: "Emily Johnson",
    email: "emily.j@email.com",
    role: "guest",
    joinedDate: "2024-03-22",
    bookings: 1,
  },
  {
    id: "U003",
    name: "Admin User",
    email: "admin@auroragrand.com",
    role: "admin",
    joinedDate: "2023-06-01",
    bookings: 0,
  },
  {
    id: "U004",
    name: "Michael Brown",
    email: "m.brown@email.com",
    role: "guest",
    joinedDate: "2024-06-10",
    bookings: 5,
  },
  {
    id: "U005",
    name: "Staff Member",
    email: "staff@auroragrand.com",
    role: "staff",
    joinedDate: "2023-08-15",
    bookings: 0,
  },
];

export const dashboardStats = {
  totalBookings: 156,
  occupancyRate: 87,
  monthlyRevenue: 245890,
  averageRating: 4.9,
};

export const amenityImages = {
  restaurant,
  poolSpa,
};
