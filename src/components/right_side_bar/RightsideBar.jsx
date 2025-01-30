import { faCopy } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleCheck,
  faCirclePlus,
  faEllipsis,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import CreditsList from "./CreditsList";
import DataContext from "../../context/DataContext";
import UserContext from "../../context/UserContext";
import AudioContext from "../../context/SongContext";
// import useUser from "../../hooks/useUser";

const RightsideBar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { handleRightSidebarClose } = useContext(DataContext);
  const { addLikedSong, userData, removeLikedSong } = useContext(UserContext);
  const {
    state: { currentSong },
  } = useContext(AudioContext);
  // const userData=useUser()
  const likedSongs = userData.likedSongs;

  return (
    <div
      className="rsidebar-component"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rsidebar-header-section">
        <h3 className="rsidebar-header-text">Liked Songs</h3>
        <div className="rsidebar-header-icon-section">
          <div className="rsidebar-header-icon">
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
          <div
            className="rsidebar-header-icon"
            onClick={handleRightSidebarClose}
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
      </div>
      <div className="rsidebar-body-section">
        <div className="rsidebar-image-container">
          <img src={currentSong?.songimage_url} alt="" />
        </div>
        <div className="rsisebar-song-details-container">
          <div className="rsisebar-song-details">
            <h2 className="rsisebar-song-name capitalize">
              {currentSong?.songname}
            </h2>
            <p className="rsisebar-song-artist">
              {currentSong?.artistname?.artistname}
            </p>
          </div>
          <div className="rsisebar-song-details-iconset">
            <div
              className="rsisebar-song-details-copyicon"
              style={{ display: isHovered ? "flex" : "none" }}
            >
              <FontAwesomeIcon icon={faCopy} />
            </div>
            <div className="rsisebar-song-details-addicon">
              {likedSongs?.find((x) => x._id === currentSong?._id) ? (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  onClick={() => removeLikedSong(currentSong._id)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  className="text-white"
                  onClick={() => addLikedSong(currentSong._id)}
                />
              )}
              {/* <FontAwesomeIcon icon={faCircleCheck} /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="rsidebar__credit-container">
        <div className="rsidebar__credit-header">
          <div className="rsidebar__credit-header-left">Credits</div>
          <div className="rsidebar__credit-header-right">Show all</div>
        </div>
        <CreditsList />
        <CreditsList />
        <CreditsList />
      </div>
    </div>
  );
};
export default RightsideBar;
