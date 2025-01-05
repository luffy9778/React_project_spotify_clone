import React, { useEffect, useState } from "react";
import SongList from "./SongList";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import PaginationBar from "../../../components/Admin/PaginationBar";

const ViewSong = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [playingSong, setPlayingSong] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 4;

  const playSong = (song) => {
    if (playSong === song) {
    }
    setPlayingSong(song);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          `/songs?page=${currentPage}&limit=${limit}`
        );
        setData(response.data.songs);
        setTotalPages(response.data.totalPages);
        console.log(response.data, "data");
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [currentPage]);

  return (
    <div className="px-6 h-5/6 relative">
      <div className="flex justify-between pt-3 px-3">
        <input
          type="text"
          placeholder="search songs..."
          className="rounded-lg h-8 bg-slate-300 pl-3 text-black border focus:border-none"
        />
        <button
          className="bg-green-600 rounded-lg px-3"
          onClick={() => navigate("/Admin/songs/add")}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="py-44 border-spacing-0 border-b">
            <th className="w-2/12 py-4 text-center">#</th>
            <th className="w-5/12  text-start">Title</th>
            <th className="w-3/12 text-start">Artist</th>
            <th className="w-2/12 text-start"></th>
          </tr>
        </thead>
        {loading ? (
          <p>loading</p>
        ) : (
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
        )}
      </table>

      <PaginationBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {/* <audio src={playingSong?.songfile_url} controls autoPlay /> */}
    </div>
  );
};

export default ViewSong;
