import styled from "styled-components";
import Container from "../ui/Container";
import SkeletonVenuePage from "../ui/Skeleton/SkeletonVenuePage";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVenue } from "../services/apiVenues";
import Heading from "../ui/Heading";
import { AiFillStar, AiOutlineHeart, AiOutlineWifi } from "react-icons/ai";
import { PiMedalFill } from "react-icons/pi";
import { LuShare } from "react-icons/lu";
import { GridColsTwo } from "../ui/Grid";
import placeholder from "../assets/venue-placeholder.svg";
import BookingForm from "../features/booking/BookingForm";
import { FaSquareParking } from "react-icons/fa6";
import { MdFreeBreakfast, MdPets } from "react-icons/md";
import Button from "../ui/Button";
import { BsDot } from "react-icons/bs";

import VenuesList from "../features/venues/VenueList";
import DateRangePicker from "../ui/DateRangePicker";

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

const StyledVenuePage = styled.main`
  padding: 16rem 0;

  h1 {
    text-align: start;
  }

  img {
    width: 50%;
    height: 40rem;
    object-fit: cover;
  }

  & .align-left {
    justify-content: end;

    @media only screen and (max-width: 900px) {
      text-align: end;
    }
  }
`;

const GridItem = styled.div`
  display: flex;
  gap: 1rem;

  @media only screen and (max-width: 900px) {
    display: block;
  }
`;
const StyledGridColsTwo = styled(GridColsTwo)`
  align-items: start;
  gap: 3rem;
`;

const Gallery = styled.div`
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

const StyledOffersContainer = styled.div`
  margin: 3rem 0;
`;

const StyledOffers = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-top: 2rem;
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

  & img {
    width: 4rem;
    height: 4rem;
    object-fit: cover;
    border-radius: 100%;
  }
`;

const StyledLocation = styled.div`
  margin: 3rem 0;
`;
const StyledDescription = styled.div`
  margin: 3rem 0;
`;
const StyledDates = styled.div`
  margin: 3rem 0;
  & h3 {
    margin-bottom: 2rem;
  }
`;

function Venue() {
  const [venue, setVenue] = useState<VenueProps>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchData = async () => {
    const data = await getVenue(id);
    setLoading(false);
    setVenue(data);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);
  console.log(venue);

  return (
    <StyledVenuePage>
      <Container>
        {loading && <SkeletonVenuePage />}
        {venue && (
          <div>
            <Heading as="h1">{venue.name} </Heading>
            <GridColsTwo>
              <GridItem>
                <div>
                  <AiFillStar /> {venue.rating} reviews
                </div>
                <div>
                  <PiMedalFill />
                  Superhost: {venue.owner.name}, {venue.location.city}, {venue.location.country.toUpperCase()}
                </div>
              </GridItem>
              <GridItem className="align-left">
                <div>
                  <LuShare />
                  <Button variation="default">Share</Button>
                </div>
                <div>
                  <AiOutlineHeart />
                  <Button variation="default">Save</Button>
                </div>
              </GridItem>
            </GridColsTwo>
            <Gallery>
              <img src={venue.media[0]} alt={venue.name} />
              <img src={venue.media[0]} alt={venue.name} />
              <img src={venue.media[1] ? venue.media[1] : placeholder} alt={venue.name} />
              <img src={venue.media[2] ? venue.media[2] : placeholder} alt={venue.name} />
              <img src={venue.media[3] ? venue.media[3] : placeholder} alt={venue.name} />
            </Gallery>
            <StyledGridColsTwo>
              <div>
                <StyledDetails>
                  <Heading as="h2">{venue.name}</Heading>
                  <p>
                    {venue.maxGuests} guests <BsDot /> 1 room <BsDot /> 1 Bath
                  </p>
                  <div>
                    <AiFillStar /> {venue.rating} reviews
                  </div>
                </StyledDetails>
                <hr />
                <StyledHosteInfo>
                  <img src={venue.owner.avatar} alt="avartar" />
                  <div>
                    <Heading as="h3">Hosted By {venue.owner.name}</Heading>
                    <p>Email: {venue.owner.email}</p>
                  </div>
                </StyledHosteInfo>
                <hr />
                <StyledOffersContainer>
                  <Heading as="h3">What this place offers</Heading>
                  <GridColsTwo>
                    <StyledOffers>
                      <AiOutlineWifi />
                      {venue.meta.wifi ? "WIFI" : "NoWifi"}
                    </StyledOffers>
                    <StyledOffers>
                      <FaSquareParking />
                      {venue.meta.parking ? "Parking" : "NO Parking"}
                    </StyledOffers>
                    <StyledOffers>
                      <MdFreeBreakfast />
                      {venue.meta.breakfast ? "Breakfast" : "NO Breakfast"}
                    </StyledOffers>
                    <StyledOffers>
                      <MdPets />
                      {venue.meta.pets ? "Pets" : "NO Pets"}
                    </StyledOffers>
                  </GridColsTwo>
                </StyledOffersContainer>
                <hr />
                <StyledLocation>
                  <Heading as="h3">Where this place is</Heading>
                  <p>Address: {venue.location.address}</p>
                  <p>City: {venue.location.city}</p>
                  <p>Country: {venue.location.country}</p>
                </StyledLocation>
                <hr />
                <StyledDescription>
                  <Heading as="h3">About the space</Heading>
                  <p>{venue.description}</p>
                </StyledDescription>
                <StyledDates>
                  <Heading as="h3">Awailable Dates</Heading>
                  <DateRangePicker bookings={venue.bookings} />
                </StyledDates>
              </div>
              <div>
                <BookingForm venue={venue} />
              </div>
            </StyledGridColsTwo>
          </div>
        )}
      </Container>
    </StyledVenuePage>
  );
}
export default Venue;
