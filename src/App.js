import { useContext, useRef, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import LeftSideBar from "./components/left_side_bar/LeftSideBar";
import Navbar from "./components/Navbar";
import RightsideBar from "./components/right_side_bar/RightsideBar";
import DataContext from "./context/DataContext";

function App() {

  const [isHoveredLeft, setIsHoveredLeft] = useState(false);
  const [isActiveLeft, setIsActiveLeft] = useState(false);
  const [isHoveredRight, setIsHoveredRight] = useState(false);
  const [isActiveRight, setIsActiveRight] = useState(false);

  const { isRightSideBarColsed, rightWidth, setRightWidth,leftWidth,setLeftWidth } =
    useContext(DataContext);
    
  const containerRef = useRef(null);
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
    <div className="App">
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
        <Layout/>
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
    </div>
  );
}

export default App;
