import React, { useContext, useEffect, useState } from "react";
import HomeAlbumListCard from "./HomeAlbumListCard";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AudioContext from "../../context/SongContext";

const HomeAlbumList = () => {
  const [playListData, setPlayListData] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axiosPrivate.get("/playlist");
        setPlayListData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlaylist();
  }, []);

  const {
    dispatch,
    saveSongToLocalStorage,
    state: { currentPage },
  } = useContext(AudioContext);

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
  return (
    <div className="home-album__list-container">
      <div className="home-album__list-name">
        <div>Made For You</div>
        <div className="home-album__list-showAll">
          <Link to="/section">show all</Link>
        </div>
      </div>
      <div className="home-album__cards-container">
        {/* 5,4 */}
        {playListData.slice(0, 5).map((item) => (
          <HomeAlbumListCard key={item._id} item={item} playAlbum={playAlbum} />
        ))}
      </div>
    </div>
  );
};

export default HomeAlbumList;
