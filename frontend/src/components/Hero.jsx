import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Target, Trophy, Award, Medal, TrendingUp, Users, 
  Clock, BarChart3, ChevronRight, Sparkles, Zap,
  Shield, Star, CheckCircle, ArrowRight, PlayCircle
} from "lucide-react";
import { Link } from "react-router";

const Hero = () => {
  const [stats, setStats] = useState({ athletes: 0, coaches: 0, medals: 0 });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  // Animated counter effect
  useEffect(() => {
    const targetStats = { athletes: 524, coaches: 58, medals: 127 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let current = { athletes: 0, coaches: 0, medals: 0 };
    const counters = {};

    Object.keys(targetStats).forEach(key => {
      counters[key] = setInterval(() => {
        const increment = Math.ceil(targetStats[key] / steps);
        current[key] = Math.min(current[key] + increment, targetStats[key]);
        
        setStats(prev => ({ ...prev, [key]: current[key] }));
        
        if (current[key] >= targetStats[key]) {
          clearInterval(counters[key]);
        }
      }, stepDuration);
    });

    return () => {
      Object.values(counters).forEach(clearInterval);
    };
  }, []);

  const features = [
    { icon: Shield, text: "Professional Coaching", color: "#030859" },
    { icon: Clock, text: "24/7 Training Facilities", color: "#5FD4E2" },
    { icon: BarChart3, text: "Performance Analytics", color: "#FBB102" },
    { icon: Users, text: "Team Building", color: "#030859" },
  ];

  return (
    <section className="relative overflow-hidden bg-white pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5FD4E2]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FBB102]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#5FD4E2]/30 to-transparent" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
            }}
            animate={{
              x: [null, Math.random() * 100 + "vw"],
              y: [null, Math.random() * 100 + "vh"],
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Sparkles className="w-3 h-3 text-[#5FD4E2]/40" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Logo and Badge */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="/logoo.png"
                  alt="Himalayan Sports Academy Logo"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <div className="inline-flex items-center gap-2 bg-[#DCE7C6]/80 px-4 py-2 rounded-full border border-[#030859]/20">
                <Zap className="w-4 h-4 text-[#FBB102]" />
                <span className="text-sm font-medium text-[#030859]">
                  Elite Sports Training Since 2010
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block text-[#030859]">Elevate Your</span>
              <span className="block mt-2 bg-gradient-to-r from-[#030859] via-[#5FD4E2] to-[#030859] bg-clip-text text-transparent animate-gradient">
                Athletic Journey
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-700 max-w-2xl">
              Transform potential into performance with cutting-edge training methodologies, 
              expert coaching, and state-of-the-art facilities designed for champions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden bg-gradient-to-r from-[#030859] to-[#030859] hover:from-[#FBB102] hover:to-[#FBB102] px-8 py-4 rounded-xl font-semibold text-white transition-all shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <span>Start Training Today</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </motion.button>

              <Link
                to="/programs"
                className="group flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-[#030859] hover:text-[#030859] transition-colors border border-[#5FD4E2] hover:border-[#030859] bg-white shadow-md hover:shadow-lg"
              >
                <PlayCircle className="w-5 h-5 text-[#5FD4E2]" />
                <span>View Programs</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#030859]" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { value: `${stats.athletes}+`, label: "Active Athletes", icon: Users, color: "#030859" },
                { value: `${stats.coaches}+`, label: "Expert Coaches", icon: Trophy, color: "#FBB102" },
                { value: `${stats.medals}+`, label: "Medals Won", icon: Medal, color: "#5FD4E2" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-gradient-to-br from-white to-[#DCE7C6]/20 border border-[#030859]/10 hover:border-[#5FD4E2] transition-all hover:shadow-md"
                >
                  <div className="text-3xl font-bold text-[#030859]">
                    {stat.value}
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`group relative overflow-hidden bg-white rounded-2xl p-6 border ${
                  feature.color === "#030859" 
                    ? "border-[#030859]/20 hover:border-[#030859]" 
                    : feature.color === "#FBB102"
                    ? "border-[#FBB102]/20 hover:border-[#FBB102]"
                    : "border-[#5FD4E2]/20 hover:border-[#5FD4E2]"
                } transition-all shadow-lg hover:shadow-xl`}
              >
                {/* Background Gradient */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                  style={{ backgroundColor: feature.color }}
                />
                
                {/* Icon */}
                <div 
                  className="relative z-10 inline-flex p-3 rounded-xl shadow-md"
                  style={{ backgroundColor: feature.color }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="relative z-10 mt-4 text-lg font-semibold text-[#030859]">
                  {feature.text}
                </h3>
                <p className="relative z-10 mt-2 text-sm text-gray-600">
                  World-class facilities and expert guidance for optimal performance
                </p>
                
                {/* Hover Indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-5 h-5 text-[#030859]" />
                </div>
              </motion.div>
            ))}

            {/* Achievement Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="relative col-span-2 mt-4 overflow-hidden rounded-2xl bg-gradient-to-r from-[#5FD4E2]/10 to-[#DCE7C6]/30 border border-[#5FD4E2]/30 p-6"
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#5FD4E2]/20 rounded-full blur-2xl" />
              
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#FBB102]" />
                    <h3 className="text-lg font-semibold text-[#030859]">Recognized Excellence</h3>
                  </div>
                  <p className="mt-2 text-gray-700">
                    Awarded "Best Sports Academy 2024" by National Sports Authority
                  </p>
                </div>
                
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-r from-[#5FD4E2] to-[#030859] shadow-md"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 mb-2">Explore More</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-gradient-to-b from-[#030859] to-[#5FD4E2] rounded-full mt-2" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Animated Bottom Wave - Light version */}
      <div className="absolute bottom-0 left-0 right-0 h-32">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="fill-[#DCE7C6]"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            className="fill-[#5FD4E2] opacity-30"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;