import React from "react";
import { Link, useLocation } from "react-router";
import { useSelector } from "react-redux";
import {
  Trophy, MapPin, Phone, Mail, Instagram,
  Facebook, Twitter, Youtube, ChevronRight,
  Heart, Shield, Users, Target, Home,
  Calendar, Award, Building, Info, Dumbbell,
  GraduationCap, Brain, HeartPulse, BookOpen
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Quick links - filtered based on authentication
  const quickLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/dashboard", label: "Dashboard", protected: true, icon: Target },
    { to: "/training", label: "Training", protected: true, icon: Dumbbell },
    { to: "/coaches", label: "Coaches", icon: Users },
    { to: "/schedule", label: "Schedule", protected: true, icon: Calendar },
    { to: "/achievements", label: "Achievements", protected: true, icon: Award },
  ];

  // Info links - always public
  const infoLinks = [
    { to: "/about", label: "About Us", icon: Info },
    { to: "/facilities", label: "Facilities", icon: Building },
    { to: "/programs", label: "Training Programs", icon: GraduationCap },
    { to: "/sports-science", label: "Sports Science", icon: Brain },
    { to: "/nutrition", label: "Nutrition", icon: HeartPulse },
    { to: "/faq", label: "FAQ", icon: BookOpen },
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  // Filter quick links based on authentication
  const filteredQuickLinks = quickLinks.filter(link => 
    isAuthenticated || !link.protected
  );

  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Column 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <img
                  src="/logoo.png"
                  alt="HSA Logo"
                  className="w-12 h-12 object-contain"
                />
                {/* <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse" /> */}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">HSA</h2>
                <p className="text-xs text-gray-400">Himalayan Sports Academy</p>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Training champions in the heart of the Himalayas. 
              Premier sports academy with world-class facilities and expert coaching.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-1.5 pt-3">
              <div className="text-center p-1.5 rounded-md bg-white/2.5 hover:bg-white/5 transition-all duration-200">
                <div className="text-base font-bold text-[#DCE7C6]">500+</div>
                <div className="text-xs text-gray-400">Athletes</div>
              </div>
              <div className="text-center p-1.5 rounded-md bg-white/2.5 hover:bg-white/5 transition-all duration-200">
                <div className="text-base font-bold text-[#DCE7C6]">50+</div>
                <div className="text-xs text-gray-400">Coaches</div>
              </div>
              <div className="text-center p-1.5 rounded-md bg-white/2.5 hover:bg-white/5 transition-all duration-200">
                <div className="text-base font-bold text-[#DCE7C6]">25+</div>
                <div className="text-xs text-gray-400">Sports</div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-white mb-3 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#DCE7C6]" />
              Quick Links
            </h3>
            <div className="space-y-1.5">
              {filteredQuickLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 2 }}
                >
                  <Link
                    to={link.to}
                    className={`flex items-center gap-2 text-xs rounded-md px-2 py-1.5 transition-all duration-200 group ${
                      location.pathname === link.to
                        ? 'text-[#DCE7C6] bg-gradient-to-r from-blue-900/30 to-transparent border-l-2 border-[#DCE7C6]'
                        : 'text-gray-400 hover:text-[#DCE7C6] hover:bg-white/5 hover:translate-x-0.5'
                    }`}
                  >
                    <link.icon className="w-3 h-3 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:font-medium transition-all">{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 3: Information */}
          <div>
            <h3 className="text-xs font-semibold text-white mb-3 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#DCE7C6]" />
              Information
            </h3>
            <div className="space-y-1.5">
              {infoLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 2 }}
                >
                  <Link
                    to={link.to}
                    className={`flex items-center gap-2 text-xs rounded-md px-2 py-1.5 transition-all duration-200 group ${
                      location.pathname === link.to
                        ? 'text-[#DCE7C6] bg-gradient-to-r from-blue-900/30 to-transparent border-l-2 border-[#DCE7C6]'
                        : 'text-gray-400 hover:text-[#DCE7C6] hover:bg-white/5 hover:translate-x-0.5'
                    }`}
                  >
                    <link.icon className="w-3 h-3 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:font-medium transition-all">{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-3">
            <div>
              <h3 className="text-xs font-semibold text-white mb-2.5">Contact Info</h3>
              <div className="space-y-2">
                <motion.div 
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-2.5 text-xs text-gray-400 hover:text-[#DCE7C6] transition-colors group cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-900/50 transition-all">
                    <MapPin className="w-3 h-3 text-[#DCE7C6]" />
                  </div>
                  <span className="group-hover:font-medium transition-all">Manali, Himachal Pradesh, India</span>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-2.5 text-xs text-gray-400 hover:text-[#DCE7C6] transition-colors group cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-900/50 transition-all">
                    <Phone className="w-3 h-3 text-[#DCE7C6]" />
                  </div>
                  <span className="group-hover:font-medium transition-all">+91 98765 43210</span>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-2.5 text-xs text-gray-400 hover:text-[#DCE7C6] transition-colors group cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-900/50 transition-all">
                    <Mail className="w-3 h-3 text-[#DCE7C6]" />
                  </div>
                  <span className="group-hover:font-medium transition-all">info@hsa.com</span>
                </motion.div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-white mb-2.5">Connect With Us</h3>
              <div className="flex gap-1.5">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 rounded-md bg-gradient-to-br from-white/5 to-white/2 flex items-center justify-center hover:from-white/10 hover:to-white/5 transition-all duration-200 group shadow-sm hover:shadow-md"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#DCE7C6] group-hover:scale-110 transition-all" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-1">
              <h4 className="text-xs font-medium text-white mb-1.5">Stay Updated</h4>
              <div className="flex gap-1">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#DCE7C6] focus:ring-1 focus:ring-[#DCE7C6]/30 transition-all duration-200 hover:border-white/20"
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 text-xs bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 rounded-md text-white transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Join
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[0.5px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent mb-4" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
          <div className="text-gray-500">
            © {currentYear} Himalayan Sports Academy. All rights reserved.
          </div>

          <div className="flex items-center gap-3 text-gray-400">
            <Link 
              to="/privacy" 
              className={`hover:text-[#DCE7C6] transition-colors px-1.5 py-0.5 rounded hover:bg-white/5 ${
                location.pathname === '/privacy' ? 'text-[#DCE7C6] bg-white/5' : ''
              }`}
            >
              Privacy Policy
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              to="/terms" 
              className={`hover:text-[#DCE7C6] transition-colors px-1.5 py-0.5 rounded hover:bg-white/5 ${
                location.pathname === '/terms' ? 'text-[#DCE7C6] bg-white/5' : ''
              }`}
            >
              Terms of Service
            </Link>
            <span className="text-gray-600">•</span>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/5 transition-colors">
              <Heart className="w-2.5 h-2.5 text-red-500 animate-pulse" />
              <span>Made for Athletes</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-gray-500 px-1.5 py-0.5 rounded hover:bg-white/5 transition-colors cursor-pointer">
            <Shield className="w-3 h-3 text-[#DCE7C6]" />
            <span>Accredited by Sports Authority of India</span>
          </div>
        </div>

        {/* Accreditation Badges */}
        {/* <div className="flex flex-wrap justify-center gap-3 mt-4 pt-4 border-t border-white/10">
          <div className="text-center p-2 rounded-md bg-white/2.5 hover:bg-white/5 transition-all duration-200 cursor-pointer">
            <div className="text-[9px] font-medium text-gray-400 mb-0.5">ISO 9001:2015 Certified</div>
            <div className="text-[8px] text-gray-500">Quality Management System</div>
          </div>
          <div className="text-center p-2 rounded-md bg-white/2.5 hover:bg-white/5 transition-all duration-200 cursor-pointer">
            <div className="text-[9px] font-medium text-gray-400 mb-0.5">SAI Recognized</div>
            <div className="text-[8px] text-gray-500">Sports Authority of India</div>
          </div>
          <div className="text-center p-2 rounded-md bg-white/2.5 hover:bg-white/5 transition-all duration-200 cursor-pointer">
            <div className="text-[9px] font-medium text-gray-400 mb-0.5">Safe Sports Certified</div>
            <div className="text-[8px] text-gray-500">Child Protection Policy</div>
          </div>
        </div> */}
      </div>

      {/* Floating Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 w-9 h-9 bg-gradient-to-r from-blue-700 to-blue-900 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-40 group"
        aria-label="Back to top"
      >
        <ChevronRight className="w-4 h-4 text-white rotate-270 group-hover:-translate-y-0.5 transition-transform" />
      </motion.button>
    </footer>
  );
};

export default Footer;