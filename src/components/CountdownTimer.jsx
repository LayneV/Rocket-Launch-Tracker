import { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const totalSeconds =
        (new Date(targetDate).getTime() - new Date().getTime()) / 1000;

      if (totalSeconds < 0) {
        clearInterval(intervalId);
        return;
      }

      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <div className="flex gap-4 text-center">
      <div>
        <span className="font-bold text-4xl">{timeLeft.days}</span>
        <span className="block text-sm">Days</span>
      </div>
      <div>
        <span className="font-bold text-4xl">{timeLeft.hours}</span>
        <span className="block text-sm">Hours</span>
      </div>
      <div>
        <span className="font-bold text-4xl">{timeLeft.minutes}</span>
        <span className="block text-sm">Minutes</span>
      </div>
      <div>
        <span className="font-bold text-4xl">{timeLeft.seconds}</span>
        <span className="block text-sm">Seconds</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
