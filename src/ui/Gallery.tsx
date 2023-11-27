import styled from "styled-components";
import placeholder from "../assets/venue-placeholder.svg";

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
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
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

const StyledGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
  margin: 2rem 0;
  border-radius: var(--border-radius);
  overflow: hidden;

  img {
    width: 100%;
    height: 20rem;
    object-fit: cover;
  }

  img:first-child {
    grid-column: 1/3;
    grid-row: 1/3;
    height: 41rem;
  }

  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

function Gallery({ venue }: VenueProp) {
  return (
    <StyledGallery>
      <img src={venue.media[0]} alt={venue.name} />
      <img src={venue.media[0]} alt={venue.name} />
      <img src={venue.media[1] ? venue.media[1] : placeholder} alt={venue.name} />
      <img src={venue.media[2] ? venue.media[2] : placeholder} alt={venue.name} />
      <img src={venue.media[3] ? venue.media[3] : placeholder} alt={venue.name} />
    </StyledGallery>
  );
}

export default Gallery;
