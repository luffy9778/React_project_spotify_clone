import React from "react";
import Home from "../pages/Home";

const Layout = ({leftWidth,rightWidth}) => {
  return (
    <div className="page-container" style={{ flex: 1, width: `calc(100% - ${leftWidth + rightWidth}px)` }}>
      <Home />
    </div>
  );
};

export default Layout;
