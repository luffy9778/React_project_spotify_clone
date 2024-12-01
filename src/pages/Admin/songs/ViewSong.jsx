import React, { useEffect, useState } from "react";
import SongList from "./SongList";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const ViewSong = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);

  const [playingSong, setPlayingSong] = useState(null);
  // console.log(playingSong)
  // const [audio, setaudio] = useState(new Audio());

  // const togglePlay = (song) => {
  //   if (playingSong && playingSong._id === song._id) {
  //     if (audio.paused) {
  //       audio.play();
  //     } else {
  //       audio.pause();
  //     }
  //   } else {
  //     audio.pause();
  //     const newAudio = new Audio(song.songfile_url);
  //     setaudio(newAudio);
  //     newAudio.play();
  //     setPlayingSong(song);
  //   }
  // };

  const playSong = (song) => {
    if (playSong === song) {
    }
    setPlayingSong(song);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/songs");
        setData(response.data.songs);
        console.log(data, "data");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="px-6">
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
            // <SongList song={song} index={index} togglePlay={togglePlay} playingSong={playingSong}/>
            <SongList
              song={song}
              index={index}
              playSong={playSong}
              playingSong={playingSong}
            />
          ))}
        </tbody>
      </table>

      <audio src={playingSong?.songfile_url} controls autoPlay />
    </div>
  );
};

export default ViewSong;
