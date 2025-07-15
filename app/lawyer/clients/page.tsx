"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, SortAsc, Users, Mail, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { format } from "date-fns"

interface Client {
  id: string
  name: string
  email: string
  phone: string
  casesCount: number
  lastContact: Date
  status: "active" | "inactive" | "new"
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "InnovateTech Solutions",
    email: "contact@innovatetech.com",
    phone: "+91 98765 43210",
    casesCount: 3,
    lastContact: new Date("2024-07-15T10:00:00Z"),
    status: "active",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 99887 76655",
    casesCount: 1,
    lastContact: new Date("2024-07-10T14:30:00Z"),
    status: "active",
  },
  {
    id: "3",
    name: "BrandGuard Innovations",
    email: "info@brandguard.in",
    phone: "+91 88776 65544",
    casesCount: 2,
    lastContact: new Date("2024-07-12T09:00:00Z"),
    status: "inactive",
  },
  {
    id: "4",
    name: "Global HR Solutions",
    email: "hr@globalhr.com",
    phone: "+91 77665 54433",
    casesCount: 1,
    lastContact: new Date("2024-07-01T11:00:00Z"),
    status: "active",
  },
  {
    id: "5",
    name: "Rajesh Kumar",
    email: "rajesh.k@example.com",
    phone: "+91 90000 11111",
    casesCount: 1,
    lastContact: new Date("2024-07-14T16:00:00Z"),
    status: "new",
  },
]

export default function LawyerClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [sortBy, setSortBy] = useState("lastContact")

  const filteredClients = mockClients
    .filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = selectedStatus === "all" || client.status === selectedStatus

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "lastContact") {
        return b.lastContact.getTime() - a.lastContact.getTime() // Newest first
      }
      if (sortBy === "casesCountHigh") {
        return b.casesCount - a.casesCount // Most cases first
      }
      if (sortBy === "casesCountLow") {
        return a.casesCount - b.casesCount // Fewest cases first
      }
      return 0
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "inactive":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      case "new":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <DashboardLayout userType="lawyer">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Clients</h1>
            <p className="text-gray-400">Manage your client relationships and their legal needs</p>
          </div>
        </div>

        {/* Filters Section */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-blue-500/30 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search clients by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 bg-gray-800/50 border-blue-500/20 text-white placeholder:text-gray-400 backdrop-blur-sm"
                  />
                </div>
              </div>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full lg:w-48 h-12 bg-gray-800/50 border-blue-500/20 text-white backdrop-blur-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-blue-500/20 backdrop-blur-xl">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48 h-12 bg-gray-800/50 border-blue-500/20 text-white backdrop-blur-sm">
                  <SortAsc className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-blue-500/20 backdrop-blur-xl">
                  <SelectItem value="lastContact">Last Contact</SelectItem>
                  <SelectItem value="casesCountHigh">Cases (High to Low)</SelectItem>
                  <SelectItem value="casesCountLow">Cases (Low to High)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Clients Table */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-white/5 hover:bg-white/10">
                  <TableHead className="text-gray-300">Client Name</TableHead>
                  <TableHead className="text-gray-300">Email</TableHead>
                  <TableHead className="text-gray-300">Phone</TableHead>
                  <TableHead className="text-gray-300">Cases</TableHead>
                  <TableHead className="text-gray-300">Last Contact</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                      No clients found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClients.map((client) => (
                    <TableRow key={client.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-medium text-white">{client.name}</TableCell>
                      <TableCell className="text-gray-300">
                        <a href={`mailto:${client.email}`} className="hover:underline flex items-center gap-1">
                          <Mail className="w-4 h-4" /> {client.email}
                        </a>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        <a href={`tel:${client.phone}`} className="hover:underline flex items-center gap-1">
                          <Phone className="w-4 h-4" /> {client.phone}
                        </a>
                      </TableCell>
                      <TableCell className="text-gray-300">{client.casesCount}</TableCell>
                      <TableCell className="text-gray-300">{format(client.lastContact, "MMM dd, yyyy")}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" asChild className="text-blue-400 hover:text-blue-300">
                          <Link href={`/lawyer/clients/${client.id}`}>
                            View <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
