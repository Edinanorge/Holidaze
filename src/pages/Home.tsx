import styled from "styled-components";
import Container from "../ui/Container";

import Button from "../ui/Button";
import Heading from "../ui/Heading";
import { getVenues } from "../services/apiVenues";
import { useEffect, useState } from "react";

import TextCenter from "../ui/TextCenter";
import { PAGE_LIMIT } from "../utils/constants.js";
import SkeletonVenueList from "../ui/Skeleton/SkeletonHomePage.js";
import VenuesList from "../features/venues/VenueList";

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
}

const StyledHome = styled.main`
  padding: 18rem 0 10rem 0;
`;

function Home() {
  const [venues, setVenues] = useState<VenueProps[]>([]);
  const [pageOffset, setPageOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const data = await getVenues(PAGE_LIMIT, pageOffset);
    setVenues(Array.prototype.concat(venues, data));
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 3000);
  }, [pageOffset]);

  return (
    <StyledHome>
      <Container>
        {venues && <VenuesList venues={venues} />}
        {loading && <SkeletonVenueList key="skeleton" />}

        <TextCenter>
          <Heading as="h2">Continue exploring beautiful homes</Heading>
          <Button
            variation="dark"
            onClick={() => {
              setLoading(true);
              setPageOffset((pageOffset) => pageOffset + PAGE_LIMIT);
            }}
          >
            Show more
          </Button>
        </TextCenter>
      </Container>
    </StyledHome>
  );
}

export default Home;
