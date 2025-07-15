"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  FolderOpen,
  Plus,
  Search,
  Calendar,
  User,
  Clock,
  AlertCircle,
  CheckCircle,
  FileText,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Gavel,
  DollarSign,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { formatDate } from "@/lib/utils"
import type { Case, Priority, CaseStatus, Bid } from "@/lib/types"

const mockCases: Case[] = [
  {
    id: "1",
    title: "Contract Dispute - ABC Corp",
    client: "ABC Corporation",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-01-15",
    progress: 75,
    description:
      "Commercial contract dispute regarding breach of terms and conditions. Client seeking damages and contract termination.",
    createdAt: new Date("2023-12-01"),
    updatedAt: new Date("2024-01-10"),
    category: "Corporate Law",
    budget: "₹2,50,000",
  },
  {
    id: "2",
    title: "Employment Law - John Doe",
    client: "John Doe",
    status: "review",
    priority: "medium",
    dueDate: "2024-01-20",
    progress: 45,
    description: "Wrongful termination case. Employee claims discrimination and seeks compensation for lost wages.",
    createdAt: new Date("2023-12-15"),
    updatedAt: new Date("2024-01-08"),
    category: "Employment Law",
    budget: "₹75,000",
  },
  {
    id: "3",
    title: "IP Protection - TechStart",
    client: "TechStart Inc.",
    status: "completed",
    priority: "low",
    dueDate: "2024-01-10",
    progress: 100,
    description: "Patent application and trademark registration for new software technology.",
    createdAt: new Date("2023-11-20"),
    updatedAt: new Date("2024-01-10"),
    category: "Intellectual Property",
    budget: "₹1,50,000",
  },
]

