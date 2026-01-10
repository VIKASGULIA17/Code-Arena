import React, { useState, useEffect } from "react";

const Countdown = ({ targetTime="2026-06-18T22:30:00", onEnd }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(targetTime) - new Date();
    let time = { hours: 0, minutes: 0, seconds: 0, total: difference };

    if (difference > 0) {
      time = {
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

  if (timeLeft.total <= 0) return <span>Contest Started!</span>;

  return (
    <span>
      {format(timeLeft.hours)}:{format(timeLeft.minutes)}:{format(timeLeft.seconds)}
    </span>
  );
};

export default Countdown;