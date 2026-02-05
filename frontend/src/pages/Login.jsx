// // src/pages/Login.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { Eye, EyeOff, User, Shield, Mail, Lock, Sparkles, Globe, Rocket, Brain, Zap, Cpu, ChevronRight, Fingerprint } from "lucide-react";
// import { NavLink, useNavigate } from "react-router";
// import { useDispatch, useSelector } from 'react-redux';
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
// import Particles from "../components/Particles";
// import { loginUser, clearError } from "../features/authSlice";

// /* ---------------- ZOD SCHEMA ---------------- */
// const loginSchema = z.object({
//   emailId: z.string().email("Invalid email address"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
//   role: z.enum(["user", "admin","coach"]),
// });

// /* ---------------- ANIMATION KEYFRAMES ---------------- */
// const keyframes = `
//   @keyframes float-slow {
//     0%, 100% { transform: translate(0, 0) scale(1); }
//     50% { transform: translate(30px, -30px) scale(1.05); }
//   }
  
//   @keyframes float-medium {
//     0%, 100% { transform: translate(0, 0) scale(1); }
//     50% { transform: translate(-20px, 20px) scale(1.03); }
//   }
  
//   @keyframes float-fast {
//     0%, 100% { transform: translate(0, 0) scale(1); }
//     50% { transform: translate(15px, -15px) scale(1.02); }
//   }
  
//   @keyframes twinkle {
//     0%, 100% { opacity: 0.2; transform: scale(1); }
//     50% { opacity: 1; transform: scale(1.2); }
//   }
  
//   @keyframes shoot {
//     0% { opacity: 0; transform: translateX(0) translateY(0); }
//     5% { opacity: 1; }
//     100% { transform: translateX(-800px) translateY(400px); opacity: 0; }
//   }
  
//   @keyframes wave {
//     0% { background-position: 0 0; }
//     100% { background-position: 200px 200px; }
//   }
  
//   @keyframes hologram {
//     0% { background-position: 0% 50%; }
//     50% { background-position: 100% 50%; }
//     100% { background-position: 0% 50%; }
//   }
// `;

// /* ---------------- GLOW EFFECT COMPONENT ---------------- */
// const FloatingGlow = () => {
//   return (
//     <>
//       <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-float-slow" />
//       <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-float-medium" />
//       <div className="absolute top-3/4 left-2/3 w-64 h-64 bg-blue-500/15 rounded-full blur-[96px] animate-float-fast" />
//     </>
//   );
// };

// /* ---------------- NEON GRID COMPONENT ---------------- */
// const NeonGrid = () => {
//   const { scrollYProgress } = useScroll();
//   const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
//   const springY = useSpring(y, { stiffness: 100, damping: 30 });
  
//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       <motion.div 
//         className="absolute inset-0 opacity-10"
//         style={{ y: springY }}
//       >
//         <div className="h-full w-full bg-[linear-gradient(to_right,#4f46e550_1px,transparent_1px),linear-gradient(to_bottom,#4f46e550_1px,transparent_1px)] bg-[size:4rem_4rem]" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
//       </motion.div>
//     </div>
//   );
// };

// /* ---------------- HOLOGRAPHIC CARD ---------------- */
// const HolographicCard = ({ children, className = "" }) => {
//   const cardRef = useRef(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);

//   const handleMouseMove = (e) => {
//     if (!cardRef.current) return;
//     const rect = cardRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     setMousePosition({ x, y });
//   };

//   return (
//     <div
//       ref={cardRef}
//       className={`relative overflow-hidden rounded-3xl ${className}`}
//       onMouseMove={handleMouseMove}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Animated Background */}
//       <div className="absolute inset-0 opacity-20"
//         style={{
//           background: `linear-gradient(45deg, 
//             rgba(6, 182, 212, 0.1) 0%,
//             rgba(139, 92, 246, 0.1) 25%,
//             rgba(59, 130, 246, 0.1) 50%,
//             rgba(16, 185, 129, 0.1) 75%,
//             rgba(6, 182, 212, 0.1) 100%)`,
//           backgroundSize: '400% 400%',
//           animation: 'hologram 15s ease infinite',
//         }}
//       />
      
//       {/* Mouse Interactive Gradient */}
//       <div
//         className="absolute inset-0 opacity-20 transition-opacity duration-300"
//         style={{
//           background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
//             rgba(120, 119, 198, 0.3), transparent 40%)`,
//           opacity: isHovered ? 0.3 : 0.1,
//         }}
//       />
      
//       {/* Border Glow */}
//       <div className="absolute inset-0 rounded-3xl p-[1px]">
//         <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-blue-500/30 blur-sm" />
//         <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10" />
//       </div>
      
//       {/* Content Container */}
//       <div className="relative backdrop-blur-xl bg-black/40 rounded-3xl border border-white/10">
//         {children}
//       </div>
//     </div>
//   );
// };

// /* ---------------- FLOATING PARTICLES BACKGROUND ---------------- */
// const FloatingIcons = () => {
//   const icons = [Brain, Cpu, Rocket, Zap, Globe, Sparkles];
  
//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {icons.map((Icon, index) => {
//         const size = 20 + Math.random() * 30;
//         const duration = 20 + Math.random() * 20;
//         const delay = Math.random() * 5;
        
//         return (
//           <motion.div
//             key={index}
//             className="absolute"
//             initial={{
//               x: Math.random() * window.innerWidth,
//               y: Math.random() * window.innerHeight,
//               rotate: 0,
//             }}
//             animate={{
//               x: [null, Math.random() * window.innerWidth],
//               y: [null, Math.random() * window.innerHeight],
//               rotate: 360,
//             }}
//             transition={{
//               duration,
//               delay,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//           >
//             <Icon 
//               size={size} 
//               className="text-cyan-400/20"
//             />
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// };

// /* ---------------- CUSTOM SCROLLBAR STYLES ---------------- */
// const CustomScrollbarStyles = () => {
//   return (
//     <style>
//       {`
//         /* Custom scrollbar */
//         ::-webkit-scrollbar {
//           width: 10px;
//         }
        
//         ::-webkit-scrollbar-track {
//           background: rgba(0, 0, 0, 0.2);
//         }
        
//         ::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #06b6d4, #3b82f6);
//           border-radius: 5px;
//         }
        
//         /* Selection color */
//         ::selection {
//           background: rgba(6, 182, 212, 0.3);
//           color: white;
//         }
        
//         /* Smooth scrolling */
//         html {
//           scroll-behavior: smooth;
//         }
        
//         /* Remove focus outline for mouse users */
//         *:focus:not(:focus-visible) {
//           outline: none;
//         }
//       `}
//     </style>
//   );
// };

// /* ---------------- STARS BACKGROUND ---------------- */
// const StarsBackground = () => {
//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {Array.from({ length: 150 }).map((_, i) => (
//         <div
//           key={i}
//           className="absolute rounded-full animate-twinkle"
//           style={{
//             width: `${Math.random() * 3 + 0.5}px`,
//             height: `${Math.random() * 3 + 0.5}px`,
//             top: `${Math.random() * 100}%`,
//             left: `${Math.random() * 100}%`,
//             backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`,
//             animationDelay: `${Math.random() * 5}s`,
//             animationDuration: `${3 + Math.random() * 4}s`,
//           }}
//         />
//       ))}
      
//       {Array.from({ length: 4 }).map((_, i) => (
//         <div
//           key={`shoot-${i}`}
//           className="absolute"
//           style={{
//             width: '150px',
//             height: '1px',
//             top: `${10 + Math.random() * 80}%`,
//             left: `${Math.random() * 100}%`,
//             animation: `shoot ${4 + Math.random() * 4}s linear infinite ${i * 3}s`,
//           }}
//         >
//           <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-300/70 to-blue-500/50" />
//         </div>
//       ))}
//     </div>
//   );
// };

// /* ---------------- MAIN LOGIN COMPONENT ---------------- */
// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [activeTab, setActiveTab] = useState("login");
//   const [isLoading, setIsLoading] = useState(false);
//   const [visualEffects, setVisualEffects] = useState(true);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

//   const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
//     resolver: zodResolver(loginSchema),
//     defaultValues: { role: "developer" },
//   });

//   const role = watch("role");

//   useEffect(() => {
//     if (isAuthenticated) navigate('/dashboard');
//   }, [isAuthenticated, navigate]);

//   useEffect(() => {
//     return () => dispatch(clearError());
//   }, [dispatch]);

//   const onSubmit = async (data) => {
//     setIsLoading(true);
//     console.log("Login Data:", data);
    
//     // Simulate API call with beautiful loading animation
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     dispatch(loginUser(data));
//     setIsLoading(false);
//   };

//   const handleQuickLogin = (type) => {
//     const credentials = {
//       user: { emailId: "user@codeclan.dev", password: "password123", role: "user" },
//       admin: { emailId: "admin@codeclan.dev", password: "admin1234", role: "admin" },
//       developer: { emailId: "dev@codeclan.dev", password: "devpassword", role: "developer" },
//     };
    
//     setValue("emailId", credentials[type].emailId);
//     setValue("password", credentials[type].password);
//     setValue("role", credentials[type].role);
//   };

//   // Add CSS animations to document head
//   useEffect(() => {
//     const style = document.createElement('style');
//     style.textContent = keyframes;
//     document.head.appendChild(style);
    
//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   return (
//     <>
//       <CustomScrollbarStyles />
      
//       <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
//         {/* Advanced Background Effects */}
//         <div className="fixed inset-0">
//           <Particles 
//             particleCount={200}
//             particleColor="#06b6d4"
//             linkColor="#06b6d4"
//             moveSpeed={0.5}
//           />
//           <NeonGrid />
//           <FloatingGlow />
//           <FloatingIcons />
//           <StarsBackground />
//         </div>

//         {/* Main Content */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, type: "spring" }}
//           className="relative z-10 w-full max-w-6xl px-4"
//         >
//           <div className="grid lg:grid-cols-2 gap-8 items-center">
//             {/* Left Side - Hero Section */}
//             <motion.div
//               initial={{ x: -100, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="space-y-8"
//             >
//               <div className="space-y-4">
//                 <div className="flex items-center gap-3">
//                   <div className="relative">
//                     <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
//                       <Brain className="w-6 h-6 text-white" />
//                     </div>
//                     <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping" />
//                   </div>
//                   <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
//                     CodeClan
//                   </h1>
//                 </div>
                
//                 <h2 className="text-6xl font-bold text-white leading-tight">
//                   Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Future</span> with Us
//                 </h2>
                
//                 <p className="text-xl text-gray-300">
//                   Join thousands of developers creating the next generation of digital experiences.
//                   Secure, scalable, and spectacularly fast.
//                 </p>
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-3 gap-4">
//                 {[
//                   { value: "50K+", label: "Active Developers", icon: User },
//                   { value: "99.9%", label: "Uptime", icon: Zap },
//                   { value: "24/7", label: "Support", icon: Shield },
//                 ].map((stat, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 + index * 0.1 }}
//                     className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
//                   >
//                     <div className="flex items-center gap-2 mb-2">
//                       <stat.icon className="w-4 h-4 text-cyan-400" />
//                       <div className="text-2xl font-bold text-white">{stat.value}</div>
//                     </div>
//                     <div className="text-sm text-gray-400">{stat.label}</div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Feature List */}
//               <div className="space-y-3">
//                 {[
//                   "Zero-config deployment",
//                   "Real-time collaboration",
//                   "AI-powered code suggestions",
//                   "Enterprise-grade security",
//                   "Unlimited bandwidth",
//                 ].map((feature, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.5 + index * 0.1 }}
//                     className="flex items-center gap-3 text-gray-300"
//                   >
//                     <div className="w-2 h-2 bg-cyan-500 rounded-full" />
//                     <span>{feature}</span>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Right Side - Login Form */}
//             <motion.div
//               initial={{ x: 100, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               <HolographicCard className="p-1">
//                 <div className="p-8">
//                   {/* Tab Navigation */}
//                   <div className="flex mb-8">
//                     {["login", "qr", "biometric"].map((tab) => (
//                       <button
//                         key={tab}
//                         onClick={() => setActiveTab(tab)}
//                         className={`flex-1 py-3 font-medium text-sm uppercase tracking-wider transition-all ${
//                           activeTab === tab
//                             ? "text-cyan-400 border-b-2 border-cyan-400"
//                             : "text-gray-500 hover:text-gray-300"
//                         }`}
//                       >
//                         {tab === "qr" ? "QR Login" : tab === "biometric" ? "Biometric" : "Login"}
//                       </button>
//                     ))}
//                   </div>

//                   {/* Login Form */}
//                   <AnimatePresence mode="wait">
//                     {activeTab === "login" && (
//                       <motion.div
//                         key="login"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         className="space-y-6"
//                       >
//                         {/* Quick Login Buttons */}
//                         <div className="space-y-3">
//                           <label className="text-sm text-gray-400">Quick Access</label>
//                           <div className="grid grid-cols-3 gap-3">
//                             {["user", "admin", "developer"].map((type) => (
//                               <button
//                                 key={type}
//                                 onClick={() => handleQuickLogin(type)}
//                                 className="py-2 px-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors text-sm"
//                               >
//                                 {type}
//                               </button>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Email Input */}
//                         <div className="space-y-2">
//                           <div className="flex items-center justify-between">
//                             <label className="text-sm font-medium text-gray-300">Email</label>
//                             {errors.emailId && (
//                               <span className="text-sm text-red-400">{errors.emailId.message}</span>
//                             )}
//                           </div>
//                           <div className="relative">
//                             <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
//                             <input
//                               type="email"
//                               placeholder="developer@codeclan.dev"
//                               {...register("emailId")}
//                               className="w-full pl-12 pr-4 py-4 bg-black/30 border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 outline-none transition text-white placeholder-gray-500"
//                             />
//                           </div>
//                         </div>

//                         {/* Role Selection */}
//                         <div className="space-y-2">
//                           <label className="text-sm font-medium text-gray-300">Role</label>
//                           <div className="grid grid-cols-3 gap-3">
//                             {[
//                               { value: "user", icon: User, label: "User" },
//                               { value: "admin", icon: Shield, label: "Admin" },
//                               { value: "developer", icon: Cpu, label: "Developer" },
//                             ].map((r) => (
//                               <button
//                                 key={r.value}
//                                 type="button"
//                                 onClick={() => setValue("role", r.value)}
//                                 className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
//                                   role === r.value
//                                     ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500"
//                                     : "bg-white/5 border-white/10 hover:border-cyan-500/50"
//                                 }`}
//                               >
//                                 <r.icon className={`w-5 h-5 ${
//                                   role === r.value ? "text-cyan-400" : "text-gray-400"
//                                 }`} />
//                                 <span className={`text-sm ${
//                                   role === r.value ? "text-cyan-300" : "text-gray-400"
//                                 }`}>{r.label}</span>
//                               </button>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Password Input */}
//                         <div className="space-y-2">
//                           <div className="flex items-center justify-between">
//                             <label className="text-sm font-medium text-gray-300">Password</label>
//                             {errors.password && (
//                               <span className="text-sm text-red-400">{errors.password.message}</span>
//                             )}
//                           </div>
//                           <div className="relative">
//                             <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
//                             <input
//                               type={showPassword ? "text" : "password"}
//                               placeholder="••••••••••"
//                               {...register("password")}
//                               className="w-full pl-12 pr-12 py-4 bg-black/30 border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 outline-none transition text-white placeholder-gray-500"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => setShowPassword(!showPassword)}
//                               className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition"
//                             >
//                               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                             </button>
//                           </div>
//                         </div>

//                         {/* Error Display */}
//                         {error && (
//                           <motion.div
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: "auto" }}
//                             className="bg-red-500/10 border border-red-500/30 rounded-xl p-4"
//                           >
//                             <div className="flex items-center gap-2 text-red-400">
//                               <Shield className="w-4 h-4" />
//                               <span className="text-sm">{error}</span>
//                             </div>
//                           </motion.div>
//                         )}

//                         {/* Submit Button */}
//                         <motion.button
//                           type="submit"
//                           onClick={handleSubmit(onSubmit)}
//                           disabled={isLoading || loading}
//                           className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                         >
//                           <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//                           {isLoading ? (
//                             <>
//                               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                               <span>Authenticating...</span>
//                             </>
//                           ) : (
//                             <>
//                               <span>Access Platform</span>
//                               <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                             </>
//                           )}
//                         </motion.button>

//                         {/* Additional Links */}
//                         <div className="flex items-center justify-between pt-6 border-t border-white/10">
//                           <div className="flex items-center gap-2">
//                             <input
//                               type="checkbox"
//                               id="remember"
//                               className="w-4 h-4 rounded border-white/10 bg-black/30 text-cyan-500 focus:ring-cyan-500/50"
//                             />
//                             <label htmlFor="remember" className="text-sm text-gray-400">
//                               Remember me
//                             </label>
//                           </div>
//                           <NavLink
//                             to="/forgot-password"
//                             className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
//                           >
//                             Forgot password?
//                           </NavLink>
//                         </div>

//                         {/* Divider */}
//                         <div className="relative">
//                           <div className="absolute inset-0 flex items-center">
//                             <div className="w-full border-t border-white/10" />
//                           </div>
//                           <div className="relative flex justify-center text-sm">
//                             <span className="px-4 bg-black/40 text-gray-500">New to CodeClan?</span>
//                           </div>
//                         </div>

//                         {/* Signup Button */}
//                         <NavLink
//                           to="/signup"
//                           className="block w-full py-3 border border-cyan-500/30 hover:border-cyan-500 rounded-xl text-cyan-400 hover:text-cyan-300 text-center font-medium transition-colors group"
//                         >
//                           <div className="flex items-center justify-center gap-2">
//                             <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
//                             <span>Create Free Account</span>
//                             <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                           </div>
//                         </NavLink>
//                       </motion.div>
//                     )}

//                     {/* QR Login Tab */}
//                     {activeTab === "qr" && (
//                       <motion.div
//                         key="qr"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         className="text-center py-12"
//                       >
//                         <div className="w-48 h-48 mx-auto bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
//                           <div className="w-40 h-40 bg-white/5 rounded-xl flex items-center justify-center">
//                             <div className="text-cyan-400 text-sm">Scan with CodeClan App</div>
//                           </div>
//                         </div>
//                         <p className="text-gray-400 text-sm mb-8">
//                           Open the CodeClan mobile app and scan this QR code to login instantly
//                         </p>
//                         <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
//                           Download the App →
//                         </button>
//                       </motion.div>
//                     )}

//                     {/* Biometric Login Tab */}
//                     {activeTab === "biometric" && (
//                       <motion.div
//                         key="biometric"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         className="text-center py-12"
//                       >
//                         <div className="w-32 h-32 mx-auto bg-gradient-to-br from-cyan-500/20 to-green-500/20 rounded-full flex items-center justify-center mb-6 border border-white/10">
//                           <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center">
//                             <Fingerprint className="w-12 h-12 text-cyan-400" />
//                           </div>
//                         </div>
//                         <p className="text-gray-400 text-sm mb-8">
//                           Use your device's biometric authentication for instant, secure access
//                         </p>
//                         <button className="py-3 px-8 bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-500 hover:to-green-500 rounded-xl font-medium text-white transition-all">
//                           Authenticate with Biometrics
//                         </button>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>

//                   {/* Social Login */}
//                   <div className="mt-8 pt-8 border-t border-white/10">
//                     <p className="text-center text-sm text-gray-500 mb-4">Or continue with</p>
//                     <div className="grid grid-cols-3 gap-3">
//                       {["GitHub", "Google", "GitLab"].map((provider) => (
//                         <button
//                           key={provider}
//                           className="py-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors text-sm"
//                         >
//                           {provider}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </HolographicCard>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Settings Panel */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="fixed bottom-8 right-8 z-20"
//         >
//           <button
//             onClick={() => setVisualEffects(!visualEffects)}
//             className="p-3 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 hover:border-cyan-500/50 transition-colors group"
//           >
//             <Sparkles className={`w-5 h-5 transition-colors ${
//               visualEffects ? "text-cyan-400" : "text-gray-400"
//             }`} />
//           </button>
//         </motion.div>

//         {/* Animated Stats Counter */}
//         <div className="fixed top-8 left-8 z-20">
//           <div className="flex items-center gap-4 text-sm text-gray-400">
//             <div className="flex items-center gap-2">
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
//               <span>Systems Online</span>
//             </div>
//             <div className="w-px h-4 bg-white/10" />
//             <div>v2.4.1</div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;


// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, User, Shield, AlertCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import AnimatedBackground from "../animation";
import { loginUser, clearError } from "../features/authSlice";

/* ---------------- ZOD SCHEMA ---------------- */
const loginSchema = z.object({
  emailId: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["user", "admin"]),
});

/* ---------------- ANIMATION VARIANTS ---------------- */
const container = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, staggerChildren: 0.12 } },
};

const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const errorAnim = { hidden: { x: 0 }, visible: { x: [0, -8, 8, -6, 6, 0], transition: { duration: 0.4 } } };

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { role: "user" },
  });

  const role = watch("role");

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    dispatch(loginUser(data));
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-purple-950">
      <AnimatedBackground />

      <motion.div
        className="relative z-10 w-full max-w-md text-white"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Sign in to <span className="text-emerald-700">CodeClan</span></h1>
          <p className="text-gray-300">Enter your details to access your account</p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10"
        >
          {/* Display errors */}
          {(errors.emailId || errors.password || error) && (
            <motion.div variants={errorAnim} initial="hidden" animate="visible" className="mb-4 text-red-400 flex flex-col gap-1">
              {errors.emailId && (
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} /> {errors.emailId.message}
                </div>
              )}
              {errors.password && (
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} /> {errors.password.message}
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} /> {error}
                </div>
              )}
            </motion.div>
          )}

          {/* Email */}
          <motion.div variants={item}>
            <input
              type="email"
              placeholder="Email"
              {...register("emailId")}
              className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-white/20 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
            />
          </motion.div>

          {/* Role selection */}
          <motion.div variants={item} className="mb-4">
            <label className="text-sm mb-2 block">Login as</label>
            <div className="flex gap-3">
              {["user", "admin"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setValue("role", r)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border transition ${role === r ? "bg-green-950 border-green-700" : "bg-black/30 border-white/20"
                    }`}
                >
                  {r === "user" ? <User size={16} /> : <Shield size={16} />}
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Password */}
          <motion.div variants={item} className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </motion.div>

          {/* Sign in button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-950 hover:bg-green-900 rounded-xl font-semibold transition flex justify-center items-center gap-2"
          >
            {loading && <span className="loading loading-spinner loading-sm"></span>}
            {loading ? "Signing in..." : "Sign in"}
          </motion.button>

          {/* Signup link */}
          <motion.p variants={item} className="text-center text-sm mt-4 text-gray-300">
            New to CodeClan?{" "}
            <NavLink to="/signup" className="text-green-500">
              Create your account
            </NavLink>
          </motion.p>

          {/* Forgot password link */}
          <motion.div variants={item} className="text-right mb-4">
            <NavLink to="/forgot-password" className="text-sm text-green-500 hover:underline">
              Forgot Password?
            </NavLink>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;

// logo remain