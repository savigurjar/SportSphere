// src/pages/Signup.jsx
import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, User, Shield, Mail, Lock, Trophy, Target, Activity, Award, Medal, Heart, ChevronRight, Users, AlertCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Particles from "../components/Particles";
import { registerUser, resetRegisterSuccess } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

/* ---------------- ZOD SCHEMA ---------------- */
const signupSchema = z
  .object({
    firstName: z.string().min(3, "Username must be at least 3 characters"),
    emailId: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
        "Password must include uppercase, lowercase, number & symbol"
      ),
    confirmPassword: z.string(),
    role: z.enum(["user", "admin"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/* ---------------- ANIMATION KEYFRAMES ---------------- */
const keyframes = `
  @keyframes float-slow {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(30px, -30px) scale(1.05); }
  }
  
  @keyframes float-medium {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-20px, 20px) scale(1.03); }
  }
  
  @keyframes float-fast {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(15px, -15px) scale(1.02); }
  }
  
  @keyframes twinkle {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  
  @keyframes shoot {
    0% { opacity: 0; transform: translateX(0) translateY(0); }
    5% { opacity: 1; }
    100% { transform: translateX(-800px) translateY(400px); opacity: 0; }
  }
  
  @keyframes wave {
    0% { background-position: 0 0; }
    100% { background-position: 200px 200px; }
  }
  
  @keyframes hologram {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

/* ---------------- COLOR THEME ---------------- */
const COLORS = {
  navy: {
    dark: '#0d47a1',
    medium: '#1565c0',
    light: '#1a237e',
    gradient: 'linear-gradient(to right, #0d47a1, #1565c0, #1a237e)',
  },
  lightGreen: '#DCE7C6',
  lightGreenDark: '#b8d0a1',
};

/* ---------------- GLOW EFFECT COMPONENT ---------------- */
const FloatingGlow = () => {
  return (
    <>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/30 rounded-full blur-[128px] animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-800/25 rounded-full blur-[128px] animate-float-medium" />
      <div className="absolute top-3/4 left-2/3 w-64 h-64 bg-blue-700/20 rounded-full blur-[96px] animate-float-fast" />
    </>
  );
};

/* ---------------- NEON GRID COMPONENT ---------------- */
const NeonGrid = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ y: springY }}
      >
        <div className="h-full w-full bg-[linear-gradient(to_right,#1565c050_1px,transparent_1px),linear-gradient(to_bottom,#1565c050_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </motion.div>
    </div>
  );
};

/* ---------------- HOLOGRAPHIC CARD ---------------- */
const HolographicCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-3xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(45deg, 
            rgba(13, 71, 161, 0.1) 0%,
            rgba(21, 101, 192, 0.1) 25%,
            rgba(26, 35, 126, 0.1) 50%,
            rgba(220, 231, 198, 0.1) 75%,
            rgba(13, 71, 161, 0.1) 100%)`,
          backgroundSize: '400% 400%',
          animation: 'hologram 15s ease infinite',
        }}
      />
      
      {/* Mouse Interactive Gradient */}
      <div
        className="absolute inset-0 opacity-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(21, 101, 192, 0.3), transparent 40%)`,
          opacity: isHovered ? 0.3 : 0.1,
        }}
      />
      
      {/* Border Glow */}
      <div className="absolute inset-0 rounded-3xl p-[1px]">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-900/30 via-blue-700/30 to-[#DCE7C6]/30 blur-sm" />
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-900/10 via-blue-700/10 to-[#DCE7C6]/10" />
      </div>
      
      {/* Content Container */}
      <div className="relative backdrop-blur-xl bg-black/40 rounded-3xl border border-white/10">
        {children}
      </div>
    </div>
  );
};

/* ---------------- FLOATING PARTICLES BACKGROUND ---------------- */
const FloatingIcons = () => {
  const icons = [Trophy, Target, Activity, Award, Medal, Heart];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((Icon, index) => {
        const size = 20 + Math.random() * 30;
        const duration = 20 + Math.random() * 20;
        const delay = Math.random() * 5;
        
        return (
          <motion.div
            key={index}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 0,
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              rotate: 360,
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Icon 
              size={size} 
              className="text-blue-400/20"
            />
          </motion.div>
        );
      })}
    </div>
  );
};

/* ---------------- CUSTOM SCROLLBAR STYLES ---------------- */
const CustomScrollbarStyles = () => {
  return (
    <style>
      {`
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, ${COLORS.navy.medium}, ${COLORS.lightGreen});
          border-radius: 5px;
        }
        
        ::selection {
          background: rgba(21, 101, 192, 0.3);
          color: white;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        *:focus:not(:focus-visible) {
          outline: none;
        }
      `}
    </style>
  );
};

/* ---------------- STARS BACKGROUND ---------------- */
const StarsBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 150 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-twinkle"
          style={{
            width: `${Math.random() * 3 + 0.5}px`,
            height: `${Math.random() * 3 + 0.5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            backgroundColor: `rgba(220, 231, 198, ${Math.random() * 0.8 + 0.2})`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
      
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={`shoot-${i}`}
          className="absolute"
          style={{
            width: '150px',
            height: '1px',
            top: `${10 + Math.random() * 80}%`,
            left: `${Math.random() * 100}%`,
            animation: `shoot ${4 + Math.random() * 4}s linear infinite ${i * 3}s`,
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-400/70 to-[#DCE7C6]/50" />
        </div>
      ))}
    </div>
  );
};

/* ---------------- PASSWORD STRENGTH INDICATOR ---------------- */
const PasswordStrength = ({ password }) => {
  const calculateStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[@$!%*?&]/.test(pass)) strength++;
    return strength;
  };

  const strength = calculateStrength(password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'];

  return (
    <div className="mt-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor: level <= strength ? strengthColors[strength - 1] : '#374151',
            }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-400">Strength: {strengthLabels[strength - 1] || 'None'}</span>
        <span className="text-xs text-gray-400">{strength}/5</span>
      </div>
    </div>
  );
};

/* ---------------- MAIN SIGNUP COMPONENT ---------------- */
const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [visualEffects, setVisualEffects] = useState(true);
  const [activeTab, setActiveTab] = useState("signup");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, registerSuccess } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: "user" },
  });

  const password = watch("password");
  const role = watch("role");

  useEffect(() => {
    if (registerSuccess) {
      setShowSuccess(true);
      reset();
      dispatch(resetRegisterSuccess());
      const timer = setTimeout(() => {
        setShowSuccess(false);
        navigate("/login");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [registerSuccess, dispatch, navigate, reset]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  // Add CSS animations to document head
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <CustomScrollbarStyles />
      
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Advanced Background Effects */}
        <div className="fixed inset-0">
          <Particles 
            particleCount={200}
            particleColor="#1565c0"
            linkColor="#DCE7C6"
            moveSpeed={0.5}
          />
          <NeonGrid />
          <FloatingGlow />
          <FloatingIcons />
          <StarsBackground />
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative z-10 w-full max-w-6xl px-4"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Hero Section */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 mt-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-[#DCE7C6]" />
                    </div>
                    {/* <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full animate-ping" /> */}
                  </div>
                  <h1 className="text-5xl mt-20 font-bold bg-gradient-to-r from-blue-400 via-[#DCE7C6] to-blue-300 bg-clip-text text-transparent">
                    Himalayan Sports Academy
                  </h1>
                </div>
                
                <h2 className="text-6xl font-bold text-white leading-tight">
                  Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#DCE7C6]">Champion Journey</span>
                </h2>
                
                <p className="text-xl text-gray-300">
                  Join the premier sports academy in the Himalayas. Register today to begin 
                  your journey toward athletic excellence with expert coaching and 
                  world-class facilities.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "500+", label: "Active Athletes", icon: Users },
                  { value: "50+", label: "Expert Coaches", icon: Trophy },
                  { value: "100%", label: "Success Rate", icon: Award },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className="w-4 h-4 text-[#DCE7C6]" />
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Benefits List */}
              <div className="space-y-3">
                {[
                  "Personalized training programs",
                  "State-of-the-art facilities",
                  "Sports nutrition guidance",
                  "Competition opportunities",
                  "Progress tracking & analytics",
                  "24/7 athlete support",
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <div className="w-2 h-2 bg-[#DCE7C6] rounded-full" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Signup Form */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <HolographicCard className="p-1 w-full max-w-sm mx-auto">
                <div className="p-4">
                  {/* Tab Navigation */}
                  <div className="flex mb-4">
                    <button
                      onClick={() => setActiveTab("signup")}
                      className={`flex-1 py-1 text-xs uppercase tracking-wider transition-all ${
                        activeTab === "signup"
                          ? "text-[#DCE7C6] border-b-2 border-[#DCE7C6]"
                          : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      Create Account
                    </button>
                  </div>

                  {/* Success Message */}
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 bg-green-900/20 border border-green-500/30 rounded p-3"
                    >
                      <div className="flex items-center gap-2 text-green-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>Account created successfully! Redirecting to login...</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Error Display */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 bg-red-900/20 border border-red-500/30 rounded p-3"
                    >
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{error}</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Signup Form */}
                  <AnimatePresence mode="wait">
                    {activeTab === "signup" && (
                      <motion.div
                        key="signup"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-3"
                      >
                        {/* Username Input */}
                        <div>
                          <label className="text-xs font-medium text-gray-300">Username</label>
                          <div className="relative mt-0.5">
                            <User className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-[#DCE7C6]" />
                            <input
                              type="text"
                              placeholder="Enter username"
                              {...register("firstName")}
                              className="w-full pl-7 pr-2 py-2 bg-black/30 border border-white/10 rounded focus:border-[#DCE7C6] focus:ring-0 outline-none text-xs text-white placeholder-gray-500"
                            />
                          </div>
                          {errors.firstName && (
                            <span className="text-xs text-red-400 mt-0.5 block">{errors.firstName.message}</span>
                          )}
                        </div>

                        {/* Email Input */}
                        <div>
                          <label className="text-xs font-medium text-gray-300">Email</label>
                          <div className="relative mt-0.5">
                            <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-[#DCE7C6]" />
                            <input
                              type="email"
                              placeholder="email@example.com"
                              {...register("emailId")}
                              className="w-full pl-7 pr-2 py-2 bg-black/30 border border-white/10 rounded focus:border-[#DCE7C6] focus:ring-0 outline-none text-xs text-white placeholder-gray-500"
                            />
                          </div>
                          {errors.emailId && (
                            <span className="text-xs text-red-400 mt-0.5 block">{errors.emailId.message}</span>
                          )}
                        </div>

                        {/* Account Type */}
                        <div>
                          <label className="text-xs font-medium text-gray-300">Account Type</label>
                          <div className="flex gap-1 mt-0.5">
                            {[
                              { value: "user", icon: User, label: "Athlete" },
                              { value: "admin", icon: Shield, label: "Coach" },
                            ].map((r) => (
                              <button
                                key={r.value}
                                type="button"
                                onClick={() => setValue("role", r.value)}
                                className={`flex-1 flex items-center justify-center gap-1 p-1.5 rounded border transition-all ${
                                  role === r.value
                                    ? "bg-gradient-to-r from-blue-900/20 to-blue-700/20 border-[#DCE7C6]"
                                    : "bg-white/5 border-white/10 hover:border-[#DCE7C6]/50"
                                }`}
                              >
                                <r.icon className={`w-3 h-3 ${
                                  role === r.value ? "text-[#DCE7C6]" : "text-gray-400"
                                }`} />
                                <span className={`text-xs ${
                                  role === r.value ? "text-[#DCE7C6]" : "text-gray-400"
                                }`}>{r.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Password Input */}
                        <div>
                          <div className="flex justify-between items-center">
                            <label className="text-xs font-medium text-gray-300">Password</label>
                            {errors.password && (
                              <span className="text-xs text-red-400">{errors.password.message}</span>
                            )}
                          </div>
                          <div className="relative mt-0.5">
                            <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-[#DCE7C6]" />
                            <input
                              type={showPass ? "text" : "password"}
                              placeholder="••••••••"
                              {...register("password")}
                              className="w-full pl-7 pr-7 py-2 bg-black/30 border border-white/10 rounded focus:border-[#DCE7C6] focus:ring-0 outline-none text-xs text-white placeholder-gray-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPass(!showPass)}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#DCE7C6] transition"
                            >
                              {showPass ? <EyeOff size={12} /> : <Eye size={12} />}
                            </button>
                          </div>
                          {password && <PasswordStrength password={password} />}
                          <div className="mt-1 text-xs text-gray-500">
                            Must include uppercase, lowercase, number & symbol
                          </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                          <div className="flex justify-between items-center">
                            <label className="text-xs font-medium text-gray-300">Confirm Password</label>
                            {errors.confirmPassword && (
                              <span className="text-xs text-red-400">{errors.confirmPassword.message}</span>
                            )}
                          </div>
                          <div className="relative mt-0.5">
                            <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-[#DCE7C6]" />
                            <input
                              type={showConfirm ? "text" : "password"}
                              placeholder="••••••••"
                              {...register("confirmPassword")}
                              className="w-full pl-7 pr-7 py-2 bg-black/30 border border-white/10 rounded focus:border-[#DCE7C6] focus:ring-0 outline-none text-xs text-white placeholder-gray-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirm(!showConfirm)}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#DCE7C6] transition"
                            >
                              {showConfirm ? <EyeOff size={12} /> : <Eye size={12} />}
                            </button>
                          </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="flex items-center gap-2 pt-2">
                          <input
                            type="checkbox"
                            id="terms"
                            className="w-2.5 h-2.5 rounded border-white/10 bg-black/30 text-[#DCE7C6] focus:ring-0"
                            required
                          />
                          <label htmlFor="terms" className="text-xs text-gray-400">
                            I agree to the{" "}
                            <a href="/terms" className="text-[#DCE7C6] hover:underline">
                              Terms & Conditions
                            </a>{" "}
                            and{" "}
                            <a href="/privacy" className="text-[#DCE7C6] hover:underline">
                              Privacy Policy
                            </a>
                          </label>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                          type="submit"
                          onClick={handleSubmit(onSubmit)}
                          disabled={loading}
                          className="w-full py-2 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 rounded font-medium text-xs text-white transition-all flex items-center justify-center gap-1 group relative overflow-hidden"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          {loading ? (
                            <>
                              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>Creating Account...</span>
                            </>
                          ) : (
                            <>
                              <span>Create Account</span>
                              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </>
                          )}
                        </motion.button>

                        {/* Divider */}
                        <div className="relative pt-2">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                          </div>
                          <div className="relative flex justify-center text-xs">
                            <span className="px-2 bg-black/40 text-gray-500">Already have an account?</span>
                          </div>
                        </div>

                        {/* Login Link */}
                        <NavLink
                          to="/login"
                          className="block w-full py-1.5 border border-[#DCE7C6]/20 hover:border-[#DCE7C6] rounded text-[#DCE7C6] hover:text-blue-300 text-center text-xs font-medium transition-colors"
                        >
                          Sign In Instead
                        </NavLink>

                        {/* Social Signup */}
                        <div className="pt-2">
                          <p className="text-center text-xs text-gray-400 mb-1">Or sign up with</p>
                          <div className="flex gap-1">
                            {["Google", "Facebook", "Twitter"].map((provider) => (
                              <button
                                key={provider}
                                type="button"
                                className="flex-1 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors text-xs"
                              >
                                {provider}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </HolographicCard>
            </motion.div>
          </div>
        </motion.div>

        {/* Settings Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-8 right-8 z-20"
        >
          <button
            onClick={() => setVisualEffects(!visualEffects)}
            className="p-3 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 hover:border-[#DCE7C6]/50 transition-colors group"
          >
            <Trophy className={`w-5 h-5 transition-colors ${
              visualEffects ? "text-[#DCE7C6]" : "text-gray-400"
            }`} />
          </button>
        </motion.div>

        {/* Animated Stats Counter */}
        <div className="fixed top-8 left-8 z-20">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
              <span>Registration: Open</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div>HSA v2.4.1</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;