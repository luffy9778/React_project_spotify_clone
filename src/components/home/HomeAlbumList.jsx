import React, { useContext } from 'react'
import HomeAlbumListCard from './HomeAlbumListCard'

const HomeAlbumList = () => {
  return (
    <div className='home-album__list-container'>
        <div className='home-album__list-name'>
            <div>Made For You</div>
            <div className='home-album__list-showAll'>show all</div>
        </div>
        <div  className='home-album__cards-container'>
            <HomeAlbumListCard/>
            <HomeAlbumListCard/>
            <HomeAlbumListCard/>
            <HomeAlbumListCard/>
            <HomeAlbumListCard/>
        </div>
    </div>
  )
}

export default HomeAlbumList