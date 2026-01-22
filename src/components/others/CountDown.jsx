import React, { useState, useEffect } from "react";

const Countdown = ({ targetTime, onEnd }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(targetTime) - new Date();
    
    let time = { days: 0, hours: 0, minutes: 0, seconds: 0, total: difference };

    if (difference > 0) {
      time = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        total: difference,
      };
    }
    return time;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (remaining.total <= 0) {
        clearInterval(timer);
        if (onEnd) onEnd();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const format = (num) => String(num).padStart(2, "0");

  if (timeLeft.total <= 0) {
    return <span className="text-red-500">Contest Started!</span>;
  }

  // LOGIC: If more than 2 days, show Days. Else show HH:MM:SS
  if (timeLeft.days > 2) {
    return <span>{timeLeft.days} Days to go</span>;
  }

  return (
    <span className="font-mono">
      {timeLeft.days > 0 ? `${timeLeft.days}d ` : ""}
      {format(timeLeft.hours)}:{format(timeLeft.minutes)}:{format(timeLeft.seconds)}
    </span>
  );
};

export default Countdown;