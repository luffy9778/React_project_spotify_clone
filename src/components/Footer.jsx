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
import AudioContext from "../context/SongContext";

const Footer = () => {
  const [isImgHovered, setIsImgHovered] = useState(false);
  const {
    isRightSideBarColsed,
    setIsRightSideBarColsed,
    setRightWidth,
    rightWidth,
  } = useContext(DataContext);

  const { addLikedSong, userData } = useContext(UserContext);
  const {
    state: {
      currentSong,
      isPlaying,
      songCurrentTime,
      isShuffle,
      songList,
      isRepeat,
    },
    dispatch,
    audioRef,
  } = useContext(AudioContext);

  const likedSongs = userData.likedSongs;
  const seekwidth = (songCurrentTime / currentSong?.duration) * 100;

  // const handleVolume = (e) => {
  //   const newVolume = Number(e.target.value)
  //   console.log(newVolume);
  //   audioRef.current.volume = newVolume;
  // };

  const handleShuffle = () => {
    dispatch({
      type: "SET_SHUFFLE",
      payload: !isShuffle,
    });
  };
  // Play or Pause the song
  const handlePlayPause = () => {
    dispatch({
      type: "TOGGLE_PLAY",
    });
  };

  // Play next song
  const handleNext = () => {
    if (isRepeat) {
      audioRef.current.currentTime = 0;
      return dispatch({
        type: "UPDATE_TIME",
        payload: 0,
      });
    }
    if (songList.length > 1) {
      dispatch({
        type: "NEXT_SONG",
      });
    }
  };

  // Play previous song
  const handlePrevious = () => {
    if (isRepeat) {
      audioRef.current.currentTime = 0;
      return dispatch({
        type: "UPDATE_TIME",
        payload: 0,
      });
    }
    if (songList.length > 1) {
      dispatch({
        type: "PREVIOUS_SONG",
      });
    }
  };

  const handleSeekBarClick = (e) => {
    const seekBar = e.currentTarget;
    const rect = seekBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // Position of the click relative to the seek bar
    const newTime = (clickX / seekBar.offsetWidth) * currentSong?.duration; // Calculate the new time
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      dispatch({
        type: "UPDATE_TIME",
        payload: newTime,
      });
    }
  };

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
            <FontAwesomeIcon
              icon={faShuffle}
              onClick={handleShuffle}
              style={{ color: isShuffle && "rgb(71, 211, 71)" }}
              // size="sm"
            />
          </div>
          <div className="footer-conrols-icon">
            <FontAwesomeIcon
              icon={faBackwardStep}
              onClick={handlePrevious}
              style={{
                cursor: isRepeat
                  ? "pointer"
                  : songList.length > 1
                  ? "pointer"
                  : "not-allowed",
              }}
            />
          </div>
          <div className="footer-conrols-icon">
            {isPlaying && currentSong ? (
              <FontAwesomeIcon icon={faPause} onClick={handlePlayPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} onClick={handlePlayPause} />
            )}
          </div>
          <div
            className="footer-conrols-icon"
            style={{
              cursor: isRepeat
                ? "pointer"
                : songList.length > 1
                ? "pointer"
                : "not-allowed",
            }}
          >
            <FontAwesomeIcon icon={faForwardStep} onClick={handleNext} />
          </div>
          <div
            className="footer-conrols-icon"
            onClick={() => {
              dispatch({ type: "TOOGLE_REPEAT" });
            }}
          >
            <FontAwesomeIcon
              icon={faRepeat}
              style={{ color: isRepeat && "green" }}
            />
          </div>
        </div>
        <div className="footer-control-seekbar-container">
          <span>
            {Math.floor(songCurrentTime / 60)}:
            {Math.round(songCurrentTime % 60)
              .toString()
              .padStart(2, "0")}
          </span>
          <div className="footer-control-seekbar" onClick={handleSeekBarClick}>
            <div
              className="footer-control-seekbar-grow"
              style={{ width: `${seekwidth}%` }}
            ></div>
          </div>
          <span>
            {currentSong?.duration
              ? `${Math.floor(currentSong?.duration / 60)}:${Math.round(
                  currentSong?.duration % 60
                )
                  .toString()
                  .padStart(2, "0")}`
              : "0:00"}
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
        {/* <div >
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            onChange={handleVolume}
          />
        </div> */}
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
