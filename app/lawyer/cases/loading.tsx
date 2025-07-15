import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"

export default function LawyerCasesLoading() {
  return (
    <DashboardLayout userType="lawyer">
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-xl" />
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-64" />
          </div>
        </div>

        {/* Filters Section Skeleton */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-purple-500/30 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Skeleton className="pl-12 h-12 w-full" />
                </div>
              </div>
              <Skeleton className="w-full lg:w-48 h-12" />
              <Skeleton className="w-full lg:w-64 h-12" />
              <Skeleton className="w-full lg:w-48 h-12" />
            </div>
          </CardContent>
        </Card>

        {/* Cases Table Skeleton */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-white/5">
                  <TableHead className="text-gray-300">
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                  <TableHead className="text-gray-300">
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                  <TableHead className="text-gray-300">
                    <Skeleton className="h-4 w-28" />
                  </TableHead>
                  <TableHead className="text-gray-300">
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                  <TableHead className="text-gray-300">
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                  <TableHead className="text-gray-300 text-right">
                    <Skeleton className="h-4 w-12" />
                  </TableHead>
                  <TableHead className="text-gray-300">
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index} className="border-white/10">
                    <TableCell className="font-medium">
                      <Skeleton className="h-5 w-48" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-28" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-5 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-8 w-20" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
