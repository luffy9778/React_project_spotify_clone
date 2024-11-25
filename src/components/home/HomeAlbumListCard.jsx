import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataContext from "../../context/DataContext";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeAlbumListCard = ({ item }) => {
  const [showPalyIcon, setShowPlayIcon] = useState(false);
  const { centerWidth } = useContext(DataContext);
  const navigate=useNavigate()
  const cardCount = centerWidth < 845 ? " 1 0 21%" : " 1 0 15%";

  return (
    <div
      className="home-album-list-card"
      style={{ flex: cardCount }}
      onMouseEnter={() => setShowPlayIcon(true)}
      onMouseLeave={() => setShowPlayIcon(false)}
      onClick={()=>navigate(`/playlist/${item._id}`)}
    >
      <div>
        <div className="album-list-card-image">
          <img src={item.playlistimage}></img>
          <div
            className="album-list-card-icon"
            style={{ display: showPalyIcon ? "flex" : "none" }}
          >
            <FontAwesomeIcon icon={faCirclePlay} />
          </div>
        </div>
        <div className="album-list-card-text">{item.palylistname}</div>
      </div>
    </div>
  );
};

export default HomeAlbumListCard;
