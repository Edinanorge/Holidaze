import { API_URL } from "../utils/constants.js";

export async function getProfiles() {
  const res = await fetch(`${API_URL}/profiles`);

  if (!res.ok) throw Error("Failed getting profiles.");

  const data = await res.json();

  return data;
}

export async function getProfile(name: string | undefined, token: string | null) {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(`${API_URL}/profiles/${name}`, options);

  if (!res.ok) throw Error("Failed getting profile.");

  const data = await res.json();

  return data;
}

export async function updateProfile(token: string | null, name: string | null) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: JSON.stringify({ venueManager: true }),
  };

  const res = await fetch(`${API_URL}/profiles/${name}`, options);
  const data = await res.json();

  return data;
}

export async function updateAvatar(token: string | null, name: string | null, formData: { avatar: string }) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: JSON.stringify(formData),
  };

  const res = await fetch(`${API_URL}/profiles/${name}/media`, options);
  const data = await res.json();

  return data;
}

export async function getBookings(name: string | null, token: string | null) {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(`${API_URL}/profiles/${name}/bookings?_customer=true&_venue=true`, options);

  if (!res.ok) throw Error("Failed getting bookings.");

  const data = await res.json();

  return data;
}

export async function getVenues(name: string | null, token: string | null) {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(`${API_URL}/profiles/${name}/venues?_owner=true&_bookings=true`, options);

  if (!res.ok) throw Error("Failed getting venues.");

  const data = await res.json();

  return data;
}
