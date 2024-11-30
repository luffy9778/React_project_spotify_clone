import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

const LeftListComponent = ({ id, image, name, leftWidth, type, length }) => {
  const navigate = useNavigate();
  const border_Radius = type === "Artist" ? "50%" : "5px";
  const listType_content =
    type === "liked" ? (
      <>
        <span className="left-sidebar__list-pinIcon">
          <FontAwesomeIcon icon={faThumbtack} className="pinIcon" />
        </span>
        Playlist
        <span> • {length} song{length>1?"s":""}</span>
      </>
    ) : (
      type
    );

  const content =
    leftWidth === 90 ? (
      <div
        className="left-sidebar__list-component-small"
        onClick={() =>
          type === "liked" ? navigate(`/likedsongs`) : navigate(`/artist/${id}`)
        }
      >
        <div
          className="left-sidebar__list-image"
          style={{ borderRadius: border_Radius }}
        >
          <img src={image} alt="" style={{ borderRadius: border_Radius }} />
        </div>
      </div>
    ) : (
      <div
        className="left-sidebar__list-component"
        onClick={() =>
          type === "liked" ? navigate(`/likedsongs`) : navigate(`/artist/${id}`)
        }
      >
        <div
          className="left-sidebar__list-image"
          style={{ borderRadius: border_Radius }}
        >
          <img src={image} alt="" style={{ borderRadius: border_Radius }} />
        </div>
        <div className="left-sidebar__list-text-component">
          <div className="left-sidebar__list-name">{name}</div>
          <div className="left-sidebar__list-type">{listType_content}</div>
        </div>
      </div>
    );

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
  );
};

export default LeftListComponent;
