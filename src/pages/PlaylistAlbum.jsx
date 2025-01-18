import React, { useState, useEffect, useContext } from "react";
import AlbumHeader from "../components/album/AlbumHeader";
import { useParams } from "react-router-dom";
import PlaylistTable from "../components/album/PlaylistTable";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AudioContext from "../context/SongContext";

const PlaylistAlbum = () => {
  const {
    dispatch,
    saveSongToLocalStorage,
    state: { currentPage, isPlaying },
  } = useContext(AudioContext);
  const [albumPalyStatus, setAlbumPalyStatus] = useState(false);

  const params = useParams();
  const [albumData, setAlbumData] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchArtistData = async () => {
      const response = await axiosPrivate.get(`/playlist/${params.id}`);
      setAlbumData(response.data);
    };
    fetchArtistData();
  }, [params]);

  //for play/pause buton on the header
  const playAlbum = () => {
    if (currentPage === params.id) {
      dispatch({ type: "TOGGLE_PLAY" });
    } else {
      dispatch({
        type: "SET_SONG_LIST",
        payload: { songList: albumData?.songs, currentPage: params.id },
      });
      dispatch({
        type: "SET_CURRENT_SONG",
        payload: { song: albumData?.songs[0], index: 0 },
      });
      saveSongToLocalStorage(albumData?.songs[0]);
    }
  };

  useEffect(() => {
    if (isPlaying && albumData?.songs.length > 0 && currentPage === params.id) {
      setAlbumPalyStatus(true);
    } else setAlbumPalyStatus(false);
  }, [isPlaying, albumData?.songs, currentPage]);

  return (
    <div className="album-container">
      <AlbumHeader
        type={"playlist"}
        image={albumData?.playlistimage}
        name={albumData?.palylistname}
        bgcolour={albumData?.playlistbgcolour}
        playAlbum={playAlbum}
        albumPalyStatus={albumPalyStatus}
      />
      <PlaylistTable data={albumData?.songs} id={params.id} />
    </div>
  );
};

export default PlaylistAlbum;
