import { useState } from "react";
import { useForm } from "react-hook-form";

import Modal from "../../ui/Modal";

import { createVenue } from "../../services/apiVenues";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import { StyledErrosMessage } from "../authentication/Register";
import Button from "../../ui/Button";
import { GridAuto, GridCols, GridColsTwo } from "../../ui/Grid";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import FlexContainer, { StyledFlexContainer } from "../../ui/FlexContainer";
import { ListHorizonlat, ListVertical } from "../../ui/List";
import { Row } from "../../ui/Row";

interface FormDataProps {
  name: string;
  description: string;
  media: string[];
  price: number;
  maxGuests: number;
  rating: number;
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

export function CreteVenueForm() {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const form = useForm<FormDataProps>({
    defaultValues: {
      name: "",
      description: "",
      media: [],
      price: undefined,
      maxGuests: undefined,
      rating: 0,
      wifi: true,
      parking: true,
      breakfast: true,
      pets: true,
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0,
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [serverErrors, setServerErrors] = useState("");

  const onSubmit = async (formData: FormDataProps) => {
    //send data to API
    const data = await createVenue(formData, authToken);

    //handling setver errors
    if (data.errors) {
      setServerErrors(data.errors[0].message);
    } else {
      navigate(`/venues/${data.id}`);
    }
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Heading as="h1">Create new venue </Heading>

        <Input
          label="Venue Title*"
          id="name"
          type="text"
          register={register}
          error={errors.name?.message}
          required={{ value: true, message: "Venue name is required" }}
        />

        <Input
          label="Description*"
          id="description"
          type="text"
          register={register}
          error={errors.description?.message}
          required={{ value: true, message: "Venue description is required" }}
        />

        <Input
          label="Image(url)"
          id="media"
          type="text"
          register={register}
          error={errors.media?.message}
          required={{ value: true, message: "Media is required." }}
        />
        <Row>
          <Input
            label="Price*"
            id="price"
            type="number"
            register={register}
            error={errors.price?.message}
            required={{ value: true, message: "Price is required" }}
          />
          <Input
            label="Maximum guests*"
            id="maxGuests"
            type="number"
            min={1}
            register={register}
            error={errors.maxGuests?.message}
            required={{ value: true, message: "Number of maximus guests required" }}
          />
        </Row>
        <Input label="Rating" id="rating" type="number" register={register} error={errors.rating?.message} />

        <Heading as="h2">Services: </Heading>

        <div>
          <Input label="Wifi" id="wifi" type="checkbox" register={register} error={errors.wifi?.message} />
          <Input label="Parking" id="parking" type="checkbox" register={register} error={errors.parking?.message} />

          <Input
            label="Breakfast"
            id="breakfast"
            type="checkbox"
            register={register}
            error={errors.breakfast?.message}
          />
          <Input label="Pets" id="pets" type="checkbox" register={register} error={errors.pets?.message} />
        </div>

        <Heading as="h2">Location: </Heading>
        <Input label="Address" id="address" type="text" register={register} error={errors.address?.message} />
        <Input label="City" id="city" type="text" register={register} error={errors.city?.message} />
        <Input label="Zip code" id="zip" type="text" register={register} error={errors.zip?.message} />
        <Input label="Country " id="country" type="text" register={register} error={errors.country?.message} />
        <Input label="Continent " id="continent" type="text" register={register} error={errors.continent?.message} />
        <Row>
          <Input label="Lat" id="lat" type="number" register={register} error={errors.lat?.message} />
          <Input label="Lng" id="lng" type="number" register={register} error={errors.lng?.message} />
        </Row>
        {serverErrors && <StyledErrosMessage>{serverErrors}</StyledErrosMessage>}
        <Button variation="primary" type="submit">
          Continue
        </Button>
      </form>
    </Modal>
  );
}
export default CreteVenueForm;
