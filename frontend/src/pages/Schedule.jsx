import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar, Clock, Target, Trophy, Users, MapPin,
  CheckCircle, AlertCircle, ChevronRight, ChevronLeft,
  Filter, Search, Plus, Edit2, Trash2, Share2,
  Download, Printer, Bell, Star, Award, Zap,
  TrendingUp, TrendingDown, Activity, Dumbbell,
  Heart, Brain, RefreshCw, Lock, Unlock, Eye,
  Video, MessageCircle, Phone, Mail, User,
  BarChart, PieChart, LineChart, Settings,
  ArrowRight, ArrowLeft, Maximize2, Minimize2
} from "lucide-react";

const Schedule = () => {
  const [viewMode, setViewMode] = useState("week"); // day, week, month
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSession, setSelectedSession] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Current week days
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Training sessions data
  const sessions = [
    {
      id: 1,
      title: "Morning Strength Training",
      type: "strength",
      coach: "Rajesh Sharma",
      date: "2024-12-15",
      time: "06:00 AM - 08:00 AM",
      duration: "2 hours",
      location: "Main Gym - Zone A",
      capacity: "12/15",
      status: "confirmed",
      priority: "high",
      description: "Focus on compound lifts and power development",
      equipment: ["Barbells", "Rack", "Plates", "Bench"],
      participants: ["You", "Arjun", "Priya", "Vikram"]
    },
    {
      id: 2,
      title: "Cardio & Endurance",
      type: "cardio",
      coach: "Priya Patel",
      date: "2024-12-15",
      time: "04:00 PM - 05:30 PM",
      duration: "1.5 hours",
      location: "Track Field",
      capacity: "8/10",
      status: "confirmed",
      priority: "medium",
      description: "Interval training and endurance building",
      equipment: ["Treadmills", "Bikes", "Rowers"],
      participants: ["You", "Maya", "Rohan"]
    },
    {
      id: 3,
      title: "Yoga & Mobility",
      type: "recovery",
      coach: "Maya Verma",
      date: "2024-12-16",
      time: "07:00 AM - 08:00 AM",
      duration: "1 hour",
      location: "Yoga Studio",
      capacity: "6/8",
      status: "upcoming",
      priority: "low",
      description: "Morning yoga for flexibility and mindfulness",
      equipment: ["Mats", "Blocks", "Straps"],
      participants: ["You", "Ananya", "Sneha"]
    },
    {
      id: 4,
      title: "Skill Development Workshop",
      type: "technical",
      coach: "Arjun Singh",
      date: "2024-12-17",
      time: "10:00 AM - 12:00 PM",
      duration: "2 hours",
      location: "Sports Hall",
      capacity: "5/10",
      status: "pending",
      priority: "high",
      description: "Advanced techniques and skill refinement",
      equipment: ["Cones", "Balls", "Nets"],
      participants: ["You", "Rohan", "Vikram"]
    },
    {
      id: 5,
      title: "Sports Psychology Session",
      type: "mental",
      coach: "Sneha Kapoor",
      date: "2024-12-18",
      time: "03:00 PM - 04:00 PM",
      duration: "1 hour",
      location: "Conference Room B",
      capacity: "4/6",
      status: "confirmed",
      priority: "medium",
      description: "Mental training and performance psychology",
      equipment: [],
      participants: ["You", "Arjun"]
    },
    {
      id: 6,
      title: "Nutrition Planning",
      type: "nutrition",
      coach: "Maya Verma",
      date: "2024-12-19",
      time: "11:00 AM - 12:00 PM",
      duration: "1 hour",
      location: "Nutrition Center",
      capacity: "3/5",
      status: "confirmed",
      priority: "medium",
      description: "Personalized meal planning and consultation",
      equipment: [],
      participants: ["You"]
    },
    {
      id: 7,
      title: "Team Building",
      type: "team",
      coach: "Vikram Joshi",
      date: "2024-12-20",
      time: "09:00 AM - 11:00 AM",
      duration: "2 hours",
      location: "Outdoor Field",
      capacity: "12/15",
      status: "upcoming",
      priority: "high",
      description: "Team sports and collaborative exercises",
      equipment: ["Various sports equipment"],
      participants: ["You", "Team Alpha"]
    },
    {
      id: 8,
      title: "Recovery Session",
      type: "recovery",
      coach: "Maya Verma",
      date: "2024-12-21",
      time: "05:00 PM - 06:00 PM",
      duration: "1 hour",
      location: "Recovery Center",
      capacity: "4/6",
      status: "pending",
      priority: "low",
      description: "Active recovery and injury prevention",
      equipment: ["Foam rollers", "Massage guns", "Ice baths"],
      participants: ["You", "Priya"]
    }
  ];

  // Get current week
  const getCurrentWeek = () => {
    const current = new Date(selectedDate);
    const week = [];
    current.setDate(current.getDate() - current.getDay()); // Start from Sunday
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(current);
      week.push(day);
      current.setDate(current.getDate() + 1);
    }
    
    return week;
  };

  const currentWeek = getCurrentWeek();

  const sessionTypes = [
    { id: "all", label: "All Sessions", color: "bg-[#030859]", count: sessions.length },
    { id: "strength", label: "Strength", color: "bg-[#030859]", count: 2 },
    { id: "cardio", label: "Cardio", color: "bg-[#5FD4E2]", count: 1 },
    { id: "recovery", label: "Recovery", color: "bg-[#FBB102]", count: 2 },
    { id: "technical", label: "Technical", color: "bg-[#030859]", count: 1 },
    { id: "mental", label: "Mental", color: "bg-[#5FD4E2]", count: 1 },
    { id: "nutrition", label: "Nutrition", color: "bg-[#DCE7C6]", count: 1 },
    { id: "team", label: "Team", color: "bg-[#FBB102]", count: 1 }
  ];

  const getSessionColor = (type) => {
    switch(type) {
      case "strength": return "bg-gradient-to-r from-[#030859] to-[#030859]/80";
      case "cardio": return "bg-gradient-to-r from-[#5FD4E2] to-[#5FD4E2]/80";
      case "recovery": return "bg-gradient-to-r from-[#FBB102] to-[#FBB102]/80";
      case "technical": return "bg-gradient-to-r from-[#030859] to-[#030859]/80";
      case "mental": return "bg-gradient-to-r from-[#5FD4E2] to-[#5FD4E2]/80";
      case "nutrition": return "bg-gradient-to-r from-[#DCE7C6] to-[#DCE7C6]/80";
      case "team": return "bg-gradient-to-r from-[#FBB102] to-[#FBB102]/80";
      default: return "bg-gradient-to-r from-[#030859] to-[#5FD4E2]";
    }
  };

  const filteredSessions = sessions.filter(session => {
    const matchesType = filterType === "all" || session.type === filterType;
    const matchesSearch = searchQuery === "" || 
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.coach.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // For week view, show sessions for the current week
    if (viewMode === "week") {
      const sessionDate = new Date(session.date);
      const weekStart = new Date(currentWeek[0]);
      const weekEnd = new Date(currentWeek[6]);
      weekEnd.setHours(23, 59, 59, 999);
      
      const inCurrentWeek = sessionDate >= weekStart && sessionDate <= weekEnd;
      return matchesType && matchesSearch && inCurrentWeek;
    }
    
    return matchesType && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case "confirmed": return { color: "bg-green-100 text-green-800", icon: CheckCircle };
      case "pending": return { color: "bg-yellow-100 text-yellow-800", icon: AlertCircle };
      case "upcoming": return { color: "bg-blue-100 text-blue-800", icon: Clock };
      default: return { color: "bg-gray-100 text-gray-800", icon: Clock };
    }
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case "high": return { color: "bg-red-100 text-red-800", label: "High Priority" };
      case "medium": return { color: "bg-yellow-100 text-yellow-800", label: "Medium Priority" };
      case "low": return { color: "bg-green-100 text-green-800", label: "Low Priority" };
      default: return { color: "bg-gray-100 text-gray-800", label: "Normal" };
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
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#030859] to-[#5FD4E2] rounded-2xl flex items-center justify-center shadow-lg shadow-[#030859]/20">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#030859]">Training Schedule</h1>
                  <p className="text-gray-600">Plan and manage your training sessions</p>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
            >
              {[
                { label: "This Week", value: "8", icon: Calendar, color: "#030859" },
                { label: "Confirmed", value: "5", icon: CheckCircle, color: "#5FD4E2" },
                { label: "Hours", value: "12.5", icon: Clock, color: "#FBB102" },
                { label: "Coaches", value: "6", icon: Users, color: "#030859" }
              ].map((stat, index) => (
                <div key={index} className="p-3 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${stat.color}10` }}>
                      <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#030859]">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Controls Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Date Navigation */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newDate = new Date(selectedDate);
                      newDate.setDate(newDate.getDate() - 7);
                      setSelectedDate(newDate);
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#030859]" />
                  </button>
                  <div className="text-center">
                    <div className="font-bold text-lg text-[#030859]">
                      {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                    </div>
                    <div className="text-sm text-gray-600">Week {Math.ceil(selectedDate.getDate() / 7)}</div>
                  </div>
                  <button
                    onClick={() => {
                      const newDate = new Date(selectedDate);
                      newDate.setDate(newDate.getDate() + 7);
                      setSelectedDate(newDate);
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <ChevronRight className="w-5 h-5 text-[#030859]" />
                  </button>
                </div>

                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {["week", "day", "month"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                        viewMode === mode
                          ? "bg-white text-[#030859] shadow-sm"
                          : "text-gray-600 hover:text-[#030859]"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedDate(new Date())}
                  className="px-4 py-2 text-sm bg-[#DCE7C6] text-[#030859] rounded-lg font-medium hover:bg-[#DCE7C6]/80"
                >
                  Today
                </button>
              </div>

              {/* Search & Actions */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search sessions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#030859] focus:ring-1 focus:ring-[#030859]/30"
                  />
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white rounded-lg font-medium flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Session
                </button>
              </div>
            </div>
          </motion.div>

          {/* Session Type Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <div className="flex flex-wrap gap-2">
              {sessionTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFilterType(type.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filterType === type.id
                      ? "text-white shadow-md"
                      : "bg-white text-gray-600 hover:text-[#030859] border border-gray-300"
                  }`}
                  style={filterType === type.id ? { 
                    background: type.id === "all" ? "linear-gradient(to right, #030859, #5FD4E2)" :
                              type.id === "strength" ? "#030859" :
                              type.id === "cardio" ? "#5FD4E2" :
                              type.id === "recovery" ? "#FBB102" :
                              type.id === "technical" ? "#030859" :
                              type.id === "mental" ? "#5FD4E2" :
                              type.id === "nutrition" ? "#DCE7C6" : "#FBB102"
                  } : {}}
                >
                  <div className={`w-2 h-2 rounded-full ${type.color}`} />
                  {type.label}
                  <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs bg-white/30">
                    {type.count}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar/Week View */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Week Header */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-7 border-b border-gray-200">
                {weekDays.map((day, index) => {
                  const dayDate = currentWeek[index];
                  const isToday = dayDate.toDateString() === new Date().toDateString();
                  
                  return (
                    <div
                      key={day}
                      className={`p-4 text-center ${
                        isToday ? "bg-[#030859]/10" : ""
                      }`}
                    >
                      <div className="text-sm text-gray-600 mb-1">{day}</div>
                      <div className={`text-lg font-bold ${
                        isToday ? "text-[#030859]" : "text-gray-900"
                      }`}>
                        {dayDate.getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sessions Timeline */}
              <div className="p-4">
                {filteredSessions.length > 0 ? (
                  <div className="space-y-4">
                    {filteredSessions.map((session) => {
                      const sessionDate = new Date(session.date);
                      const dayIndex = sessionDate.getDay();
                      const StatusIcon = getStatusBadge(session.status).icon;
                      
                      return (
                        <motion.div
                          key={session.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          whileHover={{ x: 5 }}
                          onClick={() => setSelectedSession(session)}
                          className="cursor-pointer bg-white rounded-xl border border-gray-200 p-4 hover:border-[#5FD4E2] hover:shadow-md transition-all"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                              <div 
                                className="w-3 h-3 rounded-full mt-1.5"
                                style={{ 
                                  backgroundColor: session.type === "strength" ? "#030859" :
                                                 session.type === "cardio" ? "#5FD4E2" :
                                                 session.type === "recovery" ? "#FBB102" :
                                                 session.type === "technical" ? "#030859" :
                                                 session.type === "mental" ? "#5FD4E2" :
                                                 session.type === "nutrition" ? "#DCE7C6" : "#FBB102"
                                }}
                              />
                              <div>
                                <h3 className="font-bold text-[#030859] mb-1">{session.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {session.time}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {session.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {session.coach}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(session.status).color}`}>
                                <StatusIcon className="w-3 h-3 inline mr-1" />
                                {session.status}
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`px-2 py-1 rounded text-xs ${getPriorityBadge(session.priority).color}`}>
                                {getPriorityBadge(session.priority).label}
                              </div>
                              <div className="text-sm text-gray-600">
                                <Users className="w-3 h-3 inline mr-1" />
                                {session.capacity}
                              </div>
                            </div>
                            <div className="text-sm text-[#030859] font-medium">
                              {session.duration}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
                    <p className="text-gray-600 mb-4">Try changing your filters or adding new sessions</p>
                    <button className="px-4 py-2 bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white rounded-lg font-medium">
                      <Plus className="w-4 h-4 inline mr-2" />
                      Add Session
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Upcoming Highlights */}
            <div className="bg-gradient-to-r from-[#030859]/10 to-[#5FD4E2]/10 rounded-xl p-6 border border-[#5FD4E2]/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#030859] flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#FBB102]" />
                  Upcoming Highlights
                </h3>
                <button className="text-sm text-[#030859] hover:text-[#5FD4E2] font-medium">
                  View All
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Weekend Marathon Prep", date: "Dec 16", type: "cardio", icon: TrendingUp },
                  { title: "Strength Assessment", date: "Dec 18", type: "strength", icon: Trophy },
                  { title: "Team Competition", date: "Dec 20", type: "team", icon: Users },
                  { title: "Nutrition Workshop", date: "Dec 22", type: "nutrition", icon: Heart }
                ].map((highlight, index) => (
                  <div key={index} className="bg-white/80 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#030859]">{highlight.title}</span>
                      <span className="text-xs px-2 py-1 bg-[#DCE7C6] text-[#030859] rounded-full">
                        {highlight.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <highlight.icon className="w-4 h-4 text-[#5FD4E2]" />
                      <span className="text-sm text-gray-600">{highlight.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Today's Schedule */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-[#030859] mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#5FD4E2]" />
                Today's Schedule
              </h3>
              <div className="space-y-4">
                {sessions
                  .filter(s => new Date(s.date).toDateString() === new Date().toDateString())
                  .slice(0, 3)
                  .map((session, index) => (
                    <div key={index} className="p-3 rounded-lg bg-gray-50 hover:bg-[#DCE7C6]/30 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-[#030859] truncate">{session.title}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-white text-[#030859]">
                          {session.time.split(" - ")[0]}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <User className="w-3 h-3" />
                        {session.coach}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-[#030859] mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: "Add to Calendar", icon: Calendar, color: "#030859" },
                  { label: "Set Reminder", icon: Bell, color: "#FBB102" },
                  { label: "Share Schedule", icon: Share2, color: "#5FD4E2" },
                  { label: "Download PDF", icon: Download, color: "#030859" },
                  { label: "Print Schedule", icon: Printer, color: "#5FD4E2" },
                  { label: "Settings", icon: Settings, color: "#FBB102" }
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

            {/* Stats */}
            <div className="bg-gradient-to-br from-[#030859]/10 to-[#5FD4E2]/10 rounded-xl border border-[#5FD4E2]/30 p-6">
              <h3 className="text-lg font-bold text-[#030859] mb-4">This Week Stats</h3>
              <div className="space-y-4">
                {[
                  { label: "Training Hours", value: "12.5", progress: 75, color: "#030859" },
                  { label: "Sessions Completed", value: "5/8", progress: 62, color: "#5FD4E2" },
                  { label: "Calories Burned", value: "8,400", progress: 85, color: "#FBB102" },
                  { label: "Attendance Rate", value: "94%", progress: 94, color: "#030859" }
                ].map((stat, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{stat.label}</span>
                      <span className="font-bold text-[#030859]">{stat.value}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${stat.progress}%`,
                          backgroundColor: stat.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Session Detail Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              {/* Header */}
              <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex items-center justify-between rounded-t-3xl">
                <div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${getStatusBadge(selectedSession.status).color}`}>
                    {selectedSession.status}
                  </div>
                  <h3 className="text-2xl font-bold text-[#030859]">{selectedSession.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedSession(null)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-1">Time & Date</h4>
                      <div className="flex items-center gap-2 text-[#030859]">
                        <Clock className="w-4 h-4" />
                        {selectedSession.time} • {selectedSession.date}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-1">Location</h4>
                      <div className="flex items-center gap-2 text-[#030859]">
                        <MapPin className="w-4 h-4" />
                        {selectedSession.location}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-1">Coach</h4>
                      <div className="flex items-center gap-2 text-[#030859]">
                        <User className="w-4 h-4" />
                        {selectedSession.coach}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-1">Duration</h4>
                      <div className="text-[#030859] font-medium">{selectedSession.duration}</div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-1">Capacity</h4>
                      <div className="text-[#030859] font-medium">{selectedSession.capacity}</div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-1">Priority</h4>
                      <div className={`inline-block px-3 py-1 rounded text-sm ${getPriorityBadge(selectedSession.priority).color}`}>
                        {getPriorityBadge(selectedSession.priority).label}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-[#030859] mb-2">Description</h4>
                  <p className="text-gray-700">{selectedSession.description}</p>
                </div>

                {/* Equipment */}
                {selectedSession.equipment.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-[#030859] mb-2">Equipment Needed</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSession.equipment.map((item, index) => (
                        <span key={index} className="px-3 py-1 rounded-full bg-[#DCE7C6] text-[#030859]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Participants */}
                {selectedSession.participants.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-[#030859] mb-2">Participants</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSession.participants.map((participant, index) => (
                        <span key={index} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                          {participant}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white rounded-xl font-medium">
                    Join Session
                  </button>
                  <button className="flex-1 py-3 bg-white border border-[#030859] text-[#030859] rounded-xl font-medium">
                    Reschedule
                  </button>
                  <button className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Schedule;