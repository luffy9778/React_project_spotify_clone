import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ArtistTable = ({ data }) => {
  console.log(data);
  return (
    <div className="px-10 w-full">
      <table className="w-full text-left border-separate border-spacing-y-2">
        <h1 className="text-2xl font-bold">Popular</h1>
        {data?.map((i, index) => {
          return (
            <tr key={index} className="h-16 hover:bg-slate-500/[0.1] group">
              <td className=" text-center rounded-tl-2xl  rounded-bl-2xl w-1/12">
                {index + 1}
              </td>
              <td className="w-7/12">
                <div className="flex items-center capitalize">
                  <img
                    src={i.songimage_url}
                    className="w-10 h-10 rounded-md mr-3"
                  />
                  {i.songname}
                </div>
              </td>
              <td className="text-center rounded-tr-2xl  rounded-br-2xl w-4/12">
                <div className="flex justify-between pr-12">
                  <span className="opacity-0 items-center group-hover:opacity-100">
                    <FontAwesomeIcon icon={faCirclePlus} />
                  </span>
                  <span>2:55</span>
                </div>
              </td>
              {/* <FontAwesomeIcon icon={faCircleCheck} /> */}
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default ArtistTable;
