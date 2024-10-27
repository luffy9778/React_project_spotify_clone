import React from "react";
import { bgColorList } from "../../bgColorList";
import Visitedlist from"./Visitedlist"
const VisitedListContainer = ({setBgColor}) => {
  return (
    <div className="home__visited-list-container">
      {bgColorList.map((i, index) => (
        <Visitedlist key={index} bgc={i} setBgColor={setBgColor} />
      ))}
    </div>
  );
};

export default VisitedListContainer;
