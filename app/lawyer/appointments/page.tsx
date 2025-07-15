"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CalendarIcon, Search, Plus, Clock, Video, MapPin, CheckCircle, AlertCircle, XCircle, Eye } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard-layout"

interface Appointment {
  id: string
  clientName: string
  clientEmail: string
  clientPhone: string
  clientAvatar: string
  title: string
  type: string
  date: string
  time: string
  duration: string
  status: "confirmed" | "pending" | "cancelled" | "completed"
  location: string
  meetingType: "virtual" | "in-person"
  notes: string
  caseId: string
  priority: "high" | "medium" | "low"
}

export default function LawyerAppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // -- MOCK DATA -------------------------------------------------------------
  const appointments: Appointment[] = [
    {
      id: "1",
      clientName: "Sarah Johnson",
      clientEmail: "sarah.johnson@email.com",
      clientPhone: "+91 98765 43210",
      clientAvatar: "/placeholder.svg?height=40&width=40",
      title: "Contract Review Meeting",
      type: "consultation",
      date: "2024-01-18",
      time: "10:00 AM",
      duration: "1 hour",
      status: "confirmed",
      location: "Office",
      meetingType: "in-person",
      notes: "Review employment contract terms and conditions",
      caseId: "CASE-001",
      priority: "high",
    },
    {
      id: "2",
      clientName: "Michael Brown",
      clientEmail: "michael.brown@email.com",
      clientPhone: "+91 87654 32109",
      clientAvatar: "/placeholder.svg?height=40&width=40",
      title: "Legal Consultation",
      type: "consultation",
      date: "2024-01-18",
      time: "2:30 PM",
      duration: "45 minutes",
      status: "pending",
      location: "Video Call",
      meetingType: "virtual",
      notes: "Initial consultation for property dispute",
      caseId: "CASE-002",
      priority: "medium",
    },
    {
      id: "3",
      clientName: "Emma Wilson",
      clientEmail: "emma.wilson@email.com",
      clientPhone: "+91 76543 21098",
      clientAvatar: "/placeholder.svg?height=40&width=40",
      title: "Document Signing",
      type: "meeting",
      date: "2024-01-19",
      time: "11:00 AM",
      duration: "30 minutes",
      status: "confirmed",
      location: "Client Office",
      meetingType: "in-person",
      notes: "Final document signing for business incorporation",
      caseId: "CASE-003",
      priority: "high",
    },
    {
      id: "4",
      clientName: "David Chen",
      clientEmail: "david.chen@email.com",
      clientPhone: "+91 65432 10987",
      clientAvatar: "/placeholder.svg?height=40&width=40",
      title: "Case Strategy Discussion",
      type: "meeting",
      date: "2024-01-19",
      time: "3:00 PM",
      duration: "1.5 hours",
      status: "confirmed",
      location: "Office",
      meetingType: "in-person",
      notes: "Discuss litigation strategy and next steps",
      caseId: "CASE-004",
      priority: "high",
    },
    {
      id: "5",
      clientName: "Lisa Anderson",
      clientEmail: "lisa.anderson@email.com",
      clientPhone: "+91 54321 09876",
      clientAvatar: "/placeholder.svg?height=40&width=40",
      title: "Follow-up Consultation",
      type: "follow-up",
      date: "2024-01-20",
      time: "10:30 AM",
      duration: "30 minutes",
      status: "cancelled",
      location: "Video Call",
      meetingType: "virtual",
      notes: "Follow-up on contract negotiations",
      caseId: "CASE-005",
      priority: "low",
    },
  ]
  // -------------------------------------------------------------------------

  /* ---------- helpers --------------------------------------------------- */
  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return CheckCircle
      case "pending":
        return AlertCircle
      case "cancelled":
        return XCircle
      case "completed":
        return CheckCircle
      default:
        return AlertCircle
    }
  }

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const todayStr = new Date().toISOString().split("T")[0]
  const todayAppointments = filteredAppointments.filter((apt) => apt.date === todayStr)
  const upcomingAppointments = filteredAppointments.filter((apt) => new Date(apt.date) > new Date())

  const stats = {
    total: appointments.length,
    today: todayAppointments.length,
    upcoming: upcomingAppointments.length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
  }

  /* ---------- component -------------------------------------------------- */
  return (
    <DashboardLayout userType="lawyer">
      <div className="space-y-8">
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Appointments</h1>
            <p className="text-gray-400">Manage your client meetings and schedule</p>
          </div>

          <Button
            className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
            asChild
          >
            <Link href="/lawyer/appointments/new">
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Link>
          </Button>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Total Appointments" value={stats.total} icon={CalendarIcon} />
          <StatCard title="Today's Appointments" value={stats.today} icon={Clock} accent="blue" />
          <StatCard title="Confirmed" value={stats.confirmed} icon={CheckCircle} accent="green" />
          <StatCard title="Upcoming" value={stats.upcoming} icon={CalendarIcon} accent="yellow" />
        </section>

        {/* Search & Calendar */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appointments list */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/30 backdrop-blur-xl">
            <CardContent className="p-6">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400"
                />
              </div>

              {/* Tabs */}
              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border-[#FCD34D]/20">
                  <TabsTrigger
                    value="all"
                    className="text-white data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="today"
                    className="text-white data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black"
                  >
                    Today
                  </TabsTrigger>
                  <TabsTrigger
                    value="upcoming"
                    className="text-white data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black"
                  >
                    Upcoming
                  </TabsTrigger>
                </TabsList>

                <TabPane
                  value="all"
                  appointments={filteredAppointments}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                />
                <TabPane
                  value="today"
                  appointments={todayAppointments}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                />
                <TabPane
                  value="upcoming"
                  appointments={upcomingAppointments}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                />
              </Tabs>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <CardTitle className="mb-4 text-white">Calendar</CardTitle>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border bg-gray-800/50 border-[#FCD34D]/20 text-white [&_td]:text-white [&_th]:text-gray-400 [&_button]:text-white [&_div]:text-white"
              />
            </CardContent>
          </Card>
        </main>
      </div>
    </DashboardLayout>
  )
}

/* ---------- sub-components ---------------------------------------------- */

interface StatCardProps {
  title: string
  value: number
  icon: typeof CalendarIcon
  accent?: "blue" | "green" | "yellow"
}
function StatCard({ title, value, icon: Icon, accent }: StatCardProps) {
  const borderColors: Record<NonNullable<StatCardProps["accent"]>, string> = {
    blue: "border-blue-500/30",
    green: "border-green-500/30",
    yellow: "border-yellow-500/30",
  }
  return (
    <Card
      className={`bg-gradient-to-br from-gray-900/80 to-black/80 ${
        accent ? borderColors[accent] : "border-[#FCD34D]/30"
      } backdrop-blur-xl`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
          <Icon className={`h-8 w-8 ${accent ? `text-${accent}-400` : "text-[#FCD34D]"}`} />
        </div>
      </CardContent>
    </Card>
  )
}

interface TabPaneProps {
  value: string
  appointments: Appointment[]
  getStatusColor: (status: Appointment["status"]) => string
  getStatusIcon: (status: Appointment["status"]) => typeof CheckCircle
}
function TabPane({ value, appointments, getStatusColor, getStatusIcon }: TabPaneProps) {
  return (
    <TabsContent value={value} className="mt-4">
      {appointments.length === 0 && <EmptyState />}
      <div className="space-y-4">
        {appointments.map((apt, idx) => {
          const StatusIcon = getStatusIcon(apt.status)
          return (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <Card className="bg-gray-900/50 border-[#FCD34D]/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 ring-1 ring-[#FCD34D]/30">
                      <AvatarImage src={apt.clientAvatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-[#FCD34D] text-black font-bold">
                        {apt.clientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-white">{apt.title}</h4>
                        <Badge className={getStatusColor(apt.status)}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">
                        {apt.clientName} &ndash; {apt.type}
                      </p>

                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                        <CalendarIcon className="h-4 w-4" />
                        <span>
                          {apt.date} at {apt.time} ({apt.duration})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        {apt.meetingType === "virtual" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                        <span>{apt.location}</span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent text-[#FCD34D] hover:bg-[#FCD34D]/10 border-[#FCD34D]/30"
                      asChild
                    >
                      <Link href={`/lawyer/appointments/${apt.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </TabsContent>
  )
}

function EmptyState() {
  return <div className="py-8 text-center text-gray-400">No appointments found.</div>
}
