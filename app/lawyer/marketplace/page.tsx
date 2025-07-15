"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, DollarSign, Users, Calendar, Gavel, Filter, SortAsc, Briefcase } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { format } from "date-fns"

interface Case {
  id: string
  title: string
  category: string
  budget: string
  description: string
  client: string
  location: string
  postedDate: Date
  bids: number
  urgency: "low" | "medium" | "high"
  status: "open" | "in-progress" | "closed"
}

const mockCases: Case[] = [
  {
    id: "1",
    title: "Startup Legal Setup and Compliance",
    category: "Corporate Law",
    budget: "₹50,000 - ₹1,00,000",
    description:
      "Need comprehensive legal setup for a tech startup including incorporation, compliance, and initial contracts. Looking for a lawyer with experience in Indian startup ecosystem.",
    client: "TechStart Inc.",
    location: "Mumbai, Maharashtra",
    postedDate: new Date("2024-07-12T10:00:00Z"),
    bids: 8,
    urgency: "medium",
    status: "open",
  },
  {
    id: "2",
    title: "Employment Dispute Resolution",
    category: "Employment Law",
    budget: "₹25,000 - ₹50,000",
    description:
      "Wrongful termination case requiring immediate legal representation and negotiation for an employee based in Delhi. Experience with labor laws is a must.",
    client: "John Doe",
    location: "Delhi, NCR",
    postedDate: new Date("2024-07-11T14:30:00Z"),
    bids: 12,
    urgency: "high",
    status: "open",
  },
  {
    id: "3",
    title: "Patent Application and IP Protection",
    category: "Intellectual Property",
    budget: "₹75,000 - ₹1,50,000",
    description:
      "Need assistance with patent filing and comprehensive IP protection strategy for innovative technology in Bangalore. Looking for an IP specialist.",
    client: "InnovateTech",
    location: "Bangalore, Karnataka",
    postedDate: new Date("2024-07-10T09:00:00Z"),
    bids: 6,
    urgency: "low",
    status: "open",
  },
  {
    id: "4",
    title: "Real Estate Property Dispute",
    category: "Real Estate",
    budget: "₹60,000 - ₹1,20,000",
    description:
      "Dispute over property boundaries and ownership in Chennai. Requires a lawyer with strong litigation experience in real estate.",
    client: "Priya Holdings",
    location: "Chennai, Tamil Nadu",
    postedDate: new Date("2024-07-09T11:45:00Z"),
    bids: 4,
    urgency: "medium",
    status: "open",
  },
  {
    id: "5",
    title: "Family Law - Divorce Proceedings",
    category: "Family Law",
    budget: "₹30,000 - ₹70,000",
    description:
      "Seeking legal representation for divorce proceedings and child custody in Mumbai. Compassionate and experienced family lawyer needed.",
    client: "Anjali Mehta",
    location: "Mumbai, Maharashtra",
    postedDate: new Date("2024-07-08T16:00:00Z"),
    bids: 15,
    urgency: "high",
    status: "open",
  },
]

export default function LawyerMarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [sortBy, setSortBy] = useState("postedDate")

  const categories = Array.from(new Set(mockCases.map((c) => c.category)))
  const locations = Array.from(new Set(mockCases.map((c) => c.location)))

  const filteredCases = mockCases
    .filter((case_item) => {
      const matchesSearch =
        case_item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        case_item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        case_item.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "all" || case_item.category === selectedCategory
      const matchesLocation = selectedLocation === "all" || case_item.location === selectedLocation

      return matchesSearch && matchesCategory && matchesLocation && case_item.status === "open"
    })
    .sort((a, b) => {
      if (sortBy === "postedDate") {
        return b.postedDate.getTime() - a.postedDate.getTime() // Newest first
      }
      if (sortBy === "budgetHigh") {
        const budgetA = Number.parseInt(a.budget.split("-")[1]?.replace(/[^0-9]/g, "") || "0")
        const budgetB = Number.parseInt(b.budget.split("-")[1]?.replace(/[^0-9]/g, "") || "0")
        return budgetB - budgetA // Highest budget first
      }
      if (sortBy === "bidsLow") {
        return a.bids - b.bids // Lowest bids first
      }
      return 0
    })

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
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

  const renderCaseCard = (case_item: Case, index: number) => (
    <motion.div
      key={case_item.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/30 backdrop-blur-xl hover:border-[#FCD34D]/60 transition-all duration-300 shadow-2xl">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{case_item.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <Badge className="bg-[#FCD34D]/20 text-[#FCD34D] border-[#FCD34D]/30">{case_item.category}</Badge>
                    <Badge className={getUrgencyColor(case_item.urgency)}>{case_item.urgency} priority</Badge>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {case_item.location}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3">{case_item.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-gray-400">
                  <DollarSign className="w-5 h-5 mr-2 text-[#FCD34D]" />
                  <div>
                    <p className="text-white font-semibold">{case_item.budget}</p>
                    <p className="text-xs">Budget Range</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-400">
                  <Users className="w-5 h-5 mr-2 text-[#FCD34D]" />
                  <div>
                    <p className="text-white font-semibold">{case_item.bids} bids</p>
                    <p className="text-xs">Received</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-400">
                  <Calendar className="w-5 h-5 mr-2 text-[#FCD34D]" />
                  <div>
                    <p className="text-white font-semibold">{format(case_item.postedDate, "MMM dd, yyyy")}</p>
                    <p className="text-xs">Posted</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Button
                  className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                  asChild
                >
                  <Link href={`/lawyer/case/${case_item.id}/bid`}>
                    <Gavel className="w-4 h-4 mr-2" />
                    View & Bid
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <DashboardLayout userType="lawyer">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Case Marketplace</h1>
            <p className="text-gray-400">Browse and bid on new legal cases</p>
          </div>
        </div>

        {/* Filters Section */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/30 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search cases by title, description, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400 backdrop-blur-sm"
                  />
                </div>
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-64 h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white backdrop-blur-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-[#FCD34D]/20 backdrop-blur-xl">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full lg:w-64 h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white backdrop-blur-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-[#FCD34D]/20 backdrop-blur-xl">
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48 h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white backdrop-blur-sm">
                  <SortAsc className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-[#FCD34D]/20 backdrop-blur-xl">
                  <SelectItem value="postedDate">Newest First</SelectItem>
                  <SelectItem value="budgetHigh">Highest Budget</SelectItem>
                  <SelectItem value="bidsLow">Fewest Bids</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Cases List */}
        <div className="space-y-8">
          {filteredCases.length === 0 ? (
            <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Open Cases Found</h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search criteria or filters. New cases are posted regularly!
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                    setSelectedLocation("all")
                  }}
                  className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredCases.map((case_item, index) => renderCaseCard(case_item, index))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
