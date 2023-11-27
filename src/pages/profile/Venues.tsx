import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { getVenues } from "../../services/apiProfile";
import Container from "../../ui/Container";
import Page from "../../ui/Page";
import SkeletonVenuesPage from "../../ui/Skeleton/SkeletonVenuesPage";
import { NavLink, useNavigate } from "react-router-dom";
import { ListVertical } from "../../ui/List";
import VenueItem from "../../features/venues/VenueItem";
import Heading from "../../ui/Heading";
import { deleteVenue } from "../../services/apiVenues";
import toast from "react-hot-toast";

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

function VenuesByProfile() {
  const [venues, setVenues] = useState<VenueItemProp[]>();
  const [loading, setLoading] = useState(true);
  const { userName, authToken } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await getVenues(userName, authToken);
    setVenues(data);
    setLoading(false);
  };

  const handleDeleteVenue = async (venueId: string) => {
    await deleteVenue(venueId, authToken);
    toast.success("Venue successfully deleted.");
  };

  const handleUpdatedVenue = (venue: VenueItemProp) => {
    navigate(`/venues/update`, { state: venue });
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, [venues]);

  return (
    <Page>
      <Container>
        <Heading as="h1">Listed venues</Heading>
        {loading && <SkeletonVenuesPage />}
        {venues && (
          <ListVertical>
            {venues?.length > 0 ? (
              venues.map((venue) => (
                <VenueItem
                  key={venue.id}
                  venue={venue}
                  onDelete={() => handleDeleteVenue(venue.id)}
                  onUpdate={() => handleUpdatedVenue(venue)}
                />
              ))
            ) : (
              <p>You don't have any venues listed.</p>
            )}
          </ListVertical>
        )}
        <hr />
        <p>
          Can’t find your venues here?<NavLink to="#"> Visit the Help Center</NavLink>
        </p>
      </Container>
    </Page>
  );
}
export default VenuesByProfile;
