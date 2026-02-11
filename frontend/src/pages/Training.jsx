import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Dumbbell, Target, Trophy, Award, TrendingUp, Clock,
  Users, Activity, BarChart, Heart, Brain, Zap,
  Star, CheckCircle, Play, Pause, Calendar, MapPin,
  ChevronRight, ChevronLeft, Filter, Search, Plus,
  Edit2, Trash2, Share2, Download, Printer, Bell,
  Settings, BookOpen, Video, MessageCircle, Phone,
  Mail, User, Shield, Lock, Unlock, Eye,
  Maximize2, Minimize2, RefreshCw, X, AlertCircle,
  Info, HelpCircle, Award as AwardIcon
} from "lucide-react";

const Training = () => {
  const [activeTab, setActiveTab] = useState("programs");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Training categories
  const categories = [
    { id: "all", label: "All Training", count: 12 },
    { id: "strength", label: "Strength", count: 4 },
    { id: "cardio", label: "Cardio", count: 3 },
    { id: "flexibility", label: "Flexibility", count: 2 },
    { id: "skill", label: "Skill", count: 3 },
  ];

  // Training programs data
  const programs = [
    {
      id: 1,
      title: "Strength Foundation Program",
      category: "strength",
      level: "Beginner",
      duration: "8 weeks",
      sessionsPerWeek: 3,
      equipment: ["Barbells", "Dumbbells", "Rack", "Bench"],
      progress: 65,
      coach: "Rajesh Sharma",
      description: "Build fundamental strength with compound movements and proper form",
      features: [
        "Progressive overload",
        "Form analysis",
        "Recovery guidance",
        "Nutrition support"
      ],
      upcomingSession: "Tomorrow, 6:00 AM",
      totalSessions: 24,
      completedSessions: 15
    },
    {
      id: 2,
      title: "Endurance Building Program",
      category: "cardio",
      level: "Intermediate",
      duration: "6 weeks",
      sessionsPerWeek: 4,
      equipment: ["Treadmill", "Bike", "Rower"],
      progress: 40,
      coach: "Priya Patel",
      description: "Improve cardiovascular endurance and stamina",
      features: [
        "Heart rate monitoring",
        "Interval training",
        "Pacing strategies",
        "Recovery protocols"
      ],
      upcomingSession: "Today, 4:00 PM",
      totalSessions: 18,
      completedSessions: 7
    },
    {
      id: 3,
      title: "Flexibility & Mobility",
      category: "flexibility",
      level: "All Levels",
      duration: "4 weeks",
      sessionsPerWeek: 5,
      equipment: ["Mat", "Blocks", "Straps"],
      progress: 85,
      coach: "Maya Verma",
      description: "Increase range of motion and prevent injuries",
      features: [
        "Daily routines",
        "Active recovery",
        "Injury prevention",
        "Breathing techniques"
      ],
      upcomingSession: "Today, 7:00 AM",
      totalSessions: 20,
      completedSessions: 17
    },
    {
      id: 4,
      title: "Skill Development Mastery",
      category: "skill",
      level: "Advanced",
      duration: "12 weeks",
      sessionsPerWeek: 5,
      equipment: ["Sports specific", "Video analysis"],
      progress: 25,
      coach: "Arjun Singh",
      description: "Master advanced techniques and sports-specific skills",
      features: [
        "Video analysis",
        "Technical drills",
        "Game simulations",
        "Mental training"
      ],
      upcomingSession: "Monday, 10:00 AM",
      totalSessions: 48,
      completedSessions: 12
    },
    {
      id: 5,
      title: "Power & Explosiveness",
      category: "strength",
      level: "Advanced",
      duration: "6 weeks",
      sessionsPerWeek: 4,
      equipment: ["Olympic bars", "Platform", "Boxes"],
      progress: 50,
      coach: "Rajesh Sharma",
      description: "Develop explosive power and athletic performance",
      features: [
        "Plyometrics",
        "Olympic lifts",
        "Power development",
        "Speed work"
      ],
      upcomingSession: "Friday, 8:00 AM",
      totalSessions: 24,
      completedSessions: 12
    },
    {
      id: 6,
      title: "Recovery & Regeneration",
      category: "flexibility",
      level: "All Levels",
      duration: "Continuous",
      sessionsPerWeek: 7,
      equipment: ["Foam rollers", "Massage guns", "Ice baths"],
      progress: 90,
      coach: "Maya Verma",
      description: "Active recovery protocols for optimal performance",
      features: [
        "Daily mobility",
        "Recovery techniques",
        "Sleep optimization",
        "Stress management"
      ],
      upcomingSession: "Daily",
      totalSessions: "Ongoing",
      completedSessions: "Daily"
    }
  ];

  // Today's training sessions
  const todaysSessions = [
    {
      id: 1,
      program: "Strength Foundation",
      time: "06:00 AM - 08:00 AM",
      duration: "2 hours",
      coach: "Rajesh Sharma",
      location: "Main Gym",
      status: "completed",
      exercises: ["Squats", "Bench Press", "Rows"]
    },
    {
      id: 2,
      program: "Flexibility & Mobility",
      time: "07:00 AM - 08:00 AM",
      duration: "1 hour",
      coach: "Maya Verma",
      location: "Yoga Studio",
      status: "completed",
      exercises: ["Dynamic Stretching", "Yoga Flow", "Mobility Drills"]
    },
    {
      id: 3,
      program: "Endurance Building",
      time: "04:00 PM - 05:30 PM",
      duration: "1.5 hours",
      coach: "Priya Patel",
      location: "Track Field",
      status: "upcoming",
      exercises: ["Warm-up", "Interval Training", "Cool Down"]
    }
  ];

  // Training stats
  const stats = [
    { label: "Active Programs", value: "4", icon: Target, color: "#030859" },
    { label: "Weekly Sessions", value: "12", icon: Calendar, color: "#FBB102" },
    { label: "Training Hours", value: "15.5", icon: Clock, color: "#5FD4E2" },
    { label: "Progress Rate", value: "82%", icon: TrendingUp, color: "#030859" }
  ];

  const filteredPrograms = programs.filter(program => {
    const matchesType = filterType === "all" || program.category === filterType;
    const matchesSearch = searchQuery === "" || 
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getLevelColor = (level) => {
    switch(level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-blue-100 text-blue-800";
      case "Advanced": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case "strength": return { bg: "#030859", text: "text-white" };
      case "cardio": return { bg: "#5FD4E2", text: "text-[#030859]" };
      case "flexibility": return { bg: "#FBB102", text: "text-[#030859]" };
      case "skill": return { bg: "#DCE7C6", text: "text-[#030859]" };
      default: return { bg: "#030859", text: "text-white" };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#030859]/5 via-[#5FD4E2]/5 to-[#DCE7C6]/5" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#5FD4E208_1px,transparent_1px),linear-gradient(to_bottom,#5FD4E208_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#030859] to-[#5FD4E2] rounded-2xl flex items-center justify-center shadow-lg shadow-[#030859]/20">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#030859]">Training Programs</h1>
                  <p className="text-gray-600">Personalized training plans for optimal performance</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}20` }}>
                        <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#030859]">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2 bg-gray-100 rounded-xl p-1 max-w-2xl">
              {["programs", "sessions", "progress", "resources"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg text-sm font-medium capitalize transition-all ${
                    activeTab === tab
                      ? "bg-white text-[#030859] shadow-sm"
                      : "text-gray-600 hover:text-[#030859]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search training programs..."
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
                    onClick={() => setFilterType(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      filterType === category.id
                        ? "text-white shadow-md"
                        : "bg-white text-gray-600 hover:text-[#030859] border border-gray-300"
                    }`}
                    style={filterType === category.id ? { 
                      background: category.id === "all" ? "linear-gradient(to right, #030859, #5FD4E2)" :
                                category.id === "strength" ? "#030859" :
                                category.id === "cardio" ? "#5FD4E2" :
                                category.id === "flexibility" ? "#FBB102" :
                                category.id === "skill" ? "#DCE7C6" : "#030859"
                    } : {}}
                  >
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Programs Grid */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Programs Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPrograms.map((program, index) => {
                const categoryColor = getCategoryColor(program.category);
                
                return (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedProgram(program)}
                    className="group cursor-pointer bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {/* Program Header */}
                    <div 
                      className="h-2"
                      style={{ backgroundColor: categoryColor.bg }}
                    />
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span 
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{ 
                                backgroundColor: categoryColor.bg,
                                color: categoryColor.text.includes("white") ? "white" : "#030859"
                              }}
                            >
                              {program.category}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(program.level)}`}>
                              {program.level}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-[#030859] mb-2">{program.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#5FD4E2] transition-colors" />
                      </div>

                      {/* Program Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#030859]">{program.duration}</div>
                          <div className="text-xs text-gray-600">Duration</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#030859]">{program.sessionsPerWeek}</div>
                          <div className="text-xs text-gray-600">Sessions/Week</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-bold text-[#030859]">{program.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${program.progress}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: categoryColor.bg }}
                          />
                        </div>
                      </div>

                      {/* Quick Info */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#5FD4E2]" />
                          <span className="text-gray-600">{program.coach}</span>
                        </div>
                        <div className="text-[#030859] font-medium">
                          Next: {program.upcomingSession}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Training Resources */}
            <div className="bg-gradient-to-r from-[#030859]/10 to-[#5FD4E2]/10 rounded-2xl p-6 border border-[#5FD4E2]/30">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#030859] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#FBB102]" />
                  Training Resources
                </h3>
                <button className="text-sm text-[#030859] hover:text-[#5FD4E2] font-medium">
                  View All
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Nutrition Guide", type: "PDF", icon: BookOpen, color: "#030859" },
                  { title: "Form Checklist", type: "Checklist", icon: CheckCircle, color: "#5FD4E2" },
                  { title: "Video Tutorials", type: "Videos", icon: Video, color: "#FBB102" },
                  { title: "Recovery Protocols", type: "Guide", icon: Heart, color: "#030859" }
                ].map((resource, index) => (
                  <div key={index} className="bg-white/80 rounded-xl p-4 border border-gray-200 hover:border-[#5FD4E2] transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${resource.color}20` }}>
                        <resource.icon className="w-5 h-5" style={{ color: resource.color }} />
                      </div>
                      <div>
                        <div className="font-medium text-[#030859]">{resource.title}</div>
                        <div className="text-sm text-gray-600">{resource.type}</div>
                      </div>
                    </div>
                    <button className="w-full py-2 text-sm bg-[#DCE7C6] text-[#030859] rounded-lg font-medium hover:bg-[#DCE7C6]/80">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Today's Schedule & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Today's Training */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#030859] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#5FD4E2]" />
                  Today's Training
                </h3>
                <div className="text-sm px-3 py-1 bg-[#030859]/10 text-[#030859] rounded-full">
                  {todaysSessions.length} sessions
                </div>
              </div>
              
              <div className="space-y-4">
                {todaysSessions.map((session, index) => (
                  <div key={session.id} className="p-4 rounded-xl bg-gray-50 hover:bg-[#DCE7C6]/30 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-medium text-[#030859] mb-1">{session.program}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {session.time} • {session.duration}
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        session.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-[#FBB102]/20 text-[#FBB102]'
                      }`}>
                        {session.status}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <User className="w-3 h-3" />
                        Coach: {session.coach}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        {session.location}
                      </div>
                    </div>

                    {/* Exercises */}
                    <div className="mt-3">
                      <div className="text-xs text-gray-500 mb-1">Exercises:</div>
                      <div className="flex flex-wrap gap-1">
                        {session.exercises.map((exercise, i) => (
                          <span key={i} className="px-2 py-1 bg-white text-[#030859] rounded text-xs">
                            {exercise}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Start Training Button */}
              <button className="w-full mt-6 py-3 bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                <Play className="w-5 h-5" />
                Start Next Session
              </button>
            </div>

            {/* Training Progress */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xl font-bold text-[#030859] mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#FBB102]" />
                Training Progress
              </h3>
              
              <div className="space-y-4">
                {[
                  { label: "Strength Gain", value: "+15%", progress: 75, color: "#030859" },
                  { label: "Endurance", value: "+22%", progress: 82, color: "#5FD4E2" },
                  { label: "Flexibility", value: "+18%", progress: 65, color: "#FBB102" },
                  { label: "Skill Level", value: "+12%", progress: 48, color: "#DCE7C6" }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{item.label}</span>
                      <span className="font-bold text-[#030859]">{item.value}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${item.progress}%`,
                          backgroundColor: item.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xl font-bold text-[#030859] mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: "Add Custom Program", icon: Plus, color: "#030859" },
                  { label: "Track Progress", icon: BarChart, color: "#5FD4E2" },
                  { label: "Schedule Training", icon: Calendar, color: "#FBB102" },
                  { label: "Book Coach Session", icon: Users, color: "#030859" },
                  { label: "Download Reports", icon: Download, color: "#5FD4E2" },
                  { label: "Training Settings", icon: Settings, color: "#FBB102" }
                ].map((action, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <action.icon className="w-5 h-5" style={{ color: action.color }} />
                    <span className="text-gray-700">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-br from-[#030859]/10 to-[#FBB102]/10 rounded-2xl border border-[#FBB102]/30 p-6">
              <h3 className="text-xl font-bold text-[#030859] mb-4 flex items-center gap-2">
                <AwardIcon className="w-5 h-5 text-[#FBB102]" />
                Recent Achievements
              </h3>
              <div className="space-y-3">
                {[
                  { title: "Perfect Week", description: "7 days of complete training", icon: Trophy, color: "#FBB102" },
                  { title: "Strength Milestone", description: "New PR in Bench Press", icon: TrendingUp, color: "#030859" },
                  { title: "Consistency Award", description: "30 days streak", icon: Award, color: "#5FD4E2" }
                ].map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/80 rounded-lg">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${achievement.color}20` }}>
                      <achievement.icon className="w-5 h-5" style={{ color: achievement.color }} />
                    </div>
                    <div>
                      <div className="font-medium text-[#030859]">{achievement.title}</div>
                      <div className="text-sm text-gray-600">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Program Detail Modal */}
      {selectedProgram && (
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
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#030859] to-[#5FD4E2]">
                    <Dumbbell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#030859]">{selectedProgram.title}</h3>
                    <p className="text-gray-600">Coach: {selectedProgram.coach}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Program Overview */}
                    <div>
                      <h4 className="text-lg font-bold text-[#030859] mb-3">Program Overview</h4>
                      <p className="text-gray-700">{selectedProgram.description}</p>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-lg font-bold text-[#030859] mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {selectedProgram.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Equipment */}
                    <div>
                      <h4 className="text-lg font-bold text-[#030859] mb-3">Required Equipment</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProgram.equipment.map((item, index) => (
                          <span key={index} className="px-3 py-1 rounded-full bg-[#DCE7C6] text-[#030859]">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Program Stats */}
                    <div className="bg-gradient-to-br from-[#030859]/5 to-[#5FD4E2]/5 rounded-2xl p-6">
                      <h4 className="text-lg font-bold text-[#030859] mb-4">Program Details</h4>
                      <div className="space-y-4">
                        {[
                          { label: "Duration", value: selectedProgram.duration, icon: Clock },
                          { label: "Level", value: selectedProgram.level, icon: Target },
                          { label: "Sessions/Week", value: selectedProgram.sessionsPerWeek, icon: Calendar },
                          { label: "Progress", value: `${selectedProgram.progress}%`, icon: TrendingUp }
                        ].map((detail, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-white">
                                <detail.icon className="w-4 h-4 text-[#030859]" />
                              </div>
                              <span className="text-gray-600">{detail.label}</span>
                            </div>
                            <span className="font-bold text-[#030859]">{detail.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Progress */}
                    <div>
                      <h4 className="text-lg font-bold text-[#030859] mb-3">Your Progress</h4>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Sessions Completed</span>
                          <span className="font-bold text-[#030859]">
                            {selectedProgram.completedSessions} / {selectedProgram.totalSessions}
                          </span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-[#030859] to-[#5FD4E2]"
                            style={{ width: `${selectedProgram.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button className="w-full py-3 bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white rounded-xl font-medium">
                        Continue Training
                      </button>
                      <button className="w-full py-3 bg-white border border-[#030859] text-[#030859] rounded-xl font-medium">
                        View Schedule
                      </button>
                      <button className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium">
                        Share Program
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

export default Training;