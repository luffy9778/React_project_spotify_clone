import { debounce } from "lodash";
import { createContext, useCallback, useState } from "react";
import axiosPrivate from "../api/axios";

const SearchContext = createContext({});

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState({
    songs: [],
    artists: [],
    playlists: [],
  });
  const [loading, setLoading] = useState(false);

  const fetchSearchResult = useCallback(
    debounce(async (serchQuery) => {
      if (serchQuery.trim()) {
        setLoading(true);
        try {
          const response = await axiosPrivate.get(`/search?q=${serchQuery}`);
          console.log("response", response.data);
          setResult(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setResult({ songs: [], artists: [], playlists: [] });
      }
    }, 500),
    [axiosPrivate]
  );
  return (
    <SearchContext.Provider
      value={{ query, setQuery, result, setResult, fetchSearchResult, loading }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export default SearchContext;
