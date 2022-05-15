import React, { useState, useContext } from "react";
import useFetch from "./useFetch";
export const API = ` https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [query, setQuery] = useState("Iron Man");
  const { movies, isLoading, error } = useFetch(`&s=${query}`);

  return (
    <AppContext.Provider value={{ movies, isLoading, error, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
