import React, { useState } from "react";
// import axiosPrivate from '../../../api/axios'
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const AddArtist = () => {
  const axiosPrivate = useAxiosPrivate();
  const [artistname, setArtistName] = useState("");
  const [bgColour, setBgcolour] = useState("");
  const [image, setImage] = useState(null);
  console.log(bgColour, artistname, image);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        "/artist/add",
        { artistname, artistbgcolour: bgColour, image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setArtistName("");
      setBgcolour("");
      setImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <form onSubmit={handleSubmit} className="m-10  p-10 flex flex-col">
        <h1 className="text-center text-4xl p-3">Add Artist</h1>

        <input
          type="text"
          placeholder="Artist Name"
          className="rounded-md p-3 bg-transparent border"
          value={artistname}
          onChange={(e) => setArtistName(e.target.value)}
        />

        <label> BgColour</label>
        <input
          type="color"
          value={bgColour}
          onChange={(e) => setBgcolour(e.target.value)}
        />

        <label>Profile Picture</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button className="bg-green-600">create Artist</button>
      </form>
    </div>
  );
};

export default AddArtist;
