import React, { useContext } from "react";
import HomeLayoutNav from "../components/home/HomeLayoutNav";
import VisitedListContainer from "../components/home/VisitedListContainer";
import DataContext from "../context/DataContext";
import HomeAlbumList from "../components/home/HomeAlbumList";

const MusicPage = () => {
    const {bgColor, setBgColor}=useContext(DataContext)
  return (
    <>
    <div style={{ background: bgColor }}>
      <HomeLayoutNav />
      <VisitedListContainer setBgColor={setBgColor}/>
    </div>
    <div>
        <h1 style={{textAlign:"center"}}>Music Page</h1>
    <HomeAlbumList />
    <HomeAlbumList />
    <HomeAlbumList />
    <HomeAlbumList />
    <HomeAlbumList />
  </div>
  </>
  );
};

export default MusicPage;
