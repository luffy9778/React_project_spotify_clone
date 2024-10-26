import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import DataContext from '../../context/DataContext'

const Visitedlist = ({bgc,setBgColor}) => {
  const{centerWidth}=useContext(DataContext)
  const columCount=centerWidth<845?"47%":"23%"

  const [isHovered,setIshoverd]=useState(false)
  return (
        <div className='home__visited-list' onMouseEnter={()=>{setBgColor(bgc);setIshoverd(true)}}
        onMouseLeave={()=>{setBgColor("linear-gradient(180deg, rgba(80,40,240,0.5) 0%, rgba(18,18,18,1) 100%)");
          setIshoverd(false)
        }} style={{flex:`1 0 ${columCount}`}}>
            <div className='home__visited-list-image'>
              <img src='https://via.placeholder.com/100'/>
            </div>
            <div className='home__visited-list-name'>
              <div> Liked Songs</div>
              <div className='home__visited-list-playIcon' style={{display:isHovered?'flex':"none"}}><FontAwesomeIcon icon={faCirclePlay} /></div>
            </div>
        </div>
  )
}

export default Visitedlist