import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlay, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faPause } from "@fortawesome/free-solid-svg-icons/faPause";
import axiosPrivate from "../../../api/axios";

const SongList = ({ song, index, playSong, playingSong }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [plyBtn, setPlyBtn] = useState(false);

  const handleDelete=async(id)=>{
    try {
      const response=await axiosPrivate.delete(`/songs/${id}`)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <tr
      key={index}
      className=" border-spacing-0 border-b"
      onMouseEnter={() => {
        setIsHovered(song._id);
      }}
      onMouseLeave={() => {
        isHovered !== playingSong?._id && setIsHovered(false);
      }}
    >
      <td className="w-2/12 text-center">
        {isHovered ? (
          <FontAwesomeIcon
            icon={playingSong === song ? faPause : faPlay}
            onClick={() => {
              // setPlyBtn(prv=>!prv)
              playSong(song);
            }}
          />
        ) : (
          index + 1
        )}
      </td>
      <td className="w-4/12 py-3">
        <div className="flex items-center">
          <img src={song.songimage_url} className="w-11 h-11 rounded-md mr-4" />
          <Link to={`/admin/songs/${song._id}`} className="hover:underline">
            {song.songname}
          </Link>
        </div>
      </td>
      <td className="w-2/12 text-start">{song.artistname.artistname}</td>
      <td className="w-2/12 text-end">
      <Link to={`/admin/songs/edit/${song._id}`}>
      <FontAwesomeIcon icon={faEdit}/>
      </Link>
      </td>
      <td className="w-2/12 text-center">
      <FontAwesomeIcon icon={faTrash} onClick={()=>handleDelete(song._id)}/>
      </td>
    </tr>
  );
};

export default SongList;
