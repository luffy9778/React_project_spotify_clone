import React, { useEffect, useState } from "react";
import axiosPrivate from "../../../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPause,
  faPlay,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const AddPlaylist = () => {
  const [palylistname, setPlaylistName] = useState("");
  const [playlistbgcolour, setBgColour] = useState("");
  const [playlisttags, setPlaylistTags] = useState("");
  const [image, setImage] = useState(null);
  const [song, setSong] = useState([]);
  const [songAddStatus, setSongAddStatus] = useState(false);
  console.log(playlistbgcolour,palylistname,playlisttags,image,song)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        "/playlist/upload",
        { palylistname,playlistbgcolour,playlisttags,songs:song, image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setPlaylistName("");
      setBgColour("");
      setImage(null);
      setSong([])
      setPlaylistTags("")
    } catch (error) {
      console.log(error);
    }
  };

  //for song list

  const [data, setData] = useState([]);
  console.log(data)
  const [isHovered, setIsHovered] = useState(false);

  const [playingSong, setPlayingSong] = useState(null);
  const [plyBtn, setPlyBtn] = useState(false);
  const [audio, setaudio] = useState(new Audio());

  const togglePlay = (song) => {
    console.log("click");
    if (playingSong && playingSong._id === song._id) {
      if (audio.paused) {
        audio.play();
        setPlyBtn(true);
      } else {
        audio.pause();
        setPlyBtn(false);
      }
    } else {
      audio.pause();
      const newAudio = new Audio(song.songfile);
      setaudio(newAudio);
      newAudio.play();
      setPlyBtn(true);
      setPlayingSong(song);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/songs");
        setData(response.data.songs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const addSong = (id) => {
    console.log(id)
    setSong((prv) => {
      if (prv.includes(id)) {
        setSongAddStatus(false);
        return prv.filter((i) => i !== id);
      }
      setSongAddStatus(true);
      return [...prv, id];
    });
  };

  return (
    <div className="w-full h-full flex">
      <div className="w-2/5 flex justify-center items-center ">
        <form onSubmit={handleSubmit} className="m-10  p-10 flex flex-col">
          <h1 className="text-center text-4xl p-3">Add playlist</h1>
          <input
            type="text"
            placeholder="playlist Name"
            className="rounded-md p-3 bg-transparent border"
            value={palylistname}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <label> BgColour</label>
          <input
            type="color"
            value={playlistbgcolour}
            onChange={(e) => setBgColour(e.target.value)}
          /> 
          <select 
            value={playlisttags} 
            onChange={(e)=>setPlaylistTags(e.target.value)}
            className="bg-transparent focus:bg-transparent"
            >
            <option value="" className="bg-slate-700">--select--</option>
            <option value="Malyalam" className="bg-slate-700">Malyalam</option>
            <option value="Tamil" className="bg-slate-700">Tamil</option>
          </select>
          <label>playlist image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button className="bg-green-600">create playlist</button>
        </form>
      </div>
      <div className="w-3/5 border-l-4 px-6 overflow-y-scroll">
        <table className="w-full">
          <thead>
            <tr className="py-44 border-spacing-0 border-b">
              <th className="w-2/12 py-4 text-center">#</th>
              <th className="w-5/12  text-start">Title</th>
              <th className="w-3/12 text-start">Artist</th>
              <th className="w-2/12 text-start"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((song, index) => (
              <tr
                key={index}
                className=" border-spacing-0 border-b"
                onMouseEnter={() => {
                  setIsHovered(true);
                }}
                onMouseLeave={() => {
                  !plyBtn && setIsHovered(false);
                }}
              >
                <td className="w-2/12 text-center">
                  {isHovered ? (
                    <FontAwesomeIcon
                      icon={plyBtn ? faPause : faPlay}
                      onClick={() => togglePlay(song)}
                    />
                  ) : (
                    index + 1
                  )}
                </td>
                <td className="w-5/12 py-3">
                  <div className="flex items-center">
                    <img
                      src={song.songimage}
                      className="w-11 h-11 rounded-md mr-4"
                    />
                    {song.songname} 
                  </div>
                </td>
                <td className="w-3/12 text-start">{song.artistname.artistname
}
</td>
                <td className="w-2/12 text-center">
                  <div onClick={() => addSong(song._id)}>
                    {songAddStatus ? (
                      <FontAwesomeIcon icon={faCircleCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faPlus} />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddPlaylist;
