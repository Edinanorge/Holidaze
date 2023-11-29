import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { GridColsTwo } from "../../ui/Grid";
import Button from "../../ui/Button";

import { updateVenue } from "../../services/apiVenues";
import { StyledErrosMessage } from "../authentication/Register";

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
  id: string;
}

function UpdateVenueForm() {
  const navigate = useNavigate();
  const { userName } = useAuth();
  const { state: venue } = useLocation();
  const { authToken } = useAuth();
  const form = useForm<FormDataProps>({
    defaultValues: {
      name: venue.name ?? "",
      description: venue.description ?? "",
      media: venue.media ?? [],
      price: venue.price ?? 0,
      maxGuests: venue.maxGuests ?? 1,
      rating: venue.rating ?? 0,
      wifi: venue.meta.wifi ?? false,
      parking: venue.meta.parking ?? false,
      breakfast: venue.meta.breakfast ?? false,
      pets: venue.meta.pets ?? false,
      address: venue.location.address ?? "",
      city: venue.location.city ?? "",
      zip: venue.location.zip ?? "",
      country: venue.location.country ?? "",
      continent: venue.location.continent ?? "",
      lat: venue.location.lat ?? 0,
      lng: venue.location.lng ?? 0,
      id: venue.id,
    },
  });
  console.log("Venue", venue);
  console.log("Form", form);
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [serverErrors, setServerErrors] = useState("");

  const onSubmit = async (formData: FormDataProps) => {
    const data = await updateVenue(formData, venue.id, authToken);
    //handling server errors
    if (data.errors) {
      setServerErrors(data.errors[0].message);
    } else {
      setServerErrors("");
      navigate(`/profiles/${userName}/venues`);
    }
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Heading as="h1">Update venue </Heading>

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
        <GridColsTwo>
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
            register={register}
            error={errors.maxGuests?.message}
            required={{ value: true, message: "Number of maximus guests required" }}
          />
        </GridColsTwo>
        <Input label="Rating" id="rating" type="number" register={register} error={errors.rating?.message} />

        <Heading as="h2">Services: </Heading>

        <GridColsTwo>
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
        </GridColsTwo>

        <Heading as="h2">Location: </Heading>
        <Input label="Address" id="address" type="text" register={register} error={errors.address?.message} />
        <Input label="City" id="city" type="text" register={register} error={errors.city?.message} />
        <Input label="Zip code" id="zip" type="text" register={register} error={errors.zip?.message} />
        <Input label="Country " id="country" type="text" register={register} error={errors.country?.message} />
        <Input label="Continent " id="continent" type="text" register={register} error={errors.continent?.message} />
        <GridColsTwo>
          <Input label="Lat" id="lat" type="number" register={register} error={errors.lat?.message} />
          <Input label="Lng" id="lng" type="number" register={register} error={errors.lng?.message} />
        </GridColsTwo>
        {serverErrors && <StyledErrosMessage>{serverErrors}</StyledErrosMessage>}
        <Button variation="primary" type="submit">
          Continue
        </Button>
      </form>
    </Modal>
  );
}
export default UpdateVenueForm;
