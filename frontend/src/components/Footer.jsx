// // src/components/Footer.jsx (Compact but Feature-rich)
// import React, { useState } from "react";
// import { Link } from "react-router";
// import {
//   Trophy, MapPin, Phone, Mail, Instagram,
//   Facebook, Twitter, Youtube, ChevronRight,
//   Heart, Shield, Users, Target
// } from "lucide-react";
// import { motion } from "framer-motion";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   const quickLinks = [
//     { to: "/", label: "Home" },
//     { to: "/dashboard", label: "Dashboard" },
//     { to: "/training", label: "Training" },
//     { to: "/coaches", label: "Coaches" },
//     { to: "/schedule", label: "Schedule" },
//     { to: "/achievements", label: "Achievements" },
//   ];

//   const infoLinks = [
//     { to: "/about", label: "About Us" },
//     { to: "/admissions", label: "Admissions" },
//     { to: "/facilities", label: "Facilities" },
//     { to: "/careers", label: "Careers" },
//     { to: "/contact", label: "Contact" },
//     { to: "/faq", label: "FAQ" },
//   ];

//   const socialLinks = [
//     { icon: Instagram, href: "#", label: "Instagram" },
//     { icon: Facebook, href: "#", label: "Facebook" },
//     { icon: Twitter, href: "#", label: "Twitter" },
//     { icon: Youtube, href: "#", label: "YouTube" },
//   ];

//   return (
//     <footer className="bg-gradient-to-b from-black to-gray-900">
//       {/* Main Content - Compact */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

//           {/* Column 1: Brand */}
//           <div className="space-y-3">
//             <div className="flex items-center gap-2">
//               {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg flex items-center justify-center"> */}
//               {/* <Trophy className="w-5 h-5 text-[#DCE7C6]" /> */}
//               {/* </div> */}
//               <div className="relative">
//                 <img
//                   src="/logoo.png"
//                   alt="HSA Logo"
//                   className="w-12 h-12 object-contain"
//                 />
//                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
//               </div>
//               <div>
//                 <h2 className="text-lg font-bold text-white">HSA</h2>
//                 <p className="text-xs text-gray-400">Himalayan Sports Academy</p>
//               </div>
//             </div>

//             <p className="text-sm text-gray-400">
//               Training champions in the heart of the Himalayas.
//             </p>

//             {/* Stats */}
//             <div className="flex gap-4 pt-2">
//               <div className="text-center">
//                 <div className="text-lg font-bold text-[#DCE7C6]">500+</div>
//                 <div className="text-xs text-gray-400">Athletes</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-lg font-bold text-[#DCE7C6]">50+</div>
//                 <div className="text-xs text-gray-400">Coaches</div>
//               </div>
//             </div>
//           </div>

//           {/* Column 2: Quick Links */}
//           <div>
//             <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
//               <Target className="w-4 h-4 text-[#DCE7C6]" />
//               Quick Links
//             </h3>
//             <div className="space-y-2">
//               {quickLinks.map((link, index) => (
//                 <Link
//                   key={index}
//                   to={link.to}
//                   className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#DCE7C6] transition-colors"
//                 >
//                   <ChevronRight className="w-3 h-3" />
//                   {link.label}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Column 3: Information */}
//           <div>
//             <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
//               <Users className="w-4 h-4 text-[#DCE7C6]" />
//               Information
//             </h3>
//             <div className="space-y-2">
//               {infoLinks.map((link, index) => (
//                 <Link
//                   key={index}
//                   to={link.to}
//                   className="block text-sm text-gray-400 hover:text-[#DCE7C6] transition-colors"
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Column 4: Contact */}
//           <div className="space-y-4">
//             <div>
//               <h3 className="text-sm font-semibold text-white mb-2">Contact Info</h3>
//               <div className="space-y-2">
//                 <div className="flex items-center gap-2 text-sm text-gray-400">
//                   <MapPin className="w-4 h-4 text-[#DCE7C6]" />
//                   <span>Manali, HP</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-400">
//                   <Phone className="w-4 h-4 text-[#DCE7C6]" />
//                   <span>+91 98765 43210</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-400">
//                   <Mail className="w-4 h-4 text-[#DCE7C6]" />
//                   <span>info@hsa.com</span>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-sm font-semibold text-white mb-2">Connect</h3>
//               <div className="flex gap-2">
//                 {socialLinks.map((social, index) => (
//                   <a
//                     key={index}
//                     href={social.href}
//                     className="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
//                     aria-label={social.label}
//                   >
//                     <social.icon className="w-4 h-4 text-gray-400 hover:text-[#DCE7C6]" />
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mb-4" />

//         {/* Bottom Bar */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-3">
//           <div className="text-xs text-gray-500">
//             © {currentYear} Himalayan Sports Academy. All rights reserved.
//           </div>

