// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { 
  Trophy, Users, Calendar, BarChart, MapPin, 
  ChevronDown, Menu, X, LogIn, UserPlus,
  Home, Shield, Activity, Award, Star
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- COLOR THEME ---------------- */
const COLORS = {
  navy: {
    dark: '#0d47a1',
    medium: '#1565c0',
    light: '#1a237e',
  },
  lightGreen: '#DCE7C6',
};

/* ---------------- HEADER COMPONENT ---------------- */
const Header = ({ isAuthenticated = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(null);
  }, [location.pathname]);

  const mainNavItems = [
    { 
      label: 'Home', 
      href: '/', 
      icon: Home,
    },
    { 
      label: 'Programs', 
      href: '#programs',
      submenu: [
        { label: 'Elite Training', href: '/programs/elite', icon: Trophy },
        { label: 'Junior Academy', href: '/programs/junior', icon: Users },
        { label: 'Sports Science', href: '/programs/science', icon: Activity },
        { label: 'Mountain Sports', href: '/programs/mountain', icon: MapPin },
      ]
    },
    { 
      label: 'Coaches', 
      href: '/coaches',
      icon: Shield,
    },
    { 
      label: 'Facilities', 
      href: '/facilities',
      icon: Award,
    },
    { 
      label: 'Events', 
      href: '/events',
      icon: Calendar,
    },
    { 
      label: 'Results', 
      href: '/results',
      icon: BarChart,
    },
  ];

  const authNavItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: Home,
    },
    {
      label: 'Training',
      href: '/training',
      icon: Activity,
    },
    {
      label: 'Progress',
      href: '/progress',
      icon: BarChart,
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: Users,
    },
  ];

  const navItems = isAuthenticated ? authNavItems : mainNavItems;

  const handleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHomePage
            ? 'bg-black/95 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <NavLink 
                to="/" 
                className="flex items-center gap-3 group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl flex items-center justify-center">
                    <Trophy className="w-5 h-5 lg:w-6 lg:h-6 text-[#DCE7C6]" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-blue-600 rounded-full animate-ping" />
                </motion.div>
                <div className="hidden sm:block">
                  <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-400 via-[#DCE7C6] to-blue-300 bg-clip-text text-transparent">
                    HSA
                  </h1>
                  <p className="text-xs text-gray-400">Himalayan Sports Academy</p>
                </div>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  {item.submenu ? (
                    <button
                      onClick={() => handleDropdown(index)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all group ${
                        dropdownOpen === index
                          ? 'text-[#DCE7C6] bg-blue-900/20'
                          : 'text-gray-300 hover:text-[#DCE7C6] hover:bg-white/5'
                      }`}
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
                      {item.label}
                      <ChevronDown className={`w-3 h-3 transition-transform ${
                        dropdownOpen === index ? 'rotate-180' : ''
                      }`} />
                    </button>
                  ) : (
                    <NavLink
                      to={item.href}
                      className={({ isActive }) => 
                        `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all group ${
                          isActive
                            ? 'text-[#DCE7C6] bg-blue-900/20'
                            : 'text-gray-300 hover:text-[#DCE7C6] hover:bg-white/5'
                        }`
                      }
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
                      {item.label}
                    </NavLink>
                  )}

                  {/* Dropdown Menu */}
                  {item.submenu && dropdownOpen === index && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-black/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden"
                    >
                      <div className="py-2">
                        {item.submenu.map((subItem, subIndex) => (
                          <NavLink
                            key={subIndex}
                            to={subItem.href}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-[#DCE7C6] hover:bg-blue-900/20 transition-colors group"
                          >
                            {subItem.icon && (
                              <subItem.icon className="w-4 h-4 text-[#DCE7C6]/70 group-hover:text-[#DCE7C6]" />
                            )}
                            {subItem.label}
                          </NavLink>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            {/* Auth Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 rounded-lg text-sm text-white font-medium transition-all"
                  >
                    Dashboard
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-white">
                    <Users className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  {!isLoginPage && (
                    <NavLink
                      to="/login"
                      className="px-4 py-2 text-sm text-gray-300 hover:text-[#DCE7C6] transition-colors flex items-center gap-2"
                    >
                      <LogIn className="w-4 h-4" />
                      Login
                    </NavLink>
                  )}
                  {!isSignupPage && (
                    <NavLink
                      to="/signup"
                      className="px-6 py-2 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 rounded-lg text-sm text-white font-medium transition-all flex items-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      Join Now
                    </NavLink>
                  )}
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-[#DCE7C6] hover:bg-white/5 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-6">
                <div className="space-y-1">
                  {navItems.map((item, index) => (
                    <div key={index}>
                      {item.submenu ? (
                        <>
                          <button
                            onClick={() => handleDropdown(index)}
                            className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium transition-all ${
                              dropdownOpen === index
                                ? 'text-[#DCE7C6] bg-blue-900/20'
                                : 'text-gray-300 hover:text-[#DCE7C6] hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {item.icon && <item.icon className="w-5 h-5" />}
                              {item.label}
                            </div>
                            <ChevronDown className={`w-4 h-4 transition-transform ${
                              dropdownOpen === index ? 'rotate-180' : ''
                            }`} />
                          </button>
                          
                          {/* Mobile Dropdown */}
                          {dropdownOpen === index && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="ml-8 mt-2 space-y-2"
                            >
                              {item.submenu.map((subItem, subIndex) => (
                                <NavLink
                                  key={subIndex}
                                  to={subItem.href}
                                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-[#DCE7C6] rounded-lg hover:bg-white/5 transition-colors"
                                >
                                  {subItem.icon && <subItem.icon className="w-4 h-4" />}
                                  {subItem.label}
                                </NavLink>
                              ))}
                            </motion.div>
                          )}
                        </>
                      ) : (
                        <NavLink
                          to={item.href}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                              isActive
                                ? 'text-[#DCE7C6] bg-blue-900/20'
                                : 'text-gray-300 hover:text-[#DCE7C6] hover:bg-white/5'
                            }`
                          }
                        >
                          {item.icon && <item.icon className="w-5 h-5" />}
                          {item.label}
                        </NavLink>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile Auth Buttons */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      <button
                        onClick={() => {
                          navigate('/dashboard');
                          setMobileMenuOpen(false);
                        }}
                        className="w-full py-3 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 rounded-lg text-white font-medium transition-all"
                      >
                        Dashboard
                      </button>
                      <div className="flex items-center justify-between px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-white">John Doe</p>
                            <p className="text-xs text-gray-400">Athlete</p>
                          </div>
                        </div>
                        <button className="text-sm text-gray-400 hover:text-red-400">
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {!isLoginPage && (
                        <NavLink
                          to="/login"
                          className="flex items-center justify-center gap-2 w-full py-3 border border-[#DCE7C6]/20 hover:border-[#DCE7C6] rounded-lg text-[#DCE7C6] font-medium transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <LogIn className="w-5 h-5" />
                          Login
                        </NavLink>
                      )}
                      {!isSignupPage && (
                        <NavLink
                          to="/signup"
                          className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 rounded-lg text-white font-medium transition-all"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <UserPlus className="w-5 h-5" />
                          Join Now
                        </NavLink>
                      )}
                    </div>
                  )}
                </div>

                {/* Contact Info - Mobile */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <MapPin className="w-4 h-4 text-[#DCE7C6]" />
                      <span>Himalayan Sports Academy, Dharmasala</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <Star className="w-4 h-4 text-[#DCE7C6]" />
                      <span>🏆 #1 Sports Academy in Himalayas</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export default Header;