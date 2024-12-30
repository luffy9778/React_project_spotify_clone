import { createContext, useContext, useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AuthContext from "./AuthContext";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth.accessToken) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/user");
        setUserData(response.data);
      } catch (error) {
        // console.log(error)////////////
      }
    };
    fetchData();
  }, [auth]);

  //for song
  const audioRef = useRef();
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songDuration, setSongDuration] = useState(0);
  const [songCurrentTime, setSongCurrentTime] = useState(0);

  //next and previous song
  const [songList, setSongList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);

  //for render the audioref for localstorage
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [isLoadedFromLocalStorage, setIsLoadedFromLocalStorage] =
    useState(false);
  // console.log(songCurrentTime, songDuration);

  useEffect(() => {
    const getLocalSong = JSON.parse(localStorage.getItem("song"));
    // console.log(audioRef);
    if (getLocalSong) {
      setCurrentSong(getLocalSong);
      // pause()
      setIsLoadedFromLocalStorage(true);
    }
  }, []);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      if (isLoadedFromLocalStorage) {
        pause();
        setIsLoadedFromLocalStorage(false);
      }
      setIsAudioReady(true);
    }
  }, [currentSong, audioRef.current]);

  const setLocal = (i) => {
    localStorage.setItem("song", JSON.stringify(i));
  };

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      // console.log("paused");
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  const next = () => {
    if (songList.length > 0) {
      const nextIndex = isShuffle
        ? Math.floor(Math.random() * songList.length)
        : (currentIndex + 1) % songList.length;
      setCurrentIndex(nextIndex);
      setCurrentSong(songList[nextIndex]);
      play();
      setLocal(songList[nextIndex]);
    }
  };
  const previous = () => {
    if (songList.length > 0) {
      const nextIndex = (currentIndex - 1 + songList.length) % songList.length;
      setCurrentIndex(nextIndex);
      setCurrentSong(songList[nextIndex]);
      play();
      setLocal(songList[nextIndex]);
    }
  };

  useEffect(() => {
    if (isAudioReady && audioRef.current) {
      const audio = audioRef.current;
      const handleLoadedMetadata = () => {
        setSongDuration(audio.duration);
      };
      const handleTimeUpdate = () => {
        setSongCurrentTime(audio.currentTime);
      };
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      // console.log("first")
      return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [currentSong, isAudioReady]);
  // console.log(audioRef.current)
  // useEffect(()=>{
  //   setTimeout(() => {
  //     audioRef.current.ontimeupdate=()=>{
  //       setSongCurrentTime(audioRef.current.currentTime)
  //       setSongDuration(audioRef.current.duration)
  //     }
  //   }, 1000);
  // },[currentSong])

  //liked song
  const addLikedSong = async (id) => {
    try {
      const response = await axiosPrivate.post("/likedsongs", { songId: id });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        audioRef,
        currentSong,
        setCurrentSong,
        play,
        pause,
        isPlaying,
        setIsPlaying,
        songDuration,
        songCurrentTime,
        addLikedSong,
        setLocal,
        setSongList,
        setCurrentIndex,
        next,
        previous,
        isShuffle,
        setIsShuffle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
