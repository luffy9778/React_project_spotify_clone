import React, { useEffect, useState } from "react";
import axiosPrivate from "../../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

const EditArtist = () => {
  const [artistname, setArtistName] = useState("");
  const [bgColour, setBgcolour] = useState("");
  const [image, setImage] = useState(null);
console.log(artistname,bgColour,image)

  const {id}=useParams()
  console.log(id)
  const navigate=useNavigate()

  useEffect(() => {
    const getArtist = async () => {
      try {
        const response = await axiosPrivate.get(`/artist/${id}`);
        console.log(response.data);
        setArtistName(response.data.artist.artistname)
        setBgcolour(response.data.artist.artistbgcolour)
        setImage(response.data.artist.artistimage_Url)
      } catch (err) {
        console.log(err);
      }
    };
    getArtist();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.put(
        `/artist/edit/${id}`,
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
      navigate("Admin/artist")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <form onSubmit={handleSubmit} className="m-10  p-10 flex flex-col">
        <h1 className="text-center text-4xl p-3">Add Artist</h1>
        <img src={image} className="w-32 h-32" />
        <input
          type="text"
          placeholder="Artist Name"
          className="rounded-md p-3 bg-transparent border"
          value={artistname}
          required
          onChange={(e) => setArtistName(e.target.value)}
        />
        <label> BgColour</label>
        <input
          type="color"
          value={bgColour}
          required
          onChange={(e) => setBgcolour(e.target.value)}
        />
        <label>Profile Picture</label>
        <input 
          type="file"  
          onChange={(e) => setImage(e.target.files[0])}
          required />
        <button className="bg-green-600">create Artist</button>
      </form>
    </div>
  );
};

export default EditArtist;
