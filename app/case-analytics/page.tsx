import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2 } from "lucide-react"

export default function CaseAnalyticsPage() {
  return (
    <DashboardLayout userType="client">
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <BarChart2 className="w-6 h-6" />
              Case Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">This feature is currently under development.</p>
            <p className="text-gray-400">Stay tuned for updates!</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
