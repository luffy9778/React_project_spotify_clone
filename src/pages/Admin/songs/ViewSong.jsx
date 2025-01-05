import React, { useEffect, useState } from "react";
import SongList from "./SongList";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import PaginationBar from "../../../components/Admin/PaginationBar";
import { debounce } from "lodash";

const ViewSong = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [playingSong, setPlayingSong] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 4;

  const [query, setQuery] = useState("");

  const playSong = (song) => {
    if (playSong === song) {
    }
    setPlayingSong(song);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const endPoint = !query.trim()
          ? `/songs?page=${currentPage}&limit=${limit}`
          : `/songs/search?query=${query}&page=${currentPage}&limit=${limit}`;
        const response = await axiosPrivate.get(endPoint);
        setData(response.data.songs);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [currentPage, query]);

  const handleSearch = debounce(async (e) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  }, 500);

  return (
    <div className="px-6 h-5/6 relative">
      <div className="flex justify-between pt-3 px-3">
        <input
          type="text"
          placeholder="search songs..."
          className="rounded-lg h-8 bg-transparent pl-3 text-white border focus:border-none"
          onChange={handleSearch}
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
