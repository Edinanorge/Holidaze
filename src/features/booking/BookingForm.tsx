import { useState } from "react";
import { format, differenceInDays } from "date-fns";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { createBooking } from "../../services/apiBookings";
import { formatCurrency } from "../../utils/formatCurrency";
import toast from "react-hot-toast";

import styled from "styled-components";
import FlexContainer from "../../ui/FlexContainer";
import Input, { StyledDateInput } from "../../ui/Input";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import { useNavigate } from "react-router-dom";
import { GridColsTwo } from "../../ui/Grid";
import { DateRange } from "react-date-range";
import { StyledErrosMessage } from "../authentication/Register";

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

interface VenueProp {
  venue: VenueProps;
  selectedDateRange: DateRangeProps[];
  onDateRangeChange: (newDateRange: DateRangeProps) => void;
}

const StyledBookingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;
  padding: 4rem;
  margin: 3rem 0 3rem auto;
  box-shadow: var(--shadow-lg);
  position: sticky;
  top: 20rem;

  p {
    text-align: center;
  }

  & FlexContainer {
    justify-content: space-between;
  }

  @media only screen and (max-width: 1100px) {
    width: 100%;
    margin: 3rem auto;
  }
`;

function BookingForm({ venue, selectedDateRange, onDateRangeChange }: VenueProp) {
  const navigate = useNavigate();
  const { authToken, userName } = useAuth();

  const form = useForm({
    defaultValues: {
      dateFrom: selectedDateRange[0].startDate,
      dateTo: selectedDateRange[0].endDate,
      guests: 0,
      venueId: venue.id,
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState, setValue } = form;
  const { errors } = formState;
  const [serverErrors, setServerErrors] = useState("");

  const bookedDateRanges = venue.bookings.map((booking) => ({
    startDate: new Date(booking.dateFrom),
    endDate: new Date(booking.dateTo),
    key: booking.id,
  }));

  const disabledDates = (date: Date) => {
    return bookedDateRanges.some(
      (bookedDateRange) =>
        (date >= bookedDateRange.startDate && date <= bookedDateRange.endDate) ||
        date === bookedDateRange.startDate ||
        date === bookedDateRange.endDate
    );
  };

  const handleRangeChange = (range: any) => {
    const selectedDateRange = range.selection;
    onDateRangeChange(selectedDateRange);

    setValue("dateFrom", selectedDateRange.startDate);
    setValue("dateTo", selectedDateRange.endDate);
  };

  const onSubmit = async (formData: any) => {
    console.log(formData);
    if (authToken) {
      //send data to API
      const data = await createBooking(formData, authToken);

      //handling setver errors
      if (data.errors) {
        setServerErrors(data.errors[0].message);
        toast.error(serverErrors);
        console.log(data.errors[0].message);
      } else {
        toast.success("Congratulation. You just booked your dream vacation!.");
        navigate(`/profiles/${userName}/bookings`);
      }
    } else {
      toast.error("You must be logged in to book a venue.");
    }
  };

  return (
    <StyledBookingForm onSubmit={handleSubmit(onSubmit)} noValidate>
      <Heading as="h2">{formatCurrency(venue.price)} / night</Heading>

      <GridColsTwo>
        <StyledDateInput onClick={() => setIsOpen(!isOpen)}>
          <label>Check-in</label>
          <p>{format(selectedDateRange[0].startDate, "dd. MM. yyyy")} </p>
        </StyledDateInput>
        <StyledDateInput>
          <label>Check-out</label>
          <p>{format(selectedDateRange[0].endDate, "dd. MM. yyyy")}</p>
        </StyledDateInput>
      </GridColsTwo>
      {isOpen && (
        <DateRange
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          onChange={handleRangeChange}
          disabledDay={disabledDates}
          ranges={selectedDateRange}
          preventSnapRefocus={false}
          calendarFocus="backwards"
        />
      )}

      <Input
        label="Number of guests"
        id="guests"
        type="number"
        register={register}
        error={errors.guests?.message}
        required={{ value: true, message: "Number of guests is required" }}
      />
      {serverErrors && <StyledErrosMessage>{serverErrors}</StyledErrosMessage>}
      <Button variation="secondary" type="submit">
        Reserve
      </Button>

      <p>You won't be charged yet</p>

      <hr />
      <FlexContainer>
        <p>
          {+differenceInDays(selectedDateRange[0].endDate, selectedDateRange[0].startDate)} night X{" "}
          {formatCurrency(venue.price)}{" "}
        </p>
        <p>
          {formatCurrency(
            +differenceInDays(selectedDateRange[0].endDate, selectedDateRange[0].startDate) * venue.price
          )}
        </p>
      </FlexContainer>
      <FlexContainer>
        <p>Cleaning </p>
        <p>NOK 100.00 </p>
      </FlexContainer>
      <FlexContainer>
        <p>Rental fees </p>
        <p>NOK 50.00 </p>
      </FlexContainer>
      <FlexContainer>
        <Heading as="h2">Total price</Heading>
        <p>
          {" "}
          {formatCurrency(
            +differenceInDays(selectedDateRange[0].endDate, selectedDateRange[0].startDate) * venue.price + 100 + 50
          )}
        </p>
      </FlexContainer>
    </StyledBookingForm>
  );
}
export default BookingForm;
