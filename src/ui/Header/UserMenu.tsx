import { useEffect, useRef, useState } from "react";

import { AiOutlineMenu } from "react-icons/ai";
import styled from "styled-components";

import Avatar from "../Avatar";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const StyledUserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const StyledNavLink = styled(NavLink)`
  margin-right: 1rem;
  padding: 1rem 2rem;
  border-radius: var(--border-radius-lg);

  &:hover {
    background-color: var(--color-gray-200);
  }

  @media only screen and (max-width: 800px) {
    display: none;
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
  const { isAuthenticated, isManager, logout, userName } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <StyledUserMenu ref={menuRef}>
      <StyledNavLink to="/venues/create">Holidaze your home</StyledNavLink>
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
              <MenuItem to={`/profiles/${userName}`}>Profile</MenuItem>
              <MenuItem to={`/profiles/${userName}/bookings`}>Bookings</MenuItem>
              <MenuItem to={`/profiles/${userName}/venues`}>Venues</MenuItem>
              <MenuItem to="/" onClick={logout}>
                Log Out
              </MenuItem>
            </>
          ) : isAuthenticated ? (
            <>
              <MenuItem to={`/profiles/${userName}`}>Profile</MenuItem>
              <MenuItem to={`/profiles/${userName}/bookings`}>Bookings</MenuItem>
              <MenuItem to="/" onClick={logout}>
                Log Out
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem to="/auth/login">Log In</MenuItem>
              <MenuItem to="/auth/register">Sign up</MenuItem>
            </>
          )}
          <hr />
          <MenuItem to="/venues/create">Holidaze your home</MenuItem>
          <MenuItem to="#">Help Center</MenuItem>
        </Menu>
      )}
    </StyledUserMenu>
  );
}

export default UserMenu;
