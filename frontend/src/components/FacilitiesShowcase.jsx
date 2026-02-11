import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Dumbbell, Activity, Brain, Heart, Cpu, Monitor,
  Video, Thermometer, Wind, Droplets, Zap, Shield, Lock, Wifi,
  Users, Clock, Star, MapPin, Navigation, Maximize2, Play,
  Pause, ChevronRight, ChevronLeft, Sparkles, Award, Trophy,
  Target, BarChart3, Radio, Satellite, Database, Server,
  Cloud, Snowflake, Waves, Mountain, Globe, Compass,
  Eye, EyeOff, Settings, Share2, Download, Bookmark,
  MessageCircle, Phone, Mail, Map, Filter, Search,
  X, CheckCircle, AlertCircle, Info, HelpCircle
} from "lucide-react";

const FacilitiesShowcase = () => {
  const [activeFacility, setActiveFacility] = useState(0);
  const [isTourPlaying, setIsTourPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [temperature, setTemperature] = useState(22);
  const [humidity, setHumidity] = useState(65);
  const [airQuality, setAirQuality] = useState(95);
  const [activeUsers, setActiveUsers] = useState(42);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const containerRef = useRef(null);

  // Facility categories
  const categories = [
    { id: "all", label: "All Facilities", icon: Building2, count: 12 },
    { id: "training", label: "Training", icon: Dumbbell, count: 5 },
    { id: "recovery", label: "Recovery", icon: Heart, count: 3 },
    { id: "science", label: "Science Lab", icon: Brain, count: 2 },
    { id: "monitoring", label: "Monitoring", icon: Monitor, count: 2 }
  ];

  // World-class facilities data
  const facilities = [
    {
      id: 1,
      title: "Altitude Simulation Chamber",
      category: "training",
      status: "operational",
      capacity: "20 athletes",
      rating: 4.9,
      temperature: "18-22°C",
      oxygenLevel: "12-21%",
      images: [
        "https://images.unsplash.com/photo-1541534741688-6073d6a7ca9a?w=1200&h=800&fit=crop&q=80",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=80"
      ],
      description: "State-of-the-art altitude training facility simulating up to 5000m elevation",
      features: [
        "Adjustable altitude (0-5000m)",
        "Temperature & humidity control",
        "Real-time biometric monitoring",
        "Emergency oxygen supply",
        "24/7 medical supervision"
      ],
      equipment: ["Hypoxic generators", "Climate control", "VO2 max analyzers", "ECG monitors"],
      liveStats: {
        currentAltitude: "3200m",
        oxygenLevel: "17.2%",
        activeSessions: 8,
        avgHeartRate: "142 bpm"
      }
    },
    {
      id: 2,
      title: "Biomechanics Laboratory",
      category: "science",
      status: "operational",
      capacity: "15 stations",
      rating: 4.8,
      temperature: "22°C",
      oxygenLevel: "Normal",
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&q=80"
      ],
      description: "Advanced motion capture and analysis facility with 64-camera Vicon system",
      features: [
        "3D motion capture",
        "Force plate analysis",
        "EMG muscle monitoring",
        "Gait analysis",
        "Real-time feedback"
      ],
      equipment: ["Vicon cameras", "AMTI force plates", "Delsys EMG", "High-speed cameras"],
      liveStats: {
        sessionsToday: 12,
        dataPoints: "1.4M",
        processingSpeed: "240fps",
        accuracy: "99.7%"
      }
    },
    {
      id: 3,
      title: "Cryotherapy Center",
      category: "recovery",
      status: "operational",
      capacity: "4 chambers",
      rating: 4.9,
      temperature: "-110°C to -160°C",
      oxygenLevel: "Normal",
      images: [
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=800&fit=crop&q=80",
        "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=1200&h=800&fit=crop&q=80"
      ],
      description: "Whole-body cryotherapy chambers for accelerated recovery and inflammation reduction",
      features: [
        "Whole-body cryotherapy",
        "Localized cryo units",
        "Temperature monitoring",
        "Safety protocols",
        "Therapist supervision"
      ],
      equipment: ["Cryo chambers", "Thermal cameras", "Vital signs monitors", "Safety systems"],
      liveStats: {
        chamberTemp: "-140°C",
        sessionsToday: 28,
        avgRecoveryTime: "38% faster",
        satisfaction: "98%"
      }
    },
    {
      id: 4,
      title: "Hydrotherapy Complex",
      category: "recovery",
      status: "operational",
      capacity: "10 pools",
      rating: 4.7,
      temperature: "32-38°C",
      oxygenLevel: "Normal",
      images: [
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop&q=80",
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&h=800&fit=crop&q=80"
      ],
      description: "Complete hydrotherapy facility with contrast baths, underwater treadmills, and resistance pools",
      features: [
        "Underwater treadmills",
        "Contrast therapy pools",
        "Resistance swimming",
        "Underwater cameras",
        "Temperature zones"
      ],
      equipment: ["HydroWorx pools", "Underwater cameras", "Temperature controls", "Current generators"],
      liveStats: {
        poolTemp: "34°C",
        currentSpeed: "2.4 m/s",
        activeUsers: 6,
        therapyTime: "45 mins avg"
      }
    },
    {
      id: 5,
      title: "Performance Analytics Hub",
      category: "monitoring",
      status: "operational",
      capacity: "30 stations",
      rating: 4.8,
      temperature: "21°C",
      oxygenLevel: "Normal",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop&q=80"
      ],
      description: "Data analytics center with real-time performance tracking and AI-powered insights",
      features: [
        "Real-time dashboards",
        "AI performance predictions",
        "Injury risk analysis",
        "Custom reporting",
        "Mobile integration"
      ],
      equipment: ["Data servers", "Analytics software", "AI processors", "Visualization walls"],
      liveStats: {
        dataProcessed: "2.1TB",
        predictionsToday: 156,
        accuracyRate: "94.3%",
        activeAlerts: 3
      }
    },
    {
      id: 6,
      title: "Nutrition & Metabolic Lab",
      category: "science",
      status: "operational",
      capacity: "8 stations",
      rating: 4.7,
      temperature: "22°C",
      oxygenLevel: "Normal",
      images: [
        "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1200&h=800&fit=crop&q=80",
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=800&fit=crop&q=80"
      ],
      description: "Comprehensive metabolic testing and personalized nutrition planning facility",
      features: [
        "Metabolic cart analysis",
        "Body composition scanning",
        "Nutrient analysis",
        "Meal planning AI",
        "Supplement protocols"
      ],
      equipment: ["Metabolic carts", "DEXA scanners", "Calorimeters", "Blood analyzers"],
      liveStats: {
        testsToday: 9,
        metabolicRate: "1850 kcal",
        bodyFatChange: "-2.3% avg",
        mealPlans: 42
      }
    }
  ];

  // Simulate live environment updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature(prev => Math.min(25, Math.max(18, prev + (Math.random() * 0.4 - 0.2))));
      setHumidity(prev => Math.min(80, Math.max(50, prev + (Math.random() * 2 - 1))));
      setAirQuality(prev => Math.min(100, Math.max(85, prev + (Math.random() * 1 - 0.5))));
      setActiveUsers(prev => Math.min(50, Math.max(30, prev + (Math.random() * 4 - 2))));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Facility rotation
  useEffect(() => {
    let interval;
    if (isTourPlaying && !isModalOpen) {
      interval = setInterval(() => {
        setActiveFacility(prev => (prev + 1) % facilities.length);
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [isTourPlaying, isModalOpen, facilities.length]);

  const filteredFacilities = facilities.filter(facility => {
    const matchesCategory = selectedFilter === "all" || facility.category === selectedFilter;
    const matchesSearch = facility.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         facility.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeFacilityData = facilities[activeFacility];

  // 3D card effect - optimized with CSS transforms
  const handleCardMouseMove = (e, id) => {
    if (hoveredCard !== id) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 4;
    const rotateX = ((centerY - y) / centerY) * -4;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = `0 30px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(3, 8, 89, 0.1)`;
  };

  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    e.currentTarget.style.boxShadow = '';
  };

  // Status indicator component
  const StatusIndicator = ({ status }) => {
    const config = {
      operational: { color: "bg-green-500", label: "Operational" },
      maintenance: { color: "bg-yellow-500", label: "Maintenance" },
      limited: { color: "bg-blue-500", label: "Limited" },
      closed: { color: "bg-red-500", label: "Closed" }
    };
    
    const { color, label } = config[status] || config.operational;
    
    return (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color} animate-pulse`} />
        <span className="text-xs text-gray-400">{label}</span>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="relative bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 overflow-visible"
    >
      {/* Advanced Background - Simplified for better performance */}
      <div className="absolute inset-0 z-0">
        {/* Static Grid Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#5FD4E208_1px,transparent_1px),linear-gradient(to_bottom,#5FD4E208_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white" />
        </div>

        {/* Subtle Floating Elements */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#5FD4E2]/20 to-transparent"
            style={{
              top: `${20 + i * 20}%`,
              left: "0%",
              width: "100%"
            }}
          />
        ))}

        {/* Static Orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl bg-[#5FD4E2]/10" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl bg-[#DCE7C6]/10" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#030859] to-[#5FD4E2] rounded-2xl flex items-center justify-center shadow-lg shadow-[#030859]/20">
                <Building2 className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-[#030859] via-[#5FD4E2] to-[#030859] bg-clip-text text-transparent">
                  World-Class
                </span>{" "}
                <span className="text-[#030859]">Facilities</span>
              </h2>
              <p className="text-lg text-gray-600 mt-2">Experience training infrastructure that matches Olympic standards</p>
            </div>
          </div>

          {/* Live Environment Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
            {[
              { label: "Temperature", value: `${temperature.toFixed(1)}°C`, icon: Thermometer, color: "from-[#FBB102] to-[#FBB102]/80" },
              { label: "Humidity", value: `${humidity.toFixed(0)}%`, icon: Droplets, color: "from-[#5FD4E2] to-[#5FD4E2]/80" },
              { label: "Air Quality", value: `${airQuality.toFixed(0)}%`, icon: Wind, color: "from-[#030859] to-[#030859]/80" },
              { label: "Active Users", value: activeUsers, icon: Users, color: "from-[#DCE7C6] to-[#DCE7C6]/80" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="relative p-4 rounded-2xl backdrop-blur-sm border border-gray-200 bg-white/80">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                      <stat.icon className="w-4 h-4 text-[#030859]" />
                    </div>
                    <span className="text-xs text-gray-600">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-[#030859]">{stat.value}</div>
                  {/* Animated Meter */}
                  <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${stat.color}`}
                      initial={{ width: "0%" }}
                      animate={{ width: `${parseFloat(stat.value)}%` }}
                      transition={{ delay: 0.5 + index * 0.2, duration: 2 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Featured Facility */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Featured Facility Card */}
            <div className="relative rounded-3xl overflow-hidden border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-xl">
              {/* Image Slider */}
              <div className="relative h-64 md:h-96">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeFacility}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8 }}
                    src={activeFacilityData.images[0]}
                    alt={activeFacilityData.title}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                
                {/* Controls */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={() => setIsTourPlaying(!isTourPlaying)}
                    className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                  >
                    {isTourPlaying ? (
                      <Pause className="w-4 h-4 text-[#030859]" />
                    ) : (
                      <Play className="w-4 h-4 text-[#030859]" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                  >
                    <Maximize2 className="w-4 h-4 text-[#030859]" />
                  </button>
                </div>

                {/* Facility Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{activeFacilityData.title}</h3>
                      <p className="text-sm text-gray-200">{activeFacilityData.description}</p>
                    </div>
                    <StatusIndicator status={activeFacilityData.status} />
                  </div>
                  
                  {/* Live Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(activeFacilityData.liveStats).map(([key, value], index) => (
                      <div key={key} className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                        <div className="text-xs text-gray-200 mb-1">{key.replace(/([A-Z])/g, ' $1')}</div>
                        <div className="text-lg font-bold text-white">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Facility Details */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Features */}
                  <div>
                    <h4 className="text-lg font-semibold text-[#030859] mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#FBB102]" />
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {activeFacilityData.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Equipment */}
                  <div>
                    <h4 className="text-lg font-semibold text-[#030859] mb-3 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#5FD4E2]" />
                      Equipment
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeFacilityData.equipment.map((item, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-sm bg-[#DCE7C6] text-[#030859] border border-[#030859]/10"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveFacility(prev => prev === 0 ? facilities.length - 1 : prev - 1)}
                      className="p-2 rounded-full bg-[#030859]/10 hover:bg-[#030859]/20 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-[#030859]" />
                    </button>
                    <button
                      onClick={() => setIsTourPlaying(!isTourPlaying)}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white font-medium"
                    >
                      {isTourPlaying ? "Pause Tour" : "Resume Tour"}
                    </button>
                    <button
                      onClick={() => setActiveFacility(prev => (prev + 1) % facilities.length)}
                      className="p-2 rounded-full bg-[#030859]/10 hover:bg-[#030859]/20 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-[#030859]" />
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {activeFacility + 1} of {facilities.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Virtual Tour Section */}
            <div className="p-6 rounded-3xl backdrop-blur-xl border border-[#5FD4E2]/30 bg-gradient-to-br from-[#5FD4E2]/10 to-[#DCE7C6]/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#030859] mb-2">Virtual Facility Tour</h3>
                  <p className="text-gray-600">Take an interactive 360° tour of our facilities</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 rounded-full bg-white/80 text-gray-600 hover:text-[#030859] transition-colors">
                    <Eye className="w-4 h-4 inline mr-2" />
                    360° View
                  </button>
                  <button className="px-4 py-2 rounded-full bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white">
                    <Video className="w-4 h-4 inline mr-2" />
                    Start Tour
                  </button>
                </div>
              </div>
              
              {/* Tour Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Tour Progress</span>
                  <span className="text-[#030859]">65% Complete</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#030859] to-[#5FD4E2]"
                    initial={{ width: "0%" }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 2 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Facilities List */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Search & Filter */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search facilities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#030859] focus:ring-1 focus:ring-[#030859]/30 transition-colors"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedFilter(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      selectedFilter === category.id
                        ? "bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white"
                        : "bg-white text-gray-600 hover:bg-[#DCE7C6] hover:text-[#030859] border border-gray-300"
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    <span className="text-sm">{category.label}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/30 text-[#030859]">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Facilities List */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredFacilities.map((facility, index) => (
                <motion.div
                  key={facility.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  onMouseEnter={() => setHoveredCard(facility.id)}
                  onMouseLeave={(e) => {
                    handleCardMouseLeave(e);
                    setHoveredCard(null);
                  }}
                  onMouseMove={(e) => handleCardMouseMove(e, facility.id)}
                  onClick={() => setActiveFacility(facilities.findIndex(f => f.id === facility.id))}
                  className={`relative cursor-pointer rounded-2xl p-4 border transition-all duration-300 ${
                    activeFacility === facilities.findIndex(f => f.id === facility.id)
                      ? "border-[#030859] bg-gradient-to-br from-[#030859]/10 to-[#5FD4E2]/10"
                      : "border-gray-200 bg-white hover:border-[#030859]/50 hover:bg-[#DCE7C6]/20"
                  }`}
                >
                  {/* Background Glow */}
                  {hoveredCard === facility.id && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#030859]/5 to-[#5FD4E2]/5 rounded-2xl" />
                  )}

                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-[#030859]/20 to-[#5FD4E2]/20">
                          {facility.category === "training" && <Dumbbell className="w-5 h-5 text-[#030859]" />}
                          {facility.category === "recovery" && <Heart className="w-5 h-5 text-[#FBB102]" />}
                          {facility.category === "science" && <Brain className="w-5 h-5 text-[#5FD4E2]" />}
                          {facility.category === "monitoring" && <Monitor className="w-5 h-5 text-[#030859]" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#030859]">{facility.title}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3 text-gray-500" />
                              <span className="text-xs text-gray-500">{facility.capacity}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-[#FBB102] fill-[#FBB102]" />
                              <span className="text-xs text-gray-500">{facility.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>

                    {/* Status & Quick Info */}
                    <div className="flex items-center justify-between">
                      <StatusIndicator status={facility.status} />
                      <div className="flex items-center gap-3">
                        <div className="text-xs px-2 py-1 rounded-full bg-[#DCE7C6] text-[#030859]">
                          {facility.temperature}
                        </div>
                        {facility.category === "training" && (
                          <div className="text-xs px-2 py-1 rounded-full bg-[#5FD4E2]/20 text-[#030859]">
                            O₂: {facility.oxygenLevel}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* System Status */}
            <div className="p-4 rounded-2xl backdrop-blur-sm border border-gray-200 bg-white/80">
              <h4 className="font-semibold text-[#030859] mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                System Status
              </h4>
              <div className="space-y-2">
                {[
                  { label: "Power Supply", status: "Stable", color: "bg-green-500" },
                  { label: "Network", status: "Optimized", color: "bg-green-500" },
                  { label: "Security", status: "Active", color: "bg-green-500" },
                  { label: "Backup", status: "Ready", color: "bg-blue-500" }
                ].map((system, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{system.label}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${system.color} animate-pulse`} />
                      <span className="text-gray-800">{system.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Booking & Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-8 rounded-3xl relative overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#030859]/20 via-[#5FD4E2]/10 to-[#DCE7C6]/20" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#5FD4E210_1px,transparent_1px),linear-gradient(to_bottom,#5FD4E210_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-[#030859] mb-3">Book a Facility Tour</h3>
              <p className="text-gray-600 mb-6">
                Experience our world-class facilities firsthand. Schedule a personalized tour with our facility experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white font-semibold flex items-center justify-center gap-2 shadow-lg"
                >
                  <CalendarIcon className="w-5 h-5" />
                  Schedule Tour
                </motion.button>
                <button className="px-6 py-3 rounded-xl bg-white/80 backdrop-blur-sm text-[#030859] font-semibold border border-[#030859]/20 hover:border-[#030859]/40 transition-colors">
                  Virtual Preview
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#030859] mb-3">Facility Support</h3>
              <div className="space-y-3">
                {[
                  { icon: Phone, label: "24/7 Support", value: "+1 (555) 123-4567" },
                  { icon: Mail, label: "Email", value: "facilities@hsa.com" },
                  { icon: Clock, label: "Operating Hours", value: "5:00 AM - 11:00 PM" }
                ].map((contact, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white/80">
                    <contact.icon className="w-5 h-5 text-[#5FD4E2]" />
                    <div>
                      <div className="text-sm text-gray-600">{contact.label}</div>
                      <div className="font-medium text-[#030859]">{contact.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-8 hidden lg:block">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="p-4 rounded-2xl backdrop-blur-xl border border-[#5FD4E2]/30 bg-white/80"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 bg-[#5FD4E2] rounded-full animate-ping absolute" />
              <div className="w-3 h-3 bg-[#5FD4E2] rounded-full relative" />
            </div>
            <div>
              <div className="text-sm font-medium text-[#030859]">Real-time Monitoring</div>
              <div className="text-xs text-gray-600">All Systems Active</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-20 right-8 hidden lg:block">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsModalOpen(true)}
          className="p-4 rounded-2xl backdrop-blur-xl border border-[#5FD4E2]/30 bg-white/80 group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#030859] to-[#5FD4E2]">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-[#030859]">Live View</div>
              <div className="text-xs text-gray-600">Security Cameras</div>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(3, 8, 89, 0.05);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(95, 212, 226, 0.5);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(95, 212, 226, 0.7);
        }
      `}</style>
    </div>
  );
};

// Calendar icon component
const CalendarIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default FacilitiesShowcase;