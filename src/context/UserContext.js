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
  // console.log(songCurrentTime, songDuration);
  // useEffect(()=>{
  //   const getLocalSong=JSON.parse(localStorage.getItem("song"))
  //   if(getLocalSong){
  //     setCurrentSong(getLocalSong)
  //   }
  // },[])
  const setLocal=(i)=>{
    localStorage.setItem('song', JSON.stringify(i))
  }
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
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
  }, [currentSong]);
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
  const addLikedSong=async(id)=>{
    try {
      const response=await axiosPrivate.post("/likedsongs",{songId:id})
      console.log(response)
    } catch (error) {
     console.log(error) 
    }
  }


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
        setLocal
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
