"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Loader2, Lightbulb, TrendingUp, Gavel } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

export default function OutcomePredictorPage() {
  const [caseType, setCaseType] = useState("")
  const [caseDescription, setCaseDescription] = useState("")
  const [relevantLaws, setRelevantLaws] = useState("")
  const [prediction, setPrediction] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handlePredictOutcome = async () => {
    if (!caseType || !caseDescription || !relevantLaws) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to get a prediction.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setPrediction(null)

    // Simulate API call to an AI prediction model
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Mock prediction logic
    let mockPrediction = 0
    if (caseType === "contract" && caseDescription.toLowerCase().includes("breach")) {
      mockPrediction = 75 // High chance of success for plaintiff
    } else if (caseType === "criminal" && caseDescription.toLowerCase().includes("guilty")) {
      mockPrediction = 20 // Low chance of success for defense
    } else if (caseType === "property" && relevantLaws.toLowerCase().includes("land acquisition")) {
      mockPrediction = 60
    } else {
      mockPrediction = Math.floor(Math.random() * 60) + 20 // Random between 20-80%
    }

    setPrediction(mockPrediction)
    setIsLoading(false)
    toast({
      title: "Prediction Complete",
      description: "The AI has analyzed your case.",
    })
  }

  const getPredictionColor = (value: number | null) => {
    if (value === null) return "bg-gray-500"
    if (value >= 70) return "bg-green-500"
    if (value >= 40) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getPredictionText = (value: number | null) => {
    if (value === null) return "Awaiting analysis"
    if (value >= 70) return "High Likelihood of Success"
    if (value >= 40) return "Moderate Likelihood of Success"
    return "Low Likelihood of Success"
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Outcome Predictor</h1>
            <p className="text-gray-400">Leverage AI to predict potential outcomes for your cases.</p>
          </div>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              Case Details for Prediction
            </CardTitle>
            <CardDescription className="text-gray-400">
              Provide comprehensive details for a more accurate prediction.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="case-type" className="text-gray-300">
                Case Type
              </Label>
              <Select value={caseType} onValueChange={setCaseType} disabled={isLoading}>
                <SelectTrigger className="w-full bg-gray-800/50 border-gray-700 text-white focus:ring-yellow-400">
                  <SelectValue placeholder="Select case type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  <SelectItem value="contract">Contract Law</SelectItem>
                  <SelectItem value="criminal">Criminal Law</SelectItem>
                  <SelectItem value="property">Property Law</SelectItem>
                  <SelectItem value="family">Family Law</SelectItem>
                  <SelectItem value="corporate">Corporate Law</SelectItem>
                  <SelectItem value="intellectual_property">Intellectual Property</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="case-description" className="text-gray-300">
                Case Description
              </Label>
              <Textarea
                id="case-description"
                placeholder="Summarize the key facts, parties involved, and the core dispute. E.g., 'Client is suing a contractor for breach of contract due to unfinished work on a residential property. Contractor claims delays were due to unforeseen material shortages.'"
                value={caseDescription}
                onChange={(e) => setCaseDescription(e.target.value)}
                className="min-h-[120px] bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-yellow-400"
                disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="relevant-laws" className="text-gray-300">
                Relevant Laws/Precedents (Optional but Recommended)
              </Label>
              <Input
                id="relevant-laws"
                placeholder="e.g., Indian Contract Act, Specific Relief Act, landmark judgments"
                value={relevantLaws}
                onChange={(e) => setRelevantLaws(e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-yellow-400"
                disabled={isLoading}
              />
            </div>

            <Button
              onClick={handlePredictOutcome}
              disabled={isLoading || !caseType || !caseDescription}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-4 w-4" /> Predict Outcome
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {prediction !== null && (
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gavel className="w-5 h-5 text-yellow-400" />
                Prediction Result
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center gap-4 py-4">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <div
                    className={`absolute inset-0 rounded-full ${getPredictionColor(
                      prediction,
                    )} opacity-20 animate-pulse`}
                  ></div>
                  <div className="relative z-10 text-5xl font-bold text-white">{prediction}%</div>
                </div>
                <p className="text-xl font-semibold text-white">{getPredictionText(prediction)}</p>
                <Progress value={prediction} className={`w-full max-w-md h-3 ${getPredictionColor(prediction)}`} />
              </div>
              <CardDescription className="text-gray-400 text-center">
                This prediction is based on AI analysis and should be used as a guiding tool, not a definitive legal
                advice. Always consult with a legal professional.
              </CardDescription>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
