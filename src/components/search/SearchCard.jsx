import React, { useContext } from "react";
import DataContext from "../../context/DataContext";
import { useNavigate } from "react-router-dom";

const SearchCard = ({ tag }) => {
  const navigate=useNavigate()
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
    <div
      className="search__card"
      style={{ flex: columCount, backgroundColor: tag.tagBgcolour }}
      onClick={()=>navigate(`/tag/${tag._id}`)}
    >
      <div className="search__card-text">{tag.tagName}</div>
      <div className="search__card-image">
        <img src={tag.tagImage_url} />
      </div>
    </div>
  );
};
export default SearchCard;
