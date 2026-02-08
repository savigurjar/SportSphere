// src/components/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { 
  Menu, X, LogOut, User, Shield, Trophy, 
  Home, Users, Calendar, Target, Award, 
  Settings, Bell, ChevronDown, Sparkles 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/authSlice";
import { ModeToggle } from "./ModeToggle";

// Color theme matching the login page
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

// Holographic Card for dropdowns
const HolographicDropdown = ({ children, className = "" }) => {
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
      className={`relative overflow-hidden rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background */}
      <div 
        className="absolute inset-0 opacity-20"
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
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(21, 101, 192, 0.3), transparent 40%)`,
          opacity: isHovered ? 0.3 : 0.1,
        }}
      />
      
      {/* Border Glow */}
      <div className="absolute inset-0 rounded-xl p-[1px]">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-900/30 via-blue-700/30 to-[#DCE7C6]/30 blur-sm" />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-900/10 via-blue-700/10 to-[#DCE7C6]/10" />
      </div>
      
      {/* Content Container */}
      <div className="relative backdrop-blur-xl bg-black/40 rounded-xl border border-white/10">
        {children}
      </div>
    </div>
  );
};

// Floating particles for header background
const HeaderParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            backgroundColor: `rgba(220, 231, 198, ${Math.random() * 0.2 + 0.1})`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Notification Bell with animated indicator
const NotificationBell = ({ count = 0 }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (count > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <div className="relative">
      <Bell className="w-5 h-5 text-gray-300 hover:text-[#DCE7C6] transition-colors cursor-pointer" />
      {count > 0 && (
        <>
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
            animate={{ scale: isAnimating ? [1, 1.5, 1] : 1 }}
            transition={{ duration: 0.5 }}
          />
          <span className="absolute -top-2 -right-2 text-xs text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
            {count}
          </span>
        </>
      )}
    </div>
  );
};

// Main Header Component
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Fix for hydration and mount state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
    setIsOpen(false);
    setIsUserMenuOpen(false);
  };

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/dashboard", label: "Dashboard", icon: Target },
    { path: "/training", label: "Training", icon: Trophy },
    { path: "/coaches", label: "Coaches", icon: Users },
    { path: "/schedule", label: "Schedule", icon: Calendar },
    { path: "/achievements", label: "Achievements", icon: Award },
  ];

  // Add CSS animations to document head
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes hologram {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
      
      @keyframes pulse-glow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Prevent rendering user-specific content until mounted
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b backdrop-blur-lg bg-black/80">
        <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl animate-pulse" />
            <div className="h-6 w-32 bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-black/90 backdrop-blur-xl border-b border-white/10' 
            : 'bg-gradient-to-b from-black/95 to-transparent backdrop-blur-lg'
        }`}
      >
        {/* Header Background Effects */}
        <HeaderParticles />
        
        {/* Glow Effect */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
        
        {/* Main Container */}
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <img 
                src="/logoo.png" 
                alt="HSA Logo" 
                className="w-12 h-12 object-contain"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-[#DCE7C6] to-blue-300 bg-clip-text text-transparent">
                HSA
              </span>
              <span className="text-xs text-gray-400 hidden sm:block">
                Himalayan Sports Academy
              </span>
            </div>
            
            {/* Animated sparkle */}
            <motion.div
              className="opacity-0 group-hover:opacity-100"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-3 h-3 text-[#DCE7C6]" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={item.path}
                  className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-[#DCE7C6] rounded-lg transition-all duration-300 group/nav"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/0 via-blue-700/0 to-[#DCE7C6]/0 group-hover/nav:from-blue-900/10 group-hover/nav:via-blue-700/10 group-hover/nav:to-[#DCE7C6]/10 rounded-lg transition-all duration-300" />
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-[#DCE7C6] group-hover/nav:w-8 group-hover/nav:-translate-x-4 transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Side - Controls */}
          <div className="flex items-center gap-3">
            {/* Mode Toggle - Desktop */}
            <div className="hidden md:block">
              <ModeToggle />
            </div>
            
            {/* Notification Bell */}
            <NotificationBell count={3} />
            
            {/* Desktop Auth/User Menu */}
            <div className="hidden md:flex items-center gap-3">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-[#DCE7C6] transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 rounded-lg text-white transition-all"
                  >
                    Join HSA
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all group/user"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-[#DCE7C6]" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-white">
                        {user?.firstName || "Athlete"}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        {user?.role === "admin" ? (
                          <>
                            <Shield className="w-3 h-3 text-[#DCE7C6]" />
                            <span>Administrator</span>
                          </>
                        ) : (
                          <>
                            <Trophy className="w-3 h-3 text-[#DCE7C6]" />
                            <span>Elite Athlete</span>
                          </>
                        )}
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 top-full mt-2 w-64"
                      >
                        <HolographicDropdown>
                          <div className="p-2 space-y-1">
                            <div className="px-3 py-2 border-b border-white/10">
                              <div className="text-sm font-medium text-white">
                                {user?.firstName} {user?.lastName}
                              </div>
                              <div className="text-xs text-gray-400">
                                {user?.emailId}
                              </div>
                            </div>
                            
                            <Link
                              to="/dashboard"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-[#DCE7C6] hover:bg-white/5 rounded-lg transition-colors"
                            >
                              <Target className="w-4 h-4" />
                              <span>Dashboard</span>
                            </Link>

                            <Link
                              to="/profile"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-[#DCE7C6] hover:bg-white/5 rounded-lg transition-colors"
                            >
                              <User className="w-4 h-4" />
                              <span>My Profile</span>
                            </Link>

                            {user?.role === "admin" && (
                              <Link
                                to="/admin"
                                onClick={() => setIsUserMenuOpen(false)}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-[#DCE7C6] hover:bg-white/5 rounded-lg transition-colors"
                              >
                                <Shield className="w-4 h-4" />
                                <span>Admin Panel</span>
                              </Link>
                            )}

                            <Link
                              to="/settings"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-[#DCE7C6] hover:bg-white/5 rounded-lg transition-colors"
                            >
                              <Settings className="w-4 h-4" />
                              <span>Settings</span>
                            </Link>

                            <div className="border-t border-white/10 pt-1">
                              <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                              >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                              </button>
                            </div>
                          </div>
                        </HolographicDropdown>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-[#DCE7C6]" />
              ) : (
                <Menu className="w-5 h-5 text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <HolographicDropdown className="m-4">
                <div className="p-4 space-y-4">
                  {/* Mode Toggle for Mobile */}
                  <div className="flex justify-center py-2">
                    <ModeToggle />
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-[#DCE7C6] hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Auth Section */}
                  <div className="pt-4 border-t border-white/10">
                    {!isAuthenticated ? (
                      <div className="space-y-2">
                        <Link
                          to="/login"
                          onClick={() => setIsOpen(false)}
                          className="block w-full px-4 py-2 text-center text-sm font-medium text-gray-300 hover:text-[#DCE7C6] hover:bg-white/5 rounded-lg transition-colors"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          onClick={() => setIsOpen(false)}
                          className="block w-full px-4 py-2 text-center text-sm font-medium bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 rounded-lg text-white transition-all"
                        >
                          Join HSA
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div className="px-3 py-2 mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-[#DCE7C6]" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">
                                {user?.firstName} {user?.lastName}
                              </div>
                              <div className="text-xs text-gray-400 flex items-center gap-1">
                                {user?.role === "admin" ? "Administrator" : "Athlete"}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <Link
                            to="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-[#DCE7C6] hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <Target className="w-4 h-4" />
                            Dashboard
                          </Link>

                          {user?.role === "admin" && (
                            <Link
                              to="/admin"
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-[#DCE7C6] hover:bg-white/5 rounded-lg transition-colors"
                            >
                              <Shield className="w-4 h-4" />
                              Admin Panel
                            </Link>
                          )}

                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </HolographicDropdown>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

export default Header;