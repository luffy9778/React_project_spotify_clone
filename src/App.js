import { useRef, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import LeftSideBar from "./components/LeftSideBar";
import Navbar from "./components/Navbar";
import RightsideBar from "./components/RightsideBar";

function App() {
  //for resizer

  const [leftWidth, setLeftWidth] = useState(260);
  const [rightWidth, setRightWidth] = useState(285);

  const [isHoveredLeft, setIsHoveredLeft] = useState(false);
  const [isActiveLeft, setIsActiveLeft] = useState(false);
  const [isHoveredRight, setIsHoveredRight] = useState(false);
  const [isActiveRight, setIsActiveRight] = useState(false);

  const containerRef = useRef(null);

  const handelMouseMoveLeft = (e) => {
    const newWidth =
      e.clientX - containerRef.current.getBoundingClientRect().left;
    if (newWidth < 150) {
      setLeftWidth(100);
    } else if (!(newWidth < 259 && newWidth > 100) && newWidth < 400) {
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
          <LeftSideBar />
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
        <Layout rightWidth={rightWidth} leftWidth={leftWidth} />
        <div
          className="right-sidebar-container"
          style={{ width: `${rightWidth}px` }}
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
          <RightsideBar
            rightWidth={rightWidth}
            startResizeRight={startResizeRight}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
