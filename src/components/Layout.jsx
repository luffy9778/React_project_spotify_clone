import React, { useContext, useRef, useState } from "react";
import DataContext from "../context/DataContext";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import LeftSideBar from "./left_side_bar/LeftSideBar";
import RightsideBar from "./right_side_bar/RightsideBar";
import Footer from "./Footer";


const Layout = () => {
    const [isHoveredLeft, setIsHoveredLeft] = useState(false);
  const [isActiveLeft, setIsActiveLeft] = useState(false);
  const [isHoveredRight, setIsHoveredRight] = useState(false);
  const [isActiveRight, setIsActiveRight] = useState(false);

  const { leftWidth, rightWidth, setScrollposition,isRightSideBarColsed,  setRightWidth,setLeftWidth  } =
    useContext(DataContext);

  const scrollRef = useRef(null);
  const containerRef = useRef(null);

  
  const handlescroll = () => {
    if (scrollRef.current) {
      setScrollposition(scrollRef.current.scrollTop);
    }
  };

  
  //for resize
  const handelMouseMoveLeft = (e) => {
    const newWidth =
      e.clientX - containerRef.current.getBoundingClientRect().left;
    if (newWidth < 150) {
      setLeftWidth(90);
    } else if (!(newWidth < 285) && newWidth < 400) {
      setLeftWidth(newWidth);
    }
  };
  const handelMouseMoveRight = (e) => {
    const newWidth =
      containerRef.current.getBoundingClientRect().right - e.clientX;
    if (newWidth > 285 && newWidth < 420) {
      setRightWidth(newWidth);
    }
  };
  const startResizeLeft = () => {
    window.addEventListener("mousemove", handelMouseMoveLeft);
    window.addEventListener("mouseup", stopResize);
    setIsActiveLeft(true);
  };
  const startResizeRight = () => {
    setIsActiveRight(true);
    window.addEventListener("mousemove", handelMouseMoveRight);
    window.addEventListener("mouseup", stopResize);
  };
  const stopResize = () => {
    window.removeEventListener("mousemove", handelMouseMoveLeft);
    window.removeEventListener("mousemove", handelMouseMoveRight);
    window.removeEventListener("mouseup", stopResize);
    setIsActiveRight(false);
    setIsActiveLeft(false);
  };

  return (
    <>
    <Navbar />
      <div className="container" ref={containerRef}>
        <div
          className="left-sidebar-container"
          style={{ width: `${leftWidth}px` }}
        >
          <LeftSideBar leftWidth={leftWidth} />
          <div
            className="resizer"
            onMouseDown={startResizeLeft}
            onMouseEnter={() => setIsHoveredLeft(true)}
            onMouseLeave={() => setIsHoveredLeft(false)}
          >
            <div
              className="resizer-show"
              style={{
                backgroundColor: isHoveredLeft || isActiveLeft ? "white" : null,
              }}
            ></div>
          </div>
        </div>
        <div
      className="page-container"
      ref={scrollRef}
      onScroll={handlescroll}
      style={{ flex: 1, width: `calc(100% - ${leftWidth + rightWidth}px)` }}
    >
    <Outlet/>
    </div>
        <div
          className="right-sidebar-container"
          style={{
            display: isRightSideBarColsed ? "none" : "flex",
            width: `${rightWidth}px`,
          }}
        >
          <div
            className="resizer"
            onMouseDown={startResizeRight}
            onMouseEnter={() => setIsHoveredRight(true)}
            onMouseLeave={() => setIsHoveredRight(false)}
          >
            <div
              className="resizer-show"
              style={{
                backgroundColor:
                  isHoveredRight || isActiveRight ? "white" : null,
              }}
            ></div>
          </div>
          <RightsideBar />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
