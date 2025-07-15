"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FolderOpen, Plus, Search, Calendar, DollarSign, Clock, CheckCircle, Eye, Gavel, Users } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"

interface ClientCase {
  id: string
  title: string
  category: string
  status: "open" | "in-progress" | "completed" | "closed"
  lawyer?: string
  budget: string
  bids: number
  postedDate: string
  priority: "low" | "medium" | "high"
  description: string
}

const mockClientCases: ClientCase[] = [
  {
    id: "1",
    title: "Startup Legal Setup and Compliance",
    category: "Corporate Law",
    status: "in-progress",
    lawyer: "Adv. Priya Sharma",
    budget: "₹75,000",
    bids: 8,
    postedDate: "2024-01-10",
    priority: "high",
    description:
      "Need comprehensive legal setup for a tech startup including incorporation, compliance, and initial contracts.",
  },
  {
    id: "2",
    title: "Employment Contract Review",
    category: "Employment Law",
    status: "open",
    budget: "₹25,000",
    bids: 5,
    postedDate: "2024-01-12",
    priority: "medium",
    description: "Review and update employment contracts for new hires in our growing company.",
  },
  {
    id: "3",
    title: "Intellectual Property Filing",
    category: "IP Law",
    status: "completed",
    lawyer: "Adv. Meera Patel",
    budget: "₹1,50,000",
    bids: 12,
    postedDate: "2024-01-05",
    priority: "low",
    description: "Patent application and trademark registration for innovative software technology.",
  },
]

export default function ClientCasesPage() {
  const [cases, setCases] = useState<ClientCase[]>(mockClientCases)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("my-cases")

  const filteredCases = cases.filter((case_item) => {
    const matchesSearch =
      case_item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_item.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || case_item.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "open":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "completed":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "closed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
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

  const stats = {
    totalCases: cases.length,
    activeCases: cases.filter((c) => c.status === "in-progress").length,
    openCases: cases.filter((c) => c.status === "open").length,
    completedCases: cases.filter((c) => c.status === "completed").length,
  }

  return (
    <DashboardLayout userType="client">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Cases</h1>
            <p className="text-gray-400">Track your posted cases and legal matters</p>
          </div>
          <Button
            className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
            asChild
          >
            <Link href="/post-case">
              <Plus className="w-4 h-4 mr-2" />
              Post New Case
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Cases</p>
                  <p className="text-3xl font-bold text-white">{stats.totalCases}</p>
                </div>
                <FolderOpen className="w-8 h-8 text-[#FCD34D]" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Cases</p>
                  <p className="text-3xl font-bold text-white">{stats.activeCases}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Open Cases</p>
                  <p className="text-3xl font-bold text-white">{stats.openCases}</p>
                </div>
                <Gavel className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-3xl font-bold text-white">{stats.completedCases}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search cases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cases List */}
        <div className="space-y-4">
          {filteredCases.map((case_item, index) => (
            <motion.div
              key={case_item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/20 hover:border-[#FCD34D]/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-white">{case_item.title}</h4>
                        <Badge className={getStatusColor(case_item.status)}>{case_item.status.replace("-", " ")}</Badge>
                        <Badge className={getPriorityColor(case_item.priority)}>{case_item.priority} priority</Badge>
                      </div>
                      <p className="text-gray-400 mb-3">Category: {case_item.category}</p>
                      {case_item.lawyer && <p className="text-[#FCD34D] mb-3">Assigned to: {case_item.lawyer}</p>}
                      <p className="text-gray-300 mb-4">{case_item.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{case_item.budget}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Gavel className="w-4 h-4" />
                          <span>{case_item.bids} bids</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Posted: {case_item.postedDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {case_item.status === "open" && (
                        <Button
                          variant="outline"
                          className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          View Bids
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/20">
            <CardContent className="p-12 text-center">
              <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No cases found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Post your first case to get started with legal assistance"}
              </p>
              <Button
                className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                asChild
              >
                <Link href="/post-case">
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Case
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
