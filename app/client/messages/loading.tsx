import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from "lucide-react"

export default function ClientMessagesLoading() {
  return (
    <DashboardLayout userType="client">
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-xl" />
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-64" />
          </div>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10 flex flex-col lg:flex-row h-[80vh]">
          {/* Conversation List Skeleton */}
          <div className="w-full lg:w-1/3 border-r border-white/10 p-4 flex flex-col">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Skeleton className="pl-10 h-10 w-full" />
            </div>
            <div className="flex-1 space-y-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window Skeleton */}
          <div className="flex-1 flex flex-col">
            <CardHeader className="border-b border-white/10 p-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-6 overflow-hidden flex flex-col">
              <div className="flex-1 space-y-6">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${index % 2 === 0 ? "justify-end" : "justify-start"}`}
                  >
                    {index % 2 !== 0 && <Skeleton className="h-8 w-8 rounded-full" />}
                    <Skeleton className="max-w-[70%] h-16 rounded-lg" />
                    {index % 2 === 0 && <Skeleton className="h-8 w-8 rounded-full" />}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-6">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="flex-1 h-10" />
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-10 w-24" />
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
