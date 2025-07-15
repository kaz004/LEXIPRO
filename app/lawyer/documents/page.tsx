"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, FileText, Download, Share2, Trash2, Edit, Folder, Upload, Filter, SortAsc } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { format } from "date-fns"

interface Document {
  id: string
  name: string
  type: string
  category: string
  lastModified: Date
  size: string
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Client Contract - InnovateTech.pdf",
    type: "PDF",
    category: "Contracts",
    lastModified: new Date("2024-07-15T10:00:00Z"),
    size: "2.5 MB",
  },
  {
    id: "2",
    name: "Property Dispute Brief.docx",
    type: "DOCX",
    category: "Case Briefs",
    lastModified: new Date("2024-07-14T14:30:00Z"),
    size: "1.1 MB",
  },
  {
    id: "3",
    name: "Trademark Application Form.pdf",
    type: "PDF",
    category: "Applications",
    lastModified: new Date("2024-07-12T09:00:00Z"),
    size: "0.8 MB",
  },
  {
    id: "4",
    name: "Employment Agreement Template.docx",
    type: "DOCX",
    category: "Templates",
    lastModified: new Date("2024-07-01T11:00:00Z"),
    size: "0.5 MB",
  },
  {
    id: "5",
    name: "Bail Hearing Notes.txt",
    type: "TXT",
    category: "Notes",
    lastModified: new Date("2024-07-14T16:00:00Z"),
    size: "0.1 MB",
  },
  {
    id: "6",
    name: "NDA Template.pdf",
    type: "PDF",
    category: "Templates",
    lastModified: new Date("2024-06-20T10:00:00Z"),
    size: "0.7 MB",
  },
]

export default function LawyerDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [sortBy, setSortBy] = useState("lastModified")

  const categories = Array.from(new Set(mockDocuments.map((doc) => doc.category)))
  const types = Array.from(new Set(mockDocuments.map((doc) => doc.type)))

  const filteredDocuments = mockDocuments
    .filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
      const matchesType = selectedType === "all" || doc.type === selectedType

      return matchesSearch && matchesCategory && matchesType
    })
    .sort((a, b) => {
      if (sortBy === "lastModified") {
        return b.lastModified.getTime() - a.lastModified.getTime() // Newest first
      }
      if (sortBy === "nameAsc") {
        return a.name.localeCompare(b.name) // Alphabetical
      }
      if (sortBy === "sizeDesc") {
        // Simple size comparison, could be improved for more accurate parsing (e.g., KB, MB, GB)
        const sizeA = Number.parseFloat(a.size)
        const sizeB = Number.parseFloat(b.size)
        return sizeB - sizeA
      }
      return 0
    })

  const getFileTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />
      case "docx":
      case "doc":
        return <FileText className="w-5 h-5 text-blue-500" />
      case "txt":
        return <FileText className="w-5 h-5 text-gray-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <DashboardLayout userType="lawyer">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Document Management</h1>
            <p className="text-gray-400">Organize, generate, and share your legal documents</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold">
            <Plus className="w-4 h-4 mr-2" />
            New Document
          </Button>
          <Button
            variant="outline"
            className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
          <Button
            variant="outline"
            className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
          >
            <Folder className="w-4 h-4 mr-2" />
            Create Folder
          </Button>
        </div>

        {/* Filters Section */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-purple-500/30 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search documents by name, category, or type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 backdrop-blur-sm"
                  />
                </div>
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48 h-12 bg-gray-800/50 border-purple-500/20 text-white backdrop-blur-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-purple-500/20 backdrop-blur-xl">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full lg:w-48 h-12 bg-gray-800/50 border-purple-500/20 text-white backdrop-blur-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="File Type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-purple-500/20 backdrop-blur-xl">
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48 h-12 bg-gray-800/50 border-purple-500/20 text-white backdrop-blur-sm">
                  <SortAsc className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-purple-500/20 backdrop-blur-xl">
                  <SelectItem value="lastModified">Last Modified</SelectItem>
                  <SelectItem value="nameAsc">Name (A-Z)</SelectItem>
                  <SelectItem value="sizeDesc">Size (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Document List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.length === 0 ? (
            <Card className="lg:col-span-3 bg-gradient-to-br from-gray-900/50 to-black/50 border-purple-500/20 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Documents Found</h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search criteria or filters, or upload a new document.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                    setSelectedType("all")
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredDocuments.map((doc) => (
              <Card
                key={doc.id}
                className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/60 transition-all duration-300"
              >
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    {getFileTypeIcon(doc.type)}
                    {doc.name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-purple-400">
                      <Edit className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-purple-400">
                      <Share2 className="w-4 h-4" />
                      <span className="sr-only">Share</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-300">
                  <p className="text-sm">
                    <span className="font-semibold">Category:</span> {doc.category}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Last Modified:</span>{" "}
                    {format(doc.lastModified, "MMM dd, yyyy HH:mm")}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Size:</span> {doc.size}
                  </p>
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="w-full bg-purple-500/20 border-purple-500/30 text-purple-300 hover:bg-purple-500/30 hover:text-purple-200"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
