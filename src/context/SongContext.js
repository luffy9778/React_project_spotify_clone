import React, { createContext, useReducer, useRef, useEffect, useState, useContext } from "react";
import { audioReducer, initialAudioState } from "./SongReducer";
import DataContext from "./DataContext";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(audioReducer, initialAudioState);
  const audioRef = useRef(null);

//temp variable for accesing users 1st song play when page load and show the right sideBar
const[temp, setTemp] = useState(false);
const{setIsRightSideBarColsed}=useContext(DataContext)

  // Play or pause based on `isPlaying`
  useEffect(() => {
    if (state.isPlaying && audioRef.current && state.currentSong) {
      audioRef.current.play();
    } else if (!state.isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [state.isPlaying, state.currentSong?.songfile_url]);

  // Update duration and current time
  useEffect(() => {
    console.log("bdbhdbg", state.songList.length);
    if (audioRef.current) {
      const audio = audioRef.current;
      const updateTime = () => {
        dispatch({
          type: "UPDATE_TIME",
          payload: audio.currentTime,
        });
      };
      const endTime = () => {
        if (state.isRepeat) {
          dispatch({ type: "UPDATE_TIME", payload: 0 });
          audioRef.current.currentTime=0
          audioRef.current.play();
        } else if (state.songList.length > 1) {
          dispatch({
            type: "NEXT_SONG",
          });
        } else {
          dispatch({
            type: "TOGGLE_PLAY",
          });
          dispatch({
            type: "UPDATE_TIME",
            payload: 0,
          });
        }
      };
      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("ended", endTime);
      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("ended", endTime);
      };
    }
  }, [state.currentSong,state.isRepeat]);

  useEffect(() => {
    try {
      const lastplayedSong = JSON.parse(localStorage.getItem("lastplayedSong"));
      if (lastplayedSong) {
        dispatch({
          type: "SET_CURRENT_SONG_FROM_STORAGE",
          payload: { song: lastplayedSong },
        });
        setIsRightSideBarColsed(false)
        setTemp(true)
      }

    } catch (error) {
      console.log(error);
    }
  }, []);

  const saveSongToLocalStorage = (song) => {
    try {
      localStorage.setItem("lastplayedSong", JSON.stringify(song));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AudioContext.Provider
      value={{ state, dispatch, audioRef, saveSongToLocalStorage,temp, setTemp }}
    >
      {children}
      <audio
        ref={audioRef}
        src={state.currentSong?.songfile_url}
        preload="auto"
      ></audio>
    </AudioContext.Provider>
  );
};

export default AudioContext;
