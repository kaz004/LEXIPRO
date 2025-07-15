"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2, Target, Lightbulb, CheckCircle, XCircle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

interface TriageResult {
  category: string
  severity: "low" | "medium" | "high" | "critical"
  nextSteps: string[]
  relevantLaws: string[]
  confidence: number
}

const mockTriageResults: Record<string, TriageResult> = {
  "property dispute": {
    category: "Real Estate Law",
    severity: "high",
    nextSteps: [
      "Gather all property documents (sale deed, mutation records, etc.).",
      "Issue a legal notice to the opposing party.",
      "Consider mediation or arbitration before litigation.",
      "Consult a real estate lawyer for detailed advice.",
    ],
    relevantLaws: ["Transfer of Property Act, 1882", "Specific Relief Act, 1963", "Indian Easements Act, 1882"],
    confidence: 92,
  },
  "contract breach": {
    category: "Contract Law",
    severity: "medium",
    nextSteps: [
      "Review the contract thoroughly for breach clauses.",
      "Send a formal demand letter to the breaching party.",
      "Assess damages incurred due to the breach.",
      "Explore options for specific performance or compensation.",
    ],
    relevantLaws: ["Indian Contract Act, 1872", "Specific Relief Act, 1963"],
    confidence: 88,
  },
  "cyber crime": {
    category: "Cyber Law",
    severity: "critical",
    nextSteps: [
      "Immediately report to cyber crime cell/police.",
      "Preserve all digital evidence (screenshots, logs, emails).",
      "Secure affected accounts and systems.",
      "Consult a cyber law expert.",
    ],
    relevantLaws: ["Information Technology Act, 2000"],
    confidence: 95,
  },
  default: {
    category: "General Legal Inquiry",
    severity: "low",
    nextSteps: [
      "Provide more specific details for a better analysis.",
      "Identify the core legal question or issue.",
      "Consult a general legal practitioner.",
    ],
    relevantLaws: ["Varies based on specific details"],
    confidence: 60,
  },
}

export default function LegalTriagePage() {
  const [caseDetails, setCaseDetails] = useState("")
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleTriageCase = async () => {
    if (!caseDetails.trim()) {
      toast({
        title: "Missing Details",
        description: "Please provide details about the case for triage.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setTriageResult(null)

    // Simulate API call to an AI triage system
    await new Promise((resolve) => setTimeout(resolve, 2500))

    let result: TriageResult
    if (caseDetails.toLowerCase().includes("property")) {
      result = mockTriageResults["property dispute"]
    } else if (caseDetails.toLowerCase().includes("contract")) {
      result = mockTriageResults["contract breach"]
    } else if (caseDetails.toLowerCase().includes("cyber")) {
      result = mockTriageResults["cyber crime"]
    } else {
      result = mockTriageResults["default"]
    }

    setTriageResult(result)
    setIsLoading(false)
    toast({
      title: "Triage Complete",
      description: "The AI has triaged your case.",
    })
  }

  const getSeverityColor = (severity: TriageResult["severity"]) => {
    switch (severity) {
      case "critical":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      case "high":
        return "text-orange-400 bg-orange-500/20 border-orange-500/30"
      case "medium":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      case "low":
        return "text-green-400 bg-green-500/20 border-green-500/30"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Legal Triage System</h1>
            <p className="text-gray-400">Quickly assess the category, severity, and next steps for a legal inquiry.</p>
          </div>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              Case Details for Triage
            </CardTitle>
            <CardDescription className="text-gray-400">
              Enter a brief description of the legal issue or case.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="case-details" className="text-gray-300">
                Describe the Legal Issue
              </Label>
              <Textarea
                id="case-details"
                placeholder="e.g., 'My landlord is refusing to return my security deposit after I moved out, despite no damages.', or 'I received a notice from the tax department regarding discrepancies in my last year's filing.'"
                value={caseDetails}
                onChange={(e) => setCaseDetails(e.target.value)}
                className="min-h-[120px] bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-yellow-400"
                disabled={isLoading}
              />
            </div>

            <Button
              onClick={handleTriageCase}
              disabled={isLoading || !caseDetails.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Triaging...
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" /> Triage Case
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {triageResult && (
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Triage Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">Category</p>
                  <p className="text-white text-lg font-semibold">{triageResult.category}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">Severity</p>
                  <div
                    className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-sm font-medium ${getSeverityColor(triageResult.severity)}`}
                  >
                    {triageResult.severity === "critical" || triageResult.severity === "high" ? (
                      <XCircle className="h-4 w-4" />
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                    {triageResult.severity.charAt(0).toUpperCase() + triageResult.severity.slice(1)}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-gray-400 text-sm">Recommended Next Steps</p>
                <ul className="list-disc list-inside text-white space-y-1">
                  {triageResult.nextSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-gray-400 text-sm">Potentially Relevant Laws</p>
                <ul className="list-disc list-inside text-white space-y-1">
                  {triageResult.relevantLaws.map((law, index) => (
                    <li key={index}>{law}</li>
                  ))}
                </ul>
              </div>

              <CardDescription className="text-gray-400 text-center">
                AI Confidence: {triageResult.confidence}% - This analysis is for informational purposes only and does
                not constitute legal advice.
              </CardDescription>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
