import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const ViewPlaylist = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setdata] = useState([]);
  console.log(data);
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
