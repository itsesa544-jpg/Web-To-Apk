import React, { useState, useEffect } from 'react';

const TopBanner: React.FC = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2024-12-31T23:59:59") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval] && timeLeft[interval] !== 0) {
      return null;
    }

    return (
      <span key={interval} className="mx-1">
        <span className="font-bold text-lg text-yellow-300">{String(timeLeft[interval]).padStart(2, '0')}</span> {interval.charAt(0).toUpperCase() + interval.slice(1)}
      </span>
    );
  });

  return (
    <div className="bg-indigo-700 text-white text-center p-2 text-sm">
      <span>💥 Black Friday Sale Expires in</span>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      <span>💥</span>
    </div>
  );
};

export default TopBanner;
