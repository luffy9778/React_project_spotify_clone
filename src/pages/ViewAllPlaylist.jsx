import React, { useEffect, useState } from 'react'
import HomeAlbumListCard from '../components/home/HomeAlbumListCard'
import axiosPrivate from '../api/axios'

const ViewAllPlaylist = () => {
    const[playListData,setPlayListData]=useState([])
  
  useEffect(()=>{
    const fetchPlaylist=async()=>{
      try {
        const response=await axiosPrivate.get("/playlist")
        setPlayListData(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPlaylist()
  },[])
  return (
    <div>
         {playListData.map((item)=>
            <HomeAlbumListCard key={item._id} item={item} />
          )}
    </div>
  )
}

export default ViewAllPlaylist
