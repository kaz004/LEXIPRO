"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Star, Users, MessageSquare, Filter, SortAsc, Briefcase, Phone, Video } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"

interface Lawyer {
  id: string
  name: string
  specialization: string[]
  experience: number
  rating: number
  reviews: number
  location: string
  hourlyRate: string
  availability: "available" | "busy" | "offline"
  avatar: string
  bio: string
  languages: string[]
  successRate: number
  casesWon: number
}

const mockLawyers: Lawyer[] = [
  {
    id: "1",
    name: "Advocate Priya Sharma",
    specialization: ["Corporate Law", "Startup Legal", "Contract Law"],
    experience: 8,
    rating: 4.9,
    reviews: 127,
    location: "Mumbai, Maharashtra",
    hourlyRate: "₹3,500 - ₹5,000",
    availability: "available",
    avatar: "/placeholder-user.jpg",
    bio: "Experienced corporate lawyer specializing in startup legal frameworks and contract negotiations. Helped 200+ startups with legal compliance.",
    languages: ["English", "Hindi", "Marathi"],
    successRate: 94,
    casesWon: 156,
  },
  {
    id: "2",
    name: "Advocate Rajesh Kumar",
    specialization: ["Employment Law", "Labor Disputes", "HR Compliance"],
    experience: 12,
    rating: 4.8,
    reviews: 203,
    location: "Delhi, NCR",
    hourlyRate: "₹4,000 - ₹6,000",
    availability: "busy",
    avatar: "/placeholder-user.jpg",
    bio: "Senior employment law specialist with extensive experience in labor disputes and HR compliance. Successfully resolved 300+ employment cases.",
    languages: ["English", "Hindi", "Punjabi"],
    successRate: 91,
    casesWon: 278,
  },
  {
    id: "3",
    name: "Advocate Meera Patel",
    specialization: ["Intellectual Property", "Patent Law", "Trademark"],
    experience: 10,
    rating: 4.9,
    reviews: 89,
    location: "Bangalore, Karnataka",
    hourlyRate: "₹5,000 - ₹7,500",
    availability: "available",
    avatar: "/placeholder-user.jpg",
    bio: "IP law expert with deep knowledge in patent filing and trademark protection. Secured 500+ patents for tech companies and startups.",
    languages: ["English", "Hindi", "Kannada"],
    successRate: 96,
    casesWon: 134,
  },
  {
    id: "4",
    name: "Advocate Suresh Reddy",
    specialization: ["Real Estate", "Property Law", "Construction Law"],
    experience: 15,
    rating: 4.7,
    reviews: 156,
    location: "Chennai, Tamil Nadu",
    hourlyRate: "₹3,000 - ₹4,500",
    availability: "available",
    avatar: "/placeholder-user.jpg",
    bio: "Real estate law veteran with 15 years of experience in property disputes and construction law. Handled transactions worth ₹500+ crores.",
    languages: ["English", "Tamil", "Telugu"],
    successRate: 89,
    casesWon: 234,
  },
  {
    id: "5",
    name: "Advocate Anjali Singh",
    specialization: ["Family Law", "Divorce", "Child Custody"],
    experience: 9,
    rating: 4.8,
    reviews: 178,
    location: "Mumbai, Maharashtra",
    hourlyRate: "₹2,500 - ₹4,000",
    availability: "offline",
    avatar: "/placeholder-user.jpg",
    bio: "Compassionate family law attorney specializing in divorce proceedings and child custody cases. Known for sensitive handling of family matters.",
    languages: ["English", "Hindi", "Marathi"],
    successRate: 92,
    casesWon: 167,
  },
]

export default function ClientMarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [sortBy, setSortBy] = useState("rating")

  const specializations = Array.from(new Set(mockLawyers.flatMap((l) => l.specialization)))
  const locations = Array.from(new Set(mockLawyers.map((l) => l.location)))

  const filteredLawyers = mockLawyers
    .filter((lawyer) => {
      const matchesSearch =
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.specialization.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
        lawyer.bio.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesSpecialization =
        selectedSpecialization === "all" || lawyer.specialization.includes(selectedSpecialization)
      const matchesLocation = selectedLocation === "all" || lawyer.location === selectedLocation

      return matchesSearch && matchesSpecialization && matchesLocation
    })
    .sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating // Highest rating first
      }
      if (sortBy === "experience") {
        return b.experience - a.experience // Most experienced first
      }
      if (sortBy === "reviews") {
        return b.reviews - a.reviews // Most reviews first
      }
      return 0
    })

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "busy":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "offline":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const renderLawyerCard = (lawyer: Lawyer, index: number) => (
    <motion.div
      key={lawyer.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/30 backdrop-blur-xl hover:border-[#FCD34D]/60 transition-all duration-300 shadow-2xl">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-20 h-20 border-2 border-[#FCD34D]/30">
                <AvatarImage src={lawyer.avatar || "/placeholder.svg"} alt={lawyer.name} />
                <AvatarFallback className="bg-[#FCD34D]/20 text-[#FCD34D] text-lg font-semibold">
                  {lawyer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{lawyer.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-semibold ml-1">{lawyer.rating}</span>
                        <span className="text-gray-400 text-sm ml-1">({lawyer.reviews} reviews)</span>
                      </div>
                      <Badge className={getAvailabilityColor(lawyer.availability)}>{lawyer.availability}</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {lawyer.specialization.map((spec) => (
                    <Badge key={spec} className="bg-[#FCD34D]/20 text-[#FCD34D] border-[#FCD34D]/30">
                      {spec}
                    </Badge>
                  ))}
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed line-clamp-2">{lawyer.bio}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-white font-semibold">{lawyer.experience} years</p>
                    <p className="text-xs text-gray-400">Experience</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold">{lawyer.successRate}%</p>
                    <p className="text-xs text-gray-400">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold">{lawyer.casesWon}</p>
                    <p className="text-xs text-gray-400">Cases Won</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold">{lawyer.hourlyRate}</p>
                    <p className="text-xs text-gray-400">Per Hour</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {lawyer.location}
                  </span>
                  <span>Languages: {lawyer.languages.join(", ")}</span>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                    asChild
                  >
                    <Link href={`/client/lawyer/${lawyer.id}`}>
                      <Briefcase className="w-4 h-4 mr-2" />
                      View Profile
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#FCD34D]/20 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
                    asChild
                  >
                    <Link href={`/client/messages?lawyer=${lawyer.id}`}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Link>
                  </Button>
                  {lawyer.availability === "available" && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-[#FCD34D]/20 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-[#FCD34D]/20 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
                      >
                        <Video className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <DashboardLayout userType="client">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Lawyer Marketplace</h1>
            <p className="text-gray-400">Find the right legal professional for your needs</p>
          </div>
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
            asChild
          >
            <Link href="/client/post-case">
              <Briefcase className="w-4 h-4 mr-2" />
              Post a New Case
            </Link>
          </Button>
        </div>

        {/* Filters Section */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/30 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search lawyers by name, specialization, or expertise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400 backdrop-blur-sm"
                  />
                </div>
              </div>

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
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lawyers List */}
        <div className="space-y-8">
          {filteredLawyers.length === 0 ? (
            <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Lawyers Found</h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search criteria or filters. New lawyers join our platform regularly!
                </p>
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
          ) : (
            filteredLawyers.map((lawyer, index) => renderLawyerCard(lawyer, index))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
