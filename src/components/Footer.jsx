import {
  faAngleDown,
  faAngleUp,
  faBackwardStep,
  faBars,
  faCirclePlus,
  faComputer,
  faForwardStep,
  faMicrophoneLines,
  faMinimize,
  faPlay,
  faRadio,
  faRepeat,
  faShuffle,
  faUpRightAndDownLeftFromCenter,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import DataContext from "../context/DataContext";

const Footer = () => {
  const [isImgHovered, setIsImgHovered] = useState(false);
  const {
    isRightSideBarColsed,
    setIsRightSideBarColsed,
    setRightWidth,
    rightWidth,
  } = useContext(DataContext);

  const handleArrowClick = () => {
    setIsRightSideBarColsed((prv) => !prv);
    if (rightWidth === 0) {
      setRightWidth(285);
    }
  };
  const showRightSideBarIcon = isRightSideBarColsed ? (
    <FontAwesomeIcon icon={faAngleUp} />
  ) : (
    <FontAwesomeIcon icon={faAngleDown} />
  );
  return (
    <div className="footer-component">
      <div className="footer-song-component">
        <div
          className="footer-song-image-container"
          onMouseEnter={() => setIsImgHovered(true)}
          onMouseLeave={() => setIsImgHovered(false)}
        >
          <div
            onClick={handleArrowClick}
            style={{ display: isImgHovered ? "flex" : "none" }}
          >
            {showRightSideBarIcon}
          </div>
          <img src="https://via.placeholder.com/100" alt="song-image" />
        </div>
        <div>
          <div className="footer-song-name">Nenjakame</div>
          <div className="footer-song-artists">Shankar Mahadevan,</div>
        </div>
        <div className="footer-song-addIcon">
          <FontAwesomeIcon icon={faCirclePlus} />
        </div>
      </div>
      <div className="footer-controls-component">
        <div className="footer-controls-icon-container">
          <div className="footer-conrols-icon">
            <FontAwesomeIcon icon={faShuffle} />
          </div>
          <div className="footer-conrols-icon">
            <FontAwesomeIcon icon={faBackwardStep} />
          </div>
          <div className="footer-conrols-icon">
            <FontAwesomeIcon icon={faPlay} />
          </div>
          <div className="footer-conrols-icon">
            <FontAwesomeIcon icon={faForwardStep} />
          </div>
          <div className="footer-conrols-icon">
            <FontAwesomeIcon icon={faRepeat} />
          </div>
        </div>
        <div className="footer-control-seekbar-container">
          <span>0:00</span>
          <div className="footer-control-seekbar">
            <div className="footer-control-seekbar-grow"></div>
          </div>
          <span>0:00</span>
        </div>
      </div>
      <div className="footer-icon-component">
        <div className="footer-icon-component-icons">
          <FontAwesomeIcon icon={faRadio} />
        </div>
        <div className="footer-icon-component-icons">
          <FontAwesomeIcon icon={faMicrophoneLines} />
        </div>
        <div className="footer-icon-component-icons">
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="footer-icon-component-icons">
          <FontAwesomeIcon icon={faComputer} />
        </div>
        <div className="footer-icon-component-icons">
          <FontAwesomeIcon icon={faVolumeHigh} />
        </div>
        <div className="footer-icon-component-volumebar">
          <div className="footer-icon-component-volumebar-grow"></div>
          <div className="footer-icon-component-volumebar-end"></div>
        </div>
        <div className="footer-icon-component-icons">
          <FontAwesomeIcon icon={faMinimize} />
        </div>
        <div className="footer-icon-component-icons">
          <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
