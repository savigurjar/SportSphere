import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Award, Target, TrendingUp, Star, Clock,
  MessageCircle, Phone, Mail, MapPin, Filter, Search,
  ChevronRight, Trophy, Heart, Share2, Bookmark,
  Instagram, Twitter, Facebook, Linkedin, Play,
  Calendar, Shield, CheckCircle, Zap, Award as AwardIcon
} from "lucide-react";

const Coaches = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Coach categories
  const categories = [
    { id: "all", label: "All Coaches", count: 12 },
    { id: "strength", label: "Strength", count: 4 },
    { id: "endurance", label: "Endurance", count: 3 },
    { id: "technical", label: "Technical", count: 3 },
    { id: "recovery", label: "Recovery", count: 2 },
  ];

  // Coaches data with demo images
  const coaches = [
    {
      id: 1,
      name: "Rajesh Sharma",
      title: "Head Strength Coach",
      specialization: ["Strength Training", "Power Development"],
      experience: "15+ years",
      athletesTrained: 250,
      successRate: "94%",
      bio: "Former national weightlifting champion with expertise in Olympic weightlifting and power training.",
      image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop&q=80",
      featured: true,
      achievements: ["National Coach Award 2023", "5x Best Coach Award"],
      availability: "Mon-Sat: 6 AM - 8 PM",
      social: {
        instagram: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      id: 2,
      name: "Priya Patel",
      title: "Endurance Specialist",
      specialization: ["Marathon Training", "Cardio Optimization"],
      experience: "12+ years",
      athletesTrained: 180,
      successRate: "92%",
      bio: "Sports scientist specializing in endurance training and altitude adaptation techniques.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&q=80",
      featured: true,
      achievements: ["Sports Science Excellence Award", "3x National Champion Coach"],
      availability: "Tue-Sun: 5 AM - 7 PM",
      social: {
        instagram: "#",
        linkedin: "#"
      }
    },
    {
      id: 3,
      name: "Arjun Singh",
      title: "Technical Skills Coach",
      specialization: ["Sports Technique", "Skill Development"],
      experience: "18+ years",
      athletesTrained: 320,
      successRate: "96%",
      bio: "Former international athlete with focus on technical skill development and biomechanics.",
      image: "https://images.unsplash.com/photo-1541534741688-6073d6a7ca9a?w=400&h=400&fit=crop&q=80",
      featured: false,
      achievements: ["International Coach of the Year", "8x National Team Coach"],
      availability: "Mon-Fri: 7 AM - 9 PM",
      social: {
        instagram: "#",
        twitter: "#",
        facebook: "#"
      }
    },
    {
      id: 4,
      name: "Maya Verma",
      title: "Recovery & Nutrition Expert",
      specialization: ["Sports Nutrition", "Recovery Protocols"],
      experience: "10+ years",
      athletesTrained: 150,
      successRate: "91%",
      bio: "Certified sports nutritionist and recovery specialist with focus on holistic athlete development.",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop&q=80",
      featured: false,
      achievements: ["Nutrition Excellence Award", "Recovery Specialist Certification"],
      availability: "Wed-Sun: 8 AM - 6 PM",
      social: {
        instagram: "#",
        linkedin: "#"
      }
    },
    {
      id: 5,
      name: "Vikram Joshi",
      title: "Youth Development Coach",
      specialization: ["Youth Training", "Talent Identification"],
      experience: "8+ years",
      athletesTrained: 120,
      successRate: "89%",
      bio: "Specialist in youth athlete development and talent identification programs.",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&h=400&fit=crop&q=80",
      featured: false,
      achievements: ["Youth Development Award", "2x Best New Coach"],
      availability: "Mon-Fri: 4 PM - 8 PM",
      social: {
        instagram: "#",
        twitter: "#"
      }
    },
    {
      id: 6,
      name: "Sneha Kapoor",
      title: "Sports Psychology Coach",
      specialization: ["Mental Training", "Performance Psychology"],
      experience: "9+ years",
      athletesTrained: 200,
      successRate: "93%",
      bio: "Sports psychologist helping athletes develop mental resilience and peak performance mindset.",
      image: "https://images.unsplash.com/photo-1541534741688-6073d6a7ca9a?w=400&h=400&fit=crop&q=80",
      featured: false,
      achievements: ["Psychology Excellence Award", "Published Author"],
      availability: "Tue-Sat: 10 AM - 6 PM",
      social: {
        instagram: "#",
        linkedin: "#"
      }
    },
    {
      id: 7,
      name: "Rohan Mehta",
      title: "Speed & Agility Coach",
      specialization: ["Speed Training", "Agility Development"],
      experience: "11+ years",
      athletesTrained: 190,
      successRate: "90%",
      bio: "Former sprint champion specializing in speed development and agility training.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&q=80",
      featured: false,
      achievements: ["Speed Coach of the Year", "National Record Holder"],
      availability: "Mon-Sat: 6 AM - 2 PM",
      social: {
        instagram: "#",
        twitter: "#"
      }
    },
    {
      id: 8,
      name: "Ananya Das",
      title: "Adaptive Sports Coach",
      specialization: ["Adaptive Training", "Inclusive Sports"],
      experience: "7+ years",
      athletesTrained: 90,
      successRate: "88%",
      bio: "Specialized in adaptive sports training and inclusive athletic development programs.",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop&q=80",
      featured: false,
      achievements: ["Inclusion Excellence Award", "Adaptive Sports Pioneer"],
      availability: "Wed-Sun: 9 AM - 5 PM",
      social: {
        instagram: "#",
        linkedin: "#"
      }
    }
  ];

  const filteredCoaches = coaches.filter(coach => {
    const matchesFilter = activeFilter === "all" || 
      coach.specialization.some(spec => 
        spec.toLowerCase().includes(activeFilter.toLowerCase())
      );
    const matchesSearch = searchQuery === "" || 
      coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.specialization.some(spec => 
        spec.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

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
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#030859] to-[#5FD4E2] rounded-2xl flex items-center justify-center shadow-lg shadow-[#030859]/20">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-[#030859] via-[#5FD4E2] to-[#030859] bg-clip-text text-transparent">
                    Expert Coaches
                  </span>
                </h1>
                <p className="text-lg text-gray-600">Meet our world-class coaching team dedicated to your success</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
              {[
                { label: "Total Coaches", value: "12+", icon: Users },
                { label: "Avg Experience", value: "12.5 years", icon: Clock },
                { label: "Athletes Trained", value: "1500+", icon: TrendingUp },
                { label: "Success Rate", value: "92%", icon: Trophy }
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
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search coaches by name, specialization..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-300 text-[#030859] placeholder-gray-400 focus:outline-none focus:border-[#030859] focus:ring-1 focus:ring-[#030859]/30 transition-colors shadow-sm"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeFilter === category.id
                        ? "bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white"
                        : "bg-white text-gray-600 hover:bg-[#DCE7C6]/30 hover:text-[#030859] border border-gray-300"
                    }`}
                  >
                    {category.label}
                    <span className="ml-2 px-1.5 py-0.5 rounded-full text-xs bg-white/30">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coaches Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredCoaches.map((coach, index) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedCoach(coach)}
              className={`relative group cursor-pointer rounded-2xl overflow-hidden border ${
                coach.featured
                  ? "border-[#FBB102] bg-gradient-to-br from-white to-[#FBB102]/5"
                  : "border-gray-200 bg-white hover:border-[#5FD4E2]"
              } shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              {/* Featured Badge */}
              {coach.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#FBB102] to-[#FBB102]/80 text-white text-xs font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    Featured
                  </div>
                </div>
              )}

              {/* Coach Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                
                {/* Quick Stats Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-[#FBB102]" />
                      <span className="text-sm font-medium">{coach.successRate} success</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#5FD4E2]" />
                      <span className="text-sm">{coach.athletesTrained}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coach Info */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-[#030859] mb-1">{coach.name}</h3>
                  <p className="text-[#5FD4E2] font-medium mb-3">{coach.title}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {coach.specialization.map((spec, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs bg-[#DCE7C6] text-[#030859]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-gray-50">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Experience</div>
                    <div className="text-lg font-bold text-[#030859]">{coach.experience}</div>
                  </div>
                  <div className="w-px h-8 bg-gray-300" />
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Availability</div>
                    <div className="text-sm font-medium text-[#030859] truncate max-w-[120px]">
                      {coach.availability.split(":")[0]}
                    </div>
                  </div>
                </div>

                {/* Social Links & CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {coach.social.instagram && (
                      <a href={coach.social.instagram} className="p-2 rounded-lg bg-[#030859]/10 hover:bg-[#030859]/20 transition-colors">
                        <Instagram className="w-4 h-4 text-[#030859]" />
                      </a>
                    )}
                    {coach.social.linkedin && (
                      <a href={coach.social.linkedin} className="p-2 rounded-lg bg-[#030859]/10 hover:bg-[#030859]/20 transition-colors">
                        <Linkedin className="w-4 h-4 text-[#030859]" />
                      </a>
                    )}
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white text-sm font-medium hover:shadow-lg transition-shadow">
                    View Profile
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Hover Effect Ring */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#5FD4E2]/30 rounded-2xl pointer-events-none transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 p-8 rounded-3xl relative overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#030859]/10 via-[#5FD4E2]/10 to-[#DCE7C6]/20" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#5FD4E210_1px,transparent_1px),linear-gradient(to_bottom,#5FD4E210_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#FBB102] to-[#FBB102]/80">
                <AwardIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[#030859] mb-2">Ready to Train with the Best?</h2>
                <p className="text-gray-600">Book a consultation with our expert coaches today</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                Book Free Consultation
              </motion.button>
              <button className="px-8 py-3 rounded-xl bg-white/80 backdrop-blur-sm text-[#030859] font-semibold border border-[#030859]/20 hover:border-[#030859]/40 transition-colors shadow-sm">
                <Phone className="w-5 h-5 inline mr-2" />
                Call: +91 98765 43210
              </button>
            </div>
          </div>
        </motion.div>

        {/* Coach Details Modal */}
        {selectedCoach && (
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
                      src={selectedCoach.image}
                      alt={selectedCoach.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-[#030859]">{selectedCoach.name}</h3>
                      <p className="text-[#5FD4E2] font-medium">{selectedCoach.title}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCoach(null)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    ✕
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="md:col-span-2 space-y-6">
                      <div>
                        <h4 className="text-lg font-bold text-[#030859] mb-3">About Coach</h4>
                        <p className="text-gray-700">{selectedCoach.bio}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#030859] mb-3">Specializations</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedCoach.specialization.map((spec, i) => (
                            <span
                              key={i}
                              className="px-4 py-2 rounded-full bg-[#DCE7C6] text-[#030859] font-medium"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#030859] mb-3">Achievements</h4>
                        <ul className="space-y-2">
                          {selectedCoach.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-center gap-2 text-gray-700">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Stats */}
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#030859]/5 to-[#5FD4E2]/5">
                        <h4 className="text-lg font-bold text-[#030859] mb-4">Performance Stats</h4>
                        <div className="space-y-4">
                          {[
                            { label: "Experience", value: selectedCoach.experience, icon: Clock },
                            { label: "Athletes Trained", value: selectedCoach.athletesTrained, icon: Users },
                            { label: "Success Rate", value: selectedCoach.successRate, icon: TrendingUp },
                            { label: "Availability", value: selectedCoach.availability, icon: Calendar }
                          ].map((stat, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-white">
                                  <stat.icon className="w-4 h-4 text-[#030859]" />
                                </div>
                                <span className="text-gray-600">{stat.label}</span>
                              </div>
                              <span className="font-bold text-[#030859]">{stat.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="p-6 rounded-2xl border border-gray-200">
                        <h4 className="text-lg font-bold text-[#030859] mb-4">Contact Coach</h4>
                        <div className="space-y-3">
                          <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white font-medium">
                            <Calendar className="w-5 h-5" />
                            Book Session
                          </button>
                          <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-white border border-[#030859]/20 text-[#030859] font-medium">
                            <MessageCircle className="w-5 h-5" />
                            Send Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coaches;