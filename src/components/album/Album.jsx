import React from 'react'
import AlbumHeader from './AlbumHeader'
import { useParams } from 'react-router-dom'

const Album = () => {
  const params=useParams()
  return (
    <div className='album-container'>
        <AlbumHeader  albumId={params.id} />
    </div>
  )
}

export default Album