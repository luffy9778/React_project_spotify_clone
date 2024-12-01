import React, { useState, useEffect } from "react";
import AlbumHeader from "../components/album/AlbumHeader";
import { useParams } from "react-router-dom";
import PlaylistTable from "../components/album/PlaylistTable";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const PlaylistAlbum = () => {
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
  return (
    <div className="album-container">
      <AlbumHeader
        type={"playlist"}
        image={albumData?.playlistimage}
        name={albumData?.palylistname}
        bgcolour={albumData?.playlistbgcolour}
      />
      <PlaylistTable data={albumData?.songs} />
    </div>
  );
};

export default PlaylistAlbum;
