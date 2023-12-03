import Container from "../ui/Container";

import Button from "../ui/Button";
import Heading from "../ui/Heading";
import { getVenues } from "../services/apiVenues";
import { useEffect, useState } from "react";

import TextCenter from "../ui/TextCenter";
import { PAGE_LIMIT } from "../utils/constants.js";
import SkeletonVenueList from "../ui/Skeleton/SkeletonHomePage.js";
import VenuesList from "../features/venues/VenueList";
import Page from "../ui/Page.js";

interface VenueProps {
  key: string;
  id: string;
  name: string;
  description: string;
  media: string[];
  price: number;
  maxGuests: number;
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
    }, 1000);
  }, [pageOffset]);

  return (
    <Page>
      <Container>
        {venues && <VenuesList venues={venues} />}
        {loading && <SkeletonVenueList />}
        <TextCenter>
          <Heading as="h4">Continue exploring beautiful homes...</Heading>
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
    </Page>
  );
}

export default Home;
