import styled from "styled-components";

import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import TextCenter from "../../ui/TextCenter";
import { format, differenceInDays } from "date-fns";
import { formatCurrency } from "../../utils/formatCurrency";

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

interface DateRangeProps {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface VenueProp {
  venue: VenueProps;
  selectedDateRange: DateRangeProps[];
}

const StyledBookingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;
  padding: 4rem;
  margin: 3rem 0 3rem auto;
  box-shadow: var(--shadow-lg);

  @media only screen and (max-width: 1100px) {
    width: 100%;
    margin: 3rem auto;
  }
`;

function BookingForm({ venue, selectedDateRange }: VenueProp) {
  return (
    <StyledBookingForm>
      <Heading as="h2">{formatCurrency(venue.price)} / night</Heading>

      <label htmlFor="checkin">Check in</label>

      <input type="text" placeholder={`${format(new Date(selectedDateRange[0].startDate), "MM.dd.yyyy")}`} disabled />

      <label>Check out </label>
      <input type="text" placeholder={`${format(new Date(selectedDateRange[0].endDate), "MM.dd.yyyy")}`} disabled />

      <label>Guests </label>
      <input type="number" max={venue.maxGuests} min="1" placeholder="1" />

      <Button variation="secondary">Reserve</Button>
      <TextCenter>
        <p>You won't be charged yet</p>
      </TextCenter>
      <hr />
      <Heading as="h2">
        Total{" "}
        {formatCurrency(differenceInDays(selectedDateRange[0].endDate, selectedDateRange[0].startDate) * venue.price)} /
        night
      </Heading>
      <p>price</p>
    </StyledBookingForm>
  );
}
export default BookingForm;
