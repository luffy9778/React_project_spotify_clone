import React, { useRef, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import AddPlaylistSong from "../../../components/Admin/playlist/AddPlaylistSong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClose } from "@fortawesome/free-solid-svg-icons";

const AddPlaylist = () => {
  const [palylistname, setPlaylistName] = useState("");
  const [playlistbgcolour, setBgColour] = useState("");
  // const [playlisttags, setPlaylistTags] = useState("");
  const [image, setImage] = useState(null);
  const [song, setSong] = useState([]);
  const [imageError, setImageError] = useState("");

  const [isClosed, setIsClosed] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  const imageInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        "/playlist/upload",
        { palylistname, playlistbgcolour, songs: song, image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      alert("succes")
      setPlaylistName("");
      setBgColour("");
      setImage(null);
      setSong([]);
      // setPlaylistTags("");
    } catch (error) {
      console.log(error);
    }
  };

  const validateImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validImageTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!validImageTypes.includes(file.type)) {
        setImageError(
          "Invalid image format. Only PNG, JPG, or JPEG are allowed."
        );
      } else if (file.size > 5 * 1024 * 1024) {
        // 5MB limit for image
        setImageError("Image file size should not exceed 2MB.");
      } else {
        setImageError(""); // No errors
        setImage(file);
      }
    }
  };

  const addBtn = !palylistname || !playlistbgcolour || !song.length || !image;

  return (
    <div className="w-full h-full flex">
      <div
        className={`${
          isClosed ? "w-full" : "w-2/5"
        } flex justify-center items-center`}
      >
        <form onSubmit={handleSubmit} className=" flex flex-col w-full px-5">
          <h1 className="text-center text-4xl pb-4">Add playlist</h1>

          <div className="mb-3">
            <label
              htmlFor="default-input"
              className="block mb-2 text-sm font-medium text-white"
            >
              Playlist Name
            </label>
            <input
              type="text"
              id="default-input"
              placeholder="Playlist Name"
              value={palylistname}
              onChange={(e) => setPlaylistName(e.target.value)}
              className=" border text-sm rounded-lg  block w-full p-2.5 bg-transparent border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="color_picker"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Color
            </label>
            <input
              type="color"
              id="color_picker"
              className="block w-full text-sm rounded-lg cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white h-12"
              required
              value={playlistbgcolour}
              onChange={(e) => setBgColour(e.target.value)}
            />
          </div>

          {/* <select
            value={playlisttags}
            onChange={(e) => setPlaylistTags(e.target.value)}
            className="bg-transparent focus:bg-transparent"
          >
            <option value="" className="bg-slate-700">
              --select--
            </option>
            <option value="Malyalam" className="bg-slate-700">
              Malyalam
            </option>
            <option value="Tamil" className="bg-slate-700">
              Tamil
            </option>
          </select> */}

          <div className="mb-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input1"
            >
              Playlist Image
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help1"
              id="file_input1"
              required
              type="file"
              ref={imageInputRef}
              onChange={validateImageFile}
            />
            {imageError ? (
              <p className="mt-1 text-sm text-red-500">{imageError}</p>
            ) : (
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help1"
              >
                PNG, JPG or JPEG (MAX. 800x400px).
              </p>
            )}
          </div>
          <div className="mb-3 h-10 flex items-center gap-5">
          {isClosed?(<button
              className="border p-2 rounded flex items-center space-x-2 transition-all duration-300 ease-in-out transform hover:bg-gray-900 hover:text-md hover:scale-105"
              onClick={() => setIsClosed((prv) => !prv)}
            >
              <span>Select songs</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>) :<button
              className="border p-2 rounded flex items-center space-x-2 transition-all duration-300 ease-in-out transform hover:bg-gray-900 hover:text-md hover:scale-105"
              onClick={() => setIsClosed((prv) => !prv)}
            >
              <span>Hide songs</span>
              <FontAwesomeIcon icon={faClose} />
            </button>}
            {`(${song?.length}) song selected`}
          </div>

          <div className="mb-4 flex items-end justify-center ">
            <button
              type="submit"
              className={` ${
                addBtn && "cursor-not-allowed"
              } w-full h-12  text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2`}
              disabled={addBtn}
            >
              Add Playlist
            </button>
          </div>
        </form>
      </div>
      {!isClosed && (
        <div className="w-3/5 border-l-4 px-6 overflow-y-scroll">
          <AddPlaylistSong song={song} setSong={setSong} />
        </div>
      )}
    </div>
  );
};

export default AddPlaylist;
