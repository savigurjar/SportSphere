import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy, Award, Medal, Star, Target, TrendingUp,
  Users, Calendar, Clock, Share2, Download, Printer,
  Filter, Search, Plus, ChevronRight, ChevronLeft,
  Zap, Flame, Crown, Shield, Heart, Gem,
  BarChart, PieChart, LineChart, TrendingDown,
  Eye, Bookmark, MessageCircle, MapPin, Users as UsersIcon,
  CheckCircle, AlertCircle, Info, X, ArrowRight,
  Settings, Bell, RefreshCw, Maximize2, Minimize2,
  Award as AwardIcon, Target as TargetIcon, Trophy as TrophyIcon
} from "lucide-react";

const Achievements = () => {
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Categories
  const categories = [
    { id: "all", label: "All Achievements", count: 48, icon: Trophy },
    { id: "competition", label: "Competition", count: 18, icon: Medal },
    { id: "performance", label: "Performance", count: 15, icon: TrendingUp },
    { id: "academic", label: "Academic", count: 8, icon: Award },
    { id: "team", label: "Team", count: 7, icon: Users }
  ];

  // Achievement types with colors
  const achievementTypes = {
    competition: { color: "#FBB102", bgColor: "#FBB10220", icon: Trophy },
    performance: { color: "#5FD4E2", bgColor: "#5FD4E220", icon: TrendingUp },
    academic: { color: "#030859", bgColor: "#03085920", icon: Award },
    team: { color: "#DCE7C6", bgColor: "#DCE7C650", icon: Users }
  };

  // Achievements data
  const achievements = [
    {
      id: 1,
      title: "National Sports Championship 2024",
      category: "competition",
      type: "Gold Medal",
      athlete: "Rajesh Kumar",
      sport: "Athletics - 100m Sprint",
      date: "Dec 15, 2024",
      location: "New Delhi",
      description: "Gold medal in 100m sprint with a record time of 10.45 seconds",
      image: "https://images.unsplash.com/photo-1552674605-db6ffd8facb5?w=800&h=600&fit=crop&q=80",
      stats: {
        participants: 120,
        ranking: "1st",
        improvement: "0.8s faster than PB"
      },
      featured: true
    },
    {
      id: 2,
      title: "Academic Excellence Award",
      category: "academic",
      type: "Scholar Award",
      athlete: "Priya Sharma",
      sport: "All Sports",
      date: "Nov 30, 2024",
      location: "HSA Campus",
      description: "Maintained 95% academic score while training 6 hours daily",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop&q=80",
      stats: {
        gpa: "4.0",
        attendance: "98%",
        courses: "12"
      },
      featured: true
    },
    {
      id: 3,
      title: "State Level Basketball Tournament",
      category: "team",
      type: "Championship",
      athlete: "Team HSA",
      sport: "Basketball",
      date: "Dec 10, 2024",
      location: "Shimla",
      description: "Won state championship with undefeated record throughout tournament",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop&q=80",
      stats: {
        games: "8",
        wins: "8",
        avgScore: "85-62"
      },
      featured: false
    },
    {
      id: 4,
      title: "New National Record - Swimming",
      category: "performance",
      type: "National Record",
      athlete: "Vikram Singh",
      sport: "Swimming - 200m Freestyle",
      date: "Dec 5, 2024",
      location: "Mumbai",
      description: "Set new national record of 1:58.45 in 200m freestyle",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
      stats: {
        previousRecord: "2:01.30",
        improvement: "2.85s",
        age: "17"
      },
      featured: false
    },
    {
      id: 5,
      title: "Perfect Attendance - 6 Months",
      category: "performance",
      type: "Consistency Award",
      athlete: "Ananya Patel",
      sport: "All Sports",
      date: "Dec 1, 2024",
      location: "HSA Campus",
      description: "180 consecutive days of training without missing a single session",
      image: "https://images.unsplash.com/photo-1549476464-37392f717541?w=800&h=600&fit=crop&q=80",
      stats: {
        days: "180",
        sessions: "360",
        hours: "720"
      },
      featured: true
    },
    {
      id: 6,
      title: "International Junior Tournament",
      category: "competition",
      type: "Silver Medal",
      athlete: "Arjun Mehta",
      sport: "Badminton",
      date: "Nov 25, 2024",
      location: "Singapore",
      description: "Silver medal in under-19 international badminton tournament",
      image: "https://images.unsplash.com/photo-1516047903-2e8be5c9f610?w=800&h=600&fit=crop&q=80",
      stats: {
        countries: "24",
        ranking: "2nd",
        matches: "18"
      },
      featured: false
    },
    {
      id: 7,
      title: "Sportsmanship Award",
      category: "team",
      type: "Fair Play",
      athlete: "Maya Verma",
      sport: "Football",
      date: "Nov 20, 2024",
      location: "Chandigarh",
      description: "Recognized for exceptional sportsmanship and team spirit",
      image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&h=600&fit=crop&q=80",
      stats: {
        assists: "15",
        teamSupport: "98%",
        leadership: "9.5/10"
      },
      featured: false
    },
    {
      id: 8,
      title: "Strength Milestone - 2x Bodyweight",
      category: "performance",
      type: "Strength Award",
      athlete: "Rohan Das",
      sport: "Weightlifting",
      date: "Nov 15, 2024",
      location: "HSA Gym",
      description: "Squatted 2x bodyweight (160kg) at 80kg bodyweight",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop&q=80",
      stats: {
        bodyweight: "80kg",
        lift: "160kg",
        ratio: "2.0x"
      },
      featured: true
    }
  ];

  // Stats overview
  const stats = [
    { label: "Total Achievements", value: "48", icon: Trophy, color: "#030859" },
    { label: "Gold Medals", value: "18", icon: Medal, color: "#FBB102" },
    { label: "National Records", value: "7", icon: TrendingUp, color: "#5FD4E2" },
    { label: "Active Streaks", value: "12", icon: Flame, color: "#030859" }
  ];

  // Leaderboard
  const leaderboard = [
    { rank: 1, name: "Rajesh Kumar", achievements: 15, sports: ["Athletics", "Weightlifting"] },
    { rank: 2, name: "Priya Sharma", achievements: 12, sports: ["Swimming", "Academics"] },
    { rank: 3, name: "Arjun Mehta", achievements: 10, sports: ["Badminton", "Table Tennis"] },
    { rank: 4, name: "Maya Verma", achievements: 9, sports: ["Football", "Basketball"] },
    { rank: 5, name: "Vikram Singh", achievements: 8, sports: ["Swimming", "Athletics"] }
  ];

  const filteredAchievements = achievements.filter(achievement => {
    const matchesCategory = filterCategory === "all" || achievement.category === filterCategory;
    const matchesSearch = searchQuery === "" || 
      achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.athlete.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.sport.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredAchievements = achievements.filter(a => a.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#030859]/5 via-[#5FD4E2]/5 to-[#DCE7C6]/5" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#5FD4E208_1px,transparent_1px),linear-gradient(to_bottom,#5FD4E208_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FBB102] to-[#FBB102]/80 rounded-2xl flex items-center justify-center shadow-lg shadow-[#FBB102]/20">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-[#FBB102] via-[#5FD4E2] to-[#FBB102] bg-clip-text text-transparent">
                    Achievements Hall
                  </span>
                </h1>
                <p className="text-lg text-gray-600">Celebrating excellence and remarkable accomplishments</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm"
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
                    placeholder="Search achievements by title, athlete, or sport..."
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
                    onClick={() => setFilterCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      filterCategory === category.id
                        ? "text-white shadow-md"
                        : "bg-white text-gray-600 hover:text-[#030859] border border-gray-300"
                    }`}
                    style={filterCategory === category.id ? { 
                      background: category.id === "all" ? "linear-gradient(to right, #030859, #5FD4E2)" :
                                category.id === "competition" ? "#FBB102" :
                                category.id === "performance" ? "#5FD4E2" :
                                category.id === "academic" ? "#030859" :
                                category.id === "team" ? "#DCE7C6" : "#030859"
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Featured Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Featured Achievements */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#030859] flex items-center gap-2">
                <Star className="w-6 h-6 text-[#FBB102]" />
                Featured Achievements
              </h2>
              
              {featuredAchievements.map((achievement, index) => {
                const typeConfig = achievementTypes[achievement.category];
                
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    onClick={() => setSelectedAchievement(achievement)}
                    className="group cursor-pointer bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="md:w-1/3 relative">
                        <img
                          src={achievement.image}
                          alt={achievement.title}
                          className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                        
                        {/* Achievement Type */}
                        <div className="absolute top-4 left-4">
                          <div 
                            className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                            style={{ 
                              backgroundColor: typeConfig.bgColor,
                              color: typeConfig.color
                            }}
                          >
                            <typeConfig.icon className="w-3 h-3" />
                            {achievement.type}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-[#030859] mb-2">{achievement.title}</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                              <span className="flex items-center gap-1">
                                <UsersIcon className="w-4 h-4" />
                                {achievement.athlete}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {achievement.date}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#5FD4E2] transition-colors" />
                        </div>

                        <p className="text-gray-600 mb-4">{achievement.description}</p>

                        {/* Quick Stats */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-[#030859]">
                                {Object.values(achievement.stats)[0]}
                              </div>
                              <div className="text-xs text-gray-500">
                                {Object.keys(achievement.stats)[0]}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-[#030859]">
                                {Object.values(achievement.stats)[1]}
                              </div>
                              <div className="text-xs text-gray-500">
                                {Object.keys(achievement.stats)[1]}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm font-medium" style={{ color: typeConfig.color }}>
                            {achievement.sport}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* All Achievements Grid */}
            <div>
              <h2 className="text-2xl font-bold text-[#030859] mb-6">All Achievements</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {filteredAchievements.map((achievement, index) => {
                  const typeConfig = achievementTypes[achievement.category];
                  
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedAchievement(achievement)}
                      className="group cursor-pointer bg-white rounded-xl border border-gray-200 p-4 hover:border-[#5FD4E2] hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: typeConfig.bgColor }}
                        >
                          <typeConfig.icon className="w-5 h-5" style={{ color: typeConfig.color }} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-[#030859] mb-1">{achievement.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>{achievement.athlete}</span>
                            <span>•</span>
                            <span>{achievement.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{achievement.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div 
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{ 
                            backgroundColor: typeConfig.bgColor,
                            color: typeConfig.color
                          }}
                        >
                          {achievement.type}
                        </div>
                        <div className="text-sm text-[#5FD4E2] font-medium">
                          View Details →
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Leaderboard & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Leaderboard */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#030859] flex items-center gap-2">
                  <Crown className="w-5 h-5 text-[#FBB102]" />
                  Top Achievers
                </h3>
                <button className="text-sm text-[#030859] hover:text-[#5FD4E2] font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {leaderboard.map((athlete, index) => (
                  <div key={athlete.rank} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      athlete.rank === 1 ? "bg-gradient-to-r from-[#FBB102] to-[#FBB102]/80" :
                      athlete.rank === 2 ? "bg-gradient-to-r from-[#5FD4E2] to-[#5FD4E2]/80" :
                      athlete.rank === 3 ? "bg-gradient-to-r from-[#030859] to-[#030859]/80" :
                      "bg-gray-200 text-gray-600"
                    }`}>
                      {athlete.rank}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-[#030859]">{athlete.name}</div>
                      <div className="text-xs text-gray-600 flex items-center gap-1">
                        {athlete.achievements} achievements
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#030859]">{athlete.achievements}</div>
                      <div className="text-xs text-gray-600">Total</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievement Stats */}
            <div className="bg-gradient-to-br from-[#030859]/10 to-[#5FD4E2]/10 rounded-2xl border border-[#5FD4E2]/30 p-6">
              <h3 className="text-xl font-bold text-[#030859] mb-4">Achievement Stats</h3>
              
              <div className="space-y-4">
                {[
                  { label: "Monthly Achievements", value: "18", progress: 90, color: "#030859" },
                  { label: "Goal Completion", value: "85%", progress: 85, color: "#5FD4E2" },
                  { label: "Team Awards", value: "24", progress: 80, color: "#FBB102" },
                  { label: "Personal Bests", value: "32", progress: 75, color: "#DCE7C6" }
                ].map((stat, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{stat.label}</span>
                      <span className="font-bold text-[#030859]">{stat.value}</span>
                    </div>
                    <div className="h-2 bg-white/50 rounded-full overflow-hidden">
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

            {/* Recent Milestones */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xl font-bold text-[#030859] mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#FBB102]" />
                Recent Milestones
              </h3>
              
              <div className="space-y-3">
                {[
                  { title: "First Gold at Nationals", athlete: "New Achiever", date: "2 days ago" },
                  { title: "100th Training Session", athlete: "Consistency Award", date: "1 week ago" },
                  { title: "Team Tournament Win", athlete: "Basketball Team", date: "2 weeks ago" },
                  { title: "Academic Distinction", athlete: "3 Students", date: "3 weeks ago" }
                ].map((milestone, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <div className="p-2 rounded-lg bg-[#030859]/10">
                      <Star className="w-4 h-4 text-[#030859]" />
                    </div>
                    <div>
                      <div className="font-medium text-[#030859]">{milestone.title}</div>
                      <div className="text-sm text-gray-600">
                        {milestone.athlete} • {milestone.date}
                      </div>
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
                  { label: "Report Achievement", icon: Plus, color: "#030859" },
                  { label: "Download Certificates", icon: Download, color: "#5FD4E2" },
                  { label: "Share Wall of Fame", icon: Share2, color: "#FBB102" },
                  { label: "Set New Goals", icon: Target, color: "#030859" },
                  { label: "View Calendar", icon: Calendar, color: "#5FD4E2" },
                  { label: "Achievement Settings", icon: Settings, color: "#FBB102" }
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
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-8 rounded-3xl relative overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FBB102]/10 via-[#5FD4E2]/10 to-[#DCE7C6]/20" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#5FD4E210_1px,transparent_1px),linear-gradient(to_bottom,#5FD4E210_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#030859] to-[#5FD4E2]">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#030859] mb-2">Submit Your Achievement</h3>
                <p className="text-gray-600">Got an achievement to share? Add it to our hall of fame!</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Submit Achievement
              </motion.button>
              <button className="px-8 py-3 rounded-xl bg-white/80 backdrop-blur-sm text-[#030859] font-semibold border border-[#030859]/20 hover:border-[#030859]/40 transition-colors">
                <Download className="w-5 h-5 inline mr-2" />
                Download Certificates
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              {/* Header */}
              <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex items-center justify-between rounded-t-3xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#FBB102] to-[#FBB102]/80">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#030859]">{selectedAchievement.title}</h3>
                    <div className="text-gray-600">
                      {selectedAchievement.athlete} • {selectedAchievement.date}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAchievement(null)}
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
                    {/* Image */}
                    <div className="rounded-xl overflow-hidden">
                      <img
                        src={selectedAchievement.image}
                        alt={selectedAchievement.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="text-lg font-bold text-[#030859] mb-3">Description</h4>
                      <p className="text-gray-700">{selectedAchievement.description}</p>
                    </div>

                    {/* Details */}
                    <div>
                      <h4 className="text-lg font-bold text-[#030859] mb-3">Details</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-[#5FD4E2]" />
                          <span className="text-gray-700">{selectedAchievement.location}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-[#5FD4E2]" />
                          <span className="text-gray-700">{selectedAchievement.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <UsersIcon className="w-4 h-4 text-[#5FD4E2]" />
                          <span className="text-gray-700">{selectedAchievement.athlete}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Stats */}
                    <div className="bg-gradient-to-br from-[#030859]/5 to-[#5FD4E2]/5 rounded-2xl p-6">
                      <h4 className="text-lg font-bold text-[#030859] mb-4">Achievement Stats</h4>
                      <div className="space-y-4">
                        {Object.entries(selectedAchievement.stats).map(([key, value], index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="font-bold text-[#030859]">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Type */}
                    <div className="p-4 rounded-xl bg-gray-50">
                      <h4 className="text-lg font-bold text-[#030859] mb-2">Achievement Type</h4>
                      <div className="flex items-center gap-2">
                        <div 
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{ 
                            backgroundColor: achievementTypes[selectedAchievement.category].bgColor,
                            color: achievementTypes[selectedAchievement.category].color
                          }}
                        >
                          {selectedAchievement.type}
                        </div>
                        <div className="text-sm text-gray-600">
                          • {selectedAchievement.category}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button className="w-full py-3 bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white rounded-xl font-medium">
                        Download Certificate
                      </button>
                      <button className="w-full py-3 bg-white border border-[#030859] text-[#030859] rounded-xl font-medium">
                        Share Achievement
                      </button>
                      <button className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium">
                        View More Photos
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

export default Achievements;