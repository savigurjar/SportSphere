// src/components/Hero.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Trophy, Target, Users, Shield, Award, Heart, Activity, 
  Star, Clock, MapPin, ChevronRight, Sparkles, TrendingUp, 
  Zap, CheckCircle, Medal, Globe, Mountain, ArrowRight, Play, 
  Pause, SkipForward, Video, BarChart3, Cpu, Brain, Moon, 
  Sun, Cloud, Wind, Thermometer, Navigation, Compass,
  Volume2, VolumeX, Maximize2, Settings, Share2, BookOpen,
  GraduationCap, Briefcase, Dumbbell, Coffee, ShieldCheck,
  Lock, Unlock, Database, Wifi, Battery, Radio, Satellite
} from "lucide-react";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState("day");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [particleCount, setParticleCount] = useState(150);
  const [systemStatus, setSystemStatus] = useState({
    training: "active",
    network: "stable",
    power: "full",
    temperature: "23°C"
  });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Enhanced Unsplash Images with different categories
  const imageCategories = {
    mountains: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&h=1200&fit=crop&q=80",
        photographer: "Paul Gilmore",
        title: "Himalayan Peaks",
        category: "Mountains",
        gradient: "from-blue-900/60 to-purple-900/40"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=1800&h=1200&fit=crop&q=80",
        photographer: "Samuel Ferrara",
        title: "Snowy Range",
        category: "Mountains",
        gradient: "from-cyan-900/60 to-blue-900/40"
      }
    ],
    sports: [
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1800&h=1200&fit=crop&q=80",
        photographer: "Victor Freitas",
        title: "Elite Training",
        category: "Sports",
        gradient: "from-red-900/60 to-orange-900/40"
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1541534741688-6073d6a7ca9a?w=1800&h=1200&fit=crop&q=80",
        photographer: "Jannis Lucas",
        title: "Mountain Athletics",
        category: "Sports",
        gradient: "from-emerald-900/60 to-green-900/40"
      }
    ],
    facility: [
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&h=1200&fit=crop&q=80",
        photographer: "Sven Mieke",
        title: "Modern Facilities",
        category: "Facility",
        gradient: "from-violet-900/60 to-purple-900/40"
      },
      {
        id: 6,
        url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1800&h=1200&fit=crop&q=80",
        photographer: "John Fornander",
        title: "Training Center",
        category: "Facility",
        gradient: "from-amber-900/60 to-yellow-900/40"
      }
    ]
  };

  const allImages = [
    ...imageCategories.mountains,
    ...imageCategories.sports,
    ...imageCategories.facility
  ];

  // Advanced Stats with categories
  const advancedStats = [
    {
      category: "Achievements",
      data: [
        { value: "150+", label: "International Medals", icon: Medal, trend: "+12%", color: "from-yellow-600 to-amber-500" },
        { value: "42", label: "Olympic Athletes", icon: Trophy, trend: "+5%", color: "from-blue-600 to-cyan-500" },
        { value: "25", label: "World Records", icon: Award, trend: "+3%", color: "from-purple-600 to-pink-500" }
      ]
    },
    {
      category: "Training",
      data: [
        { value: "500+", label: "Active Athletes", icon: Users, trend: "+8%", color: "from-green-600 to-emerald-500" },
        { value: "50+", label: "Expert Coaches", icon: GraduationCap, trend: "+4%", color: "from-indigo-600 to-blue-500" },
        { value: "24/7", label: "Training Hours", icon: Clock, trend: "Live", color: "from-red-600 to-orange-500" }
      ]
    },
    {
      category: "Facilities",
      data: [
        { value: "15", label: "Training Centers", icon: Mountain, trend: "+2", color: "from-teal-600 to-cyan-400" },
        { value: "4.9★", label: "Rating", icon: Star, trend: "↑ 0.1", color: "from-pink-600 to-rose-500" },
        { value: "99.8%", label: "Uptime", icon: ShieldCheck, trend: "Stable", color: "from-lime-600 to-green-500" }
      ]
    }
  ];

  // Interactive Features
  const interactiveFeatures = [
    {
      title: "Altitude Simulation",
      icon: Mountain,
      description: "Train at 5000m simulated altitude",
      status: "active",
      color: "from-blue-600 to-cyan-500",
      controls: ["Intensity", "Oxygen", "Temperature"]
    },
    {
      title: "Biomechanics Lab",
      icon: Cpu,
      description: "Real-time motion analysis",
      status: "online",
      color: "from-purple-600 to-pink-500",
      controls: ["3D Capture", "Force Plates", "EMG"]
    },
    {
      title: "Recovery Systems",
      icon: Heart,
      description: "Advanced recovery protocols",
      status: "available",
      color: "from-emerald-600 to-teal-500",
      controls: ["Cryo", "Hydro", "Therapy"]
    },
    {
      title: "Nutrition AI",
      icon: Brain,
      description: "Personalized diet plans",
      status: "optimizing",
      color: "from-amber-600 to-orange-500",
      controls: ["Macros", "Timing", "Supplements"]
    }
  ];

  // System monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      const hour = new Date().getHours();
      setTimeOfDay(hour >= 6 && hour < 18 ? "day" : "night");
      
      // Simulate system updates
      setSystemStatus(prev => ({
        ...prev,
        temperature: `${Math.floor(20 + Math.random() * 8)}°C`,
        network: Math.random() > 0.1 ? "stable" : "unstable"
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Image rotation
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % allImages.length);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, allImages.length]);

  // 3D Card effect handler
  const handleCardMouseMove = (e, index) => {
    if (hoveredCard !== index) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = ((centerY - y) / centerY) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
  };

  // Particle system
  const renderParticles = () => {
    return Array.from({ length: particleCount }).map((_, i) => {
      const size = Math.random() * 4 + 1;
      const duration = 10 + Math.random() * 20;
      const delay = Math.random() * 5;
      
      return (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, 
              rgba(59, 130, 246, ${0.2 + Math.random() * 0.3}) 0%,
              rgba(220, 231, 198, ${0.1 + Math.random() * 0.2}) 50%,
              transparent 100%)`,
            boxShadow: `0 0 ${size * 2}px rgba(59, 130, 246, 0.5)`
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      );
    });
  };

  return (
    <div 
      ref={containerRef}
      className={`relative min-h-screen overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
      style={{
        background: timeOfDay === "day" 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
          : 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)'
      }}
    >
      {/* Advanced Background Layers */}
      <div className="absolute inset-0">
        {/* Parallax Mountains */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"
          style={{ y }}
        >
          <div className="absolute inset-0">
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* Animated Grid */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f610_1px,transparent_1px),linear-gradient(to_bottom,#3b82f610_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#DCE7C605_2px,transparent_2px),linear-gradient(to_bottom,#DCE7C605_2px,transparent_2px)] bg-[size:120px_120px]" />
          
          {/* Scanning Lines */}
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{ backgroundPosition: ["0% 0%", "0% 100%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: `linear-gradient(to bottom, 
                transparent 0%,
                rgba(59, 130, 246, 0.1) 50%,
                transparent 100%)`,
              backgroundSize: "100% 200px"
            }}
          />
        </div>

        {/* Particle System */}
        <div className="absolute inset-0 overflow-hidden">
          {renderParticles()}
        </div>

        {/* Dynamic Image Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img
              src={allImages[currentImageIndex].url}
              alt={allImages[currentImageIndex].title}
              className="w-full h-full object-cover"
            />
            {/* Dynamic Gradient Overlay */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br ${allImages[currentImageIndex].gradient} mix-blend-overlay`}
            />
          </motion.div>
        </AnimatePresence>

        {/* Glowing Orbs */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              left: `${10 + i * 20}%`,
              top: `${10 + i * 15}%`,
              background: `radial-gradient(circle, 
                rgba(59, 130, 246, ${0.1 + i * 0.1}) 0%,
                rgba(220, 231, 198, ${0.05 + i * 0.05}) 50%,
                transparent 70%)`
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full px-4 py-8 md:px-8 md:py-12">
        {/* Top Control Bar */}
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="flex items-center justify-between mb-8 md:mb-12"
        >
          {/* System Status */}
          <div className="flex items-center gap-4">
            {/* Academy Logo */}
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-800 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/50">
                <Trophy className="w-6 h-6 md:w-8 md:h-8 text-[#DCE7C6]" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur-lg opacity-30" />
            </motion.div>

            {/* System Info */}
            <div className="hidden md:flex items-center gap-6">
              {[
                { icon: Wifi, label: systemStatus.network, color: systemStatus.network === "stable" ? "text-green-400" : "text-red-400" },
                { icon: Battery, label: systemStatus.power, color: "text-blue-400" },
                { icon: Thermometer, label: systemStatus.temperature, color: "text-amber-400" },
                { icon: ShieldCheck, label: "Secure", color: "text-emerald-400" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  <span className="text-xs text-gray-400">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center gap-2">
            {[
              { icon: Volume2, action: () => setIsMuted(!isMuted), active: !isMuted },
              { icon: Maximize2, action: () => setIsFullscreen(!isFullscreen), active: isFullscreen },
              { icon: Settings, action: () => {}, active: false },
              { icon: Share2, action: () => {}, active: false }
            ].map((btn, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={btn.action}
                className={`p-2 rounded-lg backdrop-blur-sm border ${
                  btn.active 
                    ? 'bg-blue-500/20 border-blue-500/50' 
                    : 'bg-white/5 border-white/10 hover:border-blue-500/30'
                }`}
              >
                <btn.icon className="w-4 h-4 text-white" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Academy Info */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-6 md:space-y-8"
          >
            {/* Title Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-green-500 rounded-full"
                  />
                  <span className="text-sm text-green-400 font-mono">SYSTEM: ONLINE</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
              </div>

              <motion.h1
                className="text-4xl md:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-white">HIMALAYAN</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-[#DCE7C6] to-cyan-300 bg-clip-text text-transparent">
                  SPORTS ACADEMY
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/30 to-blue-900/10 backdrop-blur-sm border border-blue-500/30"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  PREMIUM ELITE TRAINING v3.0
                </span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </motion.div>
            </div>

            {/* Interactive Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {advancedStats.map((category, catIndex) => (
                <motion.div
                  key={catIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + catIndex * 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.data.map((stat, statIndex) => (
                      <motion.div
                        key={statIndex}
                        whileHover="hover"
                        onMouseEnter={() => setHoveredCard(`${catIndex}-${statIndex}`)}
                        onMouseLeave={(e) => {
                          // Reset card transform
                          e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                          e.currentTarget.style.boxShadow = '';
                          setHoveredCard(null);
                        }}
                        onMouseMove={(e) => handleCardMouseMove(e, `${catIndex}-${statIndex}`)}
                        className="relative group cursor-pointer"
                        variants={{
                          hover: { scale: 1.02 }
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative p-4 rounded-2xl backdrop-blur-sm border border-white/10 group-hover:border-blue-500/30 transition-all bg-gradient-to-br from-white/5 to-white/[0.02]">
                          <div className="flex items-center justify-between mb-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                              <stat.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-500/10 text-green-400">
                              {stat.trend}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                          </div>
                          {/* Animated Bar */}
                          <div className="mt-3 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${stat.color}`}
                              initial={{ width: "0%" }}
                              animate={{ width: `${70 + (catIndex * 10) + (statIndex * 5)}%` }}
                              transition={{ delay: 1 + catIndex * 0.3 + statIndex * 0.1, duration: 1.5 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Interactive Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-white">Interactive Systems</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">LIVE FEED</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {interactiveFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative p-4 rounded-2xl backdrop-blur-sm border border-white/10 group-hover:border-blue-500/30 transition-all bg-gradient-to-br from-white/5 to-white/[0.02]">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${feature.color}`}>
                          <feature.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          feature.status === 'active' ? 'bg-green-500/10 text-green-400' :
                          feature.status === 'online' ? 'bg-blue-500/10 text-blue-400' :
                          'bg-amber-500/10 text-amber-400'
                        }`}>
                          {feature.status}
                        </span>
                      </div>
                      <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-xs text-gray-400 mb-3">{feature.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {feature.controls.map((control, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">
                            {control}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Media & Controls */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Media Player */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-xl"
            >
              {/* Current Image Display */}
              <div className="relative h-48 md:h-64">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8 }}
                    src={allImages[currentImageIndex].url}
                    alt={allImages[currentImageIndex].title}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">{allImages[currentImageIndex].title}</h4>
                      <p className="text-xs text-gray-400">by {allImages[currentImageIndex].photographer}</p>
                    </div>
                    <div className="text-xs text-gray-400">
                      {currentImageIndex + 1}/{allImages.length}
                    </div>
                  </div>
                </div>
              </div>

              {/* Media Controls */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 text-white" />
                      ) : (
                        <Play className="w-4 h-4 text-white" />
                      )}
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(prev => 
                        prev === 0 ? allImages.length - 1 : prev - 1
                      )}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-white rotate-180" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(prev => 
                        (prev + 1) % allImages.length
                      )}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Auto-play:</span>
                    <div 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className={`w-10 h-5 rounded-full p-0.5 cursor-pointer transition-all ${
                        isPlaying ? 'bg-blue-500' : 'bg-white/10'
                      }`}
                    >
                      <motion.div
                        className="w-4 h-4 bg-white rounded-full"
                        animate={{ x: isPlaying ? 20 : 0 }}
                        transition={{ type: "spring" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                      animate={{ width: isPlaying ? "100%" : "60%" }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0:00</span>
                    <span>0:06</span>
                  </div>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2">
                  {Object.keys(imageCategories).map((category) => (
                    <button
                      key={category}
                      className="px-3 py-1.5 rounded-full text-xs capitalize bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Weather & Environment */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-3xl backdrop-blur-xl border border-white/10 bg-gradient-to-br from-blue-900/20 to-blue-900/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Environment Status</h3>
                <div className="flex items-center gap-2">
                  {timeOfDay === "day" ? (
                    <Sun className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-blue-400" />
                  )}
                  <span className="text-xs text-gray-400">{timeOfDay}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Thermometer, label: "Temperature", value: "23°C", color: "text-red-400" },
                  { icon: Wind, label: "Wind Speed", value: "12 km/h", color: "text-cyan-400" },
                  { icon: Cloud, label: "Altitude", value: "3,000m", color: "text-blue-400" },
                  { icon: Navigation, label: "Location", value: "28°N, 85°E", color: "text-emerald-400" }
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                      <span className="text-xs text-gray-400">{item.label}</span>
                    </div>
                    <div className="text-lg font-bold text-white">{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="grid grid-cols-2 gap-3"
            >
              {[
                { label: "Book Training", icon: Calendar, color: "from-blue-600 to-cyan-500" },
                { label: "View Schedule", icon: Clock, color: "from-purple-600 to-pink-500" },
                { label: "Connect Coach", icon: Users, color: "from-emerald-600 to-teal-500" },
                { label: "Emergency", icon: Shield, color: "from-red-600 to-orange-500" }
              ].map((action, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-2xl bg-gradient-to-br ${action.color} backdrop-blur-sm`}
                >
                  <div className="flex items-center gap-2">
                    <action.icon className="w-5 h-5 text-white" />
                    <span className="text-sm font-medium text-white">{action.label}</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Status Bar */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 md:mt-12 p-4 rounded-2xl backdrop-blur-xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-400">Live Training:</span>
                <span className="text-lg font-bold text-white">42 Sessions</span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-400">Active in:</span>
                <span className="font-medium text-white">15 Countries</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-gray-400">System Load:</span>
                <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    animate={{ width: ["60%", "75%", "60%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Access Elite Portal</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 hidden lg:block"
      >
        <div className="flex flex-col gap-3">
          {["Altitude", "Biomech", "Recovery", "Nutrition"].map((label, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 10 }}
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-white cursor-pointer"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>{label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Particle Control */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setParticleCount(prev => prev === 150 ? 300 : 150)}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full backdrop-blur-xl border border-white/10 bg-black/40"
      >
        <Sparkles className="w-5 h-5 text-blue-400" />
      </motion.button>
    </div>
  );
};

// Calendar icon component
const Calendar = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default Hero;