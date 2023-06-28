import { useState, useEffect, useRef } from "react";

const useTimer = (allMatched) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(1);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const startTimer = () => {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    };

    startTimer();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (seconds === 60) {
      setMinutes((prevMinutes) => prevMinutes + 1);
      setSeconds(0);
    }
    if (allMatched) {
      setFinished(true);
      clearInterval(intervalRef.current);
    }
  }, [minutes, seconds, allMatched]);

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  return { minutes, seconds, finished, stopTimer };
};

export default useTimer;
