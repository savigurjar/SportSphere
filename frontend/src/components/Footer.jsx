// src/components/SimpleFooter.jsx
import React from "react";
import { Link } from "react-router";
import { 
  Trophy, MapPin, Phone, Mail, 
  Instagram, Facebook, Twitter, Youtube,
  ChevronRight, Heart
} from "lucide-react";

const SimpleFooter = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { to: "/about", label: "About" },
    { to: "/coaches", label: "Coaches" },
    { to: "/facilities", label: "Facilities" },
    { to: "/admissions", label: "Admissions" },
    { to: "/contact", label: "Contact" },
    { to: "/privacy", label: "Privacy" },
    { to: "/terms", label: "Terms" },
  ];

  const socials = [
    { icon: Instagram, href: "https://instagram.com/hsa", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/hsa", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/hsa", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com/hsa", label: "YouTube" },
  ];

  return (
    <footer className="bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-[#DCE7C6]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">HSA</h2>
                <p className="text-sm text-gray-400">Himalayan Sports Academy</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Training champions in the heart of the Himalayas since 2005.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-2 text-gray-400 hover:text-[#DCE7C6] transition-colors text-sm"
                >
                  <ChevronRight className="w-3 h-3" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-4 h-4 text-[#DCE7C6]" />
                  <span className="text-sm">Manali, Himachal Pradesh</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-4 h-4 text-[#DCE7C6]" />
                  <span className="text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-4 h-4 text-[#DCE7C6]" />
                  <span className="text-sm">info@hsa.com</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-gray-400 hover:text-[#DCE7C6] transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © {currentYear} Himalayan Sports Academy. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-[#DCE7C6] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#DCE7C6] transition-colors">
              Terms of Service
            </Link>
          </div>
          <div className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500" /> for athletes
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;