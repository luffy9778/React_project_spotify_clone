import React, { useContext } from "react";
import HomeAlbumList from "../components/home/HomeAlbumList";
import HomeLayoutNav from "../components/home/HomeLayoutNav";
import VisitedListContainer from "../components/home/VisitedListContainer";
import DataContext from "../context/DataContext";

const Home = () => {
  const{bgColor, setBgColor}=useContext(DataContext)
  return (
    <>
      <section className="home-section" >
        <div className="home-section__top" style={{ background: bgColor }}>
          <HomeLayoutNav/>
          <VisitedListContainer setBgColor={setBgColor} />
        </div>
        <div>
          <HomeAlbumList />
          <HomeAlbumList />
          <HomeAlbumList />
          <HomeAlbumList />
          <HomeAlbumList />
        </div>
      </section>
    </>
  );
};

export default Home;
