import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ViewPlaylist = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [data, setdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/playlist");
        console.log(response.data);
        setdata(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="w-full p-10 flex">
        {/* <div className="flex justify-between pt-3 px-3">
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
        </div> */}
        {data.map((i) => (
          <div className="w-1/6 p-3 bg-slate-700 rounded-md m-3">
            <img
              className="w-full aspect-square bg-slate-50 rounded-md"
              src={i.playlistimage}
            />
            <p className="text-center text-xl pt-2">{i.palylistname}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewPlaylist;
