import { faEllipsis, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const AlbumHeaderIconSet = ({type}) => {
  return (
    <div className='ablum__header-icon-container'>
        <div className='ablum__header-icon-left'>
          <div>
          <FontAwesomeIcon icon={faPlayCircle}/>
          </div>
          {type!=="Liked"?
            (<><div>Following</div>
            <div>
            <FontAwesomeIcon icon={faEllipsis} />
            </div></>):null}
        </div>
    </div>
  )
}

export default AlbumHeaderIconSet