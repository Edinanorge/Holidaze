import styled from "styled-components";
import Heading from "../../ui/Heading.js";
import image from "../../assets/placeholder.jpg";
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
  justify-content: space-between;

  & span {
    font-size: 1.4rem;
    color: #444;
  }
`;

function Venue({ id, name, media, price, created, rating }: VenueProps) {
  return (
    <Link to={`/venues/${id}`}>
      <StyledVenue>
        <VenueImage src={media[0] ? media[0] : image} alt={name} loading="lazy" />
        <VenueContent>
          <div>
            <Heading as="h2">{name}</Heading>
            <span>{formatDate(created)}</span>
            <Heading as="h2">
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
        />
      ))}
    </GridAuto>
  );
}
export default VenuesList;
