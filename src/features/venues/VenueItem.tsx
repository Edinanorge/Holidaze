import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { NavLink } from "react-router-dom";
import { StyledListItem } from "../../ui/List";
import StyledImage from "../../ui/Image";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";

interface VenueItemProp {
  id: string;
  name: string;
  description: string;
  media: string[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: {
    wifi: true;
    parking: true;
    breakfast: true;
    pets: true;
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
  bookings: [{ id: string; dateFrom: string; dateTo: string; guests: number; created: string; updated: string }];
}

interface VenueItemProps {
  venue: VenueItemProp;
  onDelete: () => void;
  onUpdate: () => void;
}

function VenueItem({ venue, onDelete, onUpdate }: VenueItemProps) {
  return (
    <StyledListItem>
      <StyledImage fullsize={true} src={venue.media[0]} alt="Venue Image" />
      <NavLink to={`/venues/${venue.id}`}>
        <Heading as="h2">{venue.name}</Heading>
        <p>Price: {formatCurrency(venue.price)}</p>
      </NavLink>
      <div>
        <Heading as="h2">Bookings</Heading>
        <div>
          {venue.bookings.length > 0
            ? venue.bookings.map((booking) => (
                <p key={booking.id}>
                  Booked: {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
                </p>
              ))
            : "Available. "}
        </div>
      </div>

      <Button variation="outline" onClick={() => onUpdate()}>
        Edit
      </Button>
      <Button variation="outline" onClick={() => onDelete()}>
        Delete
      </Button>
    </StyledListItem>
  );
}

export default VenueItem;
