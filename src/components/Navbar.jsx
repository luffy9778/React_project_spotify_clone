import React, { useContext, useState } from "react";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  faBell,
  faCircleDown,
  faFolderOpen,
} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {

  const [isSerchHovered, setIsSerchHovered] = useState(false);

  const {auth}=useContext(AuthContext)

  const navigate=useNavigate()
  return (
    <nav>
      <div className="nav-app-logo">
        <FontAwesomeIcon icon={faSpotify} />
      </div>
      <div className="nav-items">
        <div className="nav-home-icon" onClick={()=>navigate("/")}>
          <FontAwesomeIcon icon={faHouse} />
        </div>
        <div
          className="nav-searchbar-container"
          onMouseEnter={() => setIsSerchHovered(true)}
          onMouseLeave={() => setIsSerchHovered(false)}
          onClick={()=>navigate("/search")}
          style={{
            backgroundColor: isSerchHovered
              ? "rgb(35, 35, 35)"
              : "var(--grey-bgc)",
          }}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="nav-search-icon"
          />
          <input
            type="text"
            className="nav-searchbar"
            placeholder="What do you want to play?"
            style={{
              backgroundColor: isSerchHovered
                ? "rgb(35, 35, 35)"
                : "var(--grey-bgc)",
            }}
          />
          <div className="nav-search-line"></div>
          <div className="nav-browse-icon-container">
            <FontAwesomeIcon icon={faFolderOpen} className="nav-browse-icon" />
          </div>
        </div>
        <div className="nav-premium-btn-container">
          <div className="nav-premium-btn">Explore Premium</div>
        </div>
        <div className="nav-download-btn-container">
          <div className="nav-download-btn">
            <FontAwesomeIcon icon={faCircleDown} />
            &nbsp;Install App
          </div>
        </div>
        <div className="nav-notification-icon-container">
          <FontAwesomeIcon icon={faBell} className="nav-notification-icon" />
        </div>
        <div className="nav-user-icon-container">
          <div className="nav-user-icon">{auth?.userInfo?.name.slice(0,1)}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
