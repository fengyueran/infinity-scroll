import { useEffect, useState, useRef } from "react";

function useLoaderWithFrame(data) {
  const [dataToShow, setDataToShow] = useState([]);
  const frameRef = useRef();
  const currentPage = useRef(1);
  const once = 20;
  useEffect(() => {
    cancelAnimationFrame(frameRef.current);
    const render = () => {
      const dataToShow = data.slice(0, currentPage.current * once);
      currentPage.current += 1;
      if (dataToShow.length > 0) {
        setDataToShow(dataToShow);
        frameRef.current = requestAnimationFrame(render);
      }
    };
    render();
  }, [data]);

  return dataToShow;
}

export default useLoaderWithFrame;
