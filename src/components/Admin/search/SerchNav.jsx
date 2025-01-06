import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

const SerchNav = ({handleSearch,nav}) => {
      const navigate = useNavigate();
  return (
    <div className="flex justify-between pt-3 px-3">
      <input
        type="text"
        placeholder="search songs..."
        className="rounded-lg h-8 bg-transparent pl-3 text-white border focus:border-none"
        onChange={handleSearch}
      />
      <button
        className="bg-green-600 rounded-lg px-3"
        onClick={() => navigate(`/Admin/${nav}/add`)}
      >
        <FontAwesomeIcon icon={faPlus} />
        Add
      </button>
    </div>
  );
};

export default SerchNav;
