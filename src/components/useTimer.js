import { useState, useEffect } from "react";

const useTimer = (isAllMatched) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(1);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let intervalId = null;

    const startTimer = () => {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    };

    startTimer();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (seconds === 60) {
      setMinutes((prevMinutes) => prevMinutes + 1);
      setSeconds(0);
    }
    if (isAllMatched) {
      setFinished(true);
    }
  }, [minutes, seconds]);

  return { minutes, seconds, finished };
};

export default useTimer;
