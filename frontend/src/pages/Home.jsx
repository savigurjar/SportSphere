// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from "react";
import { 
  Trophy, Target, Activity, Award, Medal, Heart, Users, Shield, 
  Calendar, BarChart, Clock, MapPin, Star, ChevronRight, ChevronLeft,
  Play, Pause, Volume2, VolumeX, Facebook, Twitter, Instagram, Youtube,
  Mail, Phone, MapPin as MapIcon, ArrowRight, CheckCircle, Zap,
  TrendingUp, Globe, Users as UsersIcon, Sparkles
} from "lucide-react";
import { NavLink, Link } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Particles from "../components/Particles";

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
  
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
  
  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
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
      
      <div
        className="absolute inset-0 opacity-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(21, 101, 192, 0.3), transparent 40%)`,
          opacity: isHovered ? 0.3 : 0.1,
        }}
      />
      
      <div className="absolute inset-0 rounded-3xl p-[1px]">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-900/30 via-blue-700/30 to-[#DCE7C6]/30 blur-sm" />
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-900/10 via-blue-700/10 to-[#DCE7C6]/10" />
      </div>
      
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

/* ---------------- NAVIGATION BAR ---------------- */
const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Programs', href: '#programs' },
    { label: 'Coaches', href: '#coaches' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Events', href: '#events' },
    { label: 'Results', href: '#results' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-[#DCE7C6]" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-[#DCE7C6] to-blue-300 bg-clip-text text-transparent">
                HSA
              </h1>
              <p className="text-xs text-gray-400">Himalayan Sports Academy</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-gray-300 hover:text-[#DCE7C6] transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#DCE7C6] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <NavLink
              to="/login"
              className="px-4 py-2 text-sm text-[#DCE7C6] hover:text-white transition-colors"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="px-6 py-2 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 rounded-full text-sm text-white font-medium transition-all"
            >
              Join Now
            </NavLink>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

/* ---------------- HERO SECTION ---------------- */
const HeroSection = () => {
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [muted, setMuted] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted={muted}
          className="w-full h-full object-cover opacity-30"
          onClick={() => setVideoPlaying(!videoPlaying)}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-athlete-training-on-the-beach-5018-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/10">
              <Sparkles className="w-4 h-4 text-[#DCE7C6]" />
              <span className="text-sm text-gray-300">🏆 #1 Sports Academy in Himalayas</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="text-white">Unleash Your</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[#DCE7C6] to-blue-300">
                Champion Spirit
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Train at the world's most advanced sports academy nestled in the majestic Himalayas. 
              Where champions are born and legends are made.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink
                to="/signup"
                className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 rounded-full text-lg text-white font-semibold transition-all flex items-center justify-center gap-2 group"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </NavLink>
              <a
                href="#tour"
                className="px-8 py-4 bg-black/40 backdrop-blur-xl border border-white/10 hover:border-[#DCE7C6]/50 rounded-full text-lg text-white font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Virtual Tour
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
              {[
                { value: "500+", label: "Active Athletes", icon: Users },
                { value: "50+", label: "Expert Coaches", icon: Trophy },
                { value: "95%", label: "Success Rate", icon: TrendingUp },
                { value: "24/7", label: "Training Support", icon: Clock },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#DCE7C6] mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
        <button
          onClick={() => setVideoPlaying(!videoPlaying)}
          className="p-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 hover:border-[#DCE7C6]/50 transition-colors"
        >
          {videoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={() => setMuted(!muted)}
          className="p-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 hover:border-[#DCE7C6]/50 transition-colors"
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="text-sm text-gray-400 animate-bounce">Scroll to explore</div>
      </motion.div>
    </section>
  );
};

/* ---------------- PROGRAMS SECTION ---------------- */
const ProgramsSection = () => {
  const programs = [
    {
      title: "Elite Training",
      icon: Trophy,
      description: "Advanced training programs for professional athletes",
      features: ["Personalized Coaching", "Sports Science", "Nutrition Plans"],
      duration: "12-24 months",
      level: "Advanced",
      color: "from-blue-700 to-blue-900",
    },
    {
      title: "Junior Academy",
      icon: Users,
      description: "Development programs for young athletes (8-16 years)",
      features: ["Skill Development", "Fitness Training", "Mental Coaching"],
      duration: "6-12 months",
      level: "Beginner",
      color: "from-blue-800 to-blue-700",
    },
    {
      title: "Sports Science",
      icon: Activity,
      description: "Cutting-edge sports science and performance analysis",
      features: ["Biomechanics", "Injury Prevention", "Recovery"],
      duration: "Custom",
      level: "All Levels",
      color: "from-blue-900 to-blue-800",
    },
    {
      title: "Mountain Sports",
      icon: MapPin,
      description: "Specialized training for mountain sports",
      features: ["Rock Climbing", "Trail Running", "Winter Sports"],
      duration: "8-16 weeks",
      level: "Intermediate",
      color: "from-blue-600 to-blue-800",
    },
  ];

  return (
    <section id="programs" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 mb-6">
            <Sparkles className="w-4 h-4 text-[#DCE7C6]" />
            <span className="text-sm text-gray-300">Our Programs</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            World-Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#DCE7C6]">Training Programs</span>
          </h2>
          <p className="text-xl text-gray-300">
            Choose from our diverse range of programs designed to cater to athletes of all levels and disciplines.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <HolographicCard className="h-full">
                <div className="p-6 h-full flex flex-col">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center mb-6`}>
                    <program.icon className="w-7 h-7 text-[#DCE7C6]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">{program.title}</h3>
                  <p className="text-gray-400 mb-6 flex-grow">{program.description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#DCE7C6]" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500">Duration</div>
                      <div className="text-sm text-white">{program.duration}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Level</div>
                      <div className="text-sm font-medium text-[#DCE7C6]">{program.level}</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="mt-6 w-full py-3 bg-gradient-to-r from-blue-700/20 to-blue-900/20 hover:from-blue-600/30 hover:to-blue-800/30 rounded-lg text-[#DCE7C6] font-medium transition-all border border-[#DCE7C6]/20">
                    Learn More
                  </button>
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- COACHES SECTION ---------------- */
const CoachesSection = () => {
  const coaches = [
    {
      name: "Alex Morgan",
      role: "Head Coach - Athletics",
      experience: "15+ years",
      specialty: "Sprint & Endurance",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=500",
      achievements: ["Olympic Gold Medalist", "World Record Holder"],
    },
    {
      name: "Sarah Chen",
      role: "Sports Scientist",
      experience: "12+ years",
      specialty: "Biomechanics",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500",
      achievements: ["PhD in Sports Science", "Published Researcher"],
    },
    {
      name: "Michael Rodriguez",
      role: "Strength & Conditioning",
      experience: "18+ years",
      specialty: "Power Training",
      image: "https://images.unsplash.com/photo-1534367507877-0edd93bd013b?auto=format&fit=crop&w=500",
      achievements: ["NSCA Certified", "Pro Athlete Trainer"],
    },
    {
      name: "Lisa Yamamoto",
      role: "Nutrition Specialist",
      experience: "10+ years",
      specialty: "Sports Nutrition",
      image: "https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?auto=format&fit=crop&w=500",
      achievements: ["Registered Dietitian", "Author"],
    },
  ];

  return (
    <section id="coaches" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 mb-6">
            <UsersIcon className="w-4 h-4 text-[#DCE7C6]" />
            <span className="text-sm text-gray-300">Expert Team</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#DCE7C6]">Elite Coaches</span>
          </h2>
          <p className="text-xl text-gray-300">
            Learn from world-class coaches and specialists with proven track records of success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coaches.map((coach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <HolographicCard>
                <div className="p-6">
                  {/* Image */}
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[#DCE7C6]/20">
                      <img
                        src={coach.image}
                        alt={coach.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-[#DCE7C6]" />
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="text-xl font-bold text-white text-center mb-2">{coach.name}</h3>
                  <p className="text-[#DCE7C6] text-center mb-3">{coach.role}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Experience</span>
                      <span className="text-white">{coach.experience}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Specialty</span>
                      <span className="text-white">{coach.specialty}</span>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-2">
                    {coach.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Star className="w-3 h-3 text-[#DCE7C6]" />
                        <span className="text-xs text-gray-300">{achievement}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="mt-6 w-full py-2 bg-gradient-to-r from-blue-700/20 to-blue-900/20 hover:from-blue-600/30 hover:to-blue-800/30 rounded-lg text-[#DCE7C6] text-sm font-medium transition-all">
                    View Profile
                  </button>
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- FACILITIES SECTION ---------------- */
const FacilitiesSection = () => {
  const facilities = [
    {
      name: "Olympic Stadium",
      description: "World-class track and field facility",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800",
      features: ["400m Track", "Digital Timing", "10,000 Seats"],
    },
    {
      name: "Sports Science Lab",
      description: "Advanced testing and analysis equipment",
      image: "https://images.unsplash.com/photo-1576671416351-fa588ee13f6d?auto=format&fit=crop&w=800",
      features: ["Motion Capture", "VO2 Max Testing", "Force Plates"],
    },
    {
      name: "Indoor Arena",
      description: "Multi-purpose indoor sports complex",
      image: "https://images.unsplash.com/photo-1549060279-7e168fce7090?auto=format&fit=crop&w=800",
      features: ["Basketball", "Volleyball", "Badminton"],
    },
    {
      name: "Recovery Center",
      description: "State-of-the-art recovery facilities",
      image: "https://images.unsplash.com/photo-1540496905036-5937c10647cc?auto=format&fit=crop&w=800",
      features: ["Cryotherapy", "Hydrotherapy", "Massage"],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="facilities" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 mb-6">
            <Zap className="w-4 h-4 text-[#DCE7C6]" />
            <span className="text-sm text-gray-300">World-Class Facilities</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            State-of-the-Art <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#DCE7C6]">Training Facilities</span>
          </h2>
          <p className="text-xl text-gray-300">
            Train in some of the most advanced sports facilities in the world, equipped with cutting-edge technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Carousel */}
          <div className="relative h-[400px] rounded-3xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={facilities[activeIndex].image}
                alt={facilities[activeIndex].name}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Navigation */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between">
              <button
                onClick={() => setActiveIndex((activeIndex - 1 + facilities.length) % facilities.length)}
                className="p-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 hover:border-[#DCE7C6]/50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveIndex((activeIndex + 1) % facilities.length)}
                className="p-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 hover:border-[#DCE7C6]/50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Facilities List */}
          <div className="space-y-6">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <HolographicCard
                  className={`cursor-pointer transition-all ${
                    activeIndex === index ? 'border-[#DCE7C6]/30' : ''
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{facility.name}</h3>
                        <p className="text-gray-400 mb-4">{facility.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {facility.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-black/40 rounded-full text-xs text-gray-300"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activeIndex === index 
                          ? 'bg-gradient-to-r from-blue-700 to-blue-900' 
                          : 'bg-white/10'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${
                          activeIndex === index ? 'bg-[#DCE7C6]' : 'bg-gray-400'
                        }`} />
                      </div>
                    </div>
                  </div>
                </HolographicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- TESTIMONIALS SECTION ---------------- */
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "National Champion - Athletics",
      text: "Training at HSA transformed my career. The world-class facilities and expert coaching helped me achieve my dream of becoming a national champion.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200",
    },
    {
      name: "Priya Sharma",
      role: "Junior Athlete",
      text: "The Junior Academy program is incredible. I've improved my skills significantly and made lifelong friends. The coaches truly care about our development.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=200",
    },
    {
      name: "Michael Thompson",
      role: "International Coach",
      text: "As a visiting coach, I was blown away by the facilities and expertise at HSA. This is one of the best sports academies in the world.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200",
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 mb-6">
            <Star className="w-4 h-4 text-[#DCE7C6]" />
            <span className="text-sm text-gray-300">Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#DCE7C6]">Athletes Say</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <HolographicCard>
            <div className="p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-8 rounded-full overflow-hidden border-4 border-[#DCE7C6]/20">
                    <img
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="text-3xl mb-8 text-white">
                    "{testimonials[activeTestimonial].text}"
                  </div>
                  
                  <div>
                    <div className="text-xl font-bold text-white mb-2">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-[#DCE7C6]">
                      {testimonials[activeTestimonial].role}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-12">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activeTestimonial === index 
                        ? 'bg-[#DCE7C6] w-8' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </HolographicCard>
        </div>
      </div>
    </section>
  );
};

/* ---------------- CTA SECTION ---------------- */
const CTASection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <HolographicCard className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=2000"
              alt="Athletes training"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          
          <div className="relative p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Begin Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#DCE7C6]">Champion Journey?</span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Join hundreds of athletes who have transformed their careers at the Himalayan Sports Academy. 
              Applications are now open for the upcoming season.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink
                to="/signup"
                className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 rounded-full text-lg text-white font-semibold transition-all"
              >
                Apply Now
              </NavLink>
              
              <a
                href="#contact"
                className="px-8 py-4 bg-black/40 backdrop-blur-xl border border-white/10 hover:border-[#DCE7C6]/50 rounded-full text-lg text-white font-semibold transition-all"
              >
                Schedule a Tour
              </a>
            </div>
            
            <div className="mt-10 text-sm text-gray-400">
              Limited spots available. Early applications receive priority consideration.
            </div>
          </div>
        </HolographicCard>
      </div>
    </section>
  );
};

/* ---------------- FOOTER ---------------- */
const Footer = () => {
  const quickLinks = [
    { label: 'Home', href: '#' },
    { label: 'Programs', href: '#programs' },
    { label: 'Coaches', href: '#coaches' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Events', href: '#events' },
    { label: 'Contact', href: '#contact' },
  ];

  const contactInfo = [
    { icon: MapIcon, text: 'Himalayan Sports Academy, Dharmasala, Himachal Pradesh, India' },
    { icon: Phone, text: '+91 98765 43210' },
    { icon: Mail, text: 'info@hsa.academy' },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
  ];

  return (
    <footer className="relative border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-[#DCE7C6]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Himalayan Sports Academy</h2>
                <p className="text-sm text-gray-400">Excellence in Sports</p>
              </div>
            </div>
            <p className="text-gray-400">
              Premier sports academy in the Himalayas dedicated to developing world-class athletes through cutting-edge training and expert coaching.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#DCE7C6] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-3">
                  <info.icon className="w-5 h-5 text-[#DCE7C6] mt-1" />
                  <span className="text-gray-400">{info.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and training tips.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DCE7C6]"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 rounded-lg text-white font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Himalayan Sports Academy. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="p-2 bg-black/40 rounded-lg border border-white/10 hover:border-[#DCE7C6]/50 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 text-gray-400 hover:text-[#DCE7C6] transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ---------------- MAIN HOME COMPONENT ---------------- */
const Home = () => {
  const [visualEffects, setVisualEffects] = useState(true);

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
      
      <div className="relative min-h-screen bg-black overflow-hidden">
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

        {/* Navigation */}
        <NavigationBar />

        {/* Hero Section */}
        <HeroSection />

        {/* Programs Section */}
        <ProgramsSection />

        {/* Coaches Section */}
        <CoachesSection />

        {/* Facilities Section */}
        <FacilitiesSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* CTA Section */}
        <CTASection />

        {/* Footer */}
        <Footer />

        {/* Settings Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-8 right-8 z-50"
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
        <div className="fixed top-8 left-8 z-50">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
              <span>HSA Academy: Live</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div>v2.4.1</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;