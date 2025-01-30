import { faCirclePause, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataContext from "../../context/DataContext";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AudioContext from "../../context/SongContext";

const HomeAlbumListCard = ({ item,playAlbum }) => {
  const [showPalyIcon, setShowPlayIcon] = useState(false);
  const { centerWidth } = useContext(DataContext);
  const navigate = useNavigate();
  const cardCount = centerWidth < 845 ? " 1 0 21%" : " 1 0 15%";
  const {
    state: { currentPage, isPlaying },
  } = useContext(AudioContext);

  const [albumPalyStatus, setAlbumPalyStatus] = useState(false);

  useEffect(() => {
    if (isPlaying && item?.songs?.length > 0 && currentPage === item._id) {
      setAlbumPalyStatus(true);
    } else setAlbumPalyStatus(false);
  }, [isPlaying, item?.songs, currentPage]);

  return (
    <div
      className="home-album-list-card"
      style={{ flex: cardCount }}
      onMouseEnter={() => setShowPlayIcon(true)}
      onMouseLeave={() => setShowPlayIcon(false)}
      onClick={() => navigate(`/playlist/${item._id}`)}
    >
      <div>
        <div className="album-list-card-image">
          <img src={item.playlistimage}></img>
          <div
            className="album-list-card-icon"
            style={{ display: showPalyIcon ? "flex" : "none" }}
            onClick={(event) => playAlbum(item._id, item.songs, event)}
          >
            <FontAwesomeIcon icon={albumPalyStatus?faCirclePause :faCirclePlay} />
          </div>
        </div>
        <div className="album-list-card-text capitalize">
          {item.palylistname}
        </div>
      </div>
    </div>
  );
};

export default HomeAlbumListCard;
