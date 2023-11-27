import { useState } from "react";
import { format, differenceInDays } from "date-fns";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { createBooking } from "../../services/apiBookings";
import { formatCurrency } from "../../utils/formatCurrency";
import toast from "react-hot-toast";

import styled from "styled-components";
import FlexContainer from "../../ui/FlexContainer";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import { useNavigate } from "react-router-dom";

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
}

interface FormDataProps {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}

const StyledBookingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;
  padding: 4rem;
  margin: 3rem 0 3rem auto;
  box-shadow: var(--shadow-lg);

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

function BookingForm({ venue, selectedDateRange }: VenueProp) {
  const navigate = useNavigate();
  const { authToken, userName } = useAuth();
  const form = useForm({
    defaultValues: {
      dateFrom: format(selectedDateRange[0].startDate, "MM/dd/yyyy"),
      dateTo: format(selectedDateRange[0].endDate, "MM/dd/yyyy"),
      guests: 1,
      venueId: venue.id,
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [serverErrors, setServerErrors] = useState("");

  const onSubmit = async (formData: FormDataProps) => {
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
        navigate(`/profiles/${userName}`);
      }
    } else {
      toast.error("You must be logged in to book a venue.");
    }
  };

  return (
    <StyledBookingForm onSubmit={handleSubmit(onSubmit)} noValidate>
      <Heading as="h2">{formatCurrency(venue.price)} / night</Heading>

      <Input
        label="Check In"
        id="dateFrom"
        type="date"
        register={register}
        error={errors.dateFrom?.message}
        required={{ value: true, message: "Checkin date is required" }}
      />

      <Input
        label="Check Out"
        id="dateTo"
        type="date"
        register={register}
        error={errors.dateTo?.message}
        required={{ value: true, message: "Checkout date is required" }}
      />

      <Input
        label="Number of guests"
        id="guests"
        type="number"
        register={register}
        error={errors.guests?.message}
        required={{ value: true, message: "Number of guests is required" }}
      />

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
