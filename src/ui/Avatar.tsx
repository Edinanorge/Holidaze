import styled from "styled-components";
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
  return <StyledAvatar src={userAvatar ? userAvatar : "/placeholder.jpg"} alt="Avatar" />;
}

export default Avatar;
