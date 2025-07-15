"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, SortAsc, Briefcase, ArrowRight } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { format } from "date-fns"

interface Case {
  id: string
  title: string
  client: string
  status: "open" | "in-progress" | "closed" | "on-hold"
  category: string
  lastUpdate: Date
  fee: number
}

const mockCases: Case[] = [
  {
    id: "1",
    title: "Contract Review for Startup Funding",
    client: "InnovateTech Solutions",
    status: "in-progress",
    category: "Corporate Law",
    lastUpdate: new Date("2024-07-15T10:00:00Z"),
    fee: 75000,
  },
  {
    id: "2",
    title: "Property Dispute Resolution",
    client: "Priya Sharma",
    status: "on-hold",
    category: "Real Estate",
    lastUpdate: new Date("2024-07-10T14:30:00Z"),
    fee: 120000,
  },
  {
    id: "3",
    title: "Trademark Registration",
    client: "BrandGuard Innovations",
    status: "open",
    category: "Intellectual Property",
    lastUpdate: new Date("2024-07-12T09:00:00Z"),
    fee: 50000,
  },
  {
    id: "4",
    title: "Employment Contract Drafting",
    client: "Global HR Solutions",
    status: "completed",
    category: "Employment Law",
    lastUpdate: new Date("2024-07-01T11:00:00Z"),
    fee: 40000,
  },
  {
    id: "5",
    title: "Criminal Defense - Bail Hearing",
    client: "Rajesh Kumar",
    status: "in-progress",
    category: "Criminal Law",
    lastUpdate: new Date("2024-07-14T16:00:00Z"),
    fee: 90000,
  },
]

export default function LawyerCasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("lastUpdate")

  const categories = Array.from(new Set(mockCases.map((c) => c.category)))

  const filteredCases = mockCases
    .filter((case_item) => {
      const matchesSearch =
        case_item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        case_item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        case_item.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = selectedStatus === "all" || case_item.status === selectedStatus
      const matchesCategory = selectedCategory === "all" || case_item.category === selectedCategory

      return matchesSearch && matchesStatus && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "lastUpdate") {
        return b.lastUpdate.getTime() - a.lastUpdate.getTime() // Newest first
      }
      if (sortBy === "feeHigh") {
        return b.fee - a.fee // Highest fee first
      }
      if (sortBy === "feeLow") {
        return a.fee - b.fee // Lowest fee first
      }
      return 0
    })

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

  return (
    <DashboardLayout userType="lawyer">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Cases</h1>
            <p className="text-gray-400">Manage all your active and past legal cases</p>
          </div>
        </div>

        {/* Filters Section */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-purple-500/30 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search cases by title, client, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 backdrop-blur-sm"
                  />
                </div>
              </div>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full lg:w-48 h-12 bg-gray-800/50 border-purple-500/20 text-white backdrop-blur-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-purple-500/20 backdrop-blur-xl">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-64 h-12 bg-gray-800/50 border-purple-500/20 text-white backdrop-blur-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-purple-500/20 backdrop-blur-xl">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48 h-12 bg-gray-800/50 border-purple-500/20 text-white backdrop-blur-sm">
                  <SortAsc className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-purple-500/20 backdrop-blur-xl">
                  <SelectItem value="lastUpdate">Last Updated</SelectItem>
                  <SelectItem value="feeHigh">Fee (High to Low)</SelectItem>
                  <SelectItem value="feeLow">Fee (Low to High)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Cases Table */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-white/5 hover:bg-white/10">
                  <TableHead className="text-gray-300">Case Title</TableHead>
                  <TableHead className="text-gray-300">Client</TableHead>
                  <TableHead className="text-gray-300">Category</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Last Update</TableHead>
                  <TableHead className="text-gray-300 text-right">Fee</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                      No cases found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCases.map((case_item) => (
                    <TableRow key={case_item.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-medium text-white">{case_item.title}</TableCell>
                      <TableCell className="text-gray-300">{case_item.client}</TableCell>
                      <TableCell className="text-gray-300">{case_item.category}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(case_item.status)}>{case_item.status}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-300">{format(case_item.lastUpdate, "MMM dd, yyyy")}</TableCell>
                      <TableCell className="text-right font-semibold text-white">
                        ₹{case_item.fee.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" asChild className="text-purple-400 hover:text-purple-300">
                          <Link href={`/lawyer/cases/${case_item.id}`}>
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
