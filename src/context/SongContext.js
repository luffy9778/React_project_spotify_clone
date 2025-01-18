import React, { createContext, useReducer, useRef, useEffect } from "react";
import { audioReducer, initialAudioState } from "./SongReducer";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(audioReducer, initialAudioState);
  const audioRef = useRef(null);

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
    if (audioRef.current) {
      const audio = audioRef.current;
      const updateTime = () => {
        dispatch({
          type: "UPDATE_TIME",
          payload: {
            duration: audio.duration,
            currentTime: audio.currentTime,
          },
        });
      };
      audio.addEventListener("timeupdate", updateTime);
      return () => {
        audio.removeEventListener("timeupdate", updateTime);
      };
    }
  }, []);

  useEffect(() => {
    try {
      const lastplayedSong = JSON.parse(localStorage.getItem("lastplayedSong"));
      if (lastplayedSong) {
        dispatch({
          type: "SET_CURRENT_SONG_FROM_STORAGE",
          payload: { song: lastplayedSong },
        });
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
      value={{ state, dispatch, audioRef, saveSongToLocalStorage }}
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
