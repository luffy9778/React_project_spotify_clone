import React, { useContext } from "react";
import AlbumHeaderIconSet from "./AlbumHeaderIconSet";
import UserContext from "../../context/UserContext";

const AlbumHeader = ({ type, image, name, bgcolour }) => {
  const { userData } = useContext(UserContext);
  return (
    <div
      style={{
        background: `linear-gradient(180deg, ${bgcolour} 0%, rgba(18,18,18,1) 100%)`,
      }}
    >
      <div className="album__header">
        <div
          className="album__header-image"
          style={{ borderRadius: type === "Artist" ? "50%" : "5px" }}
        >
          <img
            src={image}
            alt="Album Image"
            style={{ borderRadius: type === "Artist" ? "50%" : "5px" }}
          />
        </div>
        <div className="album__header-text">
          {type === "Artist" && (
            <div className="album__header-sub-title">
              <img
                src="https://img.icons8.com/?size=96&id=2sZ0sdlG9kWP&format=png"
                style={{ width: "30px", height: "30px" }}
              />
              Verified Artist
            </div>
          )}
          <div className="album__header-title capitalize">{name}</div>
          {type === "Artist" && (
            <div className="album__header-subtext">
              <span>3,295,794</span> monthly listeners
            </div>
          )}
          {type === "Liked" && (
            <div>
              <span className="font-extrabold">{userData.username} </span>{" "}
              <span className="text-slate-300 text-sm">
                • {userData.likedSongs?.length} song
                {userData.likedSongs?.length > 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
      </div>
      <AlbumHeaderIconSet type={type} />
    </div>
  );
};

export default AlbumHeader;
