import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVenue } from "../../services/apiVenues.tsx";

import styled from "styled-components";
import Container from "../../ui/Container.tsx";
import SkeletonVenuePage from "../../ui/Skeleton/SkeletonVenuePage.tsx";
import Heading from "../../ui/Heading.tsx";
import BookingForm from "../../features/booking/BookingForm.tsx";
import Button from "../../ui/Button.tsx";
import Location from "../../ui/LeafletMap.tsx";
import Details from "../../features/venues/VenueDetails.tsx";

import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { PiMedalFill } from "react-icons/pi";
import { LuShare } from "react-icons/lu";
import { GridColsTwo } from "../../ui/Grid.tsx";
import Gallery from "../../ui/Gallery.tsx";
import BookingDateRangePicker from "../../ui/DateRangePicker.tsx";
import { addDays } from "date-fns";
import Page from "../../ui/Page.tsx";

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

interface DateRangeProps {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface CustomDateRange extends DateRangeProps {}

const StyledVenuePage = styled(Page)`
& .align-left {
  justify-content: end;

  @media only screen and (max-width: 900px) {
    text-align: end;
  }`;

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

  const handleDateRangeChange = (newDateRange: CustomDateRange) => {
    setSelectedDateRange([newDateRange]);
    console.log("Selected Date Range:", newDateRange);
  };

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
              <div>
                <Details venue={venue} />
                <StyledDates>
                  <Heading as="h3">Awailable Dates</Heading>
                  <BookingDateRangePicker
                    bookings={venue.bookings}
                    selectedDateRange={selectedDateRange}
                    onDateRangeChange={handleDateRangeChange}
                  />
                </StyledDates>
              </div>
              <BookingForm
                venue={venue}
                selectedDateRange={selectedDateRange}
                onDateRangeChange={handleDateRangeChange}
              />
            </StyledGridColsTwo>

            <hr />
            <Location position={[venue.location.lat, venue.location.lng]} name={venue.name} />
            <Heading as="h3">
              {venue.location.address}, {venue.location.city}, {venue.location.country}{" "}
            </Heading>
          </div>
        )}
      </Container>
    </StyledVenuePage>
  );
}
export default Venue;
