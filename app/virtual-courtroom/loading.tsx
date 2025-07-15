import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-xl bg-gray-800" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64 bg-gray-800" />
            <Skeleton className="h-5 w-96 bg-gray-800" />
          </div>
        </div>

        {/* Content Skeleton */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-red-500/30 backdrop-blur-xl">
          <CardContent className="p-12 text-center">
            <Skeleton className="w-16 h-16 mx-auto mb-4 bg-gray-800" />
            <Skeleton className="h-6 w-48 mx-auto mb-2 bg-gray-800" />
            <Skeleton className="h-4 w-3/4 mx-auto mb-6 bg-gray-800" />
            <Skeleton className="h-10 w-40 mx-auto bg-gray-800" />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
