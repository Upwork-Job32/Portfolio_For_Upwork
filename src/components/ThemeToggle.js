import React, { useState, useEffect } from 'react';
import '../styles/ThemeToggle.css';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme === 'dark');
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      rotate: 180,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: isDark ? 360 : -360,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="theme-toggle">
      <motion.button 
        className={`theme-toggle-button ${isDark ? 'dark' : 'light'}`}
        onClick={toggleTheme}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        aria-label="Toggle theme"
      >
        <motion.div
          variants={iconVariants}
          initial="initial"
          animate="animate"
        >
          {isDark ? (
            <FaSun className="toggle-icon" />
          ) : (
            <FaMoon className="toggle-icon" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default ThemeToggle; 