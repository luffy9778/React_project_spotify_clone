import { faThumbtack } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const LeftListComponent = ({data,leftWidth}) => {

    const border_Radius=data.type=="Artist"?"50%":"5px"

    const listType_content=(data.type==="Liked Songs"?(<><span className='left-sidebar__list-pinIcon' ><FontAwesomeIcon icon={faThumbtack} className='pinIcon'/></span>{data.type}<span> . 51 songs</span></>):data.type) 

    const content=(leftWidth==90?(<div className='left-sidebar__list-component-small'>
        <div className='left-sidebar__list-image' style={{borderRadius:border_Radius}}>
            <img src='https://via.placeholder.com/100' alt='' style={{borderRadius:border_Radius}}/>
        </div>
    </div>):(<div className='left-sidebar__list-component'>
        <div className='left-sidebar__list-image' style={{borderRadius:border_Radius}}>
            <img src='https://via.placeholder.com/100' alt='' style={{borderRadius:border_Radius}}/>
        </div>
        <div className='left-sidebar__list-text-component'>
            <div className='left-sidebar__list-name'>{data.name}</div>
            <div className='left-sidebar__list-type'>{listType_content}</div>
        </div>
    </div>))

    
  return (
    // <div className='left-sidebar__list-component'>
    //     <div className='left-sidebar__list-image' style={{borderRadius:border_Radius}}>
    //         <img src='https://via.placeholder.com/100' alt='' style={{borderRadius:border_Radius}}/>
    //     </div>
    //     <div className='left-sidebar__list-text-component'>
    //         <div className='left-sidebar__list-name'>{data.name}</div>
    //         <div className='left-sidebar__list-type'>{listType_content}</div>
    //     </div>
    // </div>
    content
  )
}

export default LeftListComponent