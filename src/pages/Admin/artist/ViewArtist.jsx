import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const ViewArtist = () => {
  const [data, setData] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/artist");
        setData(response.data.artists);
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
    </div>
  );
};

export default ViewArtist;
