"use client"

import type React from "react"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, DollarSign, Users, Gavel, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

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
      "Need comprehensive legal setup for a tech startup including incorporation, compliance, and initial contracts. Looking for a lawyer with experience in Indian startup ecosystem. This involves drafting founders' agreements, privacy policies, terms of service, and advising on intellectual property strategy. The client is looking for a lawyer who can provide end-to-end support and has a strong understanding of the legal landscape for startups in India, particularly in Mumbai.",
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
      "Wrongful termination case requiring immediate legal representation and negotiation for an employee based in Delhi. Experience with labor laws is a must. The employee was terminated without proper notice and compensation, and seeks to resolve this through mediation or litigation if necessary. Urgency is high due to financial strain on the client.",
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
      "Need assistance with patent filing and comprehensive IP protection strategy for innovative technology in Bangalore. Looking for an IP specialist. This includes conducting patent searches, drafting patent claims, and managing the application process with the Indian Patent Office. Client also requires advice on protecting trade secrets and copyrights.",
    client: "InnovateTech",
    location: "Bangalore, Karnataka",
    postedDate: new Date("2024-07-10T09:00:00Z"),
    bids: 6,
    urgency: "low",
    status: "open",
  },
]

export default function LawyerCaseBidPage() {
  const params = useParams()
  const caseId = params.id as string
  const case_item = mockCases.find((c) => c.id === caseId)

  const [bidAmount, setBidAmount] = useState("")
  const [proposal, setProposal] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  if (!case_item) {
    return (
      <DashboardLayout userType="lawyer">
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <Gavel className="w-20 h-20 mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Case Not Found</h1>
          <p className="text-lg">The case you are looking for does not exist or has been closed.</p>
          <Button
            className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
            asChild
          >
            <Link href="/lawyer/marketplace">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Marketplace
            </Link>
          </Button>
        </div>
      </DashboardLayout>
    )
  }

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

  const handleSubmitBid = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log({
      caseId: case_item.id,
      bidAmount,
      proposal,
    })

    toast({
      title: "Bid Submitted Successfully!",
      description: `Your bid of ₹${bidAmount} for "${case_item.title}" has been submitted.`,
      variant: "default",
    })

    // Reset form
    setBidAmount("")
    setProposal("")
    setIsSubmitting(false)
  }

  return (
    <DashboardLayout userType="lawyer">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Gavel className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Case Details & Bid</h1>
            <p className="text-gray-400">Review the case and submit your proposal</p>
          </div>
        </div>

        {/* Case Details Card */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white text-3xl mb-2">{case_item.title}</CardTitle>
            <CardDescription className="text-gray-400 flex items-center gap-4">
              <Badge className="bg-[#FCD34D]/20 text-[#FCD34D] border-[#FCD34D]/30">{case_item.category}</Badge>
              <Badge className={getUrgencyColor(case_item.urgency)}>{case_item.urgency} priority</Badge>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {case_item.location}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-300 leading-relaxed">{case_item.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center text-gray-400">
                <DollarSign className="w-5 h-5 mr-2 text-[#FCD34D]" />
                <div>
                  <p className="text-white font-semibold">{case_item.budget}</p>
                  <p className="text-xs">Client's Budget Range</p>
                </div>
              </div>
              <div className="flex items-center text-gray-400">
                <Users className="w-5 h-5 mr-2 text-[#FCD34D]" />
                <div>
                  <p className="text-white font-semibold">{case_item.bids} bids</p>
                  <p className="text-xs">Bids Received</p>
                </div>
              </div>
              <div className="flex items-center text-gray-400">
                <Calendar className="w-5 h-5 mr-2 text-[#FCD34D]" />
                <div>
                  <p className="text-white font-semibold">{format(case_item.postedDate, "MMM dd, yyyy")}</p>
                  <p className="text-xs">Posted Date</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Bid Form */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              Submit Your Bid
            </CardTitle>
            <CardDescription className="text-gray-400">
              Enter your proposed fee and a detailed proposal for this case.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitBid} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="bidAmount" className="text-white font-medium">
                  Your Proposed Fee (₹)
                </label>
                <Input
                  id="bidAmount"
                  type="number"
                  placeholder="e.g., 65000"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  required
                  min="1"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="proposal" className="text-white font-medium">
                  Your Proposal
                </label>
                <Textarea
                  id="proposal"
                  placeholder="Outline your approach, relevant experience, estimated timeline, and what makes you the best fit for this case."
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  required
                  rows={10}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[200px]"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting Bid...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Submit Bid
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Back to Marketplace */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href="/lawyer/marketplace">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Case Marketplace
            </Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
