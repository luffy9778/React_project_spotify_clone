import React, { useEffect, useState } from "react";
import axiosPrivate from "../../../api/axios";
import SerchNav from "../../../components/Admin/search/SerchNav";

const ViewTags = () => {
  const [tags, setTags] = useState([]);
  console.log(tags);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axiosPrivate.get("/tags");
        setTags(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTags();
  }, []);
  return (
    <>
      <div className="w-full">
        <SerchNav nav="tags"/>
      </div>
      <div className=" w-full p-3 flex flex-wrap gap-2 ">
        {tags.map((i) => (
          <div
            className="w-52 h-28 rounded-lg flex items-center overflow-hidden "
            style={{ backgroundColor: i.tagBgcolour }}
          >
            <p className="w-1/2 pl-2 z-10">{i.tagName}</p>
            <div className="w-1/2 relative h-full">
              <img
                src={i.tagImage_url}
                className=" h-2/3 absolute bottom-0 right-0 rotate-12 "
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewTags;
