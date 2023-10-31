import styled from "styled-components";
import Container from "../ui/Container";
import SkeletonVenuePage from "../ui/Skeleton/SkeletonVenuePage";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVenue } from "../services/apiVenues";
import Heading from "../ui/Heading";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { PiMedalFill } from "react-icons/pi";
import { LuShare } from "react-icons/lu";
import { GridColsTwo } from "../ui/Grid";

interface VenueProps {
  created: string;
  description: string;
  id: string;
  location: { address: string; city: string; zip: string; country: string; lat: number; lng: number };
  maxGuests: number;
  media: string[];
  meta: { breakfast: boolean; parking: boolean; pets: boolean; wifi: boolean };
  name: string;
  owner: { name: string; email: string; avatar: string };
  price: number;
  rating: number;
  updated: string;
}

const StyledVenuePage = styled.main`
  padding: 16rem 0;
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
    }, 3000);
  }, []);
  console.log(venue);
  return (
    <StyledVenuePage>
      <Container>
        {loading && <SkeletonVenuePage />}
        {venue && (
          <div>
            <Heading as="h1">{venue.name}</Heading>
            <div>
              <span>
                <AiFillStar /> {venue.rating} reviews
              </span>
              <span>
                <PiMedalFill />
                {venue.owner.name}, {venue.location.city}, {venue.location.country}
              </span>
            </div>
            <div>
              <span>
                <LuShare />
                Share
              </span>
              <span>
                <AiOutlineHeart />
                Save
              </span>
            </div>
            <img src={venue.media[0]} alt={venue.name} />
            <GridColsTwo>
              <div>
                <Heading as="h2">{venue.name}</Heading>
                <p>{venue.description}</p>
              </div>
            </GridColsTwo>
          </div>
        )}
      </Container>
    </StyledVenuePage>
  );
}
export default Venue;
