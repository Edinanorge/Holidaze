import { useState } from "react";

import { AiOutlineMenu } from "react-icons/ai";
import styled from "styled-components";

import Button from "../Button";
import Avatar from "../Avatar";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const StyledUserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  & button {
    @media only screen and (max-width: 800px) {
      display: none;
    }
  }
`;

const StyledMenu = styled.div`
  border-radius: var(--border-radius-lg);
  border: var(--border);
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;

const Menu = styled.div`
  position: absolute;
  top: 5rem;
  right: 0;
  width: max-content;

  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  border: var(--border);
  background-color: var(--color-gray-0);
  padding: 1rem;
`;

const MenuItem = styled(NavLink)`
  display: block;
  padding: 1rem;
  font-weight: 600;

  &:hover {
    background-color: var(--color-gray-200);
  }
`;

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, isManager } = useAuth();
  console.log(isAuthenticated);

  return (
    <StyledUserMenu>
      <Button variation="default" onClick={() => {}}>
        Holidaze your home
      </Button>
      <StyledMenu
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <AiOutlineMenu />
        <Avatar />
      </StyledMenu>
      {isOpen && (
        <Menu>
          {isAuthenticated && isManager ? (
            <>
              <MenuItem to="/profiles/:name">Profile</MenuItem>
              <MenuItem to="/profiles/:name/bookings">Bookings</MenuItem>
              <MenuItem to="/profiles/:name/venues">Venues</MenuItem>
              <MenuItem to="/">Log Out</MenuItem>
            </>
          ) : isAuthenticated ? (
            <>
              <MenuItem to="/profiles/:name">Profile</MenuItem>
              <MenuItem to="/profiles/:name/bookings">Bookings</MenuItem>
              <MenuItem to="/">Log Out</MenuItem>
            </>
          ) : (
            <>
              <MenuItem to="/auth/login">Log In</MenuItem>
              <MenuItem to="/auth/register">Sign up</MenuItem>
            </>
          )}
          <hr />
          <MenuItem to="#">Holidaze your home</MenuItem>
          <MenuItem to="#">Help Center</MenuItem>
        </Menu>
      )}
    </StyledUserMenu>
  );
}

export default UserMenu;
