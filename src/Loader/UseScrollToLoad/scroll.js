import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef
} from "react";
const THRESHOLD = 15;

export const isTopAnchorVisible = el => {
  const rect = el.getBoundingClientRect();
  const elemTop = rect.top;

  console.log("elemTop", elemTop);
  const isVisible = elemTop > -170;
  console.log("isVisible", isVisible);
  return isVisible;
};

export const isBottomAnchorVisible = el => {
  const rect = el.getBoundingClientRect();
  const elemBottom = rect.bottom;
  // console.log("elemBottom", elemBottom);
  const isVisible = elemBottom < 910;
  // const isVisible = elemTop >= topLimit && elemBottom <= window.innerHeight;
  return isVisible;
};

const useSlidingWindowScrollHook = (
  data,
  { containerRef, topAnchor, bottomAnchor }
) => {
  const dataRef = useRef(data);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const range = useRef({ start: 0, end: THRESHOLD });

  console.log("66666666666");

  useMemo(() => {
    dataRef.current = data;
  }, [data]);

  const handleScroll = useCallback(() => {
    const listLength = dataRef.current.length;
    const { start, end } = range.current;
    // Scroll up
    if (isTopAnchorVisible(topAnchor.current)) {
      console.log("444444");
      const newEnd =
        end === THRESHOLD
          ? THRESHOLD
          : end - 10 > THRESHOLD
          ? end - 10
          : THRESHOLD;
      let newStart = start === 0 ? 0 : start - 10 > 0 ? start - 10 : 0;
      // while()
      // if (start - newStart >= 10) newStart -= 10;
      if (newStart !== start || end !== newEnd) {
        console.log("top");
        console.log("newStart", newStart);
        console.log("newEnd", newEnd);
        range.current = { start: newStart, end: newEnd };
        forceUpdate();
      }
    }

    //scroll to bottom
    if (isBottomAnchorVisible(bottomAnchor.current)) {
      const maxStartIndex = listLength - 1 - THRESHOLD; // Maximum index value `start` can take
      const maxEndIndex = listLength; // Maximum index value `end` can take
      const newEnd = end + 10 <= maxEndIndex ? end + 10 : maxEndIndex;
      const newStart = end - 6 <= maxStartIndex ? end - 6 : maxStartIndex;
      if (newStart !== start || end !== newEnd) {
        console.log("bottom");
        range.current = { start: newStart, end: newEnd };
        forceUpdate();
      }
    }
  }, [topAnchor, bottomAnchor, forceUpdate, dataRef, range]);

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef, handleScroll]);

  const { start, end } = range.current;
  console.log("start00000", start);
  console.log("end0001111110", end);
  const updatedList = data.slice(start, end);

  return updatedList;
};

export default useSlidingWindowScrollHook;
