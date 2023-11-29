import { API_URL } from "../utils/constants.js";

interface FormDataProps {
  name: string;
  description: string;
  media: string[];
  price: number;
  maxGuests: number;
  rating: number;
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}
export async function getAllVenues() {
  const res = await fetch(`${API_URL}/venues?_bookings=true`);

  if (!res.ok) throw Error("Failed getting venues.");

  const data = await res.json();

  return data;
}

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

export async function createVenue(formData: FormDataProps, token: string | null) {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name: formData.name,
      description: formData.description,
      media: [formData.media],
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      rating: Number(formData.rating),
      meta: {
        wifi: formData.wifi,
        parking: formData.parking,
        breakfast: formData.breakfast,
        pets: formData.pets,
      },
      location: {
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
        country: formData.country,
        continent: formData.continent,
        lat: Number(formData.lat),
        lng: Number(formData.lng),
      },
    }),
  };
  const res = await fetch(`${API_URL}/venues`, options);
  const data = await res.json();

  return data;
}

export async function updateVenue(formData: FormDataProps, id: string, token: string | null) {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      name: formData.name,
      description: formData.description,
      media: [formData.media],
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      rating: Number(formData.rating),
      meta: {
        wifi: formData.wifi,
        parking: formData.parking,
        breakfast: formData.breakfast,
        pets: formData.pets,
      },
      location: {
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
        country: formData.country,
        continent: formData.continent,
        lat: Number(formData.lat),
        lng: Number(formData.lng),
      },
    }),
  };
  const res = await fetch(`${API_URL}/venues/${id}`, options);
  const data = await res.json();

  return data;
}

export async function deleteVenue(id: string, token: string | null) {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "DELETE",
  };
  const res = await fetch(`${API_URL}/venues/${id}`, options);
  const data = await res.json();

  return data;
}
