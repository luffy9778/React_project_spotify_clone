import React, { useContext, useRef } from "react";
import Home from "../pages/Home";
import DataContext from "../context/DataContext";
import { Route, Routes } from "react-router-dom";
import Search from "../pages/Search";
import HomeLayout from "./home/HomeLayout";
import PodcastContainer from "../pages/PodcastContainer";
import MusicPage from "../pages/MusicPage";
import Album from "./album/Album";

const Layout = () => {
  const { leftWidth, rightWidth, setScrollposition } =
    useContext(DataContext);

  const scrollRef = useRef(null);
  

  const handlescroll = () => {
    if (scrollRef.current) {
      setScrollposition(scrollRef.current.scrollTop);
    }
  };
  return (
    <div
      className="page-container"
      ref={scrollRef}
      onScroll={handlescroll}
      style={{ flex: 1, width: `calc(100% - ${leftWidth + rightWidth}px)` }}
    >
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/musics" element={<MusicPage />} />
          <Route path="/podcasts" element={<PodcastContainer />} />
        </Route>
        <Route path="/search" element={<Search />} />
        <Route path="/likedsongs" element={<Search />} />
        <Route path="/section" element={<Search />} />
        <Route path="/artist/:id" element={<Album/>} />
      </Routes>
    </div>
  );
};

export default Layout;
