// SearchContext.js
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
interface SearchValue {
  destination: string;
  date: {
    startDate: string;
    endDate: string;
  };
  guests: {
    adult: number;
    children: number;
    room: number;
  };
}

interface SearchContextProps {
  searchValue: SearchValue;
  setSearchValue: Dispatch<SetStateAction<SearchValue>>;
}

interface SearchContextProviderProps {
  children: ReactNode;
}

const SearchContext = createContext({} as SearchContextProps);

export const SearchProvider = ({ children }: SearchContextProviderProps) => {
  const [searchValue, setSearchValue] = useState<SearchValue>({
    destination: "",
    date: { startDate: "", endDate: "" },
    guests: { adult: 1, children: 0, room: 1 },
  });

  return <SearchContext.Provider value={{ searchValue, setSearchValue }}>{children}</SearchContext.Provider>;
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
