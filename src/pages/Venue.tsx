import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVenue } from "../services/apiVenues";

import styled from "styled-components";
import Container from "../ui/Container";
import SkeletonVenuePage from "../ui/Skeleton/SkeletonVenuePage";
import Heading from "../ui/Heading";
import BookingForm from "../features/booking/BookingForm.tsx";
import Button from "../ui/Button";
import Location from "../ui/LeafletMap.tsx";
import Details from "../features/venues/VenueDetails.tsx";

import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { PiMedalFill } from "react-icons/pi";
import { LuShare } from "react-icons/lu";
import { GridColsTwo } from "../ui/Grid";
import Gallery from "../ui/Gallery.tsx";
import BookingDateRangePicker from "../ui/DateRangePicker";
import { addDays } from "date-fns";

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

const StyledVenuePage = styled.main`
  padding: 16rem 0;

  h1 {
    text-align: start;
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

  @media only screen and (max-width: 900px) {
    display: block;
  }
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
  const [selectedDateRange, setSelectedDateRange] = useState<DateRangeProps[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const handleDateRangeChange = (newDateRange: DateRangeProps) => {
    setSelectedDateRange([newDateRange]);

    console.log("Selected Date Range:", newDateRange);
  };

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
            <Gallery venue={venue} />
            <StyledGridColsTwo>
              <Details venue={venue} />
              <BookingForm venue={venue} selectedDateRange={selectedDateRange} />
            </StyledGridColsTwo>
            <hr />
            <StyledDates>
              <Heading as="h3">Awailable Dates</Heading>
              <BookingDateRangePicker
                bookings={venue.bookings}
                selectedDateRange={selectedDateRange}
                onDateRangeChange={handleDateRangeChange}
              />
            </StyledDates>

            <hr />
            <Location position={[venue.location.lat, venue.location.lng]} name={venue.name} />
          </div>
        )}
      </Container>
    </StyledVenuePage>
  );
}
export default Venue;
