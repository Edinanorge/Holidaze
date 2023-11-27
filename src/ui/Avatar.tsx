import styled from "styled-components";
import avatar from "../assets/placeholder.jpg";
import { useAuth } from "../context/authContext";

const StyledAvatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

function Avatar() {
  const { userAvatar } = useAuth();
  return <StyledAvatar src={userAvatar ? userAvatar : avatar} alt="Avatar" />;
}

export default Avatar;
