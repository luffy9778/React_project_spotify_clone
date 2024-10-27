import React, { useContext,useState,useEffect } from "react";
import DataContext from "../../context/DataContext";
import { useLocation, useNavigate } from "react-router-dom";

const HomeLayoutNav = () => {
  const[navBgTransparancy,setNavBgTransperancy]=useState(0)
  const [allBg, setAllBg] = useState(false);
  const [musicBg, setMusicBg] = useState(false);
  const [podcastBg, setPodcastBg] = useState(false);

  const{scrollPosition}=useContext(DataContext)

  const location = useLocation();
  const navigate=useNavigate()

  useEffect(() => {
    location.pathname === "/" ? setAllBg(true) : setAllBg(false);
    location.pathname === "/musics" ? setMusicBg(true) : setMusicBg(false);
    location.pathname === "/podcasts" ? setPodcastBg(true) : setPodcastBg(false);
  }, [location.pathname]);

  useEffect(()=>{
    if(scrollPosition<101){
      const value=Math.floor(scrollPosition/100*10)/10*1.05
      setNavBgTransperancy(value)
    }
  },[scrollPosition])

  return (
    <div
      className="home-navgate-button-container"
      style={{ backgroundColor: `rgb(43,23,128,${navBgTransparancy})` }}
    >
      <div
        className="home-navgate-button"
        style={{
          backgroundColor: allBg ? "white" : "transparent",
          color: allBg ? "black" : "white",
        }}
        onClick={()=>navigate("/")}
      >
        All
      </div>
      <div className="home-navgate-button" style={{
          backgroundColor: musicBg ? "white" : "transparent",
          color: musicBg ? "black" : "white",
        }} onClick={()=>navigate("/musics")}>Music</div>
      <div className="home-navgate-button" onClick={()=>navigate("/podcasts")}
        style={{
          backgroundColor: podcastBg ? "white" : "transparent",
          color: podcastBg ? "black" : "white",
        }}>Podcasts</div>
    </div>
  );
};

export default HomeLayoutNav;
