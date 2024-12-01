import React, { useEffect, useState } from "react";
import SearchCard from "../components/search/SearchCard";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const Search = () => {
  const [tagsData, setTagData] = useState([]);
  const axiosPrivate = useAxiosPrivate();

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

  return (
    <div className="search-page">
      <div className="search__title">Browse all</div>
      <div className="search__card-container">
        {tagsData.map((tag) => (
          <SearchCard key={tag._id} tag={tag} />
        ))}
      </div>
    </div>
  );
};

export default Search;
