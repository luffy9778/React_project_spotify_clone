import { faCopy } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleCheck,
  faEllipsis,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import CreditsList from "./CreditsList";
import DataContext from "../../context/DataContext";

const RightsideBar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { handleRightSidebarClose }=useContext(DataContext)
  return (
    <div
      className="rsidebar-component"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rsidebar-header-section">
        <h3 className="rsidebar-header-text">Liked Songs</h3>
        <div className="rsidebar-header-icon-section">
          <div className="rsidebar-header-icon">
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
          <div
            className="rsidebar-header-icon"
            onClick={handleRightSidebarClose}
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
      </div>
      <div className="rsidebar-body-section">
        <div className="rsidebar-image-container">
          <img src="https://placehold.co/250x250/orange/white" alt="" />
        </div>
        <div className="rsisebar-song-details-container">
          <div className="rsisebar-song-details">
            <h2 className="rsisebar-song-name">Nenjakame</h2>
            <p className="rsisebar-song-artist">Shankar Mahadevan</p>
          </div>
          <div className="rsisebar-song-details-iconset">
            <div
              className="rsisebar-song-details-copyicon"
              style={{ display: isHovered ? "flex" : "none" }}
            >
              <FontAwesomeIcon icon={faCopy} />
            </div>
            <div className="rsisebar-song-details-addicon">
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>
          </div>
        </div>
      </div>
      <div className="rsidebar__credit-container">
        <div className="rsidebar__credit-header">
          <div className="rsidebar__credit-header-left">Credits</div>
          <div className="rsidebar__credit-header-right">Show all</div>
        </div>
        <CreditsList />
        <CreditsList />
        <CreditsList />
      </div>
    </div>
  );
};
export default RightsideBar;
