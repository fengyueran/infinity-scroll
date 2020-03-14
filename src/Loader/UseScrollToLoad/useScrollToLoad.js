import { useEffect, useState, useRef, useCallback } from "react";

function useScrollToLoad(containerRef, data) {
  const cellHeight = 220;
  const countInScreen = 10;
  const [dataToShow, setDataToShow] = useState(data.slice(0, countInScreen));

  // const handleScroll = useCallback(() => {
  //   const startIndex = Math.floor(containerRef.current.scrollTop / cellHeight);
  //   console.log("startIndex", startIndex);
  //   console.log("scrollTop", containerRef.current.scrollTop);
  //   const dataToShow = data.slice(startIndex, startIndex + countInScreen);
  //   setDataToShow(dataToShow);
  // }, [data, containerRef, setDataToShow]);

  // useEffect(() => {
  //   const container = containerRef.current;
  //   container.addEventListener("scroll", handleScroll);
  //   return () => {
  //     container.current.removeEventListener("scroll", handleScroll);
  //   };
  // }, [containerRef, handleScroll]);

  console.log("dataToShow", dataToShow);
  return dataToShow;
}

export default useScrollToLoad;
