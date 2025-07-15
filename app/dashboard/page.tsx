"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  TrendingUp,
  Users,
  Briefcase,
  DollarSign,
  Calendar,
  MessageSquare,
  Star,
  Clock,
  Eye,
  ArrowRight,
  Plus,
  Target,
  Award,
  BarChart3,
  FileText,
  Video,
  Zap,
  Brain,
  Shield,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalCases: number
  activeBids: number
  monthlyEarnings: number
  clientRating: number
  responseTime: string
  successRate: number
}

interface RecentCase {
  id: string
  title: string
  client: string
  budget: string
  status: "pending" | "active" | "completed"
  deadline: string
  priority: "low" | "medium" | "high"
}

interface UpcomingAppointment {
  id: string
  client: string
  type: "consultation" | "meeting" | "court"
  time: string
  duration: string
  status: "confirmed" | "pending"
}

export default function DashboardPage() {
  const [stats] = useState<DashboardStats>({
    totalCases: 47,
    activeBids: 8,
    monthlyEarnings: 285000,
    clientRating: 4.9,
    responseTime: "< 2 hours",
    successRate: 94,
  })

  const [recentCases] = useState<RecentCase[]>([
    {
      id: "1",
      title: "Corporate Merger Documentation",
      client: "TechCorp Industries",
      budget: "₹2,50,000",
      status: "active",
      deadline: "2024-01-25",
      priority: "high",
    },
    {
      id: "2",
      title: "Employment Contract Review",
      client: "StartupXYZ",
      budget: "₹75,000",
      status: "pending",
      deadline: "2024-01-20",
      priority: "medium",
    },
    {
      id: "3",
      title: "Intellectual Property Filing",
      client: "InnovateTech",
      budget: "₹1,50,000",
      status: "completed",
      deadline: "2024-01-15",
      priority: "low",
    },
  ])

  const [upcomingAppointments] = useState<UpcomingAppointment[]>([
    {
      id: "1",
      client: "Rajesh Kumar",
      type: "consultation",
      time: "10:00 AM",
      duration: "1 hour",
      status: "confirmed",
    },
    {
      id: "2",
      client: "Priya Patel",
      type: "meeting",
      time: "2:30 PM",
      duration: "45 mins",
      status: "pending",
    },
    {
      id: "3",
      client: "Mumbai High Court",
      type: "court",
      time: "11:00 AM",
      duration: "2 hours",
      status: "confirmed",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "completed":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
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

  const getAppointmentIcon = (type: string) => {
    switch (type) {
      case "consultation":
        return Video
      case "meeting":
        return Users
      case "court":
        return Award
      default:
        return Calendar
    }
  }

  return (
    <DashboardLayout userType="lawyer">
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Good morning, Adv. Priya Sharma</h1>
            <p className="text-gray-400 text-lg">
              You have {stats.activeBids} active bids and {upcomingAppointments.length} appointments today
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
              asChild
            >
              <Link href="/marketplace">
                <Eye className="w-4 h-4 mr-2" />
                Browse Cases
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
              asChild
            >
              <Link href="/ai-assistant">
                <Brain className="w-4 h-4 mr-2" />
                AI Assistant
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Total Cases</p>
                  <p className="text-3xl font-bold text-white">{stats.totalCases}</p>
                  <p className="text-green-400 text-sm flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-[#FCD34D]/20 to-yellow-600/20 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-[#FCD34D]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Active Bids</p>
                  <p className="text-3xl font-bold text-white">{stats.activeBids}</p>
                  <p className="text-blue-400 text-sm flex items-center mt-1">
                    <Target className="w-4 h-4 mr-1" />5 pending responses
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Monthly Earnings</p>
                  <p className="text-3xl font-bold text-white">₹{stats.monthlyEarnings.toLocaleString()}</p>
                  <p className="text-green-400 text-sm flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +18% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Client Rating</p>
                  <p className="text-3xl font-bold text-white flex items-center">
                    {stats.clientRating}
                    <Star className="w-6 h-6 text-[#FCD34D] ml-2 fill-current" />
                  </p>
                  <p className="text-[#FCD34D] text-sm flex items-center mt-1">
                    <Award className="w-4 h-4 mr-1" />
                    Top 5% lawyers
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-[#FCD34D]/20 to-yellow-600/20 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-[#FCD34D]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-gray-800/50 border border-[#FCD34D]/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black">
                Overview
              </TabsTrigger>
              <TabsTrigger value="cases" className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black">
                Recent Cases
              </TabsTrigger>
              <TabsTrigger
                value="appointments"
                className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black"
              >
                Appointments
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black"
              >
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Performance Metrics */}
                <Card className="lg:col-span-2 bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-[#FCD34D]" />
                      Performance Metrics
                    </CardTitle>
                    <CardDescription>Your key performance indicators this month</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Success Rate</span>
                        <span className="text-white font-semibold">{stats.successRate}%</span>
                      </div>
                      <Progress value={stats.successRate} className="h-2" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Response Time</span>
                        <span className="text-white font-semibold">{stats.responseTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm">Excellent response time</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center p-4 bg-[#FCD34D]/10 rounded-lg border border-[#FCD34D]/20">
                        <p className="text-2xl font-bold text-[#FCD34D]">156</p>
                        <p className="text-gray-400 text-sm">Cases Won</p>
                      </div>
                      <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <p className="text-2xl font-bold text-blue-400">247</p>
                        <p className="text-gray-400 text-sm">Client Reviews</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[#FCD34D]" />
                      Quick Actions
                    </CardTitle>
                    <CardDescription>Frequently used tools and features</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      className="w-full bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                      asChild
                    >
                      <Link href="/ai-assistant">
                        <Brain className="w-4 h-4 mr-2" />
                        AI Legal Assistant
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
                      asChild
                    >
                      <Link href="/document-generator">
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Document
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10 bg-transparent"
                      asChild
                    >
                      <Link href="/story-mode">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Story Mode AI
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
                      asChild
                    >
                      <Link href="/blockchain">
                        <Shield className="w-4 h-4 mr-2" />
                        Blockchain Tools
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="cases" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Recent Cases</h3>
                <Button
                  className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                  asChild
                >
                  <Link href="/cases">
                    View All Cases
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4">
                {recentCases.map((case_item, index) => (
                  <motion.div
                    key={case_item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm hover:border-[#FCD34D]/40 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-lg font-semibold text-white">{case_item.title}</h4>
                              <Badge className={getStatusColor(case_item.status)}>{case_item.status}</Badge>
                              <Badge className={getPriorityColor(case_item.priority)}>
                                {case_item.priority} priority
                              </Badge>
                            </div>
                            <p className="text-gray-400 mb-3">Client: {case_item.client}</p>
                            <div className="flex items-center gap-6 text-sm text-gray-400">
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                <span>{case_item.budget}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>Due: {case_item.deadline}</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Today's Appointments</h3>
                <Button
                  className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                  asChild
                >
                  <Link href="/appointments">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule New
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4">
                {upcomingAppointments.map((appointment, index) => {
                  const IconComponent = getAppointmentIcon(appointment.type)
                  return (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm hover:border-[#FCD34D]/40 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-[#FCD34D]/20 to-yellow-600/20 rounded-xl flex items-center justify-center">
                                <IconComponent className="w-6 h-6 text-[#FCD34D]" />
                              </div>
                              <div>
                                <h4 className="text-lg font-semibold text-white">{appointment.client}</h4>
                                <p className="text-gray-400 capitalize">{appointment.type}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{appointment.time}</span>
                                  </div>
                                  <span>{appointment.duration}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge
                                className={
                                  appointment.status === "confirmed"
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                }
                              >
                                {appointment.status}
                              </Badge>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
                                >
                                  <Video className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
                                >
                                  <MessageSquare className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Case Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Corporate Law</span>
                        <span className="text-white font-semibold">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Criminal Law</span>
                        <span className="text-white font-semibold">30%</span>
                      </div>
                      <Progress value={30} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Family Law</span>
                        <span className="text-white font-semibold">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Monthly Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#FCD34D] mb-2">₹2,85,000</p>
                      <p className="text-green-400 text-sm flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +18% from last month
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Target</span>
                          <span className="text-white">₹3,00,000</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Client Satisfaction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <span className="text-3xl font-bold text-[#FCD34D]">{stats.clientRating}</span>
                        <Star className="w-6 h-6 text-[#FCD34D] ml-2 fill-current" />
                      </div>
                      <p className="text-gray-400 text-sm mb-4">Based on 247 reviews</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">5 stars</span>
                          <span className="text-white">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">4 stars</span>
                          <span className="text-white">12%</span>
                        </div>
                        <Progress value={12} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
