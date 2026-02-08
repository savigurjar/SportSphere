// src/components/Footer.jsx (Compact but Feature-rich)
import React, { useState } from "react";
import { Link } from "react-router";
import { 
  Trophy, MapPin, Phone, Mail, Instagram, 
  Facebook, Twitter, Youtube, ChevronRight, 
  Heart, Shield, Users, Target
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/training", label: "Training" },
    { to: "/coaches", label: "Coaches" },
    { to: "/schedule", label: "Schedule" },
    { to: "/achievements", label: "Achievements" },
  ];

  const infoLinks = [
    { to: "/about", label: "About Us" },
    { to: "/admissions", label: "Admissions" },
    { to: "/facilities", label: "Facilities" },
    { to: "/careers", label: "Careers" },
    { to: "/contact", label: "Contact" },
    { to: "/faq", label: "FAQ" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-gradient-to-b from-black to-gray-900">
      {/* Main Content - Compact */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          
          {/* Column 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[#DCE7C6]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">HSA</h2>
                <p className="text-xs text-gray-400">Himalayan Sports Academy</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-400">
              Training champions in the heart of the Himalayas.
            </p>
            
            {/* Stats */}
            <div className="flex gap-4 pt-2">
              <div className="text-center">
                <div className="text-lg font-bold text-[#DCE7C6]">500+</div>
                <div className="text-xs text-gray-400">Athletes</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[#DCE7C6]">50+</div>
                <div className="text-xs text-gray-400">Coaches</div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-[#DCE7C6]" />
              Quick Links
            </h3>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#DCE7C6] transition-colors"
                >
                  <ChevronRight className="w-3 h-3" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Information */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#DCE7C6]" />
              Information
            </h3>
            <div className="space-y-2">
              {infoLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="block text-sm text-gray-400 hover:text-[#DCE7C6] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Contact Info</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="w-4 h-4 text-[#DCE7C6]" />
                  <span>Manali, HP</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Phone className="w-4 h-4 text-[#DCE7C6]" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Mail className="w-4 h-4 text-[#DCE7C6]" />
                  <span>info@hsa.com</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Connect</h3>
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 text-gray-400 hover:text-[#DCE7C6]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mb-4" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="text-xs text-gray-500">
            © {currentYear} Himalayan Sports Academy. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link to="/privacy" className="hover:text-[#DCE7C6] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-600">•</span>
            <Link to="/terms" className="hover:text-[#DCE7C6] transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-600">•</span>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-red-500" />
              <span>For Athletes</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Shield className="w-3 h-3 text-[#DCE7C6]" />
            <span>Accredited</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;