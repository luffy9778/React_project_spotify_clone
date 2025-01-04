import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import SidePannalList from "./SidePannalList";
import { useNavigate } from "react-router-dom";

const LeftSidePannel = () => {
    const navigate=useNavigate()
  const list = [
    {
      id: 1,
      view:{path:"/Admin/songs", content:"View Song"},
      name:"Songs",
      add:{path:"/Admin/songs/add", content:"Add Song"},
      edit:{path:"/Admin/songs/edit", content:"Edit Song"},
      delete:"Delete Song",
    },
    {
      id: 2,
      view:{path:"/Admin/artist", content:"View Artist"},
      name:"Artists",
      add:{path:"/Admin/artist/add", content:"Add Artist"},
      edit:{path:"/Admin/artist/edit", content:"Edit Artist"},
      delete:"Delete Artist",
    },
    {
      id: 3,
      view:{path:"/Admin/playlist", content:"View Playlist"},
      name:"Playlists",
      add:{path:"/Admin/playlist/add", content:"Add Playlist"},
      edit:{path:"/Admin/playlist/edit", content:"Edit Playlist"},
      delete:"Delete Playlist",
    },
  ];
  return (
    <>
      <div className="h-1/6 flex justify-start items-center text-2xl pl-4">
        <FontAwesomeIcon icon={faSpotify} className="text-4xl" />
        &nbsp;Spotify
      </div>
      <div className="h-5/6 overflow-y-scroll">
      <div className=" mb-2 text-xl h-10 pl-5 flex items-center hover:rounded-lg hover:bg-violet-700" onClick={()=>navigate("/Admin")}>Home</div>
        {list.map((i) => (
          <SidePannalList key={i.id} value={i} />
        ))}
      </div>
    </>
  );
};

export default LeftSidePannel;
