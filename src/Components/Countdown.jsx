import { useState, useEffect } from 'react';

function Countdown({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    if (difference <= 0) {
      return { Days: 0, Hours: 0, Minutes: 0, Seconds: 0 };
    }
    return {
      Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      Minutes: Math.floor((difference / 1000 / 60) % 60),
      Seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 justify-center">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 backdrop-blur-sm"
        >
          <span className="text-2xl font-bold text-cyan-300">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-xs text-white/60 mt-1">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default Countdown;