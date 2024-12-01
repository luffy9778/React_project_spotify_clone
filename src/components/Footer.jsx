import {
  faAngleDown,
  faAngleUp,
  faBackwardStep,
  faBars,
  faCircleCheck,
  faCirclePlus,
  faComputer,
  faForwardStep,
  faMicrophoneLines,
  faMinimize,
  faPause,
  faPlay,
  faRadio,
  faRepeat,
  faShuffle,
  faUpRightAndDownLeftFromCenter,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import DataContext from "../context/DataContext";
import UserContext from "../context/UserContext";

const Footer = () => {
  const [isImgHovered, setIsImgHovered] = useState(false);
  const {
    isRightSideBarColsed,
    setIsRightSideBarColsed,
    setRightWidth,
    rightWidth,
  } = useContext(DataContext);

  const {
    currentSong,
    pause,
    play,
    isPlaying,
    songDuration,
    songCurrentTime,
    userData,
    addLikedSong,
  } = useContext(UserContext);

  const likedSongs = userData.likedSongs;
  const seekwidth = (songCurrentTime / songDuration) * 100;

  const handleArrowClick = () => {
    setIsRightSideBarColsed((prv) => !prv);
    if (rightWidth === 0) {
      setRightWidth(285);
    }
  };
  const showRightSideBarIcon = isRightSideBarColsed ? (
    <FontAwesomeIcon icon={faAngleUp} />
  ) : (
    <FontAwesomeIcon icon={faAngleDown} />
  );
  return (
    <div className="footer-component">
      <div className="footer-song-component">
        <div
          className="footer-song-image-container"
          onMouseEnter={() => setIsImgHovered(true)}
          onMouseLeave={() => setIsImgHovered(false)}
        >
          <div
            onClick={handleArrowClick}
            style={{ display: isImgHovered ? "flex" : "none" }}
          >
            {showRightSideBarIcon}
          </div>
          <img src={currentSong?.songimage_url} alt="song-image" />
        </div>
        <div>
          <div className="footer-song-name capitalize">
            {currentSong?.songname}
          </div>
          <div className="footer-song-artists capitalize">
            {currentSong?.artistname.artistname}
          </div>
        </div>
        <div className="footer-song-addIcon">
          {likedSongs?.find((x) => x._id === currentSong?._id) ? (
            <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
          ) : (
            <FontAwesomeIcon
              icon={faCirclePlus}
              onClick={() => addLikedSong(currentSong._id)}
            />
          )}
        </div>
      </div>
      <div className="footer-controls-component">
        <div className="footer-controls-icon-container">
          <div className="footer-conrols-icon">
            <FontAwesomeIcon icon={faShuffle} />
          </div>
          <div className="footer-conrols-icon">
            <FontAwesomeIcon icon={faBackwardStep} />
          </div>
          <div className="footer-conrols-icon">
            {isPlaying && currentSong ? (
              <FontAwesomeIcon icon={faPause} onClick={() => pause()} />
            ) : (
              <FontAwesomeIcon icon={faPlay} onClick={() => play()} />
            )}
          </div>
          <div className="footer-conrols-icon">
            <FontAwesomeIcon icon={faForwardStep} />
          </div>
          <div className="footer-conrols-icon">
            <FontAwesomeIcon icon={faRepeat} />
          </div>
        </div>
        <div className="footer-control-seekbar-container">
          <span>
            {Math.floor(songCurrentTime / 60)}:
            {Math.floor(songCurrentTime % 60)}
          </span>
          <div className="footer-control-seekbar">
            <div
              className="footer-control-seekbar-grow"
              style={{ width: `${seekwidth}%` }}
            ></div>
          </div>
          <span>
            {Math.floor(songDuration / 60)}:{Math.floor(songDuration % 60)}
          </span>
        </div>
      </div>
      <div className="footer-icon-component">
        <div className="footer-icon-component-icons">
          <FontAwesomeIcon icon={faRadio} />
        </div>
        <div className="footer-icon-component-icons">
          <FontAwesomeIcon icon={faMicrophoneLines} />
        </div>
        <div className="footer-icon-component-icons">
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="footer-icon-component-icons">
          <FontAwesomeIcon icon={faComputer} />
        </div>
        <div className="footer-icon-component-icons">
          <FontAwesomeIcon icon={faVolumeHigh} />
        </div>
        <div className="footer-icon-component-volumebar">
          <div className="footer-icon-component-volumebar-grow"></div>
          <div className="footer-icon-component-volumebar-end"></div>
        </div>
        <div className="footer-icon-component-icons">
          <FontAwesomeIcon icon={faMinimize} />
        </div>
        <div className="footer-icon-component-icons">
          <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
