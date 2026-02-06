import React from "react";
import { NavLink } from "react-router";
import { Brain, Rocket, Zap, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="container mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
           Himalayan Sports Academy
          </h1>
        </NavLink>
        
        <nav className="flex items-center gap-6">
          <NavLink to="/" className="text-gray-300 hover:text-cyan-400 transition">Home</NavLink>
          <NavLink to="/features" className="text-gray-300 hover:text-cyan-400 transition">Features</NavLink>
          <NavLink to="/pricing" className="text-gray-300 hover:text-cyan-400 transition">Pricing</NavLink>
          <NavLink to="/login" className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-medium hover:from-cyan-500 hover:to-blue-500 transition">
            Sign In
          </NavLink>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Build the Future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">CodeClan</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of developers creating the next generation of digital experiences.
            Secure, scalable, and spectacularly fast.
          </p>
          <div className="flex gap-4 justify-center">
            <NavLink
              to="/signup"
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-bold text-lg hover:from-cyan-500 hover:to-blue-500 transition flex items-center gap-3"
            >
              <Rocket className="w-5 h-5" /> Get Started Free
            </NavLink>
            <NavLink
              to="/demo"
              className="px-8 py-4 border border-cyan-500/30 rounded-xl font-bold text-lg text-cyan-400 hover:bg-cyan-500/10 transition"
            >
              Watch Demo
            </NavLink>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "Lightning Fast", desc: "Blazing fast performance with our optimized stack." },
            { icon: Shield, title: "Secure by Design", desc: "Enterprise-grade security for your peace of mind." },
            { icon: Users, title: "Collaborative", desc: "Real-time collaboration tools for teams." },
          ].map((feat, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              <feat.icon className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">{feat.title}</h3>
              <p className="text-gray-400">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-white/10 text-center text-gray-400">
        <p>© 2023 CodeClan. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;