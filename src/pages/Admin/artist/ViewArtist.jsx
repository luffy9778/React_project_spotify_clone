import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import PaginationBar from "../../../components/Admin/PaginationBar";

const ViewArtist = () => {
  const [data, setData] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

 const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 4;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(`/artist?page=${currentPage}&limit=${limit}`);
        setData(response.data.artists);
        setTotalPages(response.data.totalPages);
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
          onClick={() => navigate("/Admin/artist/add")}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="py-44 border-spacing-0 border-b">
            <th className="w-2/12 py-4 text-center">#</th>
            <th className="w-5/12  text-start">Artist</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i, index) => (
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
    </div>
  );
};

export default ViewArtist;
