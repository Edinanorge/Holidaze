import { NavLink } from "react-router-dom";

import { formatDate } from "../../utils/formatDate";
import { StyledHorizontalListItem } from "../../ui/List";
import StyledImage from "../../ui/Image";
import Heading from "../../ui/Heading";

interface BookingProps {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: {
    id: string;
    name: string;
    description: string;
    media: [string];
    price: number;
    maxGuests: number;
    created: string;
    updated: string;
    meta: {
      wifi: boolean;
      parking: boolean;
      breakfast: boolean;
      pets: boolean;
    };
    location: {
      address: string;
      city: string;
      zip: string;
      country: string;
      continent: string;
      lat: number;
      lng: number;
    };
  };
}

interface BookingItemProps {
  booking: BookingProps;
}

function BookingItem({ booking }: BookingItemProps) {
  const { media, location, id } = booking.venue;
  return (
    <StyledHorizontalListItem key={booking.id}>
      <StyledImage src={media[0]} alt="Venue image" />
      <NavLink to={`/venues/${id}`}>
        <Heading as="h2">{location.country != "Unknown" ? location.country : booking.venue.name}</Heading>
        <p>{location.address}</p>

        <p>
          From <b>{formatDate(booking.dateFrom)}</b>
        </p>
        <p>
          To <b>{formatDate(booking.dateTo)}</b>
        </p>
      </NavLink>
    </StyledHorizontalListItem>
  );
}
export default BookingItem;
