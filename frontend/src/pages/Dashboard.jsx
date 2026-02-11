// src/pages/Dashboard.jsx
import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Trophy, Target, Calendar, Activity, Award, TrendingUp, Users, BarChart, Clock, Star, TrendingDown } from 'lucide-react'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)

  const stats = [
    { title: "Training Sessions", value: "24", icon: Activity, color: "bg-blue-500", change: "+12%", trend: "up" },
    { title: "Current Streak", value: "15 days", icon: Trophy, color: "bg-[#DCE7C6]", change: "+3 days", trend: "up" },
    { title: "Goals Achieved", value: "8/12", icon: Target, color: "bg-green-500", change: "+2 this week", trend: "up" },
    { title: "Next Session", value: "Tomorrow", icon: Calendar, color: "bg-purple-500", change: "9:00 AM", trend: "neutral" }
  ]

  const recentActivities = [
    { title: "Morning Training Session", time: "Today, 9:00 AM", status: "completed", coach: "Coach Sharma" },
    { title: "Strength Training", time: "Yesterday, 4:00 PM", status: "completed", coach: "Coach Singh" },
    { title: "Cardio Session", time: "Tomorrow, 7:00 AM", status: "upcoming", coach: "Coach Patel" },
    { title: "Skill Development", time: "Tomorrow, 3:00 PM", status: "upcoming", coach: "Coach Verma" }
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, <span className="text-[#DCE7C6]">{user?.firstName || 'Athlete'}!</span>
              </h1>
              <p className="text-gray-400">Here's your training overview and progress</p>
            </div>
            <div className="text-sm text-gray-400">
              Last login: Today, 10:30 AM
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#DCE7C6]/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-20`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-400' : 
                  stat.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {stat.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                  {stat.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#DCE7C6]" />
                  Recent Activities
                </h2>
                <button className="text-sm text-[#DCE7C6] hover:text-blue-300 transition-colors">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 mt-2 rounded-full ${
                        activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <div>
                        <h4 className="font-medium text-white">{activity.title}</h4>
                        <p className="text-sm text-gray-400">Coach: {activity.coach} • {activity.time}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {activity.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Chart Placeholder */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <BarChart className="w-5 h-5 text-[#DCE7C6]" />
                Progress Overview
              </h2>
              <div className="h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <BarChart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Progress chart will be displayed here</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#DCE7C6]" />
                Quick Actions
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Schedule Training", icon: Calendar, color: "text-blue-400" },
                  { label: "View Progress", icon: TrendingUp, color: "text-green-400" },
                  { label: "Book Facilities", icon: Trophy, color: "text-[#DCE7C6]" },
                  { label: "Meet Coaches", icon: Users, color: "text-purple-400" },
                  { label: "Set New Goal", icon: Target, color: "text-yellow-400" },
                  { label: "Review Performance", icon: Star, color: "text-red-400" }
                ].map((action, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center gap-3 p-3 text-left rounded-lg bg-white/5 hover:bg-white/10 transition-colors group/action"
                  >
                    <action.icon className={`w-5 h-5 ${action.color} group-hover/action:scale-110 transition-transform`} />
                    <span className="text-white group-hover/action:text-[#DCE7C6] transition-colors">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#DCE7C6]" />
                Upcoming Events
              </h2>
              <div className="space-y-4">
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <div className="text-sm font-medium text-blue-400">Inter-Academy Tournament</div>
                  <div className="text-xs text-gray-400 mt-1">Sat, Dec 15 • 10:00 AM</div>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                  <div className="text-sm font-medium text-green-400">Fitness Assessment</div>
                  <div className="text-xs text-gray-400 mt-1">Mon, Dec 18 • 9:00 AM</div>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <div className="text-sm font-medium text-purple-400">Coach Workshop</div>
                  <div className="text-xs text-gray-400 mt-1">Wed, Dec 20 • 3:00 PM</div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#DCE7C6]" />
                Recent Achievements
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-500/5 rounded-lg">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Perfect Attendance</div>
                    <div className="text-xs text-gray-400">30 days streak</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-500/5 rounded-lg">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Personal Best</div>
                    <div className="text-xs text-gray-400">New record in 100m sprint</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard