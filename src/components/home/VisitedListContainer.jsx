import React, { useContext, useEffect, useState } from "react";
import Visitedlist from "./Visitedlist";
import axiosPrivate from "../../api/axios";
import UserContext from "../../context/UserContext";
const VisitedListContainer = ({ setBgColor }) => {
  const [visitedList, setVisitedList] = useState([]);

  const {userData}=useContext(UserContext)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/visited");
        setVisitedList(response?.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home__visited-list-container">
      <Visitedlist
        key="liked"
        setBgColor={setBgColor}
        data={{
          palylistname: "Liked Songs",
          playlistimage:
            "https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t1080x1080.jpg",
          playlistbgcolour: "rgba(80,40,240,0.5)",
        }}
        nav={"/likedsongs"}
        likedSongs={userData?.likedSongs}
      />
      {visitedList?.map((i) => (
        <Visitedlist
          key={i._id}
          setBgColor={setBgColor}
          data={i}
          nav={`/playlist/${i._id}`}
        />
      ))}
    </div>
  );
};
export default VisitedListContainer;
