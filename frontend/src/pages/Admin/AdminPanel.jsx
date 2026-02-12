import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, Dumbbell, Calendar, Award, Trophy,
  Settings, LogOut, Bell, Search, Menu, X, ChevronRight,
  TrendingUp, TrendingDown, Activity, Clock, MapPin, Phone,
  Mail, Shield, Star, CheckCircle, AlertCircle, Eye,
  Edit2, Trash2, Plus, Download, Filter, MoreVertical,
  BarChart3, PieChart, LineChart, UserPlus, BookOpen,
  Building2, Heart, Brain, Monitor, Zap, Target,
  ChevronDown, ChevronLeft, RefreshCw, Printer, Share2,
  Crown, Medal, Flag, Briefcase, Clipboard, FileText
} from "lucide-react";

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Sidebar navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, color: "#030859" },
    { id: "users", label: "Users", icon: Users, color: "#5FD4E2" },
    { id: "facilities", label: "Facilities", icon: Building2, color: "#FBB102" },
    { id: "training", label: "Training", icon: Dumbbell, color: "#030859" },
    { id: "schedule", label: "Schedule", icon: Calendar, color: "#5FD4E2" },
    { id: "achievements", label: "Achievements", icon: Trophy, color: "#FBB102" },
    { id: "settings", label: "Settings", icon: Settings, color: "#030859" }
  ];

  // Stats data
  const stats = [
    { title: "Total Users", value: "2,847", change: "+12%", trend: "up", icon: Users, color: "#030859" },
    { title: "Active Sessions", value: "1,432", change: "+8%", trend: "up", icon: Activity, color: "#5FD4E2" },
    { title: "Facilities", value: "12", change: "+2", trend: "up", icon: Building2, color: "#FBB102" },
    { title: "Achievements", value: "48", change: "+5", trend: "up", icon: Trophy, color: "#030859" }
  ];

  // Recent users
  const recentUsers = [
    { name: "Rajesh Sharma", role: "Athlete", sport: "Weightlifting", status: "active", date: "Today, 9:30 AM", avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=64&h=64&fit=crop&q=80" },
    { name: "Priya Patel", role: "Coach", sport: "Endurance", status: "active", date: "Today, 8:15 AM", avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=64&h=64&fit=crop&q=80" },
    { name: "Arjun Singh", role: "Athlete", sport: "Athletics", status: "pending", date: "Yesterday", avatar: "https://images.unsplash.com/photo-1541534741688-6073d6a7ca9a?w=64&h=64&fit=crop&q=80" },
    { name: "Maya Verma", role: "Coach", sport: "Recovery", status: "active", date: "Yesterday", avatar: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=64&h=64&fit=crop&q=80" }
  ];

  // Recent bookings
  const recentBookings = [
    { facility: "Altitude Chamber", user: "Vikram Singh", time: "6:00 AM - 8:00 AM", status: "confirmed" },
    { facility: "Cryotherapy Center", user: "Ananya Patel", time: "10:00 AM - 11:00 AM", status: "pending" },
    { facility: "Biomechanics Lab", user: "Rohan Das", time: "2:00 PM - 4:00 PM", status: "confirmed" },
    { facility: "Hydrotherapy Complex", user: "Sneha Kapoor", time: "5:00 PM - 6:00 PM", status: "completed" }
  ];

  // System status
  const systemStatus = [
    { service: "User Authentication", status: "operational", uptime: "99.9%" },
    { service: "Booking System", status: "operational", uptime: "99.8%" },
    { service: "Training Analytics", status: "degraded", uptime: "95.2%" },
    { service: "Payment Gateway", status: "operational", uptime: "100%" }
  ];

  // Notifications
  const notifications = [
    { title: "New user registered", time: "5 min ago", read: false },
    { title: "Facility booking pending approval", time: "15 min ago", read: false },
    { title: "System update completed", time: "1 hour ago", read: true },
    { title: "Achievement reported", time: "2 hours ago", read: true }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "operational": return { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" };
      case "degraded": return { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-500" };
      case "down": return { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-500" };
      default: return { bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-500" };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 shadow-lg`}
      >
        {/* Logo Area */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#030859] to-[#5FD4E2] rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#030859]">HSA Admin</h2>
              <p className="text-xs text-gray-500">Himalayan Sports</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-[#030859]/10 to-[#5FD4E2]/10 text-[#030859] border-l-4 border-[#030859]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#030859]"
              }`}
            >
              <item.icon className="w-5 h-5" style={{ color: activeTab === item.id ? item.color : "" }} />
              <span className="font-medium">{item.label}</span>
              {activeTab === item.id && (
                <ChevronRight className="w-4 h-4 ml-auto text-[#030859]" />
              )}
            </button>
          ))}

          {/* Divider */}
          <div className="my-4 border-t border-gray-200" />

          {/* Logout */}
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
              )}
              
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users, bookings, facilities..."
                  className="pl-10 pr-4 py-2 w-80 rounded-lg border border-gray-300 focus:outline-none focus:border-[#030859] focus:ring-1 focus:ring-[#030859]/30"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 rounded-lg hover:bg-gray-100"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50"
                  >
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-[#030859]">Notifications</h3>
                        <button className="text-xs text-[#5FD4E2] hover:underline">Mark all read</button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors ${
                            !notification.read ? 'bg-[#5FD4E2]/5' : ''
                          }`}
                        >
                          <div className={`w-2 h-2 mt-2 rounded-full ${notification.read ? 'bg-gray-300' : 'bg-[#FBB102]'}`} />
                          <div>
                            <p className="text-sm text-gray-800">{notification.title}</p>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-200 text-center">
                      <button className="text-sm text-[#030859] hover:underline">View all</button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Admin Profile */}
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&q=80"
                  alt="Admin"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-[#030859]">Admin User</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {/* Dashboard Content */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Welcome Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
              >
                <div>
                  <h1 className="text-3xl font-bold text-[#030859]">Dashboard</h1>
                  <p className="text-gray-600">Welcome back! Here's your academy overview.</p>
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleString()}
                </div>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl" style={{ backgroundColor: `${stat.color}20` }}>
                        <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {stat.change}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-[#030859] mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.title}</div>
                  </motion.div>
                ))}
              </div>

              {/* Charts & Analytics */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* User Growth Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-[#030859]">User Growth</h3>
                      <p className="text-sm text-gray-600">+245 new users this month</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg bg-gray-100 text-[#030859]">
                        <BarChart3 className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                        <LineChart className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                        <PieChart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Chart Placeholder */}
                  <div className="h-64 relative">
                    <div className="absolute inset-0 flex items-end justify-between px-4">
                      {[65, 45, 80, 55, 70, 85, 90].map((height, i) => (
                        <div key={i} className="flex flex-col items-center w-12">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                            className="w-8 bg-gradient-to-t from-[#030859] to-[#5FD4E2] rounded-t-lg"
                            style={{ height: `${height}%` }}
                          />
                          <span className="text-xs text-gray-600 mt-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* System Status */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-[#030859] mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    System Status
                  </h3>
                  <div className="space-y-4">
                    {systemStatus.map((item, index) => {
                      const statusColor = getStatusColor(item.status);
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-[#030859]">{item.service}</div>
                            <div className="text-xs text-gray-500">Uptime: {item.uptime}</div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor.bg} ${statusColor.text}`}>
                            <div className={`w-2 h-2 rounded-full ${statusColor.dot} inline-block mr-1`} />
                            {item.status}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Server Load</span>
                      <span className="font-bold text-[#030859]">62%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div className="h-full w-[62%] bg-gradient-to-r from-[#030859] to-[#5FD4E2] rounded-full" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Recent Users & Bookings */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Users */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-[#030859]">Recent Users</h3>
                    <button className="text-sm text-[#5FD4E2] hover:underline">View All</button>
                  </div>
                  <div className="space-y-4">
                    {recentUsers.map((user, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <p className="font-medium text-[#030859]">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.role} • {user.sport}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.status}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{user.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Recent Bookings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-[#030859]">Recent Bookings</h3>
                    <button className="text-sm text-[#5FD4E2] hover:underline">View All</button>
                  </div>
                  <div className="space-y-4">
                    {recentBookings.map((booking, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50">
                        <div>
                          <p className="font-medium text-[#030859]">{booking.facility}</p>
                          <p className="text-sm text-gray-600">{booking.user} • {booking.time}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-[#030859]/10 via-[#5FD4E2]/10 to-[#DCE7C6]/20 rounded-2xl p-6 border border-[#5FD4E2]/30"
              >
                <h3 className="text-lg font-bold text-[#030859] mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#FBB102]" />
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Add User", icon: UserPlus, color: "#030859" },
                    { label: "Create Event", icon: Calendar, color: "#5FD4E2" },
                    { label: "Facility Booking", icon: Building2, color: "#FBB102" },
                    { label: "Generate Report", icon: FileText, color: "#030859" },
                    { label: "Send Notification", icon: Bell, color: "#5FD4E2" },
                    { label: "Approve Bookings", icon: CheckCircle, color: "#FBB102" },
                    { label: "Update System", icon: RefreshCw, color: "#030859" },
                    { label: "Export Data", icon: Download, color: "#5FD4E2" }
                  ].map((action, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-2 p-3 rounded-xl bg-white/80 hover:bg-white transition-colors border border-gray-200 hover:border-[#5FD4E2]"
                    >
                      <action.icon className="w-5 h-5" style={{ color: action.color }} />
                      <span className="text-sm font-medium text-[#030859]">{action.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* Other tabs placeholder */}
          {activeTab !== "dashboard" && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#DCE7C6] rounded-full flex items-center justify-center mx-auto mb-4">
                  {navItems.find(item => item.id === activeTab)?.icon && (
                    <div className="w-10 h-10 text-[#030859]" />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-[#030859] mb-2 capitalize">{activeTab} Management</h2>
                <p className="text-gray-600">This section is under construction. Coming soon!</p>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-auto p-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Himalayan Sports Academy. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <a href="#" className="hover:text-[#030859]">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-[#030859]">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-[#030859]">Help Center</a>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3 text-[#5FD4E2]" />
              <span className="text-xs text-gray-500">Admin v1.0</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Admin;