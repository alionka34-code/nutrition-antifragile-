import React, { useState, useEffect } from "react";

function Countdown() {
  const targetDate = new Date("2025-09-25T23:59:59").getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [pulse, setPulse] = useState(false);

  function getTimeRemaining() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }
    return null; // Offre expirée
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = getTimeRemaining();
        if (
          newTime &&
          (newTime.seconds !== prev?.seconds ||
            newTime.minutes !== prev?.minutes ||
            newTime.hours !== prev?.hours ||
            newTime.days !== prev?.days)
        ) {
          setPulse(true);
          setTimeout(() => setPulse(false), 300);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center bg-gradient-to-tr from-yellow-500 to-yellow-700 p-6 rounded-xl shadow-lg mt-4">
      <div className="md:text-2xl text-xl  font-SFBold text-yellow-300 mb-4">
        OFFRE LIMITÉE - Se termine dans :
      </div>

      {timeLeft ? (
        <div className="flex space-x-3 md:space-x-6 text-center font-SFBold">
          {[
            { value: timeLeft.days, label: "Jours" },
            { value: timeLeft.hours, label: "Heures" },
            { value: timeLeft.minutes, label: "Minutes" },
            { value: timeLeft.seconds, label: "Secondes" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <span
                className={`md:text-4xl text-xl font-SFBold text-white transition-transform duration-300`}
              >
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-yellow-300 text-sm md:text-xl">{item.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-red-500 text-xl font-semibold">Offre expirée</div>
      )}
    </div>
  );
}

export default Countdown;