"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MapPin,
  Star,
  Clock,
  DollarSign,
  Users,
  Briefcase,
  Award,
  MessageSquare,
  Eye,
  Heart,
  Share2,
  Calendar,
  Gavel,
  Filter,
  SortAsc,
  Plus,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface Lawyer {
  id: string
  name: string
  title: string
  firm: string
  location: string
  experience: number
  rating: number
  reviews: number
  specializations: string[]
  hourlyRate: number
  responseTime: string
  successRate: number
  casesWon: number
  verified: boolean
  avatar: string
  bio: string
  availability: "available" | "busy" | "offline"
}

interface Case {
  id: string
  title: string
  category: string
  budget: string
  description: string
  client: string
  location: string
  postedDate: string
  bids: number
  urgency: "low" | "medium" | "high"
  status: "open" | "in-progress" | "closed"
}

const mockLawyers: Lawyer[] = [
  {
    id: "1",
    name: "Adv. Priya Sharma",
    title: "Senior Partner",
    firm: "Sharma & Associates",
    location: "Mumbai, Maharashtra",
    experience: 15,
    rating: 4.9,
    reviews: 247,
    specializations: ["Corporate Law", "M&A", "Securities"],
    hourlyRate: 5000,
    responseTime: "< 2 hours",
    successRate: 94,
    casesWon: 156,
    verified: true,
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Experienced corporate lawyer with expertise in mergers, acquisitions, and securities law.",
    availability: "available",
  },
  {
    id: "2",
    name: "Adv. Rajesh Kumar",
    title: "Managing Partner",
    firm: "Kumar Legal Services",
    location: "Delhi, NCR",
    experience: 12,
    rating: 4.8,
    reviews: 189,
    specializations: ["Criminal Law", "Civil Rights", "Constitutional"],
    hourlyRate: 4000,
    responseTime: "< 1 hour",
    successRate: 91,
    casesWon: 134,
    verified: true,
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Criminal defense attorney with a strong track record in high-profile cases.",
    availability: "available",
  },
  {
    id: "3",
    name: "Adv. Meera Patel",
    title: "Senior Advocate",
    firm: "Patel Law Chambers",
    location: "Bangalore, Karnataka",
    experience: 18,
    rating: 5.0,
    reviews: 312,
    specializations: ["IP Law", "Technology", "Patents"],
    hourlyRate: 6000,
    responseTime: "< 3 hours",
    successRate: 97,
    casesWon: 203,
    verified: true,
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Intellectual property specialist with extensive experience in tech and patent law.",
    availability: "busy",
  },
]

const mockCases: Case[] = [
  {
    id: "1",
    title: "Startup Legal Setup and Compliance",
    category: "Corporate Law",
    budget: "₹50,000 - ₹1,00,000",
    description:
      "Need comprehensive legal setup for a tech startup including incorporation, compliance, and initial contracts.",
    client: "TechStart Inc.",
    location: "Mumbai, Maharashtra",
    postedDate: "2024-01-12",
    bids: 8,
    urgency: "medium",
    status: "open",
  },
  {
    id: "2",
    title: "Employment Dispute Resolution",
    category: "Employment Law",
    budget: "₹25,000 - ₹50,000",
    description: "Wrongful termination case requiring immediate legal representation and negotiation.",
    client: "John Doe",
    location: "Delhi, NCR",
    postedDate: "2024-01-11",
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
      "Need assistance with patent filing and comprehensive IP protection strategy for innovative technology.",
    client: "InnovateTech",
    location: "Bangalore, Karnataka",
    postedDate: "2024-01-10",
    bids: 6,
    urgency: "low",
    status: "open",
  },
]

export default function MarketplacePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<"lawyers" | "cases">("lawyers")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [savedItems, setSavedItems] = useState<string[]>([])

  const specializations = [
    "Corporate Law",
    "Criminal Law",
    "Civil Law",
    "Family Law",
    "Employment Law",
    "Intellectual Property",
    "Real Estate",
    "Tax Law",
    "Immigration",
    "Constitutional Law",
  ]

  const locations = [
    "Mumbai, Maharashtra",
    "Delhi, NCR",
    "Bangalore, Karnataka",
    "Chennai, Tamil Nadu",
    "Kolkata, West Bengal",
    "Pune, Maharashtra",
    "Hyderabad, Telangana",
    "Ahmedabad, Gujarat",
  ]

  const filteredLawyers = mockLawyers.filter((lawyer) => {
    const matchesSearch =
      lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.specializations.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSpecialization =
      selectedSpecialization === "all" || lawyer.specializations.includes(selectedSpecialization)
    const matchesLocation = selectedLocation === "all" || lawyer.location === selectedLocation
    return matchesSearch && matchesSpecialization && matchesLocation
  })

  const filteredCases = mockCases.filter((case_item) => {
    const matchesSearch =
      case_item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_item.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
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

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const toggleSaveItem = (itemId: string) => {
    setSavedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const renderLawyerCard = (lawyer: Lawyer, index: number) => (
    <motion.div
      key={lawyer.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/30 backdrop-blur-xl hover:border-[#FCD34D]/60 transition-all duration-300 h-full shadow-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="w-16 h-16 ring-2 ring-[#FCD34D]/30">
                  <AvatarImage src={lawyer.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 text-black font-bold">
                    {lawyer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-gray-900 ${getAvailabilityColor(lawyer.availability)}`}
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{lawyer.name}</h3>
                <p className="text-[#FCD34D] font-medium">{lawyer.title}</p>
                <p className="text-gray-400 text-sm">{lawyer.firm}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              {lawyer.verified && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Award className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleSaveItem(lawyer.id)}
                className={`${savedItems.includes(lawyer.id) ? "text-red-400 hover:text-red-300" : "text-gray-400 hover:text-white"}`}
              >
                <Heart className={`w-4 h-4 ${savedItems.includes(lawyer.id) ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-[#FCD34D] fill-current" />
              <span className="font-semibold text-white">{lawyer.rating}</span>
              <span className="text-gray-400 text-sm">({lawyer.reviews} reviews)</span>
            </div>
            <div className="text-right">
              <p className="text-[#FCD34D] font-bold">₹{lawyer.hourlyRate.toLocaleString()}/hr</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-gray-400 text-sm">
              <MapPin className="w-4 h-4 mr-2 text-[#FCD34D]" />
              <span>{lawyer.location}</span>
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <Briefcase className="w-4 h-4 mr-2 text-[#FCD34D]" />
              <span>{lawyer.experience} years experience</span>
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <Clock className="w-4 h-4 mr-2 text-[#FCD34D]" />
              <span>Responds {lawyer.responseTime}</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">{lawyer.bio}</p>

          <div className="flex flex-wrap gap-1">
            {lawyer.specializations.slice(0, 3).map((spec, idx) => (
              <Badge key={idx} className="bg-[#FCD34D]/20 text-[#FCD34D] border-[#FCD34D]/30 text-xs">
                {spec}
              </Badge>
            ))}
            {lawyer.specializations.length > 3 && (
              <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs">
                +{lawyer.specializations.length - 3} more
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="text-center">
              <p className="text-[#FCD34D] font-bold text-lg">{lawyer.successRate}%</p>
              <p className="text-gray-400 text-xs">Success Rate</p>
            </div>
            <div className="text-center">
              <p className="text-[#FCD34D] font-bold text-lg">{lawyer.casesWon}</p>
              <p className="text-gray-400 text-xs">Cases Won</p>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              className="flex-1 bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
              asChild
            >
              <Link href={user ? `/${user.type}/lawyer/${lawyer.id}` : `/auth/login`}>
                <Eye className="w-4 h-4 mr-2" />
                View Profile
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
              asChild
            >
              <Link href={user ? `/${user.type}/messages?lawyer=${lawyer.id}` : `/auth/login`}>
                <MessageSquare className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

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
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleSaveItem(case_item.id)}
                  className={`${savedItems.includes(case_item.id) ? "text-red-400 hover:text-red-300" : "text-gray-400 hover:text-white"}`}
                >
                  <Heart className={`w-4 h-4 ${savedItems.includes(case_item.id) ? "fill-current" : ""}`} />
                </Button>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">{case_item.description}</p>

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
                    <p className="text-white font-semibold">{case_item.postedDate}</p>
                    <p className="text-xs">Posted</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-gray-400 text-sm">
                  Posted by <span className="text-white font-medium">{case_item.client}</span>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                    asChild
                  >
                    <Link href={user?.type === "lawyer" ? `/lawyer/case/${case_item.id}/bid` : `/auth/login`}>
                      <Gavel className="w-4 h-4 mr-2" />
                      {user?.type === "lawyer" ? "Place Bid" : "Login to Bid"}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-gray-900 to-black text-white">
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-[#0B0F19] via-gray-900/50 to-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#FCD34D] to-yellow-600 bg-clip-text text-transparent">
                Legal Marketplace
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                {user?.type === "client"
                  ? "Find qualified lawyers for your legal needs"
                  : user?.type === "lawyer"
                    ? "Discover new cases and grow your practice"
                    : "Connect legal professionals with clients worldwide"}
              </p>

              {/* Tab Navigation */}
              <div className="flex justify-center mb-8">
                <Tabs
                  value={activeTab}
                  onValueChange={(value) => setActiveTab(value as "lawyers" | "cases")}
                  className="w-full max-w-md"
                >
                  <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 backdrop-blur-sm border border-[#FCD34D]/20">
                    <TabsTrigger
                      value="lawyers"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FCD34D] data-[state=active]:to-yellow-600 data-[state=active]:text-black font-semibold"
                    >
                      <Users className="w-5 h-5 mr-2" />
                      Find Lawyers
                    </TabsTrigger>
                    <TabsTrigger
                      value="cases"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FCD34D] data-[state=active]:to-yellow-600 data-[state=active]:text-black font-semibold"
                    >
                      <Briefcase className="w-5 h-5 mr-2" />
                      Browse Cases
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 px-6 lg:px-8 border-b border-[#FCD34D]/20 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder={
                      activeTab === "lawyers"
                        ? "Search lawyers by name or specialization..."
                        : "Search cases by title or category..."
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400 backdrop-blur-sm"
                  />
                </div>
              </div>

              {activeTab === "lawyers" && (
                <>
                  <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                    <SelectTrigger className="w-full lg:w-64 h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white backdrop-blur-sm">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Specialization" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-[#FCD34D]/20 backdrop-blur-xl">
                      <SelectItem value="all">All Specializations</SelectItem>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
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
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="experience">Most Experienced</SelectItem>
                      <SelectItem value="rate">Lowest Rate</SelectItem>
                      <SelectItem value="response">Fastest Response</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "lawyers" | "cases")}>
              <TabsContent value="lawyers">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredLawyers.map((lawyer, index) => renderLawyerCard(lawyer, index))}
                </div>
              </TabsContent>

              <TabsContent value="cases">
                <div className="space-y-8">
                  {filteredCases.map((case_item, index) => renderCaseCard(case_item, index))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Empty State */}
            {((activeTab === "lawyers" && filteredLawyers.length === 0) ||
              (activeTab === "cases" && filteredCases.length === 0)) && (
              <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  {activeTab === "lawyers" ? (
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  ) : (
                    <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  )}
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No {activeTab === "lawyers" ? "Lawyers" : "Cases"} Found
                  </h3>
                  <p className="text-gray-400 mb-6">Try adjusting your search criteria or browse all {activeTab}</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedSpecialization("all")
                      setSelectedLocation("all")
                    }}
                    className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-[#FCD34D]/10 via-amber-600/10 to-yellow-500/10 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              {!user ? "Join LexiPro Today" : user.type === "client" ? "Need Legal Help?" : "Grow Your Practice"}
            </h2>
            <p className="text-gray-300 mb-8">
              {!user
                ? "Connect with legal professionals or find clients for your practice"
                : user.type === "client"
                  ? "Post your case and get competitive bids from verified lawyers"
                  : "Find new cases and expand your client base"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                <>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold px-8 py-4"
                    asChild
                  >
                    <Link href="/auth/signup?type=client">Join as Client</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent px-8 py-4"
                    asChild
                  >
                    <Link href="/auth/signup?type=lawyer">Join as Lawyer</Link>
                  </Button>
                </>
              ) : user.type === "client" ? (
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold px-8 py-4"
                  asChild
                >
                  <Link href="/client/post-case">
                    <Plus className="w-5 h-5 mr-2" />
                    Post Your Case
                  </Link>
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold px-8 py-4"
                  asChild
                >
                  <Link href="/lawyer/cases">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    View All Cases
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
