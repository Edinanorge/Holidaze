import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEdit, FaRegCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";

import { getProfile, updateProfile } from "../../services/apiProfile";
import { useAuth } from "../../context/authContext";

import styled from "styled-components";
import Container from "../../ui/Container";
import Heading from "../../ui/Heading";
import Page from "../../ui/Page";
import SkeletonProfilePage from "../../ui/Skeleton/SkeletonProfilePage";
import Button from "../../ui/Button";
import { GridColsTwo } from "../../ui/Grid";

interface ProfileProps {
  avatar: string;
  email: string;
  name: string;
  venueManager: boolean;
  _count: {
    venues: number;
    bookings: number;
  };
}

const StyledGridColsTwo = styled(GridColsTwo)`
  grid-template-columns: 1fr 2fr;
  align-items: start;
  margin-bottom: 6rem;

  @media only screen and (max-width: 700px) {
    display: block;
  }
`;

const StyledProfile = styled.div`
  box-shadow: var(--shadow-lg);
  border-radius: var(--border-radius-lg);
  text-align: center;
  padding: 4rem;
  margin: 3rem;
  position: relative;

  & img {
    border-radius: 100%;
    height: 8rem;
    width: 8rem;
    object-fit: cover;
  }
`;

const StyledInfo = styled.div`
  border: var(--border);
  border-radius: var(--border-radius-lg);
  padding: 4rem;
  margin: 3rem;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 2rem;

  @media only screen and (max-width: 1000px) {
    padding-left: 0;
  }
`;

const StyledListElements = styled.li`
  padding: 2rem 4rem;
  border: var(--border);
  border-radius: var(--border-radius);
  max-width: 40rem;
  margin: 2rem;
`;

const StyledAboutInfo = styled.p`
  padding: 1rem 0;
  font-style: italic;
  color: var(--color-gray-700);
  max-width: 60rem;
`;

const StyledExtra = styled.div`
  padding: 3rem;
`;

function Profile() {
  const [profile, setProfile] = useState<ProfileProps>();
  const [loading, setLoading] = useState(true);
  const { authToken, userName, becomeManager } = useAuth();
  const { name } = useParams();
  const form = useForm({
    defaultValues: {
      venueManager: false,
    },
  });

  const { handleSubmit } = form;
  const [serverErrors, setServerErrors] = useState("");

  const fetchData = async () => {
    const data = await getProfile(name, authToken);
    setProfile(data);
    setLoading(false);
  };

  const onSubmit = async () => {
    const data = await updateProfile(authToken, userName);

    if (data.errors) {
      setServerErrors(data.errors[0].message);
      toast.error(serverErrors);
    } else {
      becomeManager(data);
      toast.success("Congratulation! You are a manager.");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  return (
    <Page>
      <Container>
        {loading && <SkeletonProfilePage />}
        {profile && (
          <>
            <StyledGridColsTwo>
              <StyledProfile>
                <img src={profile.avatar ? profile.avatar : "/placeholder.jpg"} alt="Avatar" />
                <NavLink to={`/profiles/${userName}/media`}>
                  <FaEdit />
                </NavLink>
                <Heading as="h2">{profile.name.toUpperCase()}</Heading>
                <p>{profile.venueManager ? "Manager" : "Guest"}</p>
                {!profile.venueManager && (
                  <Button variation="secondary" type="submit" onClick={handleSubmit(onSubmit)}>
                    Become a manager
                  </Button>
                )}
              </StyledProfile>
              <StyledExtra>
                <Heading as="h1">Hey, I'm {profile.name.toUpperCase()}! </Heading>
                <StyledAboutInfo>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. A consectetur dolorem odit voluptate
                  repudiandae incidunt rerum distinctio vel officiis magni?
                </StyledAboutInfo>
                <div>
                  <span>Bookings: </span>
                  <span>{profile._count?.bookings}</span>
                </div>
                {profile.venueManager && (
                  <div>
                    <span>Venues: </span>
                    <span>{profile._count?.venues}</span>
                  </div>
                )}
              </StyledExtra>
            </StyledGridColsTwo>
            <StyledGridColsTwo>
              <StyledInfo>
                <Heading as="h2">{profile.name.toUpperCase()}'s confirmed information</Heading>
                <StyledList>
                  <li>
                    <FaRegCheckCircle /> Identity
                  </li>
                  <li>
                    <FaRegCheckCircle /> Email address
                  </li>
                  <li>
                    <FaRegCheckCircle /> Phone Number
                  </li>
                </StyledList>
              </StyledInfo>
              <StyledExtra>
                <Heading as="h2">What Hosets are saying about you:</Heading>
                <ol>
                  <StyledListElements>
                    <p>
                      " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos debitis ducimus distinctio
                      molestiae, fugit error mollitia. Aliquam voluptas dignissimos quos. "
                    </p>
                    <i>- Lorem, ipsum.</i>
                  </StyledListElements>
                  <StyledListElements>
                    <p>
                      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ea quo, asperiores
                      sapiente nesciunt ipsum facilis. "
                    </p>
                    <i>- Lorem, ipsum.</i>
                  </StyledListElements>
                </ol>
              </StyledExtra>
            </StyledGridColsTwo>
          </>
        )}
      </Container>
    </Page>
  );
}

export default Profile;