//           <div className="flex items-center gap-4 text-xs text-gray-400">
//             <Link to="/privacy" className="hover:text-[#DCE7C6] transition-colors">
//               Privacy Policy
//             </Link>
//             <span className="text-gray-600">•</span>
//             <Link to="/terms" className="hover:text-[#DCE7C6] transition-colors">
//               Terms of Service
//             </Link>
//             <span className="text-gray-600">•</span>
//             <div className="flex items-center gap-1">
//               <Heart className="w-3 h-3 text-red-500" />
//               <span>For Athletes</span>
//             </div>
//           </div>

//           <div className="flex items-center gap-1 text-xs text-gray-500">
//             <Shield className="w-3 h-3 text-[#DCE7C6]" />
//             <span>Accredited</span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

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
      {/* Main Content - Compact */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/logoo.png"
                  alt="HSA Logo"
                  className="w-14 h-14 object-contain"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">HSA</h2>
                <p className="text-sm text-gray-400">Himalayan Sports Academy</p>
              </div>
            </div>

            <p className="text-sm text-gray-400">
              Training champions in the heart of the Himalayas. 
              Premier sports academy with world-class facilities and expert coaching.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 pt-4">
              <div className="text-center">
                <div className="text-lg font-bold text-[#DCE7C6]">500+</div>
                <div className="text-xs text-gray-400">Athletes</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[#DCE7C6]">50+</div>
                <div className="text-xs text-gray-400">Coaches</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[#DCE7C6]">25+</div>
                <div className="text-xs text-gray-400">Sports</div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-[#DCE7C6]" />
              Quick Links
            </h3>
            <div className="space-y-2">
              {filteredQuickLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.to}
                    className={`flex items-center gap-2 text-sm rounded-lg px-2 py-1.5 transition-all ${
                      location.pathname === link.to
                        ? 'text-[#DCE7C6] bg-white/5'
                        : 'text-gray-400 hover:text-[#DCE7C6] hover:bg-white/5'
                    }`}
                  >
                    <link.icon className="w-3 h-3" />
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 3: Information */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Info className="w-4 h-4 text-[#DCE7C6]" />
              Information
            </h3>
            <div className="space-y-2">
              {infoLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.to}
                    className={`flex items-center gap-2 text-sm rounded-lg px-2 py-1.5 transition-all ${
                      location.pathname === link.to
                        ? 'text-[#DCE7C6] bg-white/5'
                        : 'text-gray-400 hover:text-[#DCE7C6] hover:bg-white/5'
                    }`}
                  >
                    <link.icon className="w-3 h-3" />
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#DCE7C6] transition-colors">
                  <MapPin className="w-4 h-4 text-[#DCE7C6]" />
                  <span>Manali, Himachal Pradesh, India</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#DCE7C6] transition-colors">
                  <Phone className="w-4 h-4 text-[#DCE7C6]" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#DCE7C6] transition-colors">
                  <Mail className="w-4 h-4 text-[#DCE7C6]" />
                  <span>info@hsa.com</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Connect With Us</h3>
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-4 h-4 text-gray-400 hover:text-[#DCE7C6]" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <h4 className="text-xs font-medium text-white mb-2">Stay Updated</h4>
              <div className="flex gap-1">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DCE7C6]"
                />
                <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 rounded-lg text-white transition-all">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-gray-500">
            © {currentYear} Himalayan Sports Academy. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link 
              to="/privacy" 
              className={`hover:text-[#DCE7C6] transition-colors ${
                location.pathname === '/privacy' ? 'text-[#DCE7C6]' : ''
              }`}
            >
              Privacy Policy
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              to="/terms" 
              className={`hover:text-[#DCE7C6] transition-colors ${
                location.pathname === '/terms' ? 'text-[#DCE7C6]' : ''
              }`}
            >
              Terms of Service
            </Link>
            <span className="text-gray-600">•</span>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-red-500" />
              <span>Made for Athletes</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Shield className="w-3 h-3 text-[#DCE7C6]" />
            <span>Accredited by Sports Authority of India</span>
          </div>
        </div>

        {/* Accreditation Badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="text-center">
            <div className="text-[10px] text-gray-500 mb-1">ISO 9001:2015 Certified</div>
            <div className="text-[10px] text-gray-400">Quality Management System</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-gray-500 mb-1">SAI Recognized</div>
            <div className="text-[10px] text-gray-400">Sports Authority of India</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-gray-500 mb-1">Safe Sports Certified</div>
            <div className="text-[10px] text-gray-400">Child Protection Policy</div>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-10 h-10 bg-gradient-to-r from-blue-700 to-blue-900 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-40"
        aria-label="Back to top"
      >
        <ChevronRight className="w-5 h-5 text-white rotate-270" />
      </button>
    </footer>
  );
};

export default Footer;