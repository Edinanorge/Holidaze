import styled from "styled-components";
import { GridColsTwo } from "../../ui/Grid";
import Heading from "../../ui/Heading";
//import placeholder from "/placeholder.jpg";
import { FaSquareParking } from "react-icons/fa6";
import { MdFreeBreakfast, MdPets, MdShoppingBasket, MdAirplanemodeActive } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { AiFillStar, AiOutlineWifi } from "react-icons/ai";
import Button from "../../ui/Button";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";

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

const StyledOffersContainer = styled.div`
  margin: 3rem 0;
`;

const StyledOffers = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  margin: 2rem;
  & svg {
    color: var(--color-brand-50);
    font-size: 2rem;
  }
`;
const StyledDetails = styled.div`
  margin: 0 0 3rem 0;
`;

const StyledHosteInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 3rem 0;

  img {
    width: 4rem;
    height: 4rem;
    object-fit: cover;
    border-radius: 100%;
  }
`;
const StyledService = styled.div`
  margin: 3rem 0;

  & button {
    margin-top: 2rem;
  }
`;

const StyledDescription = styled.div`
  margin: 3rem 0;
`;

function Details({ venue }: VenueProp) {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <StyledDetails>
        <Heading as="h2">{venue.name}</Heading>
        <p>
          {venue.maxGuests} guests <BsDot />
          {Math.floor(Math.random() * 10) + 1} room <BsDot />
          {Math.floor(Math.random() * 3) + 1} Bath
        </p>
        <div>
          <AiFillStar /> {venue.rating} reviews
        </div>
      </StyledDetails>
      <hr />
      <StyledHosteInfo>
        <img src={venue.owner.avatar ? venue.owner.avatar : "/placeholder.jpg"} alt="avartar" />
        {isAuthenticated ? (
          <NavLink to={`/profiles/${venue.owner.name}`}>
            <Heading as="h3">Hosted By {venue.owner.name}</Heading>
            <p>Email: {venue.owner.email}</p>
          </NavLink>
        ) : (
          <div>
            <Heading as="h3">Hosted By {venue.owner.name}</Heading>
            <p>Email: {venue.owner.email}</p>
          </div>
        )}
      </StyledHosteInfo>
      <hr />
      <StyledOffersContainer>
        <Heading as="h3">What this place offers</Heading>
        <GridColsTwo>
          <StyledOffers>
            <AiOutlineWifi />
            {venue.meta.wifi === true ? "WIFI" : "NO Wifi"}
          </StyledOffers>
          <StyledOffers>
            <FaSquareParking />
            {venue.meta.parking === true ? "Parking" : "NO Parking"}
          </StyledOffers>
          <StyledOffers>
            <MdFreeBreakfast />
            {venue.meta.breakfast === true ? "Breakfast" : "NO Breakfast"}
          </StyledOffers>
          <StyledOffers>
            <MdPets />
            {venue.meta.pets === true ? "Pets" : "NO Pets"}
          </StyledOffers>
        </GridColsTwo>
      </StyledOffersContainer>

      <hr />
      <StyledDescription>
        <Heading as="h3">About the space</Heading>
        <p>{venue.description}</p>
      </StyledDescription>
      <StyledService>
        <Heading as="h3">Add-on service</Heading>
        <p>After booking this home, a trip designer can arrange any of these add-on services.</p>
        <GridColsTwo>
          <StyledOffers>
            {" "}
            <MdAirplanemodeActive /> Aireport transfer
          </StyledOffers>
          <StyledOffers>
            {" "}
            <MdShoppingBasket /> Pre-stocking
          </StyledOffers>
        </GridColsTwo>
        <p>Not seeing something that you would like to order?</p>
        <Button variation="outline"> Message a trip designer</Button>
      </StyledService>
    </div>
  );
}

export default Details;
