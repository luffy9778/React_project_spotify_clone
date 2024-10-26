import React, { useContext } from "react";
import Home from "../pages/Home";
import DataContext from "../context/DataContext";
import { Route, Routes } from "react-router-dom";
import Search from "../pages/Search";

const Layout = () => {
  const{ leftWidth, rightWidth }=useContext(DataContext)
  return (
    <div
      className="page-container"
      style={{ flex: 1, width: `calc(100% - ${leftWidth + rightWidth}px)` }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search/>}/>
        <Route path="/likedsongs" element={<Search/>}/>
        <Route path="/section" element={<Search/>}/>
        <Route path="/artist" element={<Search/>}/>
      </Routes>
    </div>
  );
};

export default Layout;
