import React, { useContext } from "react";
import DataContext from "../../context/DataContext";

const SearchCard = () => {
  const { centerWidth } = useContext(DataContext);

  let columCount;
  if (centerWidth < 780) {
    columCount = `0 0 46%`;
  } else if (centerWidth > 1060) {
    columCount = `0 0 23%`;
  } else {
    columCount = `0 0 31%`;
  }
  return (
    <div className="search__card" style={{ flex: columCount }}>
      <div className="search__card-text">Music</div>
      <div className="search__card-image">
        <img src="https://via.placeholder.com/100" />
      </div>
    </div>
  );
};
export default SearchCard;
