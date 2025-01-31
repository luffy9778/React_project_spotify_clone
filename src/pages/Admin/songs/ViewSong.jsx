import React, { useEffect, useState } from "react";
import SongList from "./SongList";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import PaginationBar from "../../../components/Admin/PaginationBar";
import { debounce } from "lodash";
import SerchNav from "../../../components/Admin/search/SerchNav";
import SpinnerTailwind from "../../../components/spinner/SpinnerTailwind";
import DeletePopUp from "../../../components/Admin/DeletePopUp";

const ViewSong = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [playingSong, setPlayingSong] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [delteLoading, setDeleteLoading] = useState(false);
  const limit = 4;

  const [confirm, setConfirm] = useState("");

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

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    try {
      const response = await axiosPrivate.delete(`/songs/${id}`);
      setConfirm("");
      if (response.status === 200) alert("song deleted successfully");
    } catch (error) {
      setConfirm("");
      alert("error deleting song");
      console.log(error);
    } finally {
      fetchData();
      setDeleteLoading(false);
    }
  };

  const [query, setQuery] = useState("");

  const playSong = (song) => {
    if (playSong === song) {
    }
    setPlayingSong(song);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, query]);

  const handleSearch = debounce(async (e) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  }, 500);

  return (
    <div className="px-6 h-5/6 relative">
      <SerchNav handleSearch={handleSearch} nav="songs" />
      {loading ? (
        <div className="flex  items-center justify-center h-96">
          <SpinnerTailwind />
        </div>
      ) : !data.length ? (
        <div className="flex  items-center justify-center h-96">
          <p className="text-gray-400 text-lg">empty result...</p>
        </div>
      ) : confirm ? (
        <DeletePopUp
          confirm={confirm}
          setConfirm={setConfirm}
          handleDelete={handleDelete}
          delteLoading={delteLoading}
        />
      ) : (
        <>
          <table className="w-full">
            <thead>
              <tr className="py-44 border-spacing-0 border-b">
                <th className="w-2/12 py-4 text-center">#</th>
                <th className="w-4/12  text-start">Title</th>
                <th className="w-2/12 text-start">Artist</th>
                <th className="w-2/12 text-start"></th>
                <th className="w-2/12 text-start"></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((song, index) => (
                // <SongList song={song} index={index} togglePlay={togglePlay} playingSong={playingSong}/>
                <SongList
                  key={index}
                  song={song}
                  index={index}
                  playSong={playSong}
                  playingSong={playingSong}
                  setConfirm={setConfirm}
                />
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
      {/* <audio src={playingSong?.songfile_url} controls autoPlay /> */}
    </div>
  );
};

export default ViewSong;
