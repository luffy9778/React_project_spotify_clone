import React, { useContext, useEffect, useState } from "react";
import AlbumHeader from "../components/album/AlbumHeader";
import UserContext from "../context/UserContext";
import LikedSongTable from "../components/album/LikedSongTable";
import AudioContext from "../context/SongContext";
import { useNavigate } from "react-router-dom";

const LikedSongsAlbum = () => {
  const { userData } = useContext(UserContext);
  const likedSongs = userData.likedSongs;
  const navigate = useNavigate();
  const {
    dispatch,
    saveSongToLocalStorage,
    state: { currentPage, isPlaying },
  } = useContext(AudioContext);
  const [albumPalyStatus, setAlbumPalyStatus] = useState(false);

  useEffect(() => {
    if (likedSongs?.length === 0) navigate("/");
  }, [likedSongs, navigate]);

  //for play/pause buton on the header
  const playAlbum = () => {
    if (currentPage === "likedSongs") {
      dispatch({ type: "TOGGLE_PLAY" });
    } else {
      dispatch({
        type: "SET_SONG_LIST",
        payload: { songList: likedSongs, currentPage: "likedSongs" },
      });
      dispatch({
        type: "SET_CURRENT_SONG",
        payload: { song: likedSongs[0], index: 0 },
      });
      saveSongToLocalStorage(likedSongs[0]);
    }
  };

  useEffect(() => {
    if (isPlaying && likedSongs.length > 0 && currentPage === "likedSongs") {
      setAlbumPalyStatus(true);
    } else setAlbumPalyStatus(false);
  }, [isPlaying, likedSongs, currentPage]);

  return (
    <div className="album-container">
      <AlbumHeader
        type={"Liked"}
        image={
          "https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t1080x1080.jpg"
        }
        name={"Liked Songs"}
        bgcolour={"#4d2adb"}
        playAlbum={playAlbum}
        albumPalyStatus={albumPalyStatus}
      />
      <LikedSongTable data={likedSongs} />
    </div>
  );
};

export default LikedSongsAlbum;
