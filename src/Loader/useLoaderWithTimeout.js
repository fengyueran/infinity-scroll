import { useEffect, useState, useRef } from "react";

function useLoaderWithTimeout(data) {
  const [dataToShow, setDataToShow] = useState([]);
  const currentPage = useRef(1);
  const timerRef = useRef();
  const once = 20;
  useEffect(() => {
    clearTimeout(timerRef.current);
    const render = () => {
      timerRef.current = setTimeout(() => {
        const dataToShow = data.slice(0, currentPage.current * once);
        currentPage.current += 1;
        if (dataToShow.length > 0) {
          setDataToShow(dataToShow);
          render();
        }
      }, 0);
    };
    render();
  }, [data]);

  return dataToShow;
}

export default useLoaderWithTimeout;
