import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { faCircleCheck, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import AudioContext from "../../context/SongContext";

const TagAlbumTable = ({ data,id}) => {
  const {
    userData,
    addLikedSong,
  } = useContext(UserContext);
  const { dispatch,saveSongToLocalStorage } = useContext(AudioContext);

  const handleSongClick = (song, index) => {
    dispatch({ type: "SET_SONG_LIST", payload: { songList:data, currentPage: id },
    });
    dispatch({
      type: "SET_CURRENT_SONG",
      payload: { song, index },
    });
    saveSongToLocalStorage(song)
  };
  const likedSongs = userData.likedSongs;
  return (
    <div className="px-10 w-full">
      <table className="w-full text-left border-separate border-spacing-y-2">
        <tr className="h-12">
          <th className="w-1/12  text-center  border-b-2 border-gray-800 ">
            #
          </th>
          <th className="w-6/12  border-b-2 border-gray-800">Title</th>
          <th className="w-3/12  border-b-2 border-gray-800">Artist</th>
          <th className="w-2/12 text-center  border-b-2 border-gray-800">
            <FontAwesomeIcon icon={faClock} />
          </th>
        </tr>
        {data?.map((i, index) => {
          return (
            <tr key={index} className="h-16 hover:bg-slate-500/[0.1] group">
              <td className=" text-center rounded-tl-2xl  rounded-bl-2xl ">
                <div
                  // onClick={() => {
                  //   setIsPlaying(false);
                  //   setCurrentSong(i);
                  //   setIsPlaying(true);
                  //   setSongList(data);
                  //   setCurrentIndex(index);
                  //   setLocal(i);
                  // }}
                  onClick={()=>handleSongClick(i,index)}
                >
                  {index + 1}
                </div>
              </td>
              <td>
                <div className="flex items-center capitalize">
                  <img
                    src={i.songimage_url}
                    className="w-10 h-10 rounded-md mr-3"
                  />
                  {i.songname}
                </div>
              </td>
              <td className="capitalize flex py-5  justify-between ">
                <div>{i.artistname.artistname}</div>
                {likedSongs?.find((x) => x._id === i._id) ? (
                  <span className="items-center text-green-500">
                    <FontAwesomeIcon icon={faCircleCheck} />{" "}
                  </span>
                ) : (
                  <span
                    className="opacity-0  items-center group-hover:opacity-100"
                    onClick={() => addLikedSong(i._id)}
                  >
                    <FontAwesomeIcon icon={faCirclePlus} />
                  </span>
                )}
              </td>
              <td className="text-center rounded-tr-2xl  rounded-br-2xl ">
                2:55
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TagAlbumTable;
