import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { getBookings } from "../../services/apiProfile";

import Heading from "../../ui/Heading";
import SkeletonBookingPage from "../../ui/Skeleton/SkeletonBookingsPage";
import Container from "../../ui/Container";
import BookingItem from "../../features/booking/BookingItem";
import Page from "../../ui/Page";
import { ListHorizonlat } from "../../ui/List";

interface BookingProps {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: {
    id: string;
    name: string;
    description: string;
    media: [string];
    price: number;
    maxGuests: number;
    created: string;
    updated: string;
    meta: {
      wifi: boolean;
      parking: boolean;
      breakfast: boolean;
      pets: boolean;
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
  };
}

function BookingByProfile() {
  const [bookings, setBookings] = useState<BookingProps[]>();
  const [loading, setLoading] = useState(true);
  const { userName, authToken } = useAuth();

  const fetchData = async () => {
    const data = await getBookings(userName, authToken);
    setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  return (
    <Page>
      <Container>
        <Heading as="h1">Bookings</Heading>
        {loading && <SkeletonBookingPage />}
        {bookings && (
          <ListHorizonlat>
            {bookings?.length > 0 ? (
              bookings.map((booking) => <BookingItem key={booking.id} booking={booking} />)
            ) : (
              <p>You don't have any bookings.</p>
            )}
          </ListHorizonlat>
        )}

        <hr />
        <p>
          Can’t find your reservation here?<NavLink to="#"> Visit the Help Center</NavLink>{" "}
        </p>
      </Container>
    </Page>
  );
}

export default BookingByProfile;
