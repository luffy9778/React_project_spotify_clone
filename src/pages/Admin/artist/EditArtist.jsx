import React, { useEffect, useRef, useState } from "react";
// import axiosPrivate from '../../../api/axios'
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import SpinnerTailwind from "../../../components/spinner/SpinnerTailwind";
import { useNavigate, useParams } from "react-router-dom";

const EditArtist = () => {
  const axiosPrivate = useAxiosPrivate();
  const [artistname, setArtistName] = useState("");
  const [bgColour, setBgcolour] = useState("");
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [fetchData, setFetchData] = useState("");
  
  const imageInputRef = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axiosPrivate.get(`/artist/${id}`);
        const { artistbgcolour, artistname } = response.data.artist;
        setArtistName(artistname);
        setBgcolour(artistbgcolour);
        setFetchData(response.data.artist);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {};
    if (fetchData.artistname !== artistname) {
      updatedData.artistname = artistname;
    }
    if (fetchData.artistbgcolour !== bgColour) {
      updatedData.artistbgcolour = bgColour;
    }
    if (image) {
      updatedData.image = image;
    }
    // Check if there's anything to update
    if (Object.keys(updatedData).length === 0) {
      alert("No changes to update.");
      return;
    }
    setLoading(true);

    try {
      const response = await axiosPrivate.put(
        `/artist/edit/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      alert("Artist edited Successfully");
      setArtistName("");
      setBgcolour("");
      setImage(null);
      if (imageInputRef.current) imageInputRef.current.value = "";
      navigate("/Admin/artist");
    } catch (error) {
      console.log(error);
      alert(" Error editing Artist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-5 pl-10 w-1/3 flex flex-col items-center">
            <SpinnerTailwind />
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto pt-5 w-full">
        <h1 className="text-center text-4xl p-3">Edit Artist</h1>
        <div className="mb-6">
          <label
            htmlFor="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Artist Name
          </label>
          <input
            type="text"
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={artistname}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </div>
        <div className="flex">
          <div className="mb-6 pr-3 w-1/2">
            <label
              htmlFor="color_picker"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Color
            </label>
            <input
              type="color"
              id="color_picker"
              className="block w-full text-sm rounded-lg cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white h-8"
              required
              value={bgColour}
              onChange={(e) => setBgcolour(e.target.value)}
            />
          </div>

          <div className="w-1/2 pl-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Profile Picture
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              ref={imageInputRef}
              onChange={validateImageFile}
            />
            {imageError ? (
              <p className="mt-1 text-sm text-red-500">{imageError}</p>
            ) : (
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
              </p>
            )}
          </div>
        </div>
        <div className="mb-4 flex justify-center ">
          <button
            type="submit"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
          >
            Edit Artist
          </button>
        </div>{" "}
      </form>
    </div>
  );
};

export default EditArtist;
