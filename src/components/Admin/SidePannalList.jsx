import {
  faAngleDown,
  faAngleUp,
  faEye,
  faFolderPlus,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SidePannalList = ({ value }) => {

  const [isShow, setIsShow] = useState(false);

  const navigate=useNavigate()

  return (
    <div className="mb-2 text-xl ">
      <div
        className="h-10 flex items-center justify-between px-5 hover:rounded-lg hover:bg-violet-800"
        onClick={() => setIsShow((prv) => !prv)}
      >
        <span>{value.name}</span>
        <FontAwesomeIcon
          icon={isShow ? faAngleUp : faAngleDown}
          className="px-2"
        />
      </div>
      {isShow && (
        <>
          <div className="h-10 pl-5 flex items-center text-base hover:rounded-lg hover:bg-violet-700" onClick={()=>navigate(value.view.path)}>
            <FontAwesomeIcon icon={faEye} className="px-2"/>
            {value.view.content}
          </div>
          <div className="h-10 pl-5 flex items-center text-base hover:rounded-lg hover:bg-violet-700"  onClick={()=>navigate(value.add.path)}>
            <FontAwesomeIcon icon={faFolderPlus} className="px-2" />
            {value.add.content}
          </div>
          {/* <div className="h-10 pl-5 flex items-center text-base hover:rounded-lg hover:bg-violet-700"  onClick={()=>navigate(value.edit.path)}>
            <FontAwesomeIcon icon={faPenToSquare} className="px-2" />
            {value.edit.content}
          </div>
          <div className="h-10 pl-5 flex items-center text-base hover:rounded-lg hover:bg-violet-700"  onClick={()=>navigate()}>
            <FontAwesomeIcon icon={faTrash} className="px-2" />
            {value.delete}
          </div> */}
        </>
      )}
    </div>
  );
};

export default SidePannalList;
