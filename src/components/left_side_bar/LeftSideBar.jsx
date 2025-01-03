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
// import useUser from "../../hooks/useUser";

// import { leftData } from "../../dummyData";
import UserContext from "../../context/UserContext";

const LeftSideBar = ({ leftWidth }) => {
  const { userData } = useContext(UserContext);
  // const  userData = useUser();
  // console.log(userData)
  const likedSongs = userData?.likedSongs;
  const artists = userData.artists;
  const playlists = userData.playlist;
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
          {likedSongs?.length > 0 ? (
            <LeftListComponent
              key={"liked"}
              id={"liked"}
              type={"liked"}
              name={"Liked Songs"}
              image={
                "https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t1080x1080.jpg"
              }
              leftWidth={leftWidth}
            />
          ) : null}
          {artists?.length > 0
            ? artists.map((i) => (
                <LeftListComponent
                  key={i._id}
                  id={i._id}
                  image={i?.artistimage_Url}
                  name={i?.artistname}
                  type={"Artist"}
                  leftWidth={leftWidth}
                />
              ))
            : null}
          {/* {playlists?.length > 0
            ? artists.map((i) => (
                <LeftListComponent
                  key={i._id}
                  id={i._id}
                  image={i?.artistimage_Url}
                  name={i?.artistname}
                  type={"Artist"}
                  leftWidth={leftWidth}
                />
              ))
            : null} */}
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
          {likedSongs?.length > 0 ? (
            <LeftListComponent
              key={"liked"}
              // id={///////}
              type={"liked"}
              length={likedSongs?.length}
              name={"Liked Songs"}
              image={
                "https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t1080x1080.jpg"
              }
              leftWidth={leftWidth}
            />
          ) : null}
          {artists?.length > 0
            ? artists.map((i) => (
                <LeftListComponent
                  key={i._id}
                  id={i._id}
                  image={i?.artistimage_Url}
                  name={i?.artistname}
                  type={"Artist"}
                  leftWidth={leftWidth}
                />
              ))
            : null}
          {/* {artists?.length > 0
            ? artists.map((i) => (
                <LeftListComponent
                  key={i._id}
                  id={i._id}
                  image={i?.artistimage_Url}
                  name={i?.artistname}
                  type={"Artist"}
                  leftWidth={leftWidth}
                />
              ))
            : null} */}
        </div>
      </section>
    );
  return content;
};

export default LeftSideBar;
