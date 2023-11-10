import styled from "styled-components";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { BiSearch } from "react-icons/bi";
import Button from "../Button";

import { useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useSearch } from "../../context/searchContext";

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

function Search() {
  const { setSearchValue } = useSearch();
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openGuests, setOpenGuests] = useState(false);
  const [guest, setGuest] = useState({ adult: 1, children: 0, room: 1 });

  function handleChange(name: string, operation: string) {
    setGuest((prev) => {
      const updatedValue = operation === "decrease" ? prev[name] - 1 : prev[name] + 1;
      return {
        ...prev,
        [name]: updatedValue,
      };
    });
  }

  function handleSubmit() {
    const searchParameters = {
      destination,
      date: { startDate: format(date[0].startDate, "dd.MM.yyyy"), endDate: format(date[0].endDate, "dd.MM.yyyy") },
      guests: guest,
    };

    console.log("Search Data:", searchParameters);
    setSearchValue(searchParameters);
  }

  return (
    <StyledSearch>
      <StyledSearchInput placeholder="Anywhere" type="text" onChange={(e) => setDestination(e.target.value)} />

      <StyledSearchOption onClick={() => setOpenDate(!openDate)}>Any week</StyledSearchOption>
      {openDate && (
        <StyledDateRangePicker
          editableDateInputs={true}
          onChange={(item) => {
            setDate([item.selection]);
          }}
          moveRangeOnFirstSelection={false}
          ranges={date}
        />
      )}

      <StyledSearchOption onClick={() => setOpenGuests(!openGuests)}>Add guests</StyledSearchOption>
      {openGuests && (
        <StyledGuestDropdown>
          <StyledGuestSelect>
            <StyledGuestLabel>Adult</StyledGuestLabel>
            <div>
              <StyledGuestButton onClick={() => handleChange("adult", "decrease")}>-</StyledGuestButton>
              <StyledGuestValue>{guest.adult}</StyledGuestValue>
              <StyledGuestButton onClick={() => handleChange("adult", "increase")}>+</StyledGuestButton>
            </div>
          </StyledGuestSelect>
          <StyledGuestSelect>
            <StyledGuestLabel>Children</StyledGuestLabel>
            <div>
              <StyledGuestButton onClick={() => handleChange("children", "decrease")}>-</StyledGuestButton>
              <StyledGuestValue>{guest.children}</StyledGuestValue>
              <StyledGuestButton onClick={() => handleChange("children", "increase")}>+</StyledGuestButton>
            </div>
          </StyledGuestSelect>
          <StyledGuestSelect>
            <StyledGuestLabel>Room</StyledGuestLabel>
            <div>
              <StyledGuestButton onClick={() => handleChange("room", "decrease")}>-</StyledGuestButton>
              <StyledGuestValue>{guest.room}</StyledGuestValue>
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
