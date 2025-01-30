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

  // const[scrollPosition,setScrollposition]=useState(0)
  const [bgColor, setBgColor] = useState(
    "linear-gradient(180deg, rgba(80,40,240,0.5) 0%, rgba(18,18,18,1) 100%)"
  );

  return (
    <DataContext.Provider
      value={{
        isRightSideBarColsed,
        setIsRightSideBarColsed,
        handleRightSidebarClose,
        setRightWidth,
        rightWidth,
        leftWidth,
        setLeftWidth,
        centerWidth,
        bgColor,
        setBgColor,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