const mockBids: Bid[] = [
  {
    id: "1",
    caseId: "new-1",
    lawyerId: "lawyer-1",
    lawyerName: "Adv. Priya Sharma",
    amount: 85000,
    timeline: "3 weeks",
    proposal:
      "I have extensive experience in startup legal matters and can provide comprehensive support for your business setup.",
    status: "pending",
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "2",
    caseId: "new-2",
    lawyerId: "lawyer-2",
    lawyerName: "Adv. Rajesh Kumar",
    amount: 45000,
    timeline: "2 weeks",
    proposal: "Specialized in employment law with 12+ years experience. I can help resolve this matter efficiently.",
    status: "pending",
    createdAt: new Date("2024-01-11"),
  },
]

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>(mockCases)
  const [bids, setBids] = useState<Bid[]>(mockBids)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [activeTab, setActiveTab] = useState("my-cases")
  const [newCase, setNewCase] = useState<Partial<Case>>({
    title: "",
    client: "",
    status: "draft",
    priority: "medium",
    dueDate: "",
    description: "",
    category: "",
  })

  const filteredCases = cases.filter((case_item) => {
    const matchesSearch =
      case_item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_item.client.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || case_item.status === filterStatus
    const matchesPriority = filterPriority === "all" || case_item.priority === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleAddCase = () => {
    const case_item: Case = {
      id: Date.now().toString(),
      title: newCase.title || "",
      client: newCase.client || "",
      status: newCase.status as CaseStatus,
      priority: newCase.priority as Priority,
      dueDate: newCase.dueDate || "",
      progress: 0,
      description: newCase.description || "",
      createdAt: new Date(),
      updatedAt: new Date(),
      category: newCase.category || "",
    }

    setCases([...cases, case_item])
    setNewCase({
      title: "",
      client: "",
      status: "draft",
      priority: "medium",
      dueDate: "",
      description: "",
      category: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleBidAction = (bidId: string, action: "accept" | "reject") => {
    setBids(
      bids.map((bid) => (bid.id === bidId ? { ...bid, status: action === "accept" ? "accepted" : "rejected" } : bid)),
    )
  }

  const getStatusColor = (status: CaseStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "in-progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "review":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "draft":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: CaseStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "in-progress":
        return <Clock className="w-4 h-4" />
      case "review":
        return <Eye className="w-4 h-4" />
      case "draft":
        return <FileText className="w-4 h-4" />
      case "cancelled":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const totalCases = cases.length
  const activeCases = cases.filter((c) => c.status === "in-progress").length
  const completedCases = cases.filter((c) => c.status === "completed").length
  const pendingBids = bids.filter((b) => b.status === "pending").length

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Case Management</h1>
            <p className="text-gray-400">Track and manage your legal cases and bids</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                New Case
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Case</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Enter the case details to create a new legal case.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="title">Case Title</Label>
                  <Input
                    id="title"
                    value={newCase.title}
                    onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                    placeholder="Enter case title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Client Name</Label>
                  <Input
                    id="client"
                    value={newCase.client}
                    onChange={(e) => setNewCase({ ...newCase, client: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                    placeholder="Enter client name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newCase.category}
                    onValueChange={(value) => setNewCase({ ...newCase, category: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="Corporate Law">Corporate Law</SelectItem>
                      <SelectItem value="Criminal Law">Criminal Law</SelectItem>
                      <SelectItem value="Employment Law">Employment Law</SelectItem>
                      <SelectItem value="Family Law">Family Law</SelectItem>
                      <SelectItem value="Intellectual Property">Intellectual Property</SelectItem>
                      <SelectItem value="Real Estate">Real Estate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newCase.dueDate}
                    onChange={(e) => setNewCase({ ...newCase, dueDate: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newCase.status}
                    onValueChange={(value) => setNewCase({ ...newCase, status: value as CaseStatus })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newCase.priority}
                    onValueChange={(value) => setNewCase({ ...newCase, priority: value as Priority })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCase.description}
                    onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                    rows={4}
                    placeholder="Enter case description"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCase} className="bg-yellow-400 text-black hover:bg-yellow-500">
                  Create Case
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
                  <p className="text-gray-400 text-sm">Total Cases</p>
                  <p className="text-3xl font-bold text-white">{totalCases}</p>
                </div>
                <FolderOpen className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Cases</p>
                  <p className="text-3xl font-bold text-white">{activeCases}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-3xl font-bold text-white">{completedCases}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Bids</p>
                  <p className="text-3xl font-bold text-white">{pendingBids}</p>
                </div>
                <Gavel className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-800/50 border border-[#FCD34D]/20">
            <TabsTrigger value="my-cases" className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black">
              My Cases
            </TabsTrigger>
            <TabsTrigger value="bids" className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black">
              Bids & Proposals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-cases" className="space-y-6">
            {/* Filters */}
            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
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
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-40 bg-gray-800/50 border-gray-700">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterPriority} onValueChange={setFilterPriority}>
                    <SelectTrigger className="w-full sm:w-40 bg-gray-800/50 border-gray-700">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Cases Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCases.map((case_item) => (
                <motion.div
                  key={case_item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-2 line-clamp-2">{case_item.title}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-3">
                            <User className="w-4 h-4" />
                            <span>{case_item.client}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex space-x-2">
                          <Badge className={getStatusColor(case_item.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(case_item.status)}
                              <span className="capitalize">{case_item.status.replace("-", " ")}</span>
                            </div>
                          </Badge>
                          <Badge className={getPriorityColor(case_item.priority)}>{case_item.priority}</Badge>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white font-medium">{case_item.progress}%</span>
                          </div>
                          <Progress value={case_item.progress} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1 text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>Due: {formatDate(case_item.dueDate)}</span>
                          </div>
                        </div>
                      </div>

                      {case_item.description && (
                        <p className="text-sm text-gray-400 mb-4 line-clamp-3">{case_item.description}</p>
                      )}

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>Created: {formatDate(case_item.createdAt)}</span>
                        <span>Updated: {formatDate(case_item.updatedAt)}</span>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bids" className="space-y-6">
            <div className="grid gap-6">
              {bids.map((bid) => (
                <motion.div
                  key={bid.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-white">{bid.lawyerName}</h3>
                            <Badge
                              className={
                                bid.status === "pending"
                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                  : bid.status === "accepted"
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : "bg-red-500/20 text-red-400 border-red-500/30"
                              }
                            >
                              {bid.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-[#FCD34D]" />
                              <span className="text-white font-medium">₹{bid.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-blue-400" />
                              <span className="text-white">{bid.timeline}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-400">{formatDate(bid.createdAt)}</span>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4">{bid.proposal}</p>
                        </div>
                      </div>

                      {bid.status === "pending" && (
                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleBidAction(bid.id, "accept")}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Accept Bid
                          </Button>
                          <Button
                            onClick={() => handleBidAction(bid.id, "reject")}
                            variant="outline"
                            className="border-red-500 text-red-400 hover:bg-red-500/10"
                          >
                            Reject
                          </Button>
                          <Button
                            variant="outline"
                            className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                          >
                            View Profile
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {bids.length === 0 && (
              <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
                <CardContent className="p-12 text-center">
                  <Gavel className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No bids received</h3>
                  <p className="text-gray-400 mb-6">When lawyers submit bids for your cases, they will appear here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {filteredCases.length === 0 && activeTab === "my-cases" && (
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
            <CardContent className="p-12 text-center">
              <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No cases found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || filterStatus !== "all" || filterPriority !== "all"
                  ? "Try adjusting your search or filters"
                  : "Create your first case to get started"}
              </p>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Case
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
