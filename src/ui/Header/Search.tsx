import styled from "styled-components";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { BiSearch } from "react-icons/bi";
import Button from "../Button";

import { useState, useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";

const StyledSearch = styled.div`
  background-color: var(--color-gray-0);
  border: var(--border);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  position: relative;

  &:hover {
    box-shadow: var(--shadow-lg);
  }

  @media only screen and (max-width: 500px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
  }
`;

const StyledSearchInput = styled.input`
  background-color: var(--color-gray-0);
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  outline: none;
  width: 10rem;
  min-width: 9rem;
  overflow-x: scroll;
`;

const StyledSearchOption = styled.p`
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const StyledSearchButton = styled(Button)`
  background-color: var(--color-brand-50);
  color: var(--color-gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 100%;
  margin-top: 0;

  &:hover {
    background-color: var(--color-gray-0);
    color: var(--color-brand-50);
  }
`;

const StyledDateRangePicker = styled(DateRange)`
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-200);
  box-shadow: var(--shadow-sm);
  border-radius: 5px;
  padding: 0.5rem;
  position: absolute;
  top: 100%;

  z-index: 1;
`;

const StyledGuestSelect = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StyledGuestLabel = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const StyledGuestButton = styled.button`
  background-color: var(--color-gray-0);
  border: var(--border);
  padding: 0 0.5rem;
  cursor: pointer;
`;

const StyledGuestValue = styled.span`
  padding: 5px 10px;
  border: 1px solid var(--color-gray-200);
  border-radius: 5px;
`;

const StyledGuestDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  padding: 10px;
  background-color: var(--color-gray-0);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

interface GuestProps {
  adult: number;
  children: number;
  room: number;
  [key: string]: number;
}

function Search() {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [openGuests, setOpenGuests] = useState(false);
  const [guests, setGuests] = useState<GuestProps>({ adult: 1, children: 0, room: 1 });
  const menuRef = useRef<HTMLDivElement>(null);

  function handleChange(name: string, operation: string) {
    setGuests((prev) => {
      const updatedValue = operation === "decrease" ? prev[name] - 1 : prev[name] + 1;
      return {
        ...prev,
        [name]: updatedValue,
      };
    });
  }

  function handleSubmit() {
    navigate("/venues", { state: { destination, dateRange, guests } });
  }

  const handleSelect = (ranges: any) => {
    setDateRange(ranges.selection);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenDate(false);
        setOpenGuests(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <StyledSearch ref={menuRef}>
      <StyledSearchInput placeholder="Anywhere" type="text" onChange={(e) => setDestination(e.target.value)} />

      <StyledSearchOption onClick={() => setOpenDate(!openDate)}>Any week</StyledSearchOption>
      {openDate && (
        <StyledDateRangePicker
          editableDateInputs={true}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          ranges={[dateRange]}
          minDate={new Date()}
        />
      )}

      <StyledSearchOption onClick={() => setOpenGuests(!openGuests)}>Add guests</StyledSearchOption>
      {openGuests && (
        <StyledGuestDropdown>
          <StyledGuestSelect>
            <StyledGuestLabel>Adult</StyledGuestLabel>
            <div>
              <StyledGuestButton disabled={guests.adult <= 1} onClick={() => handleChange("adult", "decrease")}>
                -
              </StyledGuestButton>
              <StyledGuestValue>{guests.adult}</StyledGuestValue>
              <StyledGuestButton onClick={() => handleChange("adult", "increase")}>+</StyledGuestButton>
            </div>
          </StyledGuestSelect>
          <StyledGuestSelect>
            <StyledGuestLabel>Children</StyledGuestLabel>
            <div>
              <StyledGuestButton disabled={guests.children <= 0} onClick={() => handleChange("children", "decrease")}>
                -
              </StyledGuestButton>
              <StyledGuestValue>{guests.children}</StyledGuestValue>
              <StyledGuestButton onClick={() => handleChange("children", "increase")}>+</StyledGuestButton>
            </div>
          </StyledGuestSelect>
          <StyledGuestSelect>
            <StyledGuestLabel>Room</StyledGuestLabel>
            <div>
              <StyledGuestButton disabled={guests.room <= 1} onClick={() => handleChange("room", "decrease")}>
                -
              </StyledGuestButton>
              <StyledGuestValue>{guests.room}</StyledGuestValue>
              <StyledGuestButton onClick={() => handleChange("room", "increase")}>+</StyledGuestButton>
            </div>
          </StyledGuestSelect>
        </StyledGuestDropdown>
      )}

      <StyledSearchButton onClick={handleSubmit}>
        <BiSearch />
      </StyledSearchButton>
    </StyledSearch>
  );
}

export default Search;
