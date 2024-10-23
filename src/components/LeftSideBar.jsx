import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { faArrowRight, faListUl, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const LeftSideBar = () => {
  return (
    <section className='lsidebar-component' >
        <div className='lsidebar-fixed-header-container'>
        <div className='lsidebar-header'>
            <div className='lsidebar-header-text-container' title='Collapse Your Library'>
            <FontAwesomeIcon className='lsidebar-header-icon' icon={faBookmark} />
            <p>Your Library</p>
            </div>
            <div className='lsidebar-header-icon-container'>
              <div className='lsidebar-header-icon-plus' title='Create playlist or folder'>
              <FontAwesomeIcon className='lsidebar-header-icon' icon={faPlus} />
              </div>
              <div className='lsidebar-header-icon-arrow' title='Show more'>
              <FontAwesomeIcon className='lsidebar-header-icon' icon={faArrowRight} />
              </div>
            </div>
        </div>
        <div className='lsidebar-component-option-container'>
            <button>Playlists</button>
            <button>Artists</button>
        </div>
        </div>
        <div className='lsidebar-search-container'>
          <div className='lsidebar-search-icon'>
          <FontAwesomeIcon icon={faSearch}/>
          </div>
          <div className='lsidebar-search-icon2'>
           <p>Recents</p>
           <FontAwesomeIcon icon={faListUl} />
          </div>
        </div>


    </section>
  )
}

export default LeftSideBar
