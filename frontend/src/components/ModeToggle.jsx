// src/components/HSAModeToggle.jsx
import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const ModeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl bg-gradient-to-br from-blue-900/20 to-blue-700/20 hover:from-blue-900/30 hover:to-blue-700/30 border border-white/10 hover:border-[#DCE7C6]/30 transition-all group"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={false}
          animate={{ 
            rotate: theme === 'dark' ? 0 : 180,
            scale: theme === 'dark' ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Sun className="w-5 h-5 text-[#DCE7C6]" />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{ 
            rotate: theme === 'dark' ? -180 : 0,
            scale: theme === 'dark' ? 0 : 1 
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Moon className="w-5 h-5 text-blue-300" />
        </motion.div>
      </div>
      
      {/* Animated glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl border border-[#DCE7C6]/20 opacity-0 group-hover:opacity-100 transition-opacity"
        animate={{
          boxShadow: theme === 'dark' 
            ? '0 0 20px rgba(21, 101, 192, 0.3)'
            : '0 0 20px rgba(220, 231, 198, 0.3)'
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-black/90 backdrop-blur-sm rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 border-b border-r border-white/10" />
      </div>
    </motion.button>
  );
};

export default ModeToggle;