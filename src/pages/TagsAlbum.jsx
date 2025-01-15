import React, { useEffect, useState } from "react";
import AlbumHeader from "../components/album/AlbumHeader";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import TagAlbumTable from "../components/album/TagAlbumTable";

const TagsAlbum = () => {
  const [albumData, setAlbumData] = useState();
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();
  
  useEffect(() => {
    const fetchTagData = async () => {
      const response = await axiosPrivate.get(`/tags/${params.id}`);
      console.log(response.data)
      setAlbumData(response.data);
    };
    fetchTagData();
  }, [params]);

  return (
    <div className="album-container">
      <AlbumHeader
        type={"tags"}
        image={albumData?.tag?.tagImage_url}
        name={albumData?.tag?.tagName}
        bgcolour={albumData?.tag?.tagBgcolour}
      />
      <TagAlbumTable data={albumData?.songs}/>
    </div>
  );
};

export default TagsAlbum;
