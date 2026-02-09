// src/components/Hero.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Trophy, Target, Users, Shield, Award, Heart, Activity, 
  Star, Clock, MapPin, ChevronRight, Sparkles, TrendingUp, 
  Zap, CheckCircle, Medal, Globe, Mountain, ArrowRight
} from "lucide-react";

const Hero = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Statistics data
  const stats = [
    { 
      value: "150+", 
      label: "International Medals", 
      icon: Medal,
      gradient: "from-yellow-600/20 to-yellow-400/10",
      color: "text-yellow-400"
    },
    { 
      value: "25", 
      label: "Sports Disciplines", 
      icon: Zap,
      gradient: "from-blue-600/20 to-cyan-400/10",
      color: "text-cyan-400"
    },
    { 
      value: "42", 
      label: "Live Training", 
      icon: Activity,
      gradient: "from-green-600/20 to-emerald-400/10",
      color: "text-emerald-400"
    },
    { 
      value: "4.9★", 
      label: "Student Rating", 
      icon: Star,
      gradient: "from-purple-600/20 to-purple-400/10",
      color: "text-purple-400"
    },
  ];

  const features = [
    { icon: Target, text: "State-of-the-art training facilities" },
    { icon: Users, text: "Professional coaching staff" },
    { icon: Activity, text: "Personalized training programs" },
    { icon: Award, text: "Sports science & nutrition" },
    { icon: Trophy, text: "Competition opportunities" },
    { icon: Heart, text: "Health & wellness programs" },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-blue-950 px-4 py-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-900/15 rounded-full blur-3xl" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e40af10_1px,transparent_1px),linear-gradient(to_bottom,#1e40af10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Academy Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/50">
              <Trophy className="w-12 h-12 text-[#DCE7C6]" />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur-xl opacity-20" />
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-[#DCE7C6] to-cyan-300 bg-clip-text text-transparent">
              HIMALAYAN SPORTS
            </span>
            <br />
            <span className="text-white">ACADEMY</span>
          </h1>
          
          {/* Subtitle */}
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-gradient-to-r from-blue-900/30 to-blue-900/10 backdrop-blur-sm border border-blue-500/30 mb-6">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              PREMIUM ELITE TRAINING
            </span>
          </div>

          {/* Description */}
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Where <span className="text-[#DCE7C6] font-semibold">Himalayan discipline</span> meets 
            <span className="text-blue-400 font-semibold"> modern sports science</span>. 
            Transform your potential into championship performance with our world-class coaching.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 ${
                hoveredCard === index 
                  ? "border-blue-500/50 bg-gradient-to-br from-white/10 to-white/5" 
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                {hoveredCard === index && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center"
                  >
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                  </motion.div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${stat.gradient.split(' ')[1]}`}
                  initial={{ width: "0%" }}
                  animate={{ width: `${60 + index * 15}%` }}
                  transition={{ delay: 0.8 + index * 0.2, duration: 1.5 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-8"
        >
          {/* Features Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">World-Class Facilities</h2>
            <p className="text-gray-400">Experience training infrastructure that matches Olympic standards</p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Altitude Training */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mb-4">
                  <Mountain className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">Altitude Training Facility</h3>
                <p className="text-gray-400 text-sm mb-4">Train at simulated 3000m altitude for enhanced performance</p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300">Oxygen Control</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300">Temperature Regulated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300">Real-time Monitoring</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 24/7 Access */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center mb-4">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">24/7 Access & Support</h3>
                <p className="text-gray-400 text-sm mb-4">Round-the-clock facility access with medical support</p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300">Always Open Facility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300">Medical Team On-site</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300">Emergency Response</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Global Network */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center mb-4">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">Global Network</h3>
                <p className="text-gray-400 text-sm mb-4">Connect with international coaches and athletes</p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300">International Coaches</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300">Global Competitions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300">Exchange Programs</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl flex items-center justify-center gap-3 mx-auto group"
            >
              <span>Start Your Training Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.button>
            
            <p className="text-gray-400 mt-4 text-sm">
              Join 500+ athletes who transformed their potential into performance
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Live Training Indicator */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-8 z-50 hidden md:block"
      >
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute" />
              <div className="w-3 h-3 bg-green-500 rounded-full relative" />
            </div>
            <span className="text-sm text-gray-300">Live Training</span>
          </div>
          <div className="text-lg font-bold text-white">42</div>
        </div>
      </motion.div>

      {/* Weather Widget */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="fixed bottom-8 right-8 z-50 hidden md:block"
      >
        <div className="px-4 py-3 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10">
          <div className="flex items-center gap-3">
            <div className="text-2xl">☀️</div>
            <div>
              <div className="text-lg font-bold text-white">23°C</div>
              <div className="text-xs text-gray-400">Sunny • ENG 09-02-2026 12:45</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Add CSS animations
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 5s ease infinite;
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
`;

// Add styles to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Hero;