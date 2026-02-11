import React, { useState } from "react";
import { motion } from "framer-motion";
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

const Facilities = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [tourPlaying, setTourPlaying] = useState(false);

  // Facility categories
  const categories = [
    { id: "all", label: "All Facilities", count: 12, icon: Building2 },
    { id: "training", label: "Training", count: 5, icon: Dumbbell },
    { id: "recovery", label: "Recovery", count: 3, icon: Heart },
    { id: "science", label: "Science", count: 2, icon: Brain },
    { id: "monitoring", label: "Monitoring", count: 2, icon: Monitor }
  ];

  // Facilities data
  const facilities = [
    {
      id: 1,
      title: "Altitude Simulation Chamber",
      category: "training",
      status: "operational",
      capacity: "20 athletes",
      rating: 4.9,
      featured: true,
      description: "State-of-the-art altitude training facility simulating up to 5000m elevation",
      image: "https://images.unsplash.com/photo-1541534741688-6073d6a7ca9a?w=800&h=600&fit=crop&q=80",
      features: [
        "Adjustable altitude (0-5000m)",
        "Temperature & humidity control",
        "Real-time biometric monitoring",
        "Emergency oxygen supply",
        "24/7 medical supervision"
      ],
      equipment: ["Hypoxic generators", "Climate control", "VO2 max analyzers", "ECG monitors"],
      stats: {
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
      featured: false,
      description: "Advanced motion capture and analysis facility with 64-camera Vicon system",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
      features: [
        "3D motion capture",
        "Force plate analysis",
        "EMG muscle monitoring",
        "Gait analysis",
        "Real-time feedback"
      ],
      equipment: ["Vicon cameras", "AMTI force plates", "Delsys EMG", "High-speed cameras"],
      stats: {
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
      featured: true,
      description: "Whole-body cryotherapy chambers for accelerated recovery and inflammation reduction",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop&q=80",
      features: [
        "Whole-body cryotherapy",
        "Localized cryo units",
        "Temperature monitoring",
        "Safety protocols",
        "Therapist supervision"
      ],
      equipment: ["Cryo chambers", "Thermal cameras", "Vital signs monitors", "Safety systems"],
      stats: {
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
      featured: false,
      description: "Complete hydrotherapy facility with contrast baths, underwater treadmills, and resistance pools",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop&q=80",
      features: [
        "Underwater treadmills",
        "Contrast therapy pools",
        "Resistance swimming",
        "Underwater cameras",
        "Temperature zones"
      ],
      equipment: ["HydroWorx pools", "Underwater cameras", "Temperature controls", "Current generators"],
      stats: {
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
      featured: false,
      description: "Data analytics center with real-time performance tracking and AI-powered insights",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      features: [
        "Real-time dashboards",
        "AI performance predictions",
        "Injury risk analysis",
        "Custom reporting",
        "Mobile integration"
      ],
      equipment: ["Data servers", "Analytics software", "AI processors", "Visualization walls"],
      stats: {
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
      featured: false,
      description: "Comprehensive metabolic testing and personalized nutrition planning facility",
      image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&h=600&fit=crop&q=80",
      features: [
        "Metabolic cart analysis",
        "Body composition scanning",
        "Nutrient analysis",
        "Meal planning AI",
        "Supplement protocols"
      ],
      equipment: ["Metabolic carts", "DEXA scanners", "Calorimeters", "Blood analyzers"],
      stats: {
        testsToday: 9,
        metabolicRate: "1850 kcal",
        bodyFatChange: "-2.3% avg",
        mealPlans: 42
      }
    },
    {
      id: 7,
      title: "Sports Hall & Arena",
      category: "training",
      status: "operational",
      capacity: "200 athletes",
      rating: 4.9,
      featured: false,
      description: "Multi-purpose sports arena with Olympic-standard equipment and facilities",
      image: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?w=800&h=600&fit=crop&q=80",
      features: [
        "Olympic-standard flooring",
        "Professional lighting",
        "Seating for 500 spectators",
        "Video replay systems",
        "Multi-sport configurations"
      ],
      equipment: ["Basketball hoops", "Volleyball nets", "Badminton courts", "Scoreboards"],
      stats: {
        eventsToday: 3,
        activeUsers: 45,
        bookings: "92%",
        avgRating: "4.9/5"
      }
    },
    {
      id: 8,
      title: "Climbing & Bouldering Wall",
      category: "training",
      status: "operational",
      capacity: "25 climbers",
      rating: 4.8,
      featured: false,
      description: "Indoor climbing facility with varying difficulty routes and safety systems",
      image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&h=600&fit=crop&q=80",
      features: [
        "15m climbing wall",
        "Bouldering area",
        "Auto-belay systems",
        "Route variety",
        "Safety mats"
      ],
      equipment: ["Climbing holds", "Harnesses", "Ropes", "Crash pads"],
      stats: {
        routes: 50,
        activeClimbers: 18,
        safetyRecord: "100%",
        newRoutes: "Weekly"
      }
    }
  ];

  const filteredFacilities = facilities.filter(facility => {
    const matchesCategory = activeTab === "all" || facility.category === activeTab;
    const matchesSearch = searchQuery === "" || 
      facility.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        <span className="text-sm text-gray-600">{label}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#030859]/5 via-[#5FD4E2]/5 to-[#DCE7C6]/5" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#5FD4E208_1px,transparent_1px),linear-gradient(to_bottom,#5FD4E208_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#030859] to-[#5FD4E2] rounded-2xl flex items-center justify-center shadow-lg shadow-[#030859]/20">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-[#030859] via-[#5FD4E2] to-[#030859] bg-clip-text text-transparent">
                    World-Class Facilities
                  </span>
                </h1>
                <p className="text-lg text-gray-600">Experience training infrastructure that matches Olympic standards</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
              {[
                { label: "Total Facilities", value: "12+", icon: Building2, color: "#030859" },
                { label: "Open Now", value: "10", icon: CheckCircle, color: "#5FD4E2" },
                { label: "Capacity", value: "300+", icon: Users, color: "#FBB102" },
                { label: "Avg Rating", value: "4.8/5", icon: Star, color: "#030859" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      index === 0 ? "bg-[#030859]/10" :
                      index === 1 ? "bg-[#5FD4E2]/10" :
                      index === 2 ? "bg-[#FBB102]/10" :
                      "bg-[#DCE7C6]/30"
                    }`}>
                      <stat.icon className={`w-5 h-5 ${
                        index === 0 ? "text-[#030859]" :
                        index === 1 ? "text-[#5FD4E2]" :
                        index === 2 ? "text-[#FBB102]" :
                        "text-[#030859]"
                      }`} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#030859]">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search facilities by name, feature..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-300 text-[#030859] placeholder-gray-400 focus:outline-none focus:border-[#030859] focus:ring-1 focus:ring-[#030859]/30 transition-colors shadow-sm"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeTab === category.id
                        ? "text-white shadow-md"
                        : "bg-white text-gray-600 hover:text-[#030859] border border-gray-300"
                    }`}
                    style={activeTab === category.id ? { 
                      background: category.id === "all" ? "linear-gradient(to right, #030859, #5FD4E2)" :
                                category.id === "training" ? "#030859" :
                                category.id === "recovery" ? "#FBB102" :
                                category.id === "science" ? "#5FD4E2" :
                                category.id === "monitoring" ? "#DCE7C6" : "#030859"
                    } : {}}
                  >
                    <category.icon className="w-4 h-4" />
                    {category.label}
                    <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs bg-white/30">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredFacilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedFacility(facility)}
              className={`group cursor-pointer bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                facility.featured ? "ring-2 ring-[#FBB102]" : ""
              }`}
            >
              {/* Featured Badge */}
              {facility.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#FBB102] to-[#FBB102]/80 text-white text-xs font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    Featured
                  </div>
                </div>
              )}

              {/* Facility Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {/* Quick Stats */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      facility.status === 'operational' ? 'bg-green-500' :
                      facility.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                    } animate-pulse`} />
                    <span className="text-sm">{facility.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{facility.capacity}</span>
                  </div>
                </div>
              </div>

              {/* Facility Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#030859] mb-2">{facility.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{facility.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#5FD4E2] transition-colors" />
                </div>

                {/* Category Tag */}
                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    facility.category === 'training' ? 'bg-[#030859]/10 text-[#030859]' :
                    facility.category === 'recovery' ? 'bg-[#FBB102]/10 text-[#FBB102]' :
                    facility.category === 'science' ? 'bg-[#5FD4E2]/10 text-[#5FD4E2]' :
                    facility.category === 'monitoring' ? 'bg-[#DCE7C6] text-[#030859]' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {facility.category.charAt(0).toUpperCase() + facility.category.slice(1)}
                  </span>
                </div>

                {/* Quick Features */}
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">Key Features:</div>
                  <div className="flex flex-wrap gap-2">
                    {facility.features.slice(0, 2).map((feature, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                    {facility.features.length > 2 && (
                      <span className="px-2 py-1 bg-[#5FD4E2]/10 text-[#5FD4E2] text-xs rounded">
                        +{facility.features.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Rating and Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.floor(facility.rating)
                              ? "text-[#FBB102] fill-[#FBB102]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-[#030859]">{facility.rating}</span>
                  </div>
                  <div className="text-sm text-[#5FD4E2] font-medium">
                    View Details →
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Virtual Tour CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-[#030859]/10 via-[#5FD4E2]/10 to-[#DCE7C6]/20 rounded-2xl p-8 border border-[#5FD4E2]/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#030859] to-[#5FD4E2]">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#030859] mb-2">Virtual Facility Tour</h3>
                  <p className="text-gray-600">Experience our world-class facilities through an interactive 360° virtual tour</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setTourPlaying(!tourPlaying)}
                  className="px-6 py-3 bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white rounded-xl font-medium flex items-center gap-2 shadow-lg"
                >
                  {tourPlaying ? (
                    <>
                      <Pause className="w-5 h-5" />
                      Pause Tour
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Start Tour
                    </>
                  )}
                </button>
                <button className="px-6 py-3 bg-white/80 backdrop-blur-sm text-[#030859] font-medium border border-[#030859]/20 hover:border-[#030859]/40 rounded-xl transition-colors">
                  <Eye className="w-5 h-5 inline mr-2" />
                  360° View
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Booking Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-8 rounded-3xl relative overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#030859]/10 via-[#5FD4E2]/10 to-[#DCE7C6]/20" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#5FD4E210_1px,transparent_1px),linear-gradient(to_bottom,#5FD4E210_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-[#030859] mb-4">Book a Facility</h3>
              <p className="text-gray-600 mb-6">
                Reserve our world-class facilities for your training sessions. Our facility managers will ensure everything is set up for optimal performance.
              </p>
              <div className="space-y-4">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg">
                  <CalendarIcon className="w-5 h-5" />
                  Book Now
                </button>
                <div className="text-sm text-gray-600 text-center">
                  Available 5:00 AM - 11:00 PM, 7 days a week
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#030859] mb-4">Facility Support</h3>
              <div className="space-y-4">
                {[
                  { icon: Phone, label: "24/7 Support", value: "+91 98765 43210" },
                  { icon: Mail, label: "Email", value: "facilities@hsa.com" },
                  { icon: Clock, label: "Operating Hours", value: "5:00 AM - 11:00 PM" },
                  { icon: MapPin, label: "Location", value: "Manali, Himachal Pradesh" }
                ].map((contact, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/80 rounded-xl">
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

      {/* Facility Detail Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              {/* Header */}
              <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex items-center justify-between rounded-t-3xl">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedFacility.image}
                    alt={selectedFacility.title}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-[#030859]">{selectedFacility.title}</h3>
                    <StatusIndicator status={selectedFacility.status} />
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-[#030859] mb-3">Facility Description</h4>
                      <p className="text-gray-700">{selectedFacility.description}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-[#030859] mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {selectedFacility.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-[#030859] mb-3">Equipment</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedFacility.equipment.map((item, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-[#DCE7C6] text-[#030859]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Live Stats */}
                    <div className="bg-gradient-to-br from-[#030859]/5 to-[#5FD4E2]/5 rounded-2xl p-6">
                      <h4 className="text-lg font-bold text-[#030859] mb-4">Live Stats</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(selectedFacility.stats).map(([key, value]) => (
                          <div key={key} className="text-center p-3 bg-white/80 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">{key.replace(/([A-Z])/g, ' $1')}</div>
                            <div className="text-lg font-bold text-[#030859]">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="text-gray-600">Capacity</div>
                        <div className="font-bold text-[#030859]">{selectedFacility.capacity}</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="text-gray-600">Rating</div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= Math.floor(selectedFacility.rating)
                                    ? "text-[#FBB102] fill-[#FBB102]"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-bold text-[#030859]">{selectedFacility.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button className="w-full py-3 bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white rounded-xl font-medium">
                        Book This Facility
                      </button>
                      <button className="w-full py-3 bg-white border border-[#030859] text-[#030859] rounded-xl font-medium">
                        Check Availability
                      </button>
                      <button className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium">
                        Share Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
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

export default Facilities;