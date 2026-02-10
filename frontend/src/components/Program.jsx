// // src/components/ProgramsShowcase.jsx
// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
// import {
//   Rocket, Zap, Target, Users, Award, Trophy, Brain, Cpu,
//   Activity, BarChart3, Clock, Calendar, MapPin, Star,
//   ChevronRight, ChevronLeft, Play, Pause, Maximize2,
//   Heart, Shield, Globe, Mountain, Wind, Thermometer,
//   BookOpen, GraduationCap, Briefcase, Dumbbell, Coffee,
//   TrendingUp, TrendingDown, ArrowRight, Sparkles,
//   Filter, Search, Settings, Share2, Download, Bookmark,
//   Heart as HeartIcon, MessageCircle, Eye, Users as UsersIcon,
//   CheckCircle, XCircle, AlertCircle, Clock as ClockIcon,
//   Battery, Wifi, Satellite, Radio, ShieldCheck, Lock
// } from "lucide-react";

// const ProgramsShowcase = () => {
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [selectedProgram, setSelectedProgram] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [viewMode, setViewMode] = useState("grid");
//   const [favorites, setFavorites] = useState([]);
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [systemMetrics, setSystemMetrics] = useState({
//     capacity: 87,
//     enrollment: 92,
//     satisfaction: 4.9,
//     uptime: 99.8
//   });

//   const containerRef = useRef(null);
//   const isInView = useInView(containerRef, { once: true, amount: 0.3 });
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"]
//   });

//   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
//   const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

//   // Program categories
//   const categories = [
//     { id: "all", label: "All Programs", count: 12, icon: Globe },
//     { id: "elite", label: "Elite Training", count: 4, icon: Trophy },
//     { id: "olympic", label: "Olympic Prep", count: 3, icon: Award },
//     { id: "youth", label: "Youth Development", count: 3, icon: Users },
//     { id: "recovery", label: "Recovery", count: 2, icon: Heart }
//   ];

//   // Sample programs data
//   const programs = [
//     {
//       id: 1,
//       title: "Olympic Pathway Program",
//       description: "12-month intensive training with Olympic-level coaches and sports scientists",
//       category: "olympic",
//       duration: "12 Months",
//       intensity: "Advanced",
//       capacity: "24/30 seats",
//       rating: 4.9,
//       reviews: 42,
//       price: "$12,500",
//       image: "https://images.unsplash.com/photo-1541534741688-6073d6a7ca9a?w=800&h=600&fit=crop&q=80",
//       features: [
//         "Olympic Coaching Staff",
//         "Sports Science Lab",
//         "International Competitions",
//         "Nutrition Planning",
//         "Mental Conditioning"
//       ],
//       status: "enrolling",
//       progress: 75,
//       startDate: "Mar 15, 2024"
//     },
//     {
//       id: 2,
//       title: "Altitude Performance Training",
//       description: "High-altitude training program for endurance athletes at simulated 4000m",
//       category: "elite",
//       duration: "6 Months",
//       intensity: "Extreme",
//       capacity: "15/20 seats",
//       rating: 4.8,
//       reviews: 38,
//       price: "$8,900",
//       image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80",
//       features: [
//         "Altitude Simulation",
//         "VO2 Max Testing",
//         "Hypoxia Training",
//         "Recovery Protocols",
//         "Performance Analytics"
//       ],
//       status: "limited",
//       progress: 60,
//       startDate: "Apr 1, 2024"
//     },
//     {
//       id: 3,
//       title: "Youth Talent Development",
//       description: "Comprehensive training program for young athletes aged 12-18",
//       category: "youth",
//       duration: "10 Months",
//       intensity: "Intermediate",
//       capacity: "45/50 seats",
//       rating: 4.7,
//       reviews: 56,
//       price: "$5,400",
//       image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop&q=80",
//       features: [
//         "Skill Development",
//         "Academic Support",
//         "Nutrition Guidance",
//         "Competition Exposure",
//         "Parent Workshops"
//       ],
//       status: "open",
//       progress: 90,
//       startDate: "Feb 20, 2024"
//     },
//     {
//       id: 4,
//       title: "Sports Science & Analytics",
//       description: "Advanced biomechanics and performance analysis program",
//       category: "elite",
//       duration: "8 Months",
//       intensity: "Advanced",
//       capacity: "18/25 seats",
//       rating: 4.9,
//       reviews: 31,
//       price: "$9,800",
//       image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
//       features: [
//         "3D Motion Capture",
//         "Force Plate Analysis",
//         "Performance Metrics",
//         "Injury Prevention",
//         "Data Analytics"
//       ],
//       status: "waitlist",
//       progress: 72,
//       startDate: "Mar 30, 2024"
//     },
//     {
//       id: 5,
//       title: "Professional Recovery Systems",
//       description: "Comprehensive recovery and rehabilitation program",
//       category: "recovery",
//       duration: "4 Months",
//       intensity: "All Levels",
//       capacity: "30/30 seats",
//       rating: 4.8,
//       reviews: 47,
//       price: "$6,500",
//       image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop&q=80",
//       features: [
//         "Cryotherapy",
//         "Hydrotherapy",
//         "Sports Massage",
//         "Mobility Training",
//         "Nutrition Support"
//       ],
//       status: "full",
//       progress: 100,
//       startDate: "Mar 10, 2024"
//     },
//     {
//       id: 6,
//       title: "Himalayan Adventure Sports",
//       description: "Mountain sports training in real Himalayan conditions",
//       category: "elite",
//       duration: "3 Months",
//       intensity: "Extreme",
//       capacity: "12/15 seats",
//       rating: 4.9,
//       reviews: 29,
//       price: "$7,200",
//       image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=600&fit=crop&q=80",
//       features: [
//         "Mountain Training",
//         "Survival Skills",
//         "Altitude Acclimation",
//         "Technical Skills",
//         "Safety Protocols"
//       ],
//       status: "enrolling",
//       progress: 80,
//       startDate: "May 5, 2024"
//     }
//   ];

//   // Filter programs based on category and search
//   const filteredPrograms = programs.filter(program => {
//     const matchesCategory = activeCategory === "all" || program.category === activeCategory;
//     const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          program.description.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   // System metrics animation
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSystemMetrics(prev => ({
//         capacity: Math.min(100, prev.capacity + (Math.random() * 2 - 1)),
//         enrollment: Math.min(100, prev.enrollment + (Math.random() * 2 - 1)),
//         satisfaction: Math.min(5, prev.satisfaction + (Math.random() * 0.1 - 0.05)),
//         uptime: Math.min(100, prev.uptime + (Math.random() * 0.1 - 0.05))
//       }));
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   // 3D card effect
//   const handleCardMouseMove = (e, id) => {
//     if (hoveredCard !== id) return;
//     const card = e.currentTarget;
//     const rect = card.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
    
//     const centerX = rect.width / 2;
//     const centerY = rect.height / 2;
    
//     const rotateY = ((x - centerX) / centerX) * 5;
//     const rotateX = ((centerY - y) / centerY) * -5;
    
//     card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
//     card.style.boxShadow = `0 20px 60px rgba(0, 0, 0, 0.3)`;
//   };

//   const handleCardMouseLeave = (e) => {
//     e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
//     e.currentTarget.style.boxShadow = '';
//   };

//   // Status badge component
//   const StatusBadge = ({ status }) => {
//     const config = {
//       enrolling: { color: "bg-green-500/10 text-green-400", label: "Enrolling" },
//       limited: { color: "bg-yellow-500/10 text-yellow-400", label: "Limited" },
//       open: { color: "bg-blue-500/10 text-blue-400", label: "Open" },
//       waitlist: { color: "bg-purple-500/10 text-purple-400", label: "Waitlist" },
//       full: { color: "bg-red-500/10 text-red-400", label: "Full" }
//     };
    
//     const { color, label } = config[status] || config.open;
    
//     return (
//       <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
//         {label}
//       </span>
//     );
//   };

//   return (
//     <motion.div
//       ref={containerRef}
//       initial={{ opacity: 0 }}
//       animate={isInView ? { opacity: 1 } : {}}
//       transition={{ duration: 0.8 }}
//       className="relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black py-16 md:py-24"
//     >
//       {/* Advanced Background Effects */}
//       <div className="absolute inset-0 z-0">
//         {/* Grid System */}
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f605_1px,transparent_1px),linear-gradient(to_bottom,#3b82f605_1px,transparent_1px)] bg-[size:80px_80px]" />
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
//         </div>

//         {/* Floating Orbs */}
//         {[1, 2, 3, 4].map((i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full blur-3xl"
//             style={{
//               width: `${200 + i * 100}px`,
//               height: `${200 + i * 100}px`,
//               left: `${i * 20}%`,
//               top: `${20 + i * 10}%`,
//               background: `radial-gradient(circle, 
//                 rgba(59, 130, 246, ${0.1 + i * 0.05}) 0%,
//                 rgba(220, 231, 198, ${0.05 + i * 0.03}) 50%,
//                 transparent 70%)`
//             }}
//             animate={{
//               x: [0, 100, 0],
//               y: [0, -50, 0],
//               scale: [1, 1.2, 1]
//             }}
//             transition={{
//               duration: 20 + i * 5,
//               repeat: Infinity,
//               ease: "linear"
//             }}
//           />
//         ))}

//         {/* Animated Lines */}
//         <div className="absolute inset-0 overflow-hidden">
//           {[...Array(5)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
//               style={{
//                 top: `${20 + i * 15}%`,
//                 left: "-100%",
//                 width: "200%"
//               }}
//               animate={{
//                 x: ["0%", "-100%"]
//               }}
//               transition={{
//                 duration: 20 + i * 3,
//                 repeat: Infinity,
//                 ease: "linear"
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 container mx-auto px-4 md:px-8">
//         {/* Header Section */}
//         <motion.div
//           style={{ opacity, y }}
//           className="text-center mb-12 md:mb-16"
//         >
//           {/* Title */}
//           <div className="flex items-center justify-center gap-3 mb-6">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//               className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center"
//             >
//               <Rocket className="w-6 h-6 text-white" />
//             </motion.div>
//             <h2 className="text-4xl md:text-6xl font-bold text-white">
//               Elite <span className="bg-gradient-to-r from-blue-400 via-[#DCE7C6] to-cyan-300 bg-clip-text text-transparent">Training Programs</span>
//             </h2>
//           </div>

//           {/* Subtitle */}
//           <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
//             Choose from our curated selection of world-class training programs designed to 
//             transform athletic potential into peak performance.
//           </p>

//           {/* System Metrics */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
//             {[
//               { label: "Capacity", value: `${systemMetrics.capacity.toFixed(0)}%`, icon: Users, color: "from-blue-600 to-cyan-500" },
//               { label: "Enrollment", value: `${systemMetrics.enrollment.toFixed(0)}%`, icon: TrendingUp, color: "from-green-600 to-emerald-500" },
//               { label: "Satisfaction", value: systemMetrics.satisfaction.toFixed(1), icon: Star, color: "from-yellow-600 to-amber-500" },
//               { label: "Uptime", value: `${systemMetrics.uptime.toFixed(1)}%`, icon: ShieldCheck, color: "from-purple-600 to-pink-500" }
//             ].map((metric, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={isInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ delay: i * 0.1 }}
//                 className="relative group"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
//                 <div className="relative p-4 rounded-2xl backdrop-blur-sm border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]">
//                   <div className="flex items-center justify-between mb-2">
//                     <div className={`p-2 rounded-lg bg-gradient-to-br ${metric.color} bg-opacity-20`}>
//                       <metric.icon className="w-4 h-4 text-white" />
//                     </div>
//                     <span className="text-xs text-gray-400">{metric.label}</span>
//                   </div>
//                   <div className="text-2xl font-bold text-white">{metric.value}</div>
//                   <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
//                     <motion.div
//                       className={`h-full bg-gradient-to-r ${metric.color}`}
//                       initial={{ width: "0%" }}
//                       animate={{ width: `${parseFloat(metric.value)}%` }}
//                       transition={{ delay: 0.5 + i * 0.1, duration: 2 }}
//                     />
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Controls Bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.3 }}
//           className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 p-4 rounded-2xl backdrop-blur-xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent"
//         >
//           {/* Search */}
//           <div className="relative flex-1">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search programs..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
//             />
//           </div>

//           {/* Categories */}
//           <div className="flex flex-wrap gap-2">
//             {categories.map((category) => (
//               <motion.button
//                 key={category.id}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setActiveCategory(category.id)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
//                   activeCategory === category.id
//                     ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
//                     : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
//                 }`}
//               >
//                 <category.icon className="w-4 h-4" />
//                 <span className="text-sm font-medium">{category.label}</span>
//                 <span className="text-xs px-1.5 py-0.5 rounded-full bg-black/30">
//                   {category.count}
//                 </span>
//               </motion.button>
//             ))}
//           </div>

//           {/* View Controls */}
//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5">
//               {["grid", "list"].map((mode) => (
//                 <button
//                   key={mode}
//                   onClick={() => setViewMode(mode)}
//                   className={`p-2 rounded-lg transition-colors ${
//                     viewMode === mode
//                       ? "bg-blue-500 text-white"
//                       : "text-gray-400 hover:text-white"
//                   }`}
//                 >
//                   {mode === "grid" ? (
//                     <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
//                       {[...Array(4)].map((_, i) => (
//                         <div key={i} className="bg-current rounded-sm" />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="w-4 h-4 flex flex-col justify-between">
//                       {[...Array(3)].map((_, i) => (
//                         <div key={i} className="h-0.5 bg-current rounded-full" />
//                       ))}
//                     </div>
//                   )}
//                 </button>
//               ))}
//             </div>

//             <button className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors">
//               <Filter className="w-4 h-4" />
//             </button>
//           </div>
//         </motion.div>

//         {/* Programs Grid */}
//         <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6 mb-12`}>
//           <AnimatePresence>
//             {filteredPrograms.map((program, index) => (
//               <motion.div
//                 key={program.id}
//                 layout
//                 initial={{ opacity: 0, scale: 0.9, y: 50 }}
//                 animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
//                 exit={{ opacity: 0, scale: 0.9, y: 50 }}
//                 transition={{ delay: index * 0.1, duration: 0.5 }}
//                 whileHover="hover"
//                 onMouseEnter={() => setHoveredCard(program.id)}
//                 onMouseLeave={() => setHoveredCard(null)}
//                 onMouseMove={(e) => handleCardMouseMove(e, program.id)}
//                 onMouseLeave={handleCardMouseLeave}
//                 variants={{
//                   hover: { y: -10 }
//                 }}
//                 className="relative group cursor-pointer"
//               >
//                 {/* Card Background Effects */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-blue-500/30 transition-colors" />

//                 {/* Main Card */}
//                 <div className="relative h-full rounded-3xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02]">
//                   {/* Image Section */}
//                   <div className="relative h-48 overflow-hidden">
//                     <img
//                       src={program.image}
//                       alt={program.title}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                     />
//                     {/* Gradient Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
//                     {/* Status Badge */}
//                     <div className="absolute top-4 right-4">
//                       <StatusBadge status={program.status} />
//                     </div>

//                     {/* Favorite Button */}
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setFavorites(prev =>
//                           prev.includes(program.id)
//                             ? prev.filter(id => id !== program.id)
//                             : [...prev, program.id]
//                         );
//                       }}
//                       className="absolute top-4 left-4 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
//                     >
//                       <HeartIcon className={`w-4 h-4 ${
//                         favorites.includes(program.id) ? "fill-red-500 text-red-500" : "text-white"
//                       }`} />
//                     </button>

//                     {/* Progress Indicator */}
//                     <div className="absolute bottom-4 left-4 right-4">
//                       <div className="text-xs text-gray-300 mb-1">{program.capacity}</div>
//                       <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
//                         <motion.div
//                           className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
//                           initial={{ width: 0 }}
//                           animate={{ width: `${program.progress}%` }}
//                           transition={{ delay: 1 + index * 0.2, duration: 1.5 }}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Content Section */}
//                   <div className="p-6">
//                     {/* Program Header */}
//                     <div className="flex items-start justify-between mb-3">
//                       <div>
//                         <h3 className="text-xl font-bold text-white mb-1">{program.title}</h3>
//                         <p className="text-sm text-gray-400 line-clamp-2">{program.description}</p>
//                       </div>
//                       <div className="text-2xl font-bold text-white">{program.price}</div>
//                     </div>

//                     {/* Stats */}
//                     <div className="flex items-center gap-4 mb-4">
//                       <div className="flex items-center gap-1">
//                         <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
//                         <span className="text-sm font-medium text-white">{program.rating}</span>
//                         <span className="text-xs text-gray-400">({program.reviews})</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Clock className="w-4 h-4 text-blue-400" />
//                         <span className="text-sm text-gray-400">{program.duration}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Activity className="w-4 h-4 text-red-400" />
//                         <span className="text-sm text-gray-400">{program.intensity}</span>
//                       </div>
//                     </div>

//                     {/* Features */}
//                     <div className="mb-4">
//                       <div className="text-xs text-gray-400 mb-2">KEY FEATURES</div>
//                       <div className="flex flex-wrap gap-2">
//                         {program.features.slice(0, 3).map((feature, i) => (
//                           <span
//                             key={i}
//                             className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300"
//                           >
//                             {feature}
//                           </span>
//                         ))}
//                         {program.features.length > 3 && (
//                           <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300">
//                             +{program.features.length - 3} more
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex items-center gap-3">
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="flex-1 py-2 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium text-sm flex items-center justify-center gap-2"
//                       >
//                         <BookOpen className="w-4 h-4" />
//                         <span>View Details</span>
//                       </motion.button>
//                       <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
//                         <Share2 className="w-4 h-4 text-gray-400" />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Hover Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>

//         {/* Detailed Program View */}
//         <AnimatePresence>
//           {selectedProgram > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 50 }}
//               className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
//               onClick={() => setSelectedProgram(0)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-white/20"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {/* Detailed program content would go here */}
//                 <div className="p-8">
//                   <button
//                     onClick={() => setSelectedProgram(0)}
//                     className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
//                   >
//                     <XCircle className="w-6 h-6 text-white" />
//                   </button>
//                   <h3 className="text-3xl font-bold text-white mb-4">
//                     {programs.find(p => p.id === selectedProgram)?.title}
//                   </h3>
//                   {/* More detailed content... */}
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Bottom CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.8 }}
//           className="relative overflow-hidden rounded-3xl p-8 md:p-12"
//         >
//           {/* Background */}
//           <div className="absolute inset-0">
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
//             <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f610_1px,transparent_1px),linear-gradient(to_bottom,#3b82f610_1px,transparent_1px)] bg-[size:60px_60px]" />
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
//               className="absolute -right-32 -top-32 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full"
//             />
//           </div>

//           <div className="relative z-10 text-center">
//             <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
//               <Sparkles className="w-5 h-5 text-blue-400" />
//               <span className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
//                 READY TO ELEVATE YOUR GAME?
//               </span>
//             </div>

//             <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">
//               Transform Your Potential Into Performance
//             </h3>
//             <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
//               Join 500+ elite athletes who have transformed their careers with our 
//               world-class training programs and coaching staff.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold flex items-center justify-center gap-3 group"
//               >
//                 <span>Enroll Now</span>
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold border border-white/20 hover:border-white/40 transition-colors"
//               >
//                 Book Consultation
//               </motion.button>
//             </div>

//             <div className="flex items-center justify-center gap-6 mt-8">
//               {[
//                 { value: "24/7", label: "Support" },
//                 { value: "100%", label: "Success Rate" },
//                 { value: "4.9★", label: "Rating" },
//                 { value: "50+", label: "Coaches" }
//               ].map((stat, i) => (
//                 <div key={i} className="text-center">
//                   <div className="text-2xl font-bold text-white">{stat.value}</div>
//                   <div className="text-sm text-gray-400">{stat.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Floating Elements */}
//       <div className="absolute top-20 right-8 hidden lg:block">
//         <motion.div
//           animate={{ y: [0, -20, 0] }}
//           transition={{ duration: 4, repeat: Infinity }}
//           className="p-4 rounded-2xl backdrop-blur-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent"
//         >
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute" />
//               <div className="w-3 h-3 bg-green-500 rounded-full relative" />
//             </div>
//             <span className="text-sm text-gray-300">Live Assistance</span>
//           </div>
//         </motion.div>
//       </div>

//       <div className="absolute bottom-20 left-8 hidden lg:block">
//         <motion.div
//           animate={{ rotate: [0, 360] }}
//           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//           className="w-64 h-64 border border-white/5 rounded-full"
//         >
//           <div className="absolute inset-0 border-t border-blue-500/30 rounded-full" />
//           <div className="absolute inset-4 border-t border-cyan-500/20 rounded-full" />
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProgramsShowcase;