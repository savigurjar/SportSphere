import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Trophy, Target, Calendar, Activity, Award, TrendingUp, Users, BarChart, Clock, Star, TrendingDown } from 'lucide-react'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)

  const stats = [
    { title: "Training Sessions", value: "24", icon: Activity, color: "bg-[#5FD4E2]", change: "+12%", trend: "up" },
    { title: "Current Streak", value: "15 days", icon: Trophy, color: "bg-[#FBB102]", change: "+3 days", trend: "up" },
    { title: "Goals Achieved", value: "8/12", icon: Target, color: "bg-[#030859]", change: "+2 this week", trend: "up" },
    { title: "Next Session", value: "Tomorrow", icon: Calendar, color: "bg-[#DCE7C6]", change: "9:00 AM", trend: "neutral" }
  ]

  const recentActivities = [
    { title: "Morning Training Session", time: "Today, 9:00 AM", status: "completed", coach: "Coach Sharma" },
    { title: "Strength Training", time: "Yesterday, 4:00 PM", status: "completed", coach: "Coach Singh" },
    { title: "Cardio Session", time: "Tomorrow, 7:00 AM", status: "upcoming", coach: "Coach Patel" },
    { title: "Skill Development", time: "Tomorrow, 3:00 PM", status: "upcoming", coach: "Coach Verma" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#030859]">
                Welcome back, <span className="text-[#FBB102]">{user?.firstName || 'Athlete'}!</span>
              </h1>
              <p className="text-gray-600">Here's your training overview and progress</p>
            </div>
            <div className="text-sm text-gray-500">
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
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#5FD4E2] transition-all group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-20`}>
                  <stat.icon className="w-6 h-6" style={{ 
                    color: stat.color === 'bg-[#030859]' ? '#030859' :
                           stat.color === 'bg-[#FBB102]' ? '#FBB102' :
                           stat.color === 'bg-[#5FD4E2]' ? '#5FD4E2' : '#DCE7C6'
                  }} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {stat.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                  {stat.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#030859] mb-1">{stat.value}</h3>
              <p className="text-gray-600">{stat.title}</p>
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
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#030859] flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#5FD4E2]" />
                  Recent Activities
                </h2>
                <button className="text-sm text-[#030859] hover:text-[#5FD4E2] transition-colors font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-[#DCE7C6]/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 mt-2 rounded-full ${
                        activity.status === 'completed' ? 'bg-green-500' : 'bg-[#FBB102]'
                      }`} />
                      <div>
                        <h4 className="font-medium text-[#030859]">{activity.title}</h4>
                        <p className="text-sm text-gray-600">Coach: {activity.coach} • {activity.time}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-[#FBB102]/20 text-[#FBB102]'
                    }`}>
                      {activity.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Chart Placeholder */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-[#030859] mb-6 flex items-center gap-2">
                <BarChart className="w-5 h-5 text-[#5FD4E2]" />
                Progress Overview
              </h2>
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <BarChart className="w-12 h-12 mx-auto mb-2 opacity-50 text-[#5FD4E2]" />
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
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-[#030859] mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#5FD4E2]" />
                Quick Actions
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Schedule Training", icon: Calendar, color: "#5FD4E2" },
                  { label: "View Progress", icon: TrendingUp, color: "#030859" },
                  { label: "Book Facilities", icon: Trophy, color: "#FBB102" },
                  { label: "Meet Coaches", icon: Users, color: "#5FD4E2" },
                  { label: "Set New Goal", icon: Target, color: "#030859" },
                  { label: "Review Performance", icon: Star, color: "#FBB102" }
                ].map((action, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center gap-3 p-3 text-left rounded-lg bg-gray-50 hover:bg-[#DCE7C6]/30 transition-colors group/action"
                  >
                    <action.icon className={`w-5 h-5 group-hover/action:scale-110 transition-transform`} style={{ color: action.color }} />
                    <span className="text-[#030859] group-hover/action:text-[#FBB102] transition-colors">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-[#030859] mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#5FD4E2]" />
                Upcoming Events
              </h2>
              <div className="space-y-4">
                <div className="p-3 bg-[#5FD4E2]/10 rounded-lg border border-[#5FD4E2]/30">
                  <div className="text-sm font-medium text-[#030859]">Inter-Academy Tournament</div>
                  <div className="text-xs text-gray-600 mt-1">Sat, Dec 15 • 10:00 AM</div>
                </div>
                <div className="p-3 bg-[#FBB102]/10 rounded-lg border border-[#FBB102]/30">
                  <div className="text-sm font-medium text-[#030859]">Fitness Assessment</div>
                  <div className="text-xs text-gray-600 mt-1">Mon, Dec 18 • 9:00 AM</div>
                </div>
                <div className="p-3 bg-[#DCE7C6]/30 rounded-lg border border-[#DCE7C6]/50">
                  <div className="text-sm font-medium text-[#030859]">Coach Workshop</div>
                  <div className="text-xs text-gray-600 mt-1">Wed, Dec 20 • 3:00 PM</div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-[#030859] mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FBB102]" />
                Recent Achievements
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#FBB102]/10 rounded-lg">
                  <div className="w-10 h-10 bg-[#FBB102]/20 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-[#FBB102]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#030859]">Perfect Attendance</div>
                    <div className="text-xs text-gray-600">30 days streak</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#5FD4E2]/10 rounded-lg">
                  <div className="w-10 h-10 bg-[#5FD4E2]/20 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-[#5FD4E2]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#030859]">Personal Best</div>
                    <div className="text-xs text-gray-600">New record in 100m sprint</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#030859]/10 rounded-lg">
                  <div className="w-10 h-10 bg-[#030859]/20 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#030859]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#030859]">Consistency Award</div>
                    <div className="text-xs text-gray-600">4 weeks of perfect training</div>
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