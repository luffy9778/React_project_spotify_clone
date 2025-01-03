import React, { useContext, useEffect, useState } from "react";
import SearchCard from "../components/search/SearchCard";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import SearchContext from "../context/SearchContext";
import SearchResult from "../components/search/SearchResult";
const Search = () => {
  const [tagsData, setTagData] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const { query, result, fetchSearchResult, loading } =
    useContext(SearchContext);
  useEffect(() => {
    fetchSearchResult(query);
  }, [query, fetchSearchResult]);

  useEffect(() => {
    const fetchSerchTags = async () => {
      try {
        const response = await axiosPrivate.get("/tags");
        // console.log(response.data)
        setTagData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSerchTags();
  }, []);

  const loadingSpinner = loading && <p>loading search results....</p>;
  return (
    <div className="search-page">
      {query ? (
        loadingSpinner ? (
          loadingSpinner
        ) : (
          <SearchResult result={result} />
        )
      ) : (
        <>
          <div className="search__title">Browse all</div>
          <div className="search__card-container">
            {tagsData.map((tag) => (
              <SearchCard key={tag._id} tag={tag} />
            ))}
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default Search;
