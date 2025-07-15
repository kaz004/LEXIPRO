"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  MessageSquare,
  Plus,
  Search,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreHorizontal,
  Star,
  Archive,
  Trash2,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { formatDateTime, getInitials } from "@/lib/utils"

interface Message {
  id: string
  sender: string
  senderEmail: string
  subject: string
  content: string
  timestamp: Date
  isRead: boolean
  isStarred: boolean
  isImportant: boolean
  attachments?: string[]
  avatar?: string
}

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "Sarah Johnson",
    senderEmail: "sarah@email.com",
    subject: "Contract Review Update",
    content:
      "Hi John, I've reviewed the contract terms and have a few questions about clause 7.2. Could we schedule a call to discuss?",
    timestamp: new Date("2024-01-12T10:30:00"),
    isRead: false,
    isStarred: true,
    isImportant: true,
    attachments: ["contract_v2.pdf"],
  },
  {
    id: "2",
    sender: "Michael Chen",
    senderEmail: "michael@techcorp.com",
    subject: "Employment Agreement",
    content:
      "Thank you for the quick turnaround on the employment agreement. Everything looks good. When can we proceed with the signing?",
    timestamp: new Date("2024-01-12T09:15:00"),
    isRead: true,
    isStarred: false,
    isImportant: false,
  },
  {
    id: "3",
    sender: "Emma Wilson",
    senderEmail: "emma@startup.io",
    subject: "Business Setup Consultation",
    content:
      "I'd like to schedule a consultation for setting up my new business. What are your available time slots next week?",
    timestamp: new Date("2024-01-11T16:45:00"),
    isRead: false,
    isStarred: false,
    isImportant: true,
  },
  {
    id: "4",
    sender: "David Kumar",
    senderEmail: "david@realestate.com",
    subject: "Property Transaction Documents",
    content:
      "Please find attached the property documents for review. Let me know if you need any additional information.",
    timestamp: new Date("2024-01-11T14:20:00"),
    isRead: true,
    isStarred: true,
    isImportant: false,
    attachments: ["property_deed.pdf", "survey_report.pdf"],
  },
  {
    id: "5",
    sender: "Priya Sharma",
    senderEmail: "priya@consulting.in",
    subject: "Legal Opinion Request",
    content: "We need a legal opinion on the new compliance requirements. Can you provide an estimate for this work?",
    timestamp: new Date("2024-01-10T11:30:00"),
    isRead: true,
    isStarred: false,
    isImportant: false,
  },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [newMessage, setNewMessage] = useState({
    to: "",
    subject: "",
    content: "",
  })

  const filteredMessages = messages.filter(
    (message) =>
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const unreadCount = messages.filter((m) => !m.isRead).length
  const starredCount = messages.filter((m) => m.isStarred).length
  const importantCount = messages.filter((m) => m.isImportant).length

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message)
    if (!message.isRead) {
      setMessages(messages.map((m) => (m.id === message.id ? { ...m, isRead: true } : m)))
    }
  }

  const handleStarMessage = (messageId: string) => {
    setMessages(messages.map((m) => (m.id === messageId ? { ...m, isStarred: !m.isStarred } : m)))
  }

  const handleSendMessage = () => {
    // Handle sending message
    console.log("Sending message:", newMessage)
    setNewMessage({ to: "", subject: "", content: "" })
    setIsComposeOpen(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
            <p className="text-gray-400">Communicate with clients and colleagues</p>
          </div>
          <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                Compose
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Compose Message</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Send a new message to a client or colleague.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">To</label>
                  <Input
                    placeholder="Enter email address"
                    value={newMessage.to}
                    onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Subject</label>
                  <Input
                    placeholder="Enter subject"
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Message</label>
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                    className="bg-gray-800 border-gray-700 min-h-32"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" className="border-gray-700 bg-transparent">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Attach File
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSendMessage} className="bg-yellow-400 text-black hover:bg-yellow-500">
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Unread Messages</p>
                  <p className="text-3xl font-bold text-white">{unreadCount}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Starred</p>
                  <p className="text-3xl font-bold text-white">{starredCount}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Important</p>
                  <p className="text-3xl font-bold text-white">{importantCount}</p>
                </div>
                <Badge className="w-8 h-8 bg-red-500/20 text-red-400 border-red-500/30 rounded-full flex items-center justify-center">
                  !
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Inbox</CardTitle>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {filteredMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-800/30 transition-colors ${
                        selectedMessage?.id === message.id ? "bg-gray-800/50" : ""
                      } ${!message.isRead ? "border-l-4 border-l-yellow-400" : ""}`}
                      onClick={() => handleMessageClick(message)}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={message.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-yellow-400 text-black font-bold text-sm">
                            {getInitials(message.sender.split(" ")[0], message.sender.split(" ")[1] || "")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className={`font-medium truncate ${!message.isRead ? "text-white" : "text-gray-300"}`}>
                              {message.sender}
                            </p>
                            <div className="flex items-center space-x-1">
                              {message.isStarred && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                              {message.isImportant && (
                                <Badge className="w-4 h-4 bg-red-500/20 text-red-400 border-red-500/30 rounded-full flex items-center justify-center text-xs">
                                  !
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className={`text-sm truncate mb-1 ${!message.isRead ? "text-white" : "text-gray-400"}`}>
                            {message.subject}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{message.content}</p>
                          <p className="text-xs text-gray-500 mt-1">{formatDateTime(message.timestamp)}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={selectedMessage.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-yellow-400 text-black font-bold">
                          {getInitials(
                            selectedMessage.sender.split(" ")[0],
                            selectedMessage.sender.split(" ")[1] || "",
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{selectedMessage.sender}</h3>
                        <p className="text-gray-400 text-sm">{selectedMessage.senderEmail}</p>
                        <p className="text-gray-500 text-xs">{formatDateTime(selectedMessage.timestamp)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleStarMessage(selectedMessage.id)}
                        className={`${selectedMessage.isStarred ? "text-yellow-400" : "text-gray-400"} hover:text-yellow-400`}
                      >
                        <Star className={`w-4 h-4 ${selectedMessage.isStarred ? "fill-current" : ""}`} />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <Archive className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="pt-4">
                    <h2 className="text-xl font-semibold text-white mb-2">{selectedMessage.subject}</h2>
                    {selectedMessage.isImportant && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mb-4">Important</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{selectedMessage.content}</p>
                  </div>

                  {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                    <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        <Paperclip className="w-4 h-4 mr-2" />
                        Attachments ({selectedMessage.attachments.length})
                      </h4>
                      <div className="space-y-2">
                        {selectedMessage.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-700/30 rounded">
                            <span className="text-gray-300 text-sm">{attachment}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-600 text-gray-300 hover:bg-gray-600 bg-transparent"
                            >
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <div className="flex items-center space-x-3 mb-4">
                      <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold">
                        <Send className="w-4 h-4 mr-2" />
                        Reply
                      </Button>
                      <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 bg-transparent">
                        Forward
                      </Button>
                      <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 bg-transparent">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 bg-transparent">
                        <Video className="w-4 h-4 mr-2" />
                        Video Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
                <CardContent className="p-12 text-center">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No message selected</h3>
                  <p className="text-gray-400">Select a message from the inbox to view its content</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
