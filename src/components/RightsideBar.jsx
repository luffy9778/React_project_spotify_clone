import { faCopy } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleCheck,
  faEllipsis,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const RightsideBar = () => {
  return (
    <div className="rsidebar-component"
    >
      

      <div className="rsidebar-header-section">
        <h3 className="rsidebar-header-text">Liked Songs</h3>
        <div className="rsidebar-header-icon-section">
          <div className="rsidebar-header-icon">
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
          <div className="rsidebar-header-icon">
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
            <div className="rsisebar-song-details-copyicon">
              <FontAwesomeIcon icon={faCopy} />
            </div>
            <div className="rsisebar-song-details-addicon">
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RightsideBar;
