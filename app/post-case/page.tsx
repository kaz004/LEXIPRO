"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Send, DollarSign, FileText, Gavel, Lightbulb, CheckCircle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useToast } from "@/components/ui/use-toast"

export default function PostCasePage() {
  const [caseTitle, setCaseTitle] = useState("")
  const [caseDescription, setCaseDescription] = useState("")
  const [caseCategory, setCaseCategory] = useState("")
  const [budgetRange, setBudgetRange] = useState("")
  const [deadline, setDeadline] = useState<Date | undefined>(undefined)
  const [preferredLocation, setPreferredLocation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log({
      caseTitle,
      caseDescription,
      caseCategory,
      budgetRange,
      deadline: deadline?.toISOString(),
      preferredLocation,
    })

    toast({
      title: "Case Posted Successfully!",
      description: "Your legal case has been submitted to the marketplace. Lawyers will review and bid on it shortly.",
      variant: "default",
    })

    // Reset form
    setCaseTitle("")
    setCaseDescription("")
    setCaseCategory("")
    setBudgetRange("")
    setDeadline(undefined)
    setPreferredLocation("")
    setIsSubmitting(false)
  }

  return (
    <DashboardLayout userType="client">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Gavel className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Post a New Case</h1>
            <p className="text-gray-400">Describe your legal needs and get bids from qualified lawyers</p>
          </div>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              Case Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="caseTitle" className="text-white font-medium">
                    Case Title
                  </label>
                  <Input
                    id="caseTitle"
                    placeholder="e.g., Contract Dispute with Vendor"
                    value={caseTitle}
                    onChange={(e) => setCaseTitle(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="caseCategory" className="text-white font-medium">
                    Case Category
                  </label>
                  <Select value={caseCategory} onValueChange={setCaseCategory} required>
                    <SelectTrigger id="caseCategory" className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Corporate Law">Corporate Law</SelectItem>
                      <SelectItem value="Employment Law">Employment Law</SelectItem>
                      <SelectItem value="Real Estate">Real Estate</SelectItem>
                      <SelectItem value="Family Law">Family Law</SelectItem>
                      <SelectItem value="Criminal Law">Criminal Law</SelectItem>
                      <SelectItem value="Intellectual Property">Intellectual Property</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="caseDescription" className="text-white font-medium">
                  Case Description
                </label>
                <Textarea
                  id="caseDescription"
                  placeholder="Provide a detailed description of your legal issue, including key facts, parties involved, desired outcome, and any relevant documents or timelines."
                  value={caseDescription}
                  onChange={(e) => setCaseDescription(e.target.value)}
                  required
                  rows={8}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[150px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="budgetRange" className="text-white font-medium">
                    Budget Range
                  </label>
                  <Select value={budgetRange} onValueChange={setBudgetRange}>
                    <SelectTrigger id="budgetRange" className="bg-white/5 border-white/10 text-white">
                      <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Below ₹25,000">Below ₹25,000</SelectItem>
                      <SelectItem value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</SelectItem>
                      <SelectItem value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</SelectItem>
                      <SelectItem value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</SelectItem>
                      <SelectItem value="Above ₹2,50,000">Above ₹2,50,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="deadline" className="text-white font-medium">
                    Preferred Deadline
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={deadline} onSelect={setDeadline} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label htmlFor="preferredLocation" className="text-white font-medium">
                    Preferred Lawyer Location
                  </label>
                  <Input
                    id="preferredLocation"
                    placeholder="e.g., Mumbai, Delhi, Remote"
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Posting Case...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Post Case to Marketplace
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Tips for Posting a Case */}
        <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-400" />
              Tips for a Successful Case Post
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-300">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
              <p>
                **Be Specific**: Provide as much detail as possible about your legal issue. This helps lawyers
                understand the scope and provide accurate bids.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
              <p>
                **Set a Realistic Budget**: Research typical legal fees for your case type to set a competitive budget
                range.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
              <p>
                **Clear Deadlines**: If your case has time-sensitive elements, clearly state your preferred deadlines.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
              <p>
                **Review Bids Carefully**: Don't just look at price. Consider lawyer experience, reviews, and their
                proposed strategy.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
