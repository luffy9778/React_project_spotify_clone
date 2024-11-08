import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRight,
  faListUl,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import LeftListComponent from "./LeftListComponent";

import { leftData } from "../../dummyData";
import UserContext from "../../context/UserContext";

const LeftSideBar = ({ leftWidth }) => {
  const { likedSongs } = useContext(UserContext);
  // console.log(likedSongs)
  // console.log(likedSongs.length>0)

  const liked = { type: "Liked Songs", name: "Playlist" };

  const content =
    leftWidth == 90 ? (
      <section className="lsidebar-component">
        <div
          className="lsidebar-fixed-header-container"
          style={{ paddingLeft: "18px" }}
        >
          <div className="lsidebar-header-small">
            <div
              className="lsidebar-header-text-container"
              title="Collapse Your Library"
            >
              <FontAwesomeIcon
                className="lsidebar-header-icon"
                icon={faBookmark}
              />
            </div>
          </div>
        </div>

        <div
          className="lsidebar-scrollable-container"
          style={{ paddingInline: "5px" }}
        >
          {likedSongs.length > 0 ? (
            <LeftListComponent
              key={"liked"}
              data={liked}
              leftWidth={leftWidth}
            />
          ) : null}
          {leftData.map((i) => (
            <LeftListComponent key={i.name} data={i} leftWidth={leftWidth} />
          ))}
        </div>
      </section>
    ) : (
      <section className="lsidebar-component">
        <div className="lsidebar-fixed-header-container">
          <div className="lsidebar-header">
            <div
              className="lsidebar-header-text-container"
              title="Collapse Your Library"
            >
              <FontAwesomeIcon
                className="lsidebar-header-icon"
                icon={faBookmark}
              />
              <p>Your Library</p>
            </div>
            <div className="lsidebar-header-icon-container">
              <div
                className="lsidebar-header-icon-plus"
                title="Create playlist or folder"
              >
                <FontAwesomeIcon
                  className="lsidebar-header-icon"
                  icon={faPlus}
                />
              </div>
              <div className="lsidebar-header-icon-arrow" title="Show more">
                <FontAwesomeIcon
                  className="lsidebar-header-icon"
                  icon={faArrowRight}
                />
              </div>
            </div>
          </div>
          <div className="lsidebar-component-option-container">
            <button>Playlists</button>
            <button>Artists</button>
          </div>
        </div>

        <div className="lsidebar-scrollable-container">
          <div className="lsidebar-search-container">
            <div className="lsidebar-search-icon">
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <div className="lsidebar-search-icon2">
              <p>Recents</p>
              <FontAwesomeIcon icon={faListUl} />
            </div>
          </div>
          {likedSongs.length > 0 ? (
            <LeftListComponent
              key={"liked"}
              data={liked}
              leftWidth={leftWidth}
            />
          ) : null}
          {leftData.map((i) => (
            <LeftListComponent key={i.name} data={i} leftWidth={leftWidth} />
          ))}
        </div>
      </section>
    );
  return content;
};

export default LeftSideBar;
