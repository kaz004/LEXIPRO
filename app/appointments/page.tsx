"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Plus,
  Search,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Eye,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { formatCurrency, validateEmail, validatePhone } from "@/lib/utils"
import { CONSULTATION_TYPES, TIME_SLOTS } from "@/lib/constants"
import type { Appointment } from "@/lib/types"

const mockAppointments: Appointment[] = [
  {
    id: "1",
    clientName: "Sarah Johnson",
    clientEmail: "sarah@email.com",
    clientPhone: "+91 98765 43210",
    consultationType: "contract",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "confirmed",
    notes: "Contract review for new business partnership",
    price: 5000,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "2",
    clientName: "Michael Chen",
    clientEmail: "michael@techcorp.com",
    clientPhone: "+91 98765 43211",
    consultationType: "business",
    date: "2024-01-16",
    time: "2:00 PM",
    status: "scheduled",
    notes: "Business setup consultation for tech startup",
    price: 8000,
    createdAt: new Date("2024-01-11"),
  },
  {
    id: "3",
    clientName: "Emma Wilson",
    clientEmail: "emma@startup.io",
    clientPhone: "+91 98765 43212",
    consultationType: "general",
    date: "2024-01-17",
    time: "11:30 AM",
    status: "completed",
    notes: "General legal consultation for startup",
    price: 3000,
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "4",
    clientName: "David Kumar",
    clientEmail: "david@realestate.com",
    clientPhone: "+91 98765 43213",
    consultationType: "property",
    date: "2024-01-18",
    time: "3:30 PM",
    status: "scheduled",
    notes: "Property transaction legal review",
    price: 6000,
    createdAt: new Date("2024-01-13"),
  },
  {
    id: "5",
    clientName: "Priya Sharma",
    clientEmail: "priya@consulting.in",
    clientPhone: "+91 98765 43214",
    consultationType: "employment",
    date: "2024-01-14",
    time: "9:00 AM",
    status: "cancelled",
    notes: "Employment law consultation - cancelled by client",
    price: 4500,
    createdAt: new Date("2024-01-09"),
  },
]

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterDate, setFilterDate] = useState<string>("all")
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    consultationType: "",
    date: "",
    time: "",
    notes: "",
  })

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.clientEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || appointment.status === filterStatus

    const today = new Date().toISOString().split("T")[0]
    const appointmentDate = appointment.date
    let matchesDate = true

    if (filterDate === "today") {
      matchesDate = appointmentDate === today
    } else if (filterDate === "upcoming") {
      matchesDate = appointmentDate >= today
    } else if (filterDate === "past") {
      matchesDate = appointmentDate < today
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  const handleBookAppointment = () => {
    if (
      !newAppointment.clientName ||
      !newAppointment.clientEmail ||
      !newAppointment.consultationType ||
      !newAppointment.date ||
      !newAppointment.time
    ) {
      alert("Please fill in all required fields")
      return
    }

    if (!validateEmail(newAppointment.clientEmail)) {
      alert("Please enter a valid email address")
      return
    }

    if (newAppointment.clientPhone && !validatePhone(newAppointment.clientPhone)) {
      alert("Please enter a valid phone number")
      return
    }

    const consultationType = CONSULTATION_TYPES.find((type) => type.value === newAppointment.consultationType)

    const appointment: Appointment = {
      id: Date.now().toString(),
      clientName: newAppointment.clientName,
      clientEmail: newAppointment.clientEmail,
      clientPhone: newAppointment.clientPhone || "",
      consultationType: newAppointment.consultationType,
      date: newAppointment.date,
      time: newAppointment.time,
      status: "scheduled",
      notes: newAppointment.notes,
      price: consultationType?.price || 0,
      createdAt: new Date(),
    }

    setAppointments([appointment, ...appointments])
    setNewAppointment({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      consultationType: "",
      date: "",
      time: "",
      notes: "",
    })
    setIsBookDialogOpen(false)
  }

  const handleStatusChange = (appointmentId: string, newStatus: Appointment["status"]) => {
    setAppointments(appointments.map((apt) => (apt.id === appointmentId ? { ...apt, status: newStatus } : apt)))
  }

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "scheduled":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "completed":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />
      case "scheduled":
        return <Clock className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const totalAppointments = appointments.length
  const scheduledAppointments = appointments.filter((a) => a.status === "scheduled").length
  const confirmedAppointments = appointments.filter((a) => a.status === "confirmed").length
  const totalRevenue = appointments.filter((a) => a.status === "completed").reduce((sum, apt) => sum + apt.price, 0)

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Appointments</h1>
            <p className="text-gray-400">Manage client appointments and consultations</p>
          </div>
          <Dialog open={isBookDialogOpen} onOpenChange={setIsBookDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Book New Appointment</DialogTitle>
                <DialogDescription className="text-gray-400">Schedule a consultation with a client.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    value={newAppointment.clientName}
                    onChange={(e) => setNewAppointment({ ...newAppointment, clientName: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                    placeholder="Enter client name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Email Address *</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={newAppointment.clientEmail}
                    onChange={(e) => setNewAppointment({ ...newAppointment, clientEmail: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientPhone">Phone Number</Label>
                  <Input
                    id="clientPhone"
                    value={newAppointment.clientPhone}
                    onChange={(e) => setNewAppointment({ ...newAppointment, clientPhone: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consultationType">Consultation Type *</Label>
                  <Select
                    value={newAppointment.consultationType}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, consultationType: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select consultation type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {CONSULTATION_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label} - {formatCurrency(type.price)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <Select
                    value={newAppointment.time}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, time: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {TIME_SLOTS.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                    rows={3}
                    placeholder="Additional notes or requirements"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsBookDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleBookAppointment} className="bg-yellow-400 text-black hover:bg-yellow-500">
                  Book Appointment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Appointments</p>
                  <p className="text-3xl font-bold text-white">{totalAppointments}</p>
                </div>
                <Calendar className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Scheduled</p>
                  <p className="text-3xl font-bold text-white">{scheduledAppointments}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Confirmed</p>
                  <p className="text-3xl font-bold text-white">{confirmedAppointments}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Revenue</p>
                  <p className="text-3xl font-bold text-white">{formatCurrency(totalRevenue)}</p>
                </div>
                <User className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-40 bg-gray-800/50 border-gray-700">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterDate} onValueChange={setFilterDate}>
                <SelectTrigger className="w-full sm:w-40 bg-gray-800/50 border-gray-700">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="past">Past</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">{appointment.clientName}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Mail className="w-4 h-4" />
                              <span>{appointment.clientEmail}</span>
                            </div>
                            {appointment.clientPhone && (
                              <div className="flex items-center space-x-1">
                                <Phone className="w-4 h-4" />
                                <span>{appointment.clientPhone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(appointment.status)}
                            <span className="capitalize">{appointment.status}</span>
                          </div>
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-gray-400 text-sm">Consultation Type</p>
                          <p className="text-white font-medium">
                            {CONSULTATION_TYPES.find((type) => type.value === appointment.consultationType)?.label}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Date & Time</p>
                          <p className="text-white font-medium">
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Fee</p>
                          <p className="text-white font-medium">{formatCurrency(appointment.price)}</p>
                        </div>
                      </div>

                      {appointment.notes && (
                        <div className="mb-4">
                          <p className="text-gray-400 text-sm mb-1">Notes</p>
                          <p className="text-gray-300 text-sm">{appointment.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      {appointment.status === "scheduled" && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(appointment.id, "confirmed")}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Confirm
                        </Button>
                      )}
                      {(appointment.status === "scheduled" || appointment.status === "confirmed") && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(appointment.id, "completed")}
                          className="bg-purple-500 hover:bg-purple-600 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Complete
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedAppointment(appointment)}
                        className="border-gray-700 text-white hover:bg-gray-800"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      {appointment.status !== "completed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(appointment.id, "cancelled")}
                          className="border-red-500 text-red-400 hover:bg-red-500/10"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
            <CardContent className="p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No appointments found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || filterStatus !== "all" || filterDate !== "all"
                  ? "Try adjusting your search or filters"
                  : "Book your first appointment to get started"}
              </p>
              <Button
                onClick={() => setIsBookDialogOpen(true)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
