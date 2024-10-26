import React, { useEffect, useRef, useState } from "react";
import Visitedlist from "../components/home/Visitedlist";
import { bgColorList } from "../bgColorList";
import HomeAlbumList from "../components/home/HomeAlbumList";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [bgColor, setBgColor] = useState(
    "linear-gradient(180deg, rgba(80,40,240,0.5) 0%, rgba(18,18,18,1) 100%)"
  );
  const [navbg, setNavBg] = useState(false);
  const location = useLocation();
  useEffect(() => {
    location.pathname === "/" ? setNavBg(true) : setNavBg(false);
  }, [location.pathname]);
  useEffect(() => {
    document.title = "spotify";
  }, []);
  return (
    <>
      <section className="home-section">
        <div className="home-section__top" style={{ background: bgColor }}>
          <div className="home-navgate-button-container">
            <div
              className="home-navgate-button"
              style={{
                backgroundColor: navbg ? "white" : "transparent",
                color: navbg ? "black" : "white",
              }}
            >
              All
            </div>
            <div className="home-navgate-button">Music</div>
            <div className="home-navgate-button">Podcasts</div>
          </div>
          <div className="home__visited-list-container">
            {bgColorList.map((i, index) => (
              <Visitedlist key={index} bgc={i} setBgColor={setBgColor} />
            ))}
          </div>
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
