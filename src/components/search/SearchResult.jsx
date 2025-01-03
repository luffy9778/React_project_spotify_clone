import React, { useState } from "react";
import HomeAlbumListCard from "../home/HomeAlbumListCard";
import { useNavigate } from "react-router-dom";

const SearchResult = ({ result }) => {
  const [category, setCategory] = useState("all");
const navigate=useNavigate()

  const getListObj = () => {
    const list = [];
    if (result?.songs?.length > 0) list.push("songs");
    if (result?.artists?.length > 0) list.push("artists");
    if (result?.playlists?.length > 0) list.push("playlists");
    if (list.length > 0) {
      list.unshift("all");
    }
    return list;
  };
  const listObj = getListObj();

  const songs = result?.songs?.length > 0 && (
    <>
      <h1 className="text-3xl mt-10 font-bold">Songs</h1>
      {result?.songs?.map((i) => (
        <div className="flex px-5 py-3 rounded-md hover:bg-slate-100 hover:bg-opacity-20 group">
          <img src={i.songimage_url} className="h-14 w-14 rounded-md " />
          <div className="pl-4">
            <p>{i.songname}</p>
            <p className="font-extralight text-zinc-400 group-hover:text-white hover:underline"
            onClick={()=>navigate(`/artist/${i.artistname._id}`)}>
              {i.artistname.artistname}
            </p>
          </div>
        </div>
      ))}
    </>
  );

  const artists = result?.artists?.length > 0 && (
    <>
      <h1 className="text-3xl mt-10 font-bold">Artists</h1>
      <div className="flex">
        {result?.artists?.map((i) => (
          <div className="p-3 m-3 hover:bg-slate-300 hover:bg-opacity-5 rounded-lg"
          onClick={()=>navigate(`/artist/${i._id}`)}>
            <div className="rounded-full h-48 w-48 overflow-hidden">
              <img
                src={i.artistimage_Url}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-center capitalize pt-2 hover:underline">
              {i.artistname}
            </p>
            <p className="text-center text-zinc-400 text-sm">Artist</p>
          </div>
        ))}
      </div>
    </>
  );
  const playlists = result?.playlists?.length > 0 && (
    <>
      <h1 className="text-3xl mt-10 mb-5 font-bold">Playlists</h1>
      <div className="flex">
        {result?.playlists?.map((i) => (
          <div className="max-w-44 capitalize">
            <HomeAlbumListCard item={i} />
          </div>
        ))}
      </div>
    </>
  );
  const displayResult = () => {
    switch (category) {
      case "songs":
        return songs;
      case "artists":
        return artists;
      case "playlists":
        return playlists;
      default:
        return (
          <>
            {songs}
            {artists}
            {playlists}
          </>
        );
    }
  };
  return (
    <div className="w-full">
      <div className="flex mb-3">
        {!listObj?.length > 0 && <p>no result</p>}
        {listObj.map((i) => (
          <div
            key={i}
            style={{
              backgroundColor: i === category ? "white" : "#1f1f1f",
              color: i === category ? "black" : "white",
            }}
            className="rounded-xl mx-2 p-2 capitalize"
            onClick={() => {
              setCategory(i);
            }}
          >
            {i}
          </div>
        ))}
      </div>
      {displayResult()}
    </div>
  );
};

export default SearchResult;
