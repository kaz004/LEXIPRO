"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  Users,
  Briefcase,
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  FileText,
  Star,
  ArrowRight,
  Phone,
  Video,
} from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { format } from "date-fns"

interface Case {
  id: string
  title: string
  client: string
  status: "active" | "pending" | "completed"
  priority: "high" | "medium" | "low"
  progress: number
  dueDate: Date
  value: string
}

interface Appointment {
  id: string
  client: string
  type: "consultation" | "meeting" | "court"
  time: Date
  duration: string
  status: "upcoming" | "ongoing" | "completed"
}

interface Activity {
  id: string
  type: "case_update" | "new_client" | "payment" | "document"
  message: string
  time: Date
  client?: string
}

const mockCases: Case[] = [
  {
    id: "1",
    title: "Corporate Merger Agreement",
    client: "TechStart Inc.",
    status: "active",
    priority: "high",
    progress: 75,
    dueDate: new Date("2024-07-20"),
    value: "₹2,50,000",
  },
  {
    id: "2",
    title: "Employment Dispute",
    client: "John Doe",
    status: "pending",
    priority: "medium",
    progress: 30,
    dueDate: new Date("2024-07-25"),
    value: "₹75,000",
  },
  {
    id: "3",
    title: "IP Patent Filing",
    client: "InnovateTech",
    status: "active",
    priority: "high",
    progress: 90,
    dueDate: new Date("2024-07-18"),
    value: "₹1,20,000",
  },
]

const mockAppointments: Appointment[] = [
  {
    id: "1",
    client: "Sarah Wilson",
    type: "consultation",
    time: new Date("2024-07-16T10:00:00"),
    duration: "1 hour",
    status: "upcoming",
  },
  {
    id: "2",
    client: "TechStart Inc.",
    type: "meeting",
    time: new Date("2024-07-16T14:30:00"),
    duration: "2 hours",
    status: "upcoming",
  },
  {
    id: "3",
    client: "Mumbai High Court",
    type: "court",
    time: new Date("2024-07-17T11:00:00"),
    duration: "3 hours",
    status: "upcoming",
  },
]

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "case_update",
    message: "Updated case status for Corporate Merger Agreement",
    time: new Date("2024-07-15T16:30:00"),
    client: "TechStart Inc.",
  },
  {
    id: "2",
    type: "new_client",
    message: "New client consultation scheduled",
    time: new Date("2024-07-15T14:20:00"),
    client: "Sarah Wilson",
  },
  {
    id: "3",
    type: "payment",
    message: "Payment received for IP Patent Filing",
    time: new Date("2024-07-15T11:45:00"),
    client: "InnovateTech",
  },
  {
    id: "4",
    type: "document",
    message: "Contract draft submitted for review",
    time: new Date("2024-07-15T09:15:00"),
    client: "TechStart Inc.",
  },
]

export default function LawyerDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "case_update":
        return <Briefcase className="w-4 h-4" />
      case "new_client":
        return <Users className="w-4 h-4" />
      case "payment":
        return <DollarSign className="w-4 h-4" />
      case "document":
        return <FileText className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <DashboardLayout>
      {" "}
      {/* Removed userType prop */}
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back, Advocate Sarah Johnson</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-[#FCD34D]/20 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
            <Button className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold">
              <MessageSquare className="w-4 h-4 mr-2" />
              New Consultation
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-400 text-sm font-medium">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-white">₹4,45,000</p>
                    <p className="text-green-400 text-xs flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12% from last month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-400 text-sm font-medium">Active Cases</p>
                    <p className="text-2xl font-bold text-white">24</p>
                    <p className="text-blue-400 text-xs flex items-center mt-1">
                      <CheckCircle className="w-3 h-3 mr-1" />3 completed this week
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-400 text-sm font-medium">Total Clients</p>
                    <p className="text-2xl font-bold text-white">156</p>
                    <p className="text-purple-400 text-xs flex items-center mt-1">
                      <Users className="w-3 h-3 mr-1" />8 new this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/20 border-yellow-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-400 text-sm font-medium">Success Rate</p>
                    <p className="text-2xl font-bold text-white">94%</p>
                    <p className="text-yellow-400 text-xs flex items-center mt-1">
                      <Star className="w-3 h-3 mr-1" />
                      4.9/5 client rating
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Cases */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Recent Cases</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/lawyer/cases" className="text-[#FCD34D] hover:text-yellow-400">
                      View All <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockCases.map((case_item) => (
                  <div key={case_item.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{case_item.title}</h4>
                        <p className="text-sm text-gray-400">{case_item.client}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(case_item.status)}>{case_item.status}</Badge>
                        <Badge className={getPriorityColor(case_item.priority)}>{case_item.priority}</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white">{case_item.progress}%</span>
                      </div>
                      <Progress value={case_item.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Due: {format(case_item.dueDate, "MMM dd, yyyy")}</span>
                        <span className="text-[#FCD34D] font-medium">{case_item.value}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Appointments */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Today's Schedule</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/lawyer/appointments" className="text-[#FCD34D] hover:text-yellow-400">
                      View All <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FCD34D]/20 rounded-lg flex items-center justify-center">
                          {appointment.type === "consultation" && <MessageSquare className="w-5 h-5 text-[#FCD34D]" />}
                          {appointment.type === "meeting" && <Users className="w-5 h-5 text-[#FCD34D]" />}
                          {appointment.type === "court" && <Briefcase className="w-5 h-5 text-[#FCD34D]" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{appointment.client}</h4>
                          <p className="text-sm text-gray-400 capitalize">{appointment.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-white">{format(appointment.time, "h:mm a")}</p>
                        <p className="text-xs text-gray-400">{appointment.duration}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#FCD34D]/20 text-[#FCD34D] bg-transparent"
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#FCD34D]/20 text-[#FCD34D] bg-transparent"
                      >
                        <Video className="w-3 h-3 mr-1" />
                        Video
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/30">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription className="text-gray-400">Your latest actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-3 bg-gray-800/30 rounded-lg">
                    <div className="w-8 h-8 bg-[#FCD34D]/20 rounded-lg flex items-center justify-center text-[#FCD34D]">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.message}</p>
                      {activity.client && <p className="text-gray-400 text-xs mt-1">Client: {activity.client}</p>}
                      <p className="text-gray-500 text-xs mt-1">{format(activity.time, "MMM dd, h:mm a")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
