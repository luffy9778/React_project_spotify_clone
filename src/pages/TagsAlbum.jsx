import React, { useContext, useEffect, useState } from "react";
import AlbumHeader from "../components/album/AlbumHeader";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import TagAlbumTable from "../components/album/TagAlbumTable";
import AudioContext from "../context/SongContext";

const TagsAlbum = () => {
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
    const fetchTagData = async () => {
      const response = await axiosPrivate.get(`/tags/${params.id}`);
      setAlbumData(response.data);
    };
    fetchTagData();
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
        type={"tags"}
        image={albumData?.tag?.tagImage_url}
        name={albumData?.tag?.tagName}
        bgcolour={albumData?.tag?.tagBgcolour}
        playAlbum={playAlbum}
        albumPalyStatus={albumPalyStatus}
      />
      <TagAlbumTable data={albumData?.songs} id={params.id} />
    </div>
  );
};

export default TagsAlbum;
