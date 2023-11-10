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
import { useSearch } from "../context/searchContext.js";
import { set } from "date-fns";

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

const StyledHome = styled.main`
  padding: 18rem 0 10rem 0;
`;

// function Home() {
//   const { searchValue } = useSearch();
//   const [venues, setVenues] = useState<VenueProps[]>([]);
//   const [pageOffset, setPageOffset] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const fetchData = async () => {
//     setLoading(true);
//     const data = await getVenues(PAGE_LIMIT, pageOffset);
//     setVenues(Array.prototype.concat(venues, data));
//     setLoading(false);
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       fetchData();
//     }, 1000);
//   }, [pageOffset]);

//   return (
//     <StyledHome>
//       <Container>
//         {loading && <SkeletonVenueList />}
//         {venues && <VenuesList venues={venues} />}

//         <TextCenter>
//           <Heading as="h4">Continue exploring beautiful homes</Heading>
//           <Button
//             variation="dark"
//             onClick={() => {
//               setLoading(true);
//               setPageOffset((pageOffset) => pageOffset + PAGE_LIMIT);
//             }}
//           >
//             Show more
//           </Button>
//         </TextCenter>
//       </Container>
//     </StyledHome>
//   );
// }

// export default Home;

function Home() {
  const { searchValue } = useSearch();
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

  // Filter venues based on search criteria
  const filteredVenues = venues.filter((venue) => {
    // Check if the country in venue location includes the search destination
    const countryMatches = venue.location.country.toLowerCase().includes(searchValue.destination.toLowerCase());

    // Check if the city in venue location includes the search destination
    const cityMatches = venue.location.city.toLowerCase().includes(searchValue.destination.toLowerCase());

    // Check if the address in venue location includes the search destination
    const addressMatches = venue.location.address.toLowerCase().includes(searchValue.destination.toLowerCase());

    // Check if the venue's maxGuests is greater than or equal to the sum of adult and children guests
    const guestLimit = venue.maxGuests >= searchValue.guests.adult;

    // Check if the venue's date range intersects with the search date range

    // Return true if any condition is met
    return (countryMatches || cityMatches || addressMatches) && guestLimit;
  });
  console.log(filteredVenues);
  return (
    <StyledHome>
      <Container>
        {loading && <SkeletonVenueList />}
        {searchValue.destination === "" ? (
          <VenuesList venues={venues} />
        ) : filteredVenues.length === 0 ? (
          <p>No venues match the current search criteria.</p>
        ) : (
          <VenuesList venues={filteredVenues} />
        )}
        <TextCenter>
          <Heading as="h4">Continue exploring beautiful homes</Heading>
          <Button
            variation="dark"
            onClick={() => {
              setLoading(true);
              setPageOffset((prevOffset) => prevOffset + PAGE_LIMIT);
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
