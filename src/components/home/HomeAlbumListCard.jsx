import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataContext from "../../context/DataContext";
import React, { useContext, useState } from "react";

const HomeAlbumListCard = () => {
  const [showPalyIcon, setShowPlayIcon] = useState(false);
  const { centerWidth } = useContext(DataContext);

  const cardCount = centerWidth < 845 ? " 1 0 21%" : " 1 0 15%";

  return (
    <div
      className="home-album-list-card"
      style={{ flex: cardCount }}
      onMouseEnter={() => setShowPlayIcon(true)}
      onMouseLeave={() => setShowPlayIcon(false)}
    >
      <div>
        <div className="album-list-card-image">
          <img src="https://via.placeholder.com/150"></img>
          <div className="album-list-card-icon" style={{display:showPalyIcon?"flex":"none"}}>
            <FontAwesomeIcon icon={faCirclePlay} />
          </div>
        </div>
        <div className="album-list-card-text">
          A.R.Rahman,Diljit Dosanjh,Pritam
        </div>
      </div>
    </div>
  );
};

export default HomeAlbumListCard;
