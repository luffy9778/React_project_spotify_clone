import { faEllipsis, faPauseCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const AlbumHeaderIconSet = ({ type,playAlbum,albumPalyStatus }) => {
  return (
    <div className="ablum__header-icon-container">
      <div className="ablum__header-icon-left">
        <div onClick={playAlbum}>
          {albumPalyStatus?<FontAwesomeIcon icon={faPauseCircle}/>:<FontAwesomeIcon icon={faPlayCircle} />}
          
        </div>
        {type !== "Liked" && type!=="tags" ? (
          <>
            <div>Following</div>
            <div>
              <FontAwesomeIcon icon={faEllipsis} />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AlbumHeaderIconSet;
