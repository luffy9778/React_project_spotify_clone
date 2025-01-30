import React, { useCallback, useEffect, useState } from "react";
import SpinnerTailwind from "../../spinner/SpinnerTailwind";
import PaginationBar from "../PaginationBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircleCheck,
  faClose,
  faPause,
  faPlay,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { debounce } from "lodash";
import axiosPrivate from "../../../api/axios";

const AddPlaylistSong = ({ song, setSong }) => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 5;
  const [data, setData] = useState([]);

  const fetchData = useCallback(
    debounce(async (searchQuery, page) => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          `/songs/search?query=${searchQuery}&page=${page}&limit=${limit}`
        );
        setData(response.data.songs);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }, 500),
    []
  );
  useEffect(() => {
    fetchData(query, currentPage);
  }, [currentPage]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setCurrentPage(1);
    fetchData(e.target.value, 1);
  };

  const addSong = (i) => {
    if (song?.includes(i)) return;
    else
      setSong((prv) => {
        return [...prv, i];
      });
  };
  const removeSong = (i) => {
    if (!song?.includes(i)) return;
    else setSong((prv) => prv.filter((songId) => songId !== i));
  };

  return (
    <>
      <input
        type="text"
        id="default-input"
        placeholder="Search songs..."
        value={query}
        onChange={handleSearch}
        className="mt-5 border text-sm rounded-lg w-full p-2.5 bg-transparent border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      />
      {loading ? (
        <div className="flex  items-center justify-center h-96">
          <SpinnerTailwind />
        </div>
      ) : !data.length ? (
        <div className="flex  items-center justify-center h-96">
          <p className="text-gray-400 text-lg">empty search result...</p>
        </div>
      ) : (
        <>
          <table className="w-full overflow-y-scroll">
            <thead>
              <tr className="py-44 border-spacing-0 border-b">
                <th className="w-2/12 py-4 text-center">#</th>
                <th className="w-5/12  text-start">Title</th>
                <th className="w-3/12 text-start">Artist</th>
                <th className="w-2/12 text-start"></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr
                  key={index}
                  className={`${
                    song?.includes(i._id) &&
                    "bg-violet-800 bg-opacity-40 border-none my-8 "
                  } border-spacing-0 border-b `}
                  onClick={() =>
                    song?.includes(i._id) ? removeSong(i._id) : addSong(i._id)
                  }
                >
                  <td className="w-2/12 text-center rounded-tl-2xl  rounded-bl-2xl">
                    {index + 1 + (currentPage - 1) * limit}{" "}
                  </td>
                  <td className="w-5/12 py-3">
                    <div className="flex items-center">
                      <img
                        src={i.songimage_url}
                        className="w-11 h-11 rounded-md mr-4"
                      />
                      {i.songname}
                    </div>
                  </td>
                  <td className="w-3/12 text-start">
                    {i.artistname.artistname}
                  </td>
                  <td className="w-2/12 text-center rounded-tr-2xl  rounded-br-2xl">
                    {song?.includes(i._id) ? (
                      <div>
                        <FontAwesomeIcon icon={faCheck} />
                      </div>
                    ) : (
                      <div>
                        <FontAwesomeIcon icon={faPlus} />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationBar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </>
  );
};

export default AddPlaylistSong;
