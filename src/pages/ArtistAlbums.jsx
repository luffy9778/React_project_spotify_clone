import React, { useEffect, useState } from "react";
import AlbumHeader from "../components/album/AlbumHeader";
import { useParams } from "react-router-dom";
import ArtistTable from "../components/album/ArtistTable";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ArtistAlbums = () => {
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

  return (
    <div className="album-container">
      <AlbumHeader
        type={"Artist"}
        image={albumData?.artistimage_Url}
        name={albumData?.artistname}
        bgcolour={albumData?.artistbgcolour}
      />
      <ArtistTable data={albumData?.composedsongs} />
    </div>
  );
};

export default ArtistAlbums;
