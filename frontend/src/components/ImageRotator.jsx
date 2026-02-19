// src/components/ImageRotator.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ImageRotator = () => {
  // Array of 5 images with captions
  const images = [
    {
      url: "./images/first.JPG",
      caption: "State-of-the-art training facilities"
    },
    {
      url: "./images/second.JPG",
      caption: "Olympic-sized swimming pool"
    },
    {
      url: "./images/third.jpg",
      caption: "Professional basketball courts"
    },
    {
      url: "./images/fourth.jpg",
      caption: "World-class running track"
    },
    {
      url: "./images/fifth.JPG",
      caption: "Professional tennis facilities"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Current Image with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Image */}
          <img
            src={images[currentIndex].url}
            alt=""
            className="w-full h-full object-cover"
          />
          
          {/* Caption Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pt-16 pb-8 px-6">
            <div className="text-center">
              <div className="text-[#DCE7C6] text-2xl font-semibold">
                {images[currentIndex].caption}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-[#DCE7C6] w-6' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Timer Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <motion.div
          key={currentIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-[#DCE7C6]"
        />
      </div>
    </div>
  );
};

export default ImageRotator;