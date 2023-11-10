import styled from "styled-components";

import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import TextCenter from "../../ui/TextCenter";
import { format } from "date-fns";

interface VenueProps {
  key: string;
  id: string;
  name: string;
  description: string;
  media: string[];
  price: number;
  maxGuests?: number;
  rating: number;
  created: string;
  updated?: string;
  meta: {
    wifi: true;
    parking: true;
    breakfast: true;
    pets: true;
  };
  location: { address: string; city: string; zip: string; country: string; lat: number; lng: number };
  owner: {
    name: string;
    email: string;
    avatar: string;
  };
  bookings: [
    {
      id: string;
      dateFrom: string;
      dateTo: string;
      guests: number;
      created: string;
      updated: string;
    }
  ];
}

interface VenueProp {
  venue: VenueProps;
}

const StyledBookingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 60%;
  padding: 4rem;
  margin: 3rem auto;
  box-shadow: var(--shadow-lg);

  @media only screen and (max-width: 1100px) {
    width: 100%;
  }
`;

function BookingForm({ venue }: VenueProp) {
  return (
    <StyledBookingForm>
      <Heading as="h2">{venue.price} kr / night</Heading>

      <label htmlFor="checkin">Check in</label>
      <input type="date" name="checkin" min={`${format(new Date(), "dd.MM.yyyy")}`}></input>

      <label>Check out </label>
      <input type="date"></input>

      <label>Guests </label>
      <input type="number" max={venue.maxGuests} min="1" placeholder="1"></input>

      <Button variation="primary">Reserve</Button>
      <TextCenter>
        <p>You won't be charged yet</p>
      </TextCenter>
    </StyledBookingForm>
  );
}
export default BookingForm;
