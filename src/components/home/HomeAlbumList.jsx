import React, { useEffect, useState } from "react";
import HomeAlbumListCard from "./HomeAlbumListCard";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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
          <HomeAlbumListCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default HomeAlbumList;
