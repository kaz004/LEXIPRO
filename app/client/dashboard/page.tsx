"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  Users,
  Calendar,
  MessageSquare,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Gavel,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { format } from "date-fns"
import { Brain } from "lucide-react" // Import Brain component

interface Case {
  id: string
  title: string
  status: "open" | "in-progress" | "closed" | "on-hold"
  category: string
  lastUpdate: Date
  progress: number
}

interface Appointment {
  id: string
  lawyerName: string
  date: Date
  time: string
  status: "scheduled" | "confirmed" | "completed" | "cancelled"
  type: string
}

const mockCases: Case[] = [
  {
    id: "1",
    title: "Contract Review for Startup Funding",
    status: "in-progress",
    category: "Corporate Law",
    lastUpdate: new Date("2024-07-15T10:00:00Z"),
    progress: 75,
  },
  {
    id: "2",
    title: "Property Dispute Resolution",
    status: "on-hold",
    category: "Real Estate",
    lastUpdate: new Date("2024-07-10T14:30:00Z"),
    progress: 40,
  },
  {
    id: "3",
    title: "Trademark Registration",
    status: "open",
    category: "Intellectual Property",
    lastUpdate: new Date("2024-07-12T09:00:00Z"),
    progress: 10,
  },
]

const mockAppointments: Appointment[] = [
  {
    id: "a1",
    lawyerName: "Adv. Rahul Sharma",
    date: new Date("2024-07-20T10:00:00Z"),
    time: "10:00 AM",
    status: "scheduled",
    type: "Initial Consultation",
  },
  {
    id: "a2",
    lawyerName: "Adv. Priya Singh",
    date: new Date("2024-07-22T14:00:00Z"),
    time: "02:00 PM",
    status: "confirmed",
    type: "Case Strategy Discussion",
  },
]

export default function ClientDashboardPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "open":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "on-hold":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "closed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getAppointmentStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "confirmed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <DashboardLayout>
      {" "}
      {/* Removed userType prop */}
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome, Client!</h1>
            <p className="text-gray-400">Your personalized legal dashboard at a glance.</p>
          </div>
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
            asChild
          >
            <Link href="/client/post-case">
              <Gavel className="w-4 h-4 mr-2" />
              Post a New Case
            </Link>
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active Cases</CardTitle>
              <Briefcase className="h-5 w-5 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {mockCases.filter((c) => c.status !== "closed").length}
              </div>
              <p className="text-xs text-gray-500">+2 new this month</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Upcoming Appointments</CardTitle>
              <Calendar className="h-5 w-5 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockAppointments.length}</div>
              <p className="text-xs text-gray-500">
                Next on {format(mockAppointments[0]?.date || new Date(), "MMM dd")}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Unread Messages</CardTitle>
              <MessageSquare className="h-5 w-5 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">3</div>
              <p className="text-xs text-gray-500">from Adv. Rahul Sharma</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Spend</CardTitle>
              <DollarSign className="h-5 w-5 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">₹1,25,000</div>
              <p className="text-xs text-gray-500">across all cases</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Cases & Upcoming Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-purple-400" />
                Recent Cases
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/client/cases" className="text-gray-400 hover:text-white">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockCases.map((case_item) => (
                <div
                  key={case_item.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-white">{case_item.title}</h3>
                    <p className="text-sm text-gray-400">
                      {case_item.category} &bull; Last update: {format(case_item.lastUpdate, "MMM dd, yyyy")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(case_item.status)}>{case_item.status}</Badge>
                    <Progress value={case_item.progress} className="w-24 h-2" />
                    <span className="text-sm text-gray-400">{case_item.progress}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                Upcoming Appointments
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/client/appointments" className="text-gray-400 hover:text-white">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-white">{appointment.type}</h3>
                    <p className="text-sm text-gray-400">
                      with {appointment.lawyerName} on {format(appointment.date, "MMM dd, yyyy")} at {appointment.time}
                    </p>
                  </div>
                  <Badge className={getAppointmentStatusColor(appointment.status)}>{appointment.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & AI Assistant */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-green-500/10 to-teal-500/10 backdrop-blur-sm border-green-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-green-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-auto py-3 bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/client/ai-assistant">
                  <Brain className="w-4 h-4 mr-2" />
                  Chat with AI Assistant
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-3 bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/client/marketplace">
                  <Users className="w-4 h-4 mr-2" />
                  Browse Lawyers
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-3 bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/client/messages">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  View Messages
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-3 bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/client/cases">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Manage My Cases
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-400" />
                AI Assistant Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <p>Get instant answers to your legal questions with Lexi, our AI assistant.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <p>Summarize complex legal documents in seconds.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <p>Draft initial legal communications with AI guidance.</p>
              </div>
              <Button
                variant="outline"
                className="w-full h-auto py-3 bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/client/ai-assistant">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Go to AI Assistant
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
