import { useEffect, useState, useRef, useCallback } from "react";

//单个列表
function useScrollToLoad(containerRef, data) {
  const cellHeight = 200;
  const countInScreen = 10;
  const startRef = useRef();
  const [start, setStart] = useState(0);
  console.log("111111");
  const handleScroll = useCallback(() => {
    console.log("scrollTop", containerRef.current.scrollTop);
    const startIndex = Math.floor(containerRef.current.scrollTop / cellHeight);
    if (startRef.current !== startIndex) {
      startRef.current = startIndex;
      console.log("startIndex", startIndex);
      console.log("scrollTop", containerRef.current.scrollTop);
      // const dataToShow = data.slice(startIndex, startIndex + countInScreen);
      setStart(startIndex);
    }
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.current.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef, handleScroll]);

  return start;
}

export default useScrollToLoad;
