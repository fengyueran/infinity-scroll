import { useEffect, useState, useRef, useCallback } from "react";

//flex container
function useScrollToLoad(containerRef, data, { cellWidth, cellHeight }) {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const startRow = useRef(0);
  const countPerRow = useRef(1);
  const rowCountInScreen = 10;

  const startOffsetRow = 5;
  const endOffsetRow = 5;

  const handleScroll = useCallback(() => {
    console.log("scrollTop", containerRef.current.scrollTop);
    let startRowIndex =
      Math.floor(containerRef.current.scrollTop / cellHeight) - startOffsetRow;
    if (startRowIndex < 0) {
      startRowIndex = 0;
    }
    if (startRow.current !== startRowIndex) {
      startRow.current = startRowIndex;
      console.log("startIndex", startRowIndex);
      console.log("scrollTop", containerRef.current.scrollTop);
      forceUpdate();
    }
  }, [containerRef, forceUpdate, cellHeight]);

  useEffect(() => {
    const container = containerRef.current;
    countPerRow.current = Math.floor(container.clientWidth / cellWidth);
    container.addEventListener("scroll", handleScroll);
    forceUpdate();
    return () => {
      container.current.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef, forceUpdate, countPerRow, cellWidth, handleScroll]);

  const totalRowCount = Math.ceil(data.length / countPerRow.current);
  const startIndex = startRow.current * countPerRow.current;

  const endIndex =
    startIndex + (countPerRow.current + endOffsetRow) * rowCountInScreen;
  const dataToShow = data.slice(startIndex, endIndex);
  const padding = startRow.current * cellHeight;

  console.log("totalRowCount", totalRowCount);
  return {
    dataToShow,
    padding,
    totalRowCount
  };
}

export default useScrollToLoad;
