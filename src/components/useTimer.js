import { useState, useEffect, useRef } from "react";

const useTimer = (allMatched) => {
  const initialMinutes = 0;
  const initialSeconds = 0;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
  };

  useEffect(() => {
    startTimer();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [allMatched]);

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

  const restartTimer = () => {
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    startTimer();
  };

  const resumeTimer = () => {
    startTimer();
  };

  return { minutes, seconds, finished, stopTimer, restartTimer, resumeTimer };
};

export default useTimer;

// restarttimershi shignit meweraba sawyisze dabruneba wutebisac da wamebisac
