import React, { useState, useEffect, useRef } from "react";
const THRESHOLD = 15;

const useSlidingWindowScrollHook = (data, { topAnchor, bottomAnchor }) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(THRESHOLD);
  const [observer, setObserver] = useState(null);
  console.log("66666666666");
  useEffect(() => {
    intiateScrollObserver();
    return () => {
      resetObservation();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end]);

  const intiateScrollObserver = () => {
    const options = {
      root: document.querySelector("#abc"),
      rootMargin: "0px",
      threshold: 0
    };
    const Observer = new IntersectionObserver(callback, options);
    if (topAnchor.current) {
      Observer.observe(topAnchor.current);
    }
    if (bottomAnchor.current) {
      Observer.observe(bottomAnchor.current);
    }
    setObserver(Observer);
  };

  const updateState = (newStart, newEnd) => {
    if (start !== newStart || end !== newEnd) {
      resetObservation();
      setStart(newStart);
      setEnd(newEnd);
    }
  };

  const resetObservation = () => {
    observer && observer.unobserve(bottomAnchor.current);
    observer && observer.unobserve(topAnchor.current);
  };

  const getReference = (index, isLastIndex) => {
    if (index === 0) return topAnchor;
    if (isLastIndex) return bottomAnchor;
    return null;
  };

  const callback = (entries, observer) => {
    entries.forEach((entry, index) => {
      const listLength = data.length;
      // Scroll Down
      // We make increments and decrements in 10s
      console.log("entry1111", entry.intersectionRatio);
      console.log("entry.target", entry.target);
      if (entry.isIntersecting && entry.target.id === "bottom") {
        const maxStartIndex = listLength - 1 - THRESHOLD; // Maximum index value `start` can take
        const maxEndIndex = listLength; // Maximum index value `end` can take
        const newEnd = end + 10 <= maxEndIndex ? end + 10 : maxEndIndex;
        const newStart = end - 7 <= maxStartIndex ? end - 7 : maxStartIndex;
        updateState(newStart, newEnd);
      }
      // Scroll up
      if (entry.isIntersecting && entry.target.id === "top") {
        console.log("5555555");
        // if (end === THRESHOLD && start === 0) return;
        console.log("777777");
        const newEnd =
          end === THRESHOLD
            ? THRESHOLD
            : end - 10 > THRESHOLD
            ? end - 10
            : THRESHOLD;
        let newStart = start === 0 ? 0 : start - 10 > 0 ? start - 10 : 0;
        updateState(newStart, newEnd);
      }
    });
  };

  const updatedList = data.slice(start, end);
  console.log(updatedList.length);

  return updatedList;
};

export default useSlidingWindowScrollHook;
