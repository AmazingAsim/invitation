import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./WeddingDate.css";

const WeddingDate = () => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = new Date('December 31, 2025 00:00:00').getTime();
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const heartVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="wedding-heart-container">
      {/* Heart-shaped Date Card */}
      <motion.div 
        className="heart-date-card"
        variants={heartVariants}
        animate="pulse"
      >
        <div className="heart-shape">
          <div className="heart-content">
            <motion.div 
              className="wedding-date"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="date-number">31</div>
              <div className="date-month">December</div>
              <div className="date-year">2025</div>
              <div className="date-ordinal">st</div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Countdown Timer */}
      <div className="countdown-container">
        <div className="countdown-title">Counting down to our special day</div>
        
        <div className="countdown-timer">
          <div className="countdown-item">
            <motion.div 
              className="countdown-number"
              key={timeLeft.days}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {timeLeft.days || 0}
            </motion.div>
            <div className="countdown-label">Days</div>
          </div>

          <div className="countdown-item">
            <motion.div 
              className="countdown-number"
              key={timeLeft.hours}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {timeLeft.hours || 0}
            </motion.div>
            <div className="countdown-label">Hours</div>
          </div>

          <div className="countdown-item">
            <motion.div 
              className="countdown-number"
              key={timeLeft.minutes}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {timeLeft.minutes || 0}
            </motion.div>
            <div className="countdown-label">Minutes</div>
          </div>

          <div className="countdown-item">
            <motion.div 
              className="countdown-number"
              key={timeLeft.seconds}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {timeLeft.seconds || 0}
            </motion.div>
            <div className="countdown-label">Seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingDate;