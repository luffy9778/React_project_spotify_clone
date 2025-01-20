import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import AudioContext from "../../context/SongContext";
import { Audio } from "react-loader-spinner";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

const LikedSongTable = ({ data }) => {
  // const { setCurrentSong, setIsPlaying, setLocal,setSongList,setCurrentIndex } = useContext(UserContext);

  const {
    dispatch,
    saveSongToLocalStorage,
    state: { currentSong, isPlaying },
  } = useContext(AudioContext);

  const handleSongClick = (song, index) => {
    dispatch({
      type: "SET_SONG_LIST",
      payload: { songList: data, currentPage: "likedSongs" },
    });
    dispatch({
      type: "SET_CURRENT_SONG",
      payload: { song, index },
    });
    saveSongToLocalStorage(song);
  };

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
                <div>
                  {currentSong.songname === i.songname && isPlaying ? (
                    <>
                      <span
                        className="justify-center hidden group-hover:flex"
                        onClick={() => dispatch({ type: "TOGGLE_PLAY" })}
                      >
                        <FontAwesomeIcon icon={faPause} />
                      </span>
                      <div className="group-hover:hidden">
                        <Audio
                          height="25"
                          width="25"
                          color="#02c415"
                          ariaLabel="audio-loading"
                          wrapperStyle={{ justifyContent: "center" }}
                          wrapperClass="wrapper-class"
                          visible={true}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="group-hover:hidden">{index + 1}</span>
                      <div
                        className="justify-center hidden group-hover:flex"
                        onClick={() => handleSongClick(i, index)}
                      >
                        <FontAwesomeIcon icon={faPlay} />
                      </div>
                    </>
                  )}
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
              </td>
              <td className="text-center rounded-tr-2xl  rounded-br-2xl ">
              {Math.floor(i?.duration/60)}:{Math.round(i?.duration%60).toString().padStart(2,"0")}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default LikedSongTable;
