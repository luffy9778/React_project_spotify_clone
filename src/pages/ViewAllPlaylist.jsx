import React, { useEffect, useState } from "react";
import HomeAlbumListCard from "../components/home/HomeAlbumListCard";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ViewAllPlaylist = () => {
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
  return (
    <div className="px-5">
    <h2 className="pt-5 text-xl font-extrabold">Made For You</h2>
    <div className="flex flex-wrap py-5">
      {playListData.map((item) => (
        <HomeAlbumListCard key={item._id} item={item} />
      ))}
    </div>
    </div>
    
  );
};

export default ViewAllPlaylist;
