const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function getRooms() {
  const res = await fetch(`${API_BASE_URL}/rooms/`);
  return res.json();
}

export async function getRoomById(id) {
  const res = await fetch(`${API_BASE_URL}/rooms/${id}/`);
  return res.json();
}

export async function createBooking(data) {
  const res = await fetch(`${API_BASE_URL}/bookings/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
