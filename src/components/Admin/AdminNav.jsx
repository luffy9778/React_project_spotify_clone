import React, { useEffect, useState } from "react";
import axiosPrivate from "../../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const AdminNav = () => {
  const [info, setInfo] = useState([]);
  console.log(info);
  useEffect(() => {
    async function fetchInfo() {
      try {
        const response = await axiosPrivate.get("/info");
        setInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchInfo();
  }, []);
  return (
    <div className="h-1/6 bg-slate-900 flex justify-evenly items-center ">
      <div className="bg-yellow-600 w-36 rounded-lg text-center py-4 ">
        <h1 className="text-xl">Users</h1>
        <p>{info.userCount}</p>
      </div>
      <div className="bg-red-600 w-36 rounded-lg text-center py-4 ">
        <h1 className="text-xl">Songs</h1>
        <p>{info.songsCount}</p>
      </div>
      <div className="bg-lime-600 w-36 rounded-lg text-center py-4 ">
        <h1 className="text-xl">Artists</h1>
        <p>{info.artistCount}</p>
      </div>
      <div className="bg-orange-600 w-36 rounded-lg text-center py-4 ">
        <h1 className="text-xl">Playlists</h1>
        <p>{info.playlistCount}</p>
      </div>
      <div className="bg-blue-600 w-36 rounded-lg text-center py-4 ">
        <h1 className="text-xl">Tags</h1>
        <p>{info.tagCount}</p>
      </div>
      <div className="rounded-full bg-slate-400 w-10 h-10 flex justify-center items-center">A</div>
    </div>
  );
};

export default AdminNav;
