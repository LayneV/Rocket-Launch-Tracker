import { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const totalSeconds =
      (new Date(targetDate).getTime() - new Date().getTime()) / 1000;

    if (totalSeconds <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const formatTime = (value) => String(value).padStart(2, "0");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  if (
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0
  ) {
    return (
      <p className="text-3xl font-bold text-green-400 [text-shadow:_0_0_10px_rgb(34_197_94)] animate-pulse">
        Launch window open!
      </p>
    );
  }

  return (
    <div className="flex gap-4 text-center">
      <div>
        <span className="font-bold text-4xl">{formatTime(timeLeft.days)}</span>
        <span className="block text-sm">Days</span>
      </div>
      <div>
        <span className="font-bold text-4xl">{formatTime(timeLeft.hours)}</span>
        <span className="block text-sm">Hours</span>
      </div>
      <div>
        <span className="font-bold text-4xl">
          {formatTime(timeLeft.minutes)}
        </span>
        <span className="block text-sm">Minutes</span>
      </div>
      <div>
        <span className="font-bold text-4xl">
          {formatTime(timeLeft.seconds)}
        </span>
        <span className="block text-sm">Seconds</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
