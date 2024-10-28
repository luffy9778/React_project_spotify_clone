import React from 'react'
import AlbumHeaderIconSet from './AlbumHeaderIconSet'
import {leftData} from "../../dummyData"
const AlbumHeader = ({albumId}) => {
  const album=leftData.find(i=>i.id===Number(albumId))
  console.log(album)
  return (
    <>
    <div className='album__header'>
        <div className='album__header-image' style={{borderRadius:album.type==="Artist"?"50%":"5px"}}>
          <img src='https://via.placeholder.com/150' alt='Album Image' style={{borderRadius:album.type==="Artist"?"50%":"5px"}} />
        </div>
        <div className='album__header-text'>
            <div className='album__header-sub-title'>
              <img src='https://img.icons8.com/?size=96&id=2sZ0sdlG9kWP&format=png'  style={{width:"30px",height:"30px"}}/>
              Verified Artist
            </div>
            <div className='album__header-title'>{album.name}</div>
            <div className='album__header-subtext'><span>3,295,794</span> monthly listeners</div>
        </div>
    </div>
    <AlbumHeaderIconSet/>

    </>
  )
}

export default AlbumHeader