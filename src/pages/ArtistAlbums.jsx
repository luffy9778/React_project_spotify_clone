import React, { useContext, useEffect, useState } from "react";
import AlbumHeader from "../components/album/AlbumHeader";
import { useParams } from "react-router-dom";
import ArtistTable from "../components/album/ArtistTable";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AudioContext from "../context/SongContext";

const ArtistAlbums = () => {
  const {
    dispatch,
    saveSongToLocalStorage,
    state: { currentPage, isPlaying },
  } = useContext(AudioContext);
  const [albumPalyStatus, setAlbumPalyStatus] = useState(false);

  const [albumData, setAlbumData] = useState();
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchArtistData = async () => {
      const response = await axiosPrivate.get(`/artist/${params.id}`);
      setAlbumData(response.data.artist);
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
        payload: { songList: albumData?.composedsongs, currentPage: params.id },
      });
      dispatch({
        type: "SET_CURRENT_SONG",
        payload: { song: albumData?.composedsongs[0], index: 0 },
      });
      saveSongToLocalStorage(albumData?.composedsongs[0]);
    }
  };

  useEffect(() => {
    if (
      isPlaying &&
      albumData?.composedsongs.length > 0 &&
      currentPage === params.id
    ) {
      setAlbumPalyStatus(true);
    } else setAlbumPalyStatus(false);
  }, [isPlaying, albumData?.composedsongs, currentPage]);

  return (
    <div className="album-container">
      <AlbumHeader
        type={"Artist"}
        image={albumData?.artistimage_Url}
        name={albumData?.artistname}
        bgcolour={albumData?.artistbgcolour}
        playAlbum={playAlbum}
        albumPalyStatus={albumPalyStatus}
      />
      <ArtistTable data={albumData?.composedsongs} id={params.id} />
    </div>
  );
};

export default ArtistAlbums;
