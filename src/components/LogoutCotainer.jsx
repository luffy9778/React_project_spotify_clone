import axios from "axios";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import AudioContext from "../context/SongContext";
import SearchContext from "../context/SearchContext";
import DataContext from "../context/DataContext";

const LogoutCotainer = () => {
    
  const { setAuth } = useContext(AuthContext);
  const { dispatch, setTemp } = useContext(AudioContext);
  const { setQuery, setResult } = useContext(SearchContext);
  const { setIsRightSideBarColsed, setRightWidth, setLeftWidth } =
    useContext(DataContext);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      setAuth({});
      dispatch({
        type: "LOGOUT",
      });
      setQuery("");
      setResult({ songs: [], artists: [], playlists: [] });
      setIsRightSideBarColsed(false);
      setRightWidth(285);
      setLeftWidth(285);
      setTemp(false);
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="logout">
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default LogoutCotainer;
