// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { Trophy, Target, Users, Shield, Award, Heart, Activity } from "lucide-react";

const Hero = () => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="space-y-8"
    >
      {/* Academy Badge with Enhanced Design */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            {/* Animated Badge Container */}
            <motion.div 
              className="w-14 h-14 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/50"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(13, 71, 161, 0.5)",
                  "0 0 40px rgba(21, 101, 192, 0.8)",
                  "0 0 20px rgba(13, 71, 161, 0.5)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Trophy className="w-7 h-7 text-[#DCE7C6]" />
            </motion.div>
            
            {/* Animated Orbital Dots */}
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Floating Particles around badge */}
            {[0, 90, 180, 270].map((rotation) => (
              <motion.div
                key={rotation}
                className="absolute w-1 h-1 bg-[#DCE7C6]/30 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${rotation}deg) translateX(25px)`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: rotation * 0.01,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          {/* Academy Title with Enhanced Typography */}
          <div className="relative">
            <motion.h1 
              className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-[#DCE7C6] to-blue-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Himalayan Sports Academy
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              className="text-sm text-gray-400 mt-1 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              Est. 2010 • Excellence in Athletics
            </motion.p>
          </div>
        </div>
        
        {/* Main Hero Heading with Animated Gradient */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-6xl font-bold text-white leading-tight">
              <span className="relative inline-block">
                Elevate Your Game
                {/* Underline Animation */}
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 to-[#DCE7C6]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 1 }}
                />
              </span>
            </h2>
            
            <h2 className="text-5xl font-bold text-white leading-tight">
              At <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[#DCE7C6] to-blue-300 animate-gradient">Peak Performance</span>
            </h2>
          </motion.div>
          
          {/* Animated Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-navy-dark bg-gradient-to-br from-blue-700 to-blue-900"
                  />
                ))}
              </div>
              <span className="text-gray-300">Join 500+ Champions</span>
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-[#DCE7C6]" />
              <span className="text-gray-300">Personalized Training</span>
            </div>
          </motion.div>
        </div>
        
        {/* Enhanced Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <p className="text-xl text-gray-300 leading-relaxed">
            Where <span className="text-[#DCE7C6] font-semibold">Himalayan discipline</span> meets 
            <span className="text-blue-400 font-semibold"> modern sports science</span>. 
            Transform your potential into podium finishes with our world-class coaching.
          </p>
          
          {/* Achievement Badges */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: "ISO Certified", color: "from-blue-600 to-blue-800" },
              { label: "Olympic Partners", color: "from-yellow-600 to-yellow-800" },
              { label: "24/7 Facility", color: "from-green-600 to-green-800" },
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
                className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${badge.color} text-white text-sm font-medium flex items-center gap-2`}
              >
                <Award className="w-3 h-3" />
                {badge.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats with Enhanced Animation */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { 
            value: "500+", 
            label: "Active Athletes", 
            icon: Users,
            suffix: "Champions",
            color: "from-blue-600 to-blue-800"
          },
          { 
            value: "50+", 
            label: "Expert Coaches", 
            icon: Trophy,
            suffix: "Pro Staff",
            color: "from-purple-600 to-purple-800"
          },
          { 
            value: "24/7", 
            label: "Support", 
            icon: Shield,
            suffix: "Available",
            color: "from-emerald-600 to-emerald-800"
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 1 + index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            {/* Background Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
            
            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-6 h-6 text-gradient bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                <div className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">
                  {stat.suffix}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{stat.value}</span>
                  <motion.span 
                    className="text-xs text-gray-400"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ↗
                  </motion.span>
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
              
              {/* Progress Indicator */}
              <div className="mt-3">
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${stat.color}`}
                    initial={{ width: "0%" }}
                    animate={{ width: `${70 + index * 15}%` }}
                    transition={{ delay: 1.5 + index * 0.2, duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feature List with Enhanced Design */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-[#DCE7C6] rounded-full animate-pulse" />
          <h3 className="text-lg font-semibold text-white">Why Choose HSA?</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Target, text: "State-of-the-art training facilities", highlight: "World-class" },
            { icon: Users, text: "Professional coaching staff", highlight: "Olympic-level" },
            { icon: Activity, text: "Personalized training programs", highlight: "Tailored" },
            { icon: Award, text: "Sports science & nutrition", highlight: "Scientific" },
            { icon: Trophy, text: "Competition opportunities", highlight: "Global" },
            { icon: Heart, text: "Health & wellness programs", highlight: "Holistic" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 + index * 0.05 }}
              className="group flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-[#DCE7C6]/20"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-900/30 to-blue-900/10 group-hover:from-blue-900/50 group-hover:to-blue-900/30 transition-all">
                <feature.icon className="w-4 h-4 text-[#DCE7C6]" />
              </div>
              <span className="text-gray-300 text-sm">
                <span className="text-[#DCE7C6] font-medium">{feature.highlight}</span> {feature.text.replace(feature.highlight, '')}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;