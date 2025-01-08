import React, { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import SpinnerTailwind from "../../../components/spinner/SpinnerTailwind";
const AddSong = () => {
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [bgColour, setBgColour] = useState("");
  const [song, setSong] = useState(null);
  const [image, setImage] = useState(null);
  const [audioError, setAudioError] = useState("");
  const [imageError, setImageError] = useState("");
  const [tags, setTags] = useState("");

  const imageInputRef = useRef(null);
  const songInputRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();

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

  const validateAudioFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validAudioTypes = [
        "audio/mp3",
        "audio/mpeg",
        "audio/aac",
        "audio/wav",
      ];
      if (!validAudioTypes.includes(file.type)) {
        setAudioError(
          "Invalid audio file format. Only MP3, AAC, or WAV are allowed."
        );
      } else if (file.size > 20 * 1024 * 1024) {
        // 20MB
        setAudioError("Audio file size should not exceed 20MB.");
      } else {
        setAudioError(""); // No errors
        setSong(file);
      }
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

  const artistOptions = artistData.map((i) => {
    return (
      <option key={i._id} value={i.artistname}>
        {i.artistname}
      </option>
    );
  });

  const tagsOptions = tagstData.map((i) => {
    return (
      <option key={i._id} value={i.tagName}>
        {i.tagName}
      </option>
    );
  });

  const addBtn =
    !songName || !artistName || !bgColour || !song || !image || !tags;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("startded uploading");
    if (addBtn) return;
    setLoading(true);
    setProgress(0);
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
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          },
        }
      );
      console.log(response, "d");
      alert("Song uploaded successfully");
      setArtistName("");
      setSongName("");
      setBgColour("");
      setImage(null);
      setSong(null);
      setTags("");
      if (imageInputRef.current) imageInputRef.current.value = "";
      if (songInputRef.current) songInputRef.current.value = "";
    } catch (err) {
      console.log(err);
      alert("Error uploading song.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* {loading && progress && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-1/3 h-36 flex justify-center ">
            {progress === 100 ? (
              <SpinnerTailwind />
            ) : (
              <div className="w-full px-5">
                <div className="flex justify-between mb-1">
                  <span className="text-base font-medium text-blue-700 dark:text-white">
                    Uploading song...
                  </span>
                  <span className="text-sm font-medium text-blue-700 dark:text-white">
                    {progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )} */}

      {loading && progress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {progress === 100 ? (
            <div className="p-5 pl-10 w-1/3 flex flex-col items-center">
              <SpinnerTailwind />
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 w-1/3 flex flex-col items-center">
              <span className="text-base font-medium text-blue-700 dark:text-white mb-4">
                Uploading song...
              </span>
              <div className="w-full px-5">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-blue-700 dark:text-white">
                    {progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <form className="max-w-3xl mx-auto pt-5" onSubmit={handleSubmit}>
        {/* Heading */}
        <h2 className="text-2xl font-bold  text-gray-900 dark:text-white text-center">
          Add Song
        </h2>

        {/* Full-Width Input */}
        <div className="mb-6">
          <label
            htmlFor="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Song Name
          </label>
          <input
            type="text"
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          />
        </div>

        {/* Select Dropdowns Side-by-Side */}
        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <label
              htmlFor="countries1"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select an Artist
            </label>
            <select
              id="countries1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
            >
              <option value="" selected>
                Choose a artist
              </option>
              {artistOptions}
            </select>
          </div>

          <div className="w-1/2">
            <label
              htmlFor="countries2"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select an Tag
            </label>
            <select
              id="countries2"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            >
              <option value="" selected>
                Choose a tag
              </option>
              {tagsOptions}
            </select>
          </div>
        </div>

        {/* File Inputs Side-by-Side */}
        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input1"
            >
              Upload image file
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

          <div className="w-1/2">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input2"
            >
              Upload audio file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help2"
              id="file_input2"
              type="file"
              ref={songInputRef}
              required
              onChange={validateAudioFile}
            />
            {audioError ? (
              <p className="mt-1 text-sm text-red-500">{audioError}</p>
            ) : (
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help2"
              >
                MP3, AAC, or WAV (MAX. 20MB).
              </p>
            )}
          </div>
        </div>

        {/* Color Picker Input */}
        <div className="flex gap-4 mb-6">
          <div className="mb-6 w-2/3">
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
              value={bgColour}
              onChange={(e) => setBgColour(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="mb-4 w-1/3 flex items-end justify-center ">
            <button
              type="submit"
              className={` ${
                addBtn && "cursor-not-allowed"
              } w-full h-12  text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2`}
              disabled={addBtn}
            >
              Add Song
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddSong;
