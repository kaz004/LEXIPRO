"use client"

import { CardDescription } from "@/components/ui/card"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, DonutChart } from "@tremor/react" // Assuming Tremor is available or similar chart components
import { DollarSign, Users, Briefcase, Star } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function LawyerAnalyticsPage() {
  const [timeframe, setTimeframe] = useState("monthly")

  const revenueData = [
    { name: "Jan", Revenue: 400000, Cases: 12 },
    { name: "Feb", Revenue: 450000, Cases: 15 },
    { name: "Mar", Revenue: 500000, Cases: 18 },
    { name: "Apr", Revenue: 480000, Cases: 16 },
    { name: "May", Revenue: 550000, Cases: 20 },
    { name: "Jun", Revenue: 600000, Cases: 22 },
  ]

  const caseCategoryData = [
    { name: "Corporate Law", value: 35 },
    { name: "Employment Law", value: 20 },
    { name: "IP Law", value: 15 },
    { name: "Real Estate", value: 10 },
    { name: "Family Law", value: 10 },
    { name: "Other", value: 10 },
  ]

  const clientAcquisitionData = [
    { name: "Jan", NewClients: 5 },
    { name: "Feb", NewClients: 7 },
    { name: "Mar", NewClients: 6 },
    { name: "Apr", NewClients: 8 },
    { name: "May", NewClients: 10 },
    { name: "Jun", NewClients: 9 },
  ]

  const averageCaseDurationData = [
    { name: "Jan", Duration: 30 },
    { name: "Feb", Duration: 28 },
    { name: "Mar", Duration: 25 },
    { name: "Apr", Duration: 27 },
    { name: "May", Duration: 23 },
    { name: "Jun", Duration: 20 },
  ]

  const clientSatisfactionData = [
    { name: "5 Stars", value: 70 },
    { name: "4 Stars", value: 20 },
    { name: "3 Stars", value: 7 },
    { name: "2 Stars", value: 2 },
    { name: "1 Star", value: 1 },
  ]

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.Revenue, 0)
  const totalCases = revenueData.reduce((sum, item) => sum + item.Cases, 0)
  const totalNewClients = clientAcquisitionData.reduce((sum, item) => sum + item.NewClients, 0)

  return (
    <DashboardLayout userType="lawyer">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Analytics & Reports</h1>
            <p className="text-gray-400">Gain insights into your practice performance</p>
          </div>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-full lg:w-48 bg-gray-800/50 border-[#FCD34D]/20 text-white">
              <SelectValue placeholder="Select Timeframe" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-[#FCD34D]/20">
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">₹{totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-[#FCD34D]" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-blue-500/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Total Cases</p>
                  <p className="text-2xl font-bold text-white">{totalCases}</p>
                </div>
                <Briefcase className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-green-500/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">New Clients</p>
                  <p className="text-2xl font-bold text-white">{totalNewClients}</p>
                </div>
                <Users className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-500/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Avg. Rating</p>
                  <p className="text-2xl font-bold text-white">
                    4.9 <span className="text-lg text-gray-400">/ 5</span>
                  </p>
                </div>
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Revenue & Cases Overview</CardTitle>
              <CardDescription className="text-gray-400">Monthly revenue and number of cases handled.</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <BarChart
                data={revenueData}
                index="name"
                categories={["Revenue", "Cases"]}
                colors={["yellow", "blue"]}
                yAxisWidth={48}
                className="h-full text-white"
                valueFormatter={(value) => value.toLocaleString()}
              />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Case Categories Distribution</CardTitle>
              <CardDescription className="text-gray-400">
                Distribution of cases across different legal categories.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <DonutChart
                data={caseCategoryData}
                category="value"
                index="name"
                valueFormatter={(v) => `${v}%`}
                colors={["yellow", "blue", "purple", "green", "red", "gray"]}
                className="h-full w-full"
              />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Client Acquisition Trend</CardTitle>
              <CardDescription className="text-gray-400">New clients acquired over time.</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <LineChart
                data={clientAcquisitionData}
                index="name"
                categories={["NewClients"]}
                colors={["green"]}
                yAxisWidth={48}
                className="h-full text-white"
              />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Average Case Duration</CardTitle>
              <CardDescription className="text-gray-400">Average days to resolve a case.</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <LineChart
                data={averageCaseDurationData}
                index="name"
                categories={["Duration"]}
                colors={["orange"]}
                yAxisWidth={48}
                className="h-full text-white"
                valueFormatter={(value) => `${value} days`}
              />
            </CardContent>
          </Card>
        </div>

        {/* Client Satisfaction */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Client Satisfaction Breakdown</CardTitle>
            <CardDescription className="text-gray-400">Distribution of client ratings.</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <DonutChart
              data={clientSatisfactionData}
              category="value"
              index="name"
              valueFormatter={(v) => `${v}%`}
              colors={["green", "yellow", "orange", "red", "gray"]}
              className="h-full w-full"
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
