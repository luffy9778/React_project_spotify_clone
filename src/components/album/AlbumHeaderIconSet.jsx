import {
  faEllipsis,
  faPauseCircle,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import axiosPrivate from "../../api/axios";
import UserContext from "../../context/UserContext";
import { Flip, toast } from "react-toastify";

const AlbumHeaderIconSet = ({
  type,
  playAlbum,
  albumPalyStatus,
  artistId,
  name,
}) => {
  const { fetchUserData, userData } = useContext(UserContext);

  const follwArtist = async (artistId) => {
    try {
      await axiosPrivate.post("/user/artist", { artistId });
      toast.success(`following ${name}`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
      fetchUserData();
    } catch (error) {
      toast.error(`somthing went wrong! `, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    }
  };
  const unFollwArtist = async (artistId) => {
    try {
       await axiosPrivate.delete(`/user/artist/${artistId}`);
      toast.warn(`removed from Your Library`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
      fetchUserData();
    } catch (error) {
      toast.error(`somthing went wrong! `, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    }
  };
  const isFollowed = userData?.artists?.filter((i) => i._id === artistId);
  return (
    <div className="ablum__header-icon-container">
      <div className="ablum__header-icon-left">
        <div onClick={playAlbum}>
          {albumPalyStatus ? (
            <FontAwesomeIcon icon={faPauseCircle} />
          ) : (
            <FontAwesomeIcon icon={faPlayCircle} />
          )}
        </div>
        {type === "Artist" ? (
          <>
            {isFollowed?.length > 0 ? (
              <div onClick={() => unFollwArtist(artistId)}>unfollow</div>
            ) : (
              <div onClick={() => follwArtist(artistId)}>Follow</div>
            )}
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
