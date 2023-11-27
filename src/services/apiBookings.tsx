import { API_URL } from "../utils/constants";

interface FormDataProps {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}

export async function createBooking(formData: FormDataProps, token: string | null) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({
      dateFrom: formData.dateFrom,
      dateTo: formData.dateTo,
      guests: Number(formData.guests),
      venueId: formData.venueId,
    }),
  };

  const res = await fetch(`${API_URL}/bookings`, options);
  const data = await res.json();

  return data;
}

export async function updateBooking(formData: FormDataProps, token: string | null, id: string) {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
    nethod: "PUT",
    body: JSON.stringify({
      dateFrom: formData.dateFrom,
      dateTo: formData.dateTo,
      guests: formData.guests,
      venueId: formData.venueId,
    }),
  };
  const res = await fetch(`${API_URL}/bookings/${id}`, options);

  if (!res.ok) throw Error("Failed updating booking.");

  const data = await res.json();

  return data;
}

export async function deleteBooking(token: string | null, id: string) {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
    nethod: "DELETE",
  };
  const res = await fetch(`${API_URL}/bookings/${id}`, options);

  if (!res.ok) throw Error("Failed deleting booking.");

  const data = await res.json();

  return data;
}
