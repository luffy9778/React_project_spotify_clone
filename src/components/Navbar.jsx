import React from "react";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  faBell,
  faCircleDown,
  faFolderOpen,
} from "@fortawesome/free-regular-svg-icons";
const Navbar = () => {
  return (
    <nav>
      <div className="nav-app-logo">
        <FontAwesomeIcon icon={faSpotify} />
      </div>
      <div className="nav-items">
        <div className="nav-home-icon">
          <FontAwesomeIcon icon={faHouse} />
        </div>
        <div className="nav-searchbar-container">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="nav-search-icon"
          />
          <input
            type="text"
            className="nav-searchbar"
            placeholder="What do you want to play?"
          />
          <div className="nav-search-line"></div>
          <FontAwesomeIcon icon={faFolderOpen} className="nav-browse-icon" />
        </div>
        <div className="nav-premium-btn-container">
          <button className="nav-premium-btn">Explore Premium</button>
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
          <div className="nav-user-icon">P</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
