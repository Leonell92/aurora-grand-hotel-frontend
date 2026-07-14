const API_BASE_URL = 'https://aurora-grand-hotel-backend.onrender.com/api';

// Type definitions
export interface Room {
  id: number;
  name: string;
  room_type: 'single' | 'double' | 'suite';
  description: string;
  price_per_night: string;
  max_guests: number;
  image_url: string;
  amenities: string[];
  features?: RoomFeature[];
}

export interface RoomFeature {
  id: number;
  title: string;
  image_url: string;
  description: string;
}

export interface Booking {
  id?: number;
  user: number;
  room: number;
  check_in: string;
  check_out: string;
  guests: number;
  guest_name?: string;
  guest_email?: string;
  created_at?: string;
  confirmed: boolean;
}

// Fetch all rooms
export const getRooms = async (): Promise<Room[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/rooms/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

// Fetch single room by ID
export const getRoom = async (id: number): Promise<Room> => {
  try {
    const response = await fetch(`${API_BASE_URL}/rooms/${id}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching room:', error);
    throw error;
  }
};

// Create a booking
export const createBooking = async (bookingData: Omit<Booking, 'id' | 'created_at'>): Promise<Booking> => {
  try {
    const dataWithUser = {
      ...bookingData,
      user: bookingData.user || 1,
      confirmed: false
    };

    console.log('Sending booking data:', dataWithUser);

    const response = await fetch(`${API_BASE_URL}/bookings/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataWithUser),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Booking error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
    }

    const data = await response.json();
    console.log('Booking created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// Fetch all bookings
export const getBookings = async (): Promise<Booking[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

// Check room availability
export const checkAvailability = async (roomId: number, checkIn: string, checkOut: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/bookings/check_availability/?room_id=${roomId}&check_in=${checkIn}&check_out=${checkOut}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.available;
  } catch (error) {
    console.error('Error checking availability:', error);
    throw error;
  }
};