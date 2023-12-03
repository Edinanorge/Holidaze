import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "../../ui/Container";
import { GridColsTwo } from "../../ui/Grid";
import Page from "../../ui/Page";
import Input, { StyledDateInput } from "../../ui/Input";
import { useForm } from "react-hook-form";

import styled from "styled-components";
import { format } from "date-fns";
import Button from "../../ui/Button";
import VenuesList from "./VenueList";
import { getAllVenues } from "../../services/apiVenues";
import SkeletonVenueList from "../../ui/Skeleton/SkeletonHomePage";
import FlexContainer from "../../ui/FlexContainer";
import { DateRange } from "react-date-range";

const StyledGridColsTwo = styled(GridColsTwo)`
  grid-template-columns: 1.5fr 3fr;
  gap: 4rem;
  align-items: start;

  @media only screen and (max-width: 700px) {
    display: block;
  }
`;

const StyledForm = styled.form`
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius);
  background-color: var(--color-gray-0);
  border: var(--border);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: sticky;
  top: 10rem;
  margin-bottom: 3rem;

  @media only screen and (max-width: 700px) {
    position: static;
  }
`;

interface FormDataProps {
  destination: string;
  dateRange: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  guests: number;
  rating: number;
  wifi: boolean;
  parking: boolean;
  pets: boolean;
  breakfast: boolean;
}

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

function Venues() {
  const location = useLocation();

  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dateRange, setDateRange] = useState({
    startDate: location.state.dateRange.startDate,
    endDate: location.state.dateRange.endDate,
    key: "selection",
  });
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      destination: location.state.destination ?? "",
      dateRange: {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        key: "selection",
      },
      guests: location.state.guests.adult + location.state.guests.children,
      rating: 0,
      wifi: false,
      parking: false,
      pets: false,
      breakfast: false,
    },
  });

  const { register, handleSubmit, formState, setValue, getValues } = form;
  const { errors } = formState;

  const fetchData = async () => {
    setLoading(true);
    const data = await getAllVenues();
    setVenues(data);
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  const handleSelect = (ranges: any) => {
    setDateRange(ranges.selection);
    setValue("dateRange", {
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: "selection",
    });
  };

  const onSubmit = (formData: FormDataProps): void => {
    filterVenues(formData);
  };

  const filterVenues = (formData: FormDataProps) => {
    const newFilteredVenues = venues.filter((venue: VenueItemProp) => {
      const ratingMatch = venue.rating >= formData.rating;
      const guestLimitMatch = venue.maxGuests >= formData.guests;
      const wifiMatch = venue.meta.wifi === formData.wifi;
      const parkingMatch = venue.meta.parking === formData.parking;
      const petMatch = venue.meta.pets === formData.pets;
      const breakFastMatch = venue.meta.breakfast === formData.breakfast;

      if (formData.destination === "") {
        // If destination is empty, return venues that match any criteria
        return ratingMatch || guestLimitMatch || wifiMatch || parkingMatch || petMatch || breakFastMatch;
      } else {
        // If destination is set, apply destination-related checks
        const destinationLower = formData.destination.toLowerCase();
        const countryMatches = venue.location.country.toLowerCase().includes(destinationLower);
        const cityMatches = venue.location.city.toLowerCase().includes(destinationLower);
        const addressMatches = venue.location.address.toLowerCase().includes(destinationLower);

        return (
          (cityMatches || countryMatches || addressMatches) &&
          guestLimitMatch &&
          (wifiMatch || parkingMatch || petMatch || breakFastMatch) &&
          ratingMatch
        );
      }
    });

    setFilteredVenues(newFilteredVenues);
  };

  return (
    <Page>
      <Container>
        <StyledGridColsTwo>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Destination"
              type="text"
              id="destination"
              register={register}
              error={errors.destination?.message}
            />
            <GridColsTwo>
              <StyledDateInput onClick={() => setIsOpen(!isOpen)}>
                <label>Check-in</label>
                <p>{format(dateRange.startDate, "dd. MM. yyyy")} </p>
              </StyledDateInput>
              <StyledDateInput>
                <label>Check-out</label>
                <p>{format(dateRange.endDate, "dd. MM. yyyy")}</p>
              </StyledDateInput>
            </GridColsTwo>
            {isOpen && (
              <DateRange
                editableDateInputs={true}
                onChange={handleSelect}
                ranges={[dateRange]}
                moveRangeOnFirstSelection={false}
                minDate={new Date()}
              />
            )}

            <GridColsTwo>
              <Input
                type="number"
                label="Number of guests"
                id="guests"
                register={register}
                required={{ value: true, message: "Number of guests is required" }}
                error={errors.guests?.message}
              />

              <Input
                type="number"
                label="Rating"
                register={register}
                id="rating"
                min={0}
                max={5}
                required={{ value: true, message: "Rating is required" }}
                error={errors.rating?.message}
              />
            </GridColsTwo>

            <FlexContainer>
              <Input label="Wifi" id="wifi" type="checkbox" register={register} />
              <Input label="Parking" id="parking" type="checkbox" register={register} />
              <Input label="Breakfast" id="breakfast" type="checkbox" register={register} />
              <Input label="Pets" id="pets" type="checkbox" register={register} />
            </FlexContainer>

            <Button variation="secondary">Search</Button>
          </StyledForm>
          {loading && <SkeletonVenueList />}

          {filteredVenues.length !== 0 ? <VenuesList venues={filteredVenues} /> : <p>No match</p>}
        </StyledGridColsTwo>
      </Container>
    </Page>
  );
}
export default Venues;
