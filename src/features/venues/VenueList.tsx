import styled from "styled-components";
import Heading from "../../ui/Heading.js";

import { formatDate } from "../../utils/formatDate.js";
import { AiFillStar } from "react-icons/ai";
import { GridAuto } from "../../ui/Grid.js";
import { Link } from "react-router-dom";

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

const StyledVenue = styled.li`
  list-style: none;
  z-index: -1;
`;

const VenueImage = styled.img`
  width: 100%;
  height: 25rem;
  object-fit: cover;
  background-color: var(--color-gray-200);
  border-radius: var(--border-radius);
`;

const VenueContent = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;

  & span {
    margin: 0;
    font-size: 1.4rem;
    color: #444;
  }

  p {
    margin-top: 0.6rem;
  }
`;

function Venue({ id, name, media, price, created, rating, location, maxGuests }: VenueProps) {
  return (
    <Link to={`/venues/${id}`}>
      <StyledVenue>
        <VenueImage src={media[0] ? media[0] : "/venue-placeholder.svg"} alt={name} loading="lazy" />
        <VenueContent>
          <div>
            <Heading as="h2">{name}</Heading>
            <span>Maximum guests: {maxGuests}</span>
            <p>
              Created: {formatDate(created)} | {location.country === "Unknown" ? "" : location.country}
            </p>
            <Heading as="h3">
              {price} kr /<span>night</span>
            </Heading>
          </div>
          {rating > 0 && (
            <span>
              <AiFillStar />
              {rating}
            </span>
          )}
        </VenueContent>
      </StyledVenue>
    </Link>
  );
}

function VenuesList({ venues }: { venues: VenueProps[] }) {
  return (
    <GridAuto>
      {venues.map((venue) => (
        <Venue
          key={venue.id}
          name={venue.name}
          created={venue.created}
          media={venue.media}
          price={venue.price}
          id={venue.id}
          rating={venue.rating}
          description={venue.description}
          location={venue.location}
          meta={venue.meta}
          owner={venue.owner}
          bookings={venue.bookings}
          maxGuests={venue.maxGuests}
        />
      ))}
    </GridAuto>
  );
}
export default VenuesList;
