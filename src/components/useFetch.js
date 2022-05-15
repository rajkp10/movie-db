import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { API } from "./context";

function useFetch(urlParam) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });

  const fetchMovies = async (url) => {
    setIsLoading(true);
    axios.get(url).then((res) => {
      const data = res.data;
      if (data.Response === "True") {
        if (url.includes("&s")) {
          setMovies(data.Search || movies);
        } else {
          setMovies(data);
        }
        setError({ show: false, msg: "" });
      } else {
        setError({ show: true, msg: data.Error });
      }
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchMovies(`${API}${urlParam}`);
  }, [urlParam]);

  return { movies, isLoading, error };
}

export default useFetch;
