import { createContext, useContext, useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AuthContext from "./AuthContext";
import { io } from "socket.io-client";

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
console.log(userData)

  /////////for soket.io//////////////

 useEffect(()=>{
  
  if(auth?.accessToken){
      const socket = io('http://localhost:3500');
      console.log("usersoket")
      socket.emit("userOnline",userData._id)
      return()=>{
        socket.disconnect()
      }
  }
},[userData])

  //for song
  const audioRef = useRef(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songDuration, setSongDuration] = useState(0);
  const [songCurrentTime, setSongCurrentTime] = useState(0);

  const [isLoadedFromLocalStorage, setIsLoadedFromLocalStorage] =
    useState(false);

  //next and previous song
  const [songList, setSongList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);

  useEffect(() => {
    const getLocalSong = localStorage.getItem("song");
    if (getLocalSong) {
      setCurrentSong(JSON.parse(getLocalSong));
      setIsLoadedFromLocalStorage(true)
    }
  }, []);

  useEffect(() => {
    if (isLoadedFromLocalStorage && audioRef.current) {
      audioRef.current.pause();
      setIsLoadedFromLocalStorage(false);
    }
    console.log("pause effect")
  }, [audioRef.current]);

  const setLocal = (i) => {
    localStorage.setItem("song", JSON.stringify(i));
  };

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  function pause() {
    if (audioRef.current) {
      console.log("paused");
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }
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
    // if (isAudioReady && audioRef.current) {
    //   const audio = audioRef.current;
    //   const handleLoadedMetadata = () => {
    //     setSongDuration(audio.duration);
    //   };
    //   const handleTimeUpdate = () => {
    //     setSongCurrentTime(audio.currentTime);
    //   };
    //   audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    //   audio.addEventListener("timeupdate", handleTimeUpdate);
    //   // console.log("first")
    //   return () => {
    //     audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    //     audio.removeEventListener("timeupdate", handleTimeUpdate);
    //   };
    // }
    const audio = audioRef.current;
    if (!audio || !currentSong) return;
    const handleMetadata = () => setSongDuration(audio.duration);
    const handleTimeUpdate = () => setSongCurrentTime(audio.currentTime);
    audio.addEventListener("loadedmetadata", handleMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    console.log("timeup")
    return () => {
      audio.removeEventListener("loadedmetadata", handleMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [currentSong,audioRef.current]);

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
