// src/components/Timer.js

import React, { useState, useEffect } from 'react';

// Set duration in seconds. 600 seconds = 10 minutes
const TEST_DURATION = 600; 

function Timer({ onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);

  useEffect(() => {
    // Exit if time is up
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    // Set up the interval
    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    // Clean up the interval on component unmount or time up
    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeUp]);

  // Format time as MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer">
      Time Left: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}

export default Timer;