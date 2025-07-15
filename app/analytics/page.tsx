"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  FileText,
  Clock,
  Target,
  Award,
  AlertCircle,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { formatCurrency } from "@/lib/utils"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(2450000),
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-400",
    },
    {
      title: "Active Clients",
      value: "156",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Cases Won",
      value: "89%",
      change: "+2.1%",
      trend: "up",
      icon: Award,
      color: "text-yellow-400",
    },
    {
      title: "Avg Case Duration",
      value: "45 days",
      change: "-5.3%",
      trend: "down",
      icon: Clock,
      color: "text-purple-400",
    },
  ]

  const revenueData = [
    { month: "Jan", revenue: 185000, cases: 12 },
    { month: "Feb", revenue: 220000, cases: 15 },
    { month: "Mar", revenue: 195000, cases: 13 },
    { month: "Apr", revenue: 240000, cases: 18 },
    { month: "May", revenue: 280000, cases: 22 },
    { month: "Jun", revenue: 310000, cases: 25 },
  ]

  const caseTypes = [
    { type: "Contract Law", count: 45, percentage: 35, color: "bg-blue-500" },
    { type: "Employment Law", count: 32, percentage: 25, color: "bg-green-500" },
    { type: "Real Estate", count: 25, percentage: 20, color: "bg-yellow-500" },
    { type: "Family Law", count: 15, percentage: 12, color: "bg-purple-500" },
    { type: "Criminal Law", count: 10, percentage: 8, color: "bg-red-500" },
  ]

  const topClients = [
    { name: "ABC Corporation", revenue: 450000, cases: 12 },
    { name: "TechStart Inc.", revenue: 320000, cases: 8 },
    { name: "Kumar Properties", revenue: 280000, cases: 15 },
    { name: "Global Enterprises", revenue: 240000, cases: 6 },
    { name: "Innovation Labs", revenue: 180000, cases: 9 },
  ]

  const performanceMetrics = [
    { metric: "Client Satisfaction", value: "98%", target: "95%", status: "excellent" },
    { metric: "Case Success Rate", value: "89%", target: "85%", status: "excellent" },
    { metric: "Response Time", value: "2.1 hrs", target: "4 hrs", status: "excellent" },
    { metric: "Document Accuracy", value: "96%", target: "95%", status: "good" },
    { metric: "Billing Efficiency", value: "92%", target: "90%", status: "good" },
    { metric: "Client Retention", value: "94%", target: "90%", status: "excellent" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Track your practice performance and insights</p>
          </div>
          <div className="flex gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40 bg-gray-800/50 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 bg-transparent">
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        {stat.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                        )}
                        <span className={`text-sm ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-r from-white/10 to-white/5 ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-yellow-400" />
                Revenue Trend
              </CardTitle>
              <CardDescription className="text-gray-400">Monthly revenue and case volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueData.map((data, index) => (
                  <div key={data.month} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-400 text-sm w-8">{data.month}</span>
                      <div className="flex-1">
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(data.revenue / 310000) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{formatCurrency(data.revenue)}</p>
                      <p className="text-gray-400 text-sm">{data.cases} cases</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Case Types Distribution */}
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-yellow-400" />
                Case Types Distribution
              </CardTitle>
              <CardDescription className="text-gray-400">Breakdown by practice area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {caseTypes.map((type) => (
                  <div key={type.type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{type.type}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-sm">{type.count} cases</span>
                        <span className="text-white font-semibold">{type.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className={`${type.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${type.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics and Top Clients */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Metrics */}
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-yellow-400" />
                Performance Metrics
              </CardTitle>
              <CardDescription className="text-gray-400">Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics.map((metric) => (
                  <div key={metric.metric} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                    <div>
                      <p className="text-white font-medium">{metric.metric}</p>
                      <p className="text-gray-400 text-sm">Target: {metric.target}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-bold">{metric.value}</span>
                      <Badge
                        className={
                          metric.status === "excellent"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : metric.status === "good"
                              ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                              : "bg-red-500/20 text-red-400 border-red-500/30"
                        }
                      >
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Clients */}
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-yellow-400" />
                Top Clients
              </CardTitle>
              <CardDescription className="text-gray-400">Highest revenue generating clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topClients.map((client, index) => (
                  <div key={client.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-white font-medium">{client.name}</p>
                        <p className="text-gray-400 text-sm">{client.cases} cases</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{formatCurrency(client.revenue)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights and Recommendations */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              AI Insights & Recommendations
            </CardTitle>
            <CardDescription className="text-gray-400">Data-driven insights for your practice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <h4 className="font-semibold text-blue-400">Revenue Growth</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  Your contract law practice is showing strong growth. Consider expanding this area with additional
                  resources.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <h4 className="font-semibold text-yellow-400">Efficiency Opportunity</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  Average case duration has decreased by 5.3%. Implement automation tools to further improve efficiency.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-5 h-5 text-green-400" />
                  <h4 className="font-semibold text-green-400">Client Satisfaction</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  Excellent client satisfaction rate of 98%. Your client service approach is working well.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
