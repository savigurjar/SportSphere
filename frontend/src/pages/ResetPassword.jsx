// src/pages/ResetPassword.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import axiosClient from "../utils/axiosClient";
import { AlertCircle, Eye, EyeOff, Lock, Key, Shield, CheckCircle, ChevronRight, Trophy, Target } from "lucide-react";
import Particles from "../components/Particles";

/* ---------------- ZOD SCHEMA ---------------- */
const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
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
  
  @keyframes hologram {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes pulse-success {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
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

/* ---------------- PASSWORD STRENGTH INDICATOR ---------------- */
const PasswordStrengthIndicator = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[0-9]/.test(pass)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 25;
    return strength;
  };

  const strength = getStrength(password);
  
  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-400">Password Strength</span>
        <span className={`font-medium ${
          strength < 25 ? "text-red-400" :
          strength < 50 ? "text-orange-400" :
          strength < 75 ? "text-yellow-400" : "text-green-400"
        }`}>
          {strength < 25 ? "Very Weak" : strength < 50 ? "Weak" : strength < 75 ? "Good" : "Strong"}
        </span>
      </div>
      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${strength}%` }}
          transition={{ duration: 0.5 }}
          className={`h-full ${
            strength < 25 ? "bg-red-500" :
            strength < 50 ? "bg-orange-500" :
            strength < 75 ? "bg-yellow-500" : "bg-green-500"
          }`}
        />
      </div>
    </div>
  );
};

/* ---------------- MAIN RESET PASSWORD COMPONENT ---------------- */
const ResetPassword = () => {
  const { token } = useParams(); // token from URL
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  // Watch password for strength indicator
  const watchedPassword = watch("password", "");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const response = await axiosClient.post(`/user/reset-password/${token}`, {
        password: data.password,
      });

      setMessage(response.data.message || "Password reset successfully");
      setLoading(false);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || "Reset failed");
    }
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
                      <Key className="w-6 h-6 text-[#DCE7C6]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full animate-ping" />
                  </div>
                  <h1 className="text-5xl mt-20 font-bold bg-gradient-to-r from-blue-400 via-[#DCE7C6] to-blue-300 bg-clip-text text-transparent">
                    Himalayan Sports Academy
                  </h1>
                </div>
                
                <h2 className="text-6xl font-bold text-white leading-tight">
                  Create New <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#DCE7C6]">Password</span>
                </h2>
                
                <p className="text-xl text-gray-300">
                  Enter a strong, secure password for your athlete account. 
                  Make sure it's unique and different from your previous passwords.
                </p>
              </div>

              {/* Security Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "AES-256", label: "Encryption", icon: Shield },
                  { value: "Secure", label: "Storage", icon: Lock },
                  { value: "One-time", label: "Reset", icon: Key },
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

              {/* Password Guidelines */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[#DCE7C6]">Password Requirements</h3>
                {[
                  "Minimum 8 characters in length",
                  "Include uppercase and lowercase letters",
                  "Add at least one number (0-9)",
                  "Include special characters (!@#$%^&*)",
                  "Avoid common words or personal info",
                  "Make it unique and hard to guess",
                ].map((guideline, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <div className="w-2 h-2 bg-[#DCE7C6] rounded-full" />
                    <span>{guideline}</span>
                  </motion.div>
                ))}
              </div>

              {/* Return to Login */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-6 border-t border-white/10"
              >
                <NavLink
                  to="/login"
                  className="inline-flex items-center gap-2 text-[#DCE7C6] hover:text-blue-300 transition-colors group"
                >
                  <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  <span>Back to Login</span>
                </NavLink>
              </motion.div>
            </motion.div>

            {/* Right Side - Reset Password Form */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <HolographicCard className="p-1 w-full max-w-sm mx-auto mb-20">
                <div className="p-8">
                  {/* Header */}
                  <div className="mb-6 text-center">
                    <motion.div
                      animate={message ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-900/20 to-blue-700/20 mb-4 border border-[#DCE7C6]/20"
                    >
                      {message ? (
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      ) : (
                        <Lock className="w-8 h-8 text-[#DCE7C6]" />
                      )}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {message ? "Success!" : "Reset Password"}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {message 
                        ? "Your password has been reset successfully"
                        : "Enter your new password below"
                      }
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Messages */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-500/10 border border-red-500/30 rounded-lg p-4"
                      >
                        <div className="flex items-center gap-2 text-red-400">
                          <AlertCircle size={16} />
                          <span className="text-sm">{error}</span>
                        </div>
                      </motion.div>
                    )}

                    {message && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 animate-pulse-success"
                      >
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle size={16} />
                          <span className="text-sm">{message}</span>
                        </div>
                        <div className="mt-2 text-xs text-green-400/70">
                          Redirecting to login in 2 seconds...
                        </div>
                      </motion.div>
                    )}

                    {/* Password Input - Only show if no success message */}
                    {!message && (
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">
                          New Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#DCE7C6]" />
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            {...register("password", {
                              onChange: (e) => setPassword(e.target.value)
                            })}
                            className="w-full pl-10 pr-10 py-3 bg-black/30 border border-white/10 rounded-lg focus:border-[#DCE7C6] focus:ring-0 outline-none text-white placeholder-gray-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#DCE7C6] transition"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {errors.password && (
                          <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                            <AlertCircle size={14} />
                            <span>{errors.password.message}</span>
                          </div>
                        )}
                        <PasswordStrengthIndicator password={watchedPassword} />
                      </div>
                    )}

                    {/* Confirm Password Input - Only show if no success message */}
                    {!message && (
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#DCE7C6]" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            {...register("confirmPassword")}
                            className="w-full pl-10 pr-10 py-3 bg-black/30 border border-white/10 rounded-lg focus:border-[#DCE7C6] focus:ring-0 outline-none text-white placeholder-gray-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#DCE7C6] transition"
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                            <AlertCircle size={14} />
                            <span>{errors.confirmPassword.message}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={loading || message}
                      className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 group relative overflow-hidden ${
                        message 
                          ? "bg-gradient-to-r from-green-700 to-green-900 cursor-default" 
                          : "bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 disabled:from-gray-700 disabled:to-gray-900"
                      }`}
                      whileHover={message ? {} : { scale: 1.01 }}
                      whileTap={message ? {} : { scale: 0.99 }}
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Resetting Password...</span>
                        </>
                      ) : message ? (
                        <>
                          <CheckCircle size={18} />
                          <span>Password Reset!</span>
                        </>
                      ) : (
                        <>
                          <span>Reset Password</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.button>

                    {/* Back to login link */}
                    {!message && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center pt-4 border-t border-white/10"
                      >
                        <p className="text-sm text-gray-400">
                          Remembered your password?{" "}
                          <NavLink to="/login" className="text-[#DCE7C6] hover:text-blue-300 transition-colors">
                            Sign in
                          </NavLink>
                        </p>
                      </motion.div>
                    )}

                    {/* Token Info */}
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                        <div className={`w-1.5 h-1.5 rounded-full ${token ? "bg-green-500 animate-pulse" : "bg-gray-500"}`} />
                        <span>
                          {token ? "Reset link is valid" : "No reset token found"}
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </HolographicCard>
            </motion.div>
          </div>
        </motion.div>

        {/* Animated Stats Counter */}
        <div className="fixed top-8 left-8 z-20">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
              <span>Security Protocol: Active</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div>HSA v2.4.1</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;