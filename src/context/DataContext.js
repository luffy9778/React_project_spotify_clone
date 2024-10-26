import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [isRightSideBarColsed, setIsRightSideBarColsed] = useState(false);
  const [rightWidth, setRightWidth] = useState(285);
  const [leftWidth, setLeftWidth] = useState(285);
  const centerWidth = window.innerWidth - (leftWidth + rightWidth);
//for handle rightsidebar closing
  const handleRightSidebarClose = () => {
    setIsRightSideBarColsed(true);
    setRightWidth(0);
  };

  return (
    <DataContext.Provider
      value={{
        isRightSideBarColsed,
        setIsRightSideBarColsed,
        handleRightSidebarClose,
        setRightWidth,
        rightWidth,
        leftWidth,setLeftWidth,
        centerWidth
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
