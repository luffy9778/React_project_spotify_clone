import React, { useContext } from "react";
import AlbumHeader from "../components/album/AlbumHeader";
import UserContext from "../context/UserContext";
import LikedSongTable from "../components/album/LikedSongTable";

const LikedSongsAlbum = () => {
  const { userData } = useContext(UserContext);
  const likedSongs = userData.likedSongs;
  return (
    <div className="album-container">
      <AlbumHeader
        type={"Liked"}
        image={
          "https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t1080x1080.jpg"
        }
        name={"Liked Songs"}
        bgcolour={"#4d2adb"}
      />
      <LikedSongTable data={likedSongs} />
    </div>
  );
};

export default LikedSongsAlbum;
