import React, { useEffect, useState } from "react";
import axiosPrivate from "../../../api/axios";

const AddSong = () => {
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [bgColour, setBgColour] = useState("");
  const [song, setSong] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");

  // console.log(songName,artistName,bgColour,song,image,tags)

  const [artistData, setArtistData] = useState([]);
  const [tagstData, setTagsData] = useState([]);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axiosPrivate.get("/artist");
        setArtistData(response.data.artists);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArtist();
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axiosPrivate.get("/tags");
        // console.log(response.data)
        setTagsData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTags();
  }, []);

  const artistOptions = artistData.map((i) => {
    return (
      <option key={i._id} value={i.artistname}>
        {i.artistname}
      </option>
    );
  });

  const tagsOptions = tagstData.map((i) => {
    return (
      <option key={i._id} value={i._id}>
        {i.tagName}
      </option>
    );
  });

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const response = await axiosPrivate.post(
          "/songs/upload",
          {
            songname: songName,
            songtags: tags,
            artistname: artistName,
            bgcolour: bgColour,
            image,
            song,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response,"d")
        alert("Song uploaded successfully");
        setArtistName("")
        setSongName("")
        setBgColour("")
        setImage("")
        setSong("")
        setTags("")
      } catch (err) {
        console.log(err);
      }
    };
 
  return (
    <div className=" bg-white text-black">
      <h1>Add Song</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="song name"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
        />
<br/>
        <label>bgColour</label>
        <input type="color" value={bgColour} 
        onChange={(e) => setBgColour(e.target.value)} />
<br/>
        <select onChange={(e) => setArtistName(e.target.value)}>
          <option>select-artist</option>
          {artistOptions}
        </select>
        <br/>
        <select onChange={(e) => setTags(e.target.value)}>
          <option>select-tags</option>
          {tagsOptions}
        </select>
        <br/>
        <label htmlFor="">select Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <br/>
        <label htmlFor="">select audio</label>
        <input type="file" onChange={(e) => setSong(e.target.files[0])} />
        <br/>
        <button>addSong</button>
      </form>
    </div>
  );
};

export default AddSong;
