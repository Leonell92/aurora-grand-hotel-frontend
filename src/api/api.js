import apiClient from './apiClient';

// ============================================
// ROOMS - Get information about hotel rooms
// ============================================

/**
 * Get all rooms from the backend
 * Returns: Array of room objects
 */
export async function getRooms() {
  const response = await apiClient.get('/rooms/');
  return response.data;
}

/**
 * Get details of a single room
 * Parameters: id - the room ID (number)
 * Returns: Single room object
 */
export async function getRoomById(id) {
  const response = await apiClient.get(`/rooms/${id}/`);
  return response.data;
}

// ============================================
// BOOKINGS - Manage hotel bookings
// ============================================

/**
 * Get all bookings for the logged-in user
 * Returns: Array of booking objects
 */
export async function getBookings() {
  const response = await apiClient.get('/bookings/');
  return response.data;
}

/**
 * Create a new booking
 * Parameters: bookingData - object with booking details
 * Example: { room: 1, check_in: "2025-01-01", check_out: "2025-01-05", ... }
 * Returns: The created booking object
 */
export async function createBooking(bookingData) {
  const response = await apiClient.post('/bookings/', bookingData);
  return response.data;
}

/**
 * Check if a room is available for specific dates
 * Parameters:
 *   - roomId: The room ID (number)
 *   - checkIn: Check-in date (string, format: "YYYY-MM-DD")
 *   - checkOut: Check-out date (string, format: "YYYY-MM-DD")
 * Returns: { available: true/false, message: "..." }
 */
export async function checkAvailability(roomId, checkIn, checkOut) {
  const response = await apiClient.get('/bookings/check_availability/', {
    params: {
      room_id: roomId,
      check_in: checkIn,
      check_out: checkOut,
    },
  });
  return response.data;
}

// ============================================
// AUTHENTICATION - User login/register
// ============================================

/**
 * Register a new user
 * Parameters: userData - object with user details
 * Example: { first_name: "John", last_name: "Doe", email: "john@example.com", password: "..." }
 * Returns: The created user object
 */
export async function registerUser(userData) {
  const response = await apiClient.post('/auth/register/', userData);
  return response.data;
}

/**
 * Login user
 * Parameters: credentials - object with email and password
 * Example: { email: "john@example.com", password: "..." }
 * Returns: User object and session is created
 */
export async function loginUser(credentials) {
  const response = await apiClient.post('/auth/login/', credentials);
  return response.data;
}

/**
 * Logout the current user
 * Returns: Success message
 */
export async function logoutUser() {
  const response = await apiClient.post('/auth/logout/');
  return response.data;
}

/**
 * Check if user is currently logged in
 * Returns: { authenticated: true/false, user: {...} }
 */
export async function checkAuthStatus() {
  const response = await apiClient.get('/auth/status/');
  return response.data;
}

// ============================================
// ERROR HANDLING - Get user-friendly errors
// ============================================

/**
 * Extract a readable error message from an error
 * Use this in catch blocks to show users what went wrong
 */
export function getErrorMessage(error) {
  // Check if error has a response from the server
  if (error.response && error.response.data) {
    // Try to get error message from different possible locations
    return error.response.data.error || 
           error.response.data.message || 
           'An error occurred. Please try again.';
  }
  
  // If no response, return generic message
  return error.message || 'An unexpected error occurred.';
}