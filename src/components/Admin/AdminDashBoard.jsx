import React from "react";
import LeftSidePannel from "./LeftSidePannel";
import { Outlet } from "react-router-dom";
import AdminFooter from "./AdminFooter";

export const AdminDashBoard = () => {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-2/12 h-screen">
        <LeftSidePannel />
      </div>
      <div className="w-10/12 h-screen  bg-black">
        <div className="h-1/6 bg-green-600"></div>
        <div className="h-5/6  relative">
          <Outlet />
          <AdminFooter/>
        </div>
      </div>
    </div>
  );
};
