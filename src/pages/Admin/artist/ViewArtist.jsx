import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import PaginationBar from "../../../components/Admin/PaginationBar";
import { debounce } from "lodash";
import SerchNav from "../../../components/Admin/search/SerchNav";
import SpinnerTailwind from "../../../components/spinner/SpinnerTailwind";

const ViewArtist = () => {
  const [data, setData] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 4;

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const endpoint = !query.trim()
          ? `/artist?page=${currentPage}&limit=${limit}`
          : `/artist/search?query=${query}&page=${currentPage}&limit=${limit}`;
        const response = await axiosPrivate.get(endpoint);
        setData(response.data.artists);
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
      <SerchNav handleSearch={handleSearch} nav="artist" />
      {loading ? (
        <div class="flex  items-center justify-center h-96">
          <SpinnerTailwind />
        </div>
      ) : !data.length ? (
        <div class="flex  items-center justify-center h-96">
          <p className="text-gray-400 text-lg">empty result...</p>
        </div>
      ) : (
        <>
          <table className="w-full">
            <thead>
              <tr className="py-44 border-spacing-0 border-b">
                <th className="w-2/12 py-4 text-center">#</th>
                <th className="w-5/12  text-start">Artist</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((i, index) => (
                <tr key={index} className=" border-spacing-0 border-b">
                  <td className="w-2/12 text-center">{index + 1}</td>
                  <td className="w-5/12 py-3">
                    <div className="flex items-center">
                      <img
                        src={i.artistimage_Url}
                        className="w-11 h-11 rounded-md mr-4"
                      />
                      <Link
                        to={`/admin/artist/${i._id}`}
                        className="hover:underline"
                      >
                        {i.artistname}
                      </Link>
                    </div>
                  </td>
                  <td className="w-2/12 text-center">
                    <Link to={`/admin/artist/edit/${i._id}`}>
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
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
    </div>
  );
};

export default ViewArtist;
