import { faCirclePause, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import AudioContext from "../../context/SongContext";
import { Audio } from "react-loader-spinner";

const Visitedlist = ({ setBgColor, data, nav, likedSongs }) => {
  const { centerWidth } = useContext(DataContext);
  const columCount = centerWidth < 845 ? "47%" : "23%";
  const navigate = useNavigate();

  const [isHovered, setIshoverd] = useState(false);

  const {
    dispatch,
    saveSongToLocalStorage,
    state: { currentPage, isPlaying },
  } = useContext(AudioContext);
  const [albumPalyStatus, setAlbumPalyStatus] = useState(false);

  const playAlbum = (i, songs, event) => {
    if (event) event.stopPropagation();
    if (currentPage === i) {
      dispatch({ type: "TOGGLE_PLAY" });
    } else {
      dispatch({
        type: "SET_SONG_LIST",
        payload: { songList: songs, currentPage: i },
      });
      dispatch({
        type: "SET_CURRENT_SONG",
        payload: { song: songs[0], index: 0 },
      });
      saveSongToLocalStorage(songs[0]);
    }
  };

  useEffect(() => {
    if (likedSongs) {
      if (isPlaying && likedSongs?.length > 0 && currentPage === "likedSongs") {
        setAlbumPalyStatus(true);
      } else setAlbumPalyStatus(false);
    } else {
      if (isPlaying && data?.songs?.length > 0 && currentPage === data._id) {
        setAlbumPalyStatus(true);
      } else setAlbumPalyStatus(false);
    }
  }, [isPlaying, data?.songs, likedSongs, currentPage]);

  return (
    <div
      className="home__visited-list"
      onMouseEnter={() => {
        setBgColor(
          ` linear-gradient(180deg, ${data.playlistbgcolour} 0%, rgba(18,18,18,1) 100%)`
        );
        setIshoverd(true);
      }}
      onMouseLeave={() => {
        setBgColor(
          "linear-gradient(180deg, rgba(80,40,240,0.5) 0%, rgba(18,18,18,1) 100%)"
        );
        setIshoverd(false);
      }}
      style={{ flex: `1 0 ${columCount}` }}
      onClick={() => navigate(nav)}
    >
      <div className="home__visited-list-image">
        <img src={data.playlistimage} />
      </div>
      <div className="home__visited-list-name capitalize">
        <div> {data.palylistname}</div>

        {albumPalyStatus && !isHovered ? (
          <div className="home__visited-list-playIcon flex">
            <Audio
              height="25"
              width="25"
              color="#02c415"
              ariaLabel="audio-loading"
              wrapperStyle={{ justifyContent: "start" }}
              wrapperClass="wrapper-class"
              visible={true}
            />
          </div>
        ) : (
          <div
            className="home__visited-list-playIcon"
            style={{ display: isHovered ? "flex" : "none" }}
            onClick={(event) =>
              likedSongs
                ? playAlbum("likedSongs", likedSongs, event)
                : playAlbum(data._id, data.songs, event)
            }
          >
            <FontAwesomeIcon
              icon={albumPalyStatus ? faCirclePause : faCirclePlay}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Visitedlist;
