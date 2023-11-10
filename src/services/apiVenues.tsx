import { API_URL } from "../utils/constants.js";

export async function getVenues(limit: number, offset: number) {
  const res = await fetch(`${API_URL}/venues?limit=${limit}&offset=${offset}`);

  if (!res.ok) throw Error("Failed getting venues.");

  const data = await res.json();

  return data;
}

export async function getVenue(id: string | undefined) {
  const res = await fetch(`${API_URL}/venues/${id}?_owner=true&_bookings=true`);

  if (!res.ok) throw Error("Failed getting venue.");

  const data = await res.json();

  return data;
}
