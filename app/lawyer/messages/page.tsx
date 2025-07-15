"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Send,
  Mic,
  MessageSquare,
  Phone,
  Video,
  Info,
  MoreHorizontal,
  PlusCircle,
  Smile,
  Gift,
  ImageIcon,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"

interface Message {
  id: string
  sender: "me" | "other"
  content: string
  timestamp: Date
}

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  messages: Message[]
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Client A",
    avatar: "/placeholder-user.jpg",
    lastMessage: "Thanks for the update on the contract.",
    lastMessageTime: new Date("2024-07-15T10:30:00Z"),
    unreadCount: 1,
    messages: [
      {
        id: "m1",
        sender: "other",
        content: "Hi Adv. Sharma, do you have an update on the contract review?",
        timestamp: new Date("2024-07-15T10:25:00Z"),
      },
      {
        id: "m2",
        sender: "me",
        content: "Yes, almost done. Just finalizing a few clauses. Will send by EOD.",
        timestamp: new Date("2024-07-15T10:28:00Z"),
      },
      {
        id: "m3",
        sender: "other",
        content: "Great! Looking forward to it.",
        timestamp: new Date("2024-07-15T10:30:00Z"),
      },
    ],
  },
  {
    id: "2",
    name: "Client B",
    avatar: "/placeholder-user.jpg",
    lastMessage: "Can we reschedule our meeting?",
    lastMessageTime: new Date("2024-07-14T16:00:00Z"),
    unreadCount: 0,
    messages: [
      {
        id: "m4",
        sender: "other",
        content: "Hi, I need to reschedule our meeting for tomorrow.",
        timestamp: new Date("2024-07-14T15:50:00Z"),
      },
      {
        id: "m5",
        sender: "me",
        content: "Sure, what time works for you?",
        timestamp: new Date("2024-07-14T15:55:00Z"),
      },
      { id: "m6", sender: "other", content: "How about Friday at 11 AM?", timestamp: new Date("2024-07-14T15:58:00Z") },
      {
        id: "m7",
        sender: "me",
        content: "Friday at 11 AM works for me. I'll send a calendar invite.",
        timestamp: new Date("2024-07-14T16:00:00Z"),
      },
    ],
  },
  {
    id: "3",
    name: "Client C",
    avatar: "/placeholder-user.jpg",
    lastMessage: "Received the documents. Thanks!",
    lastMessageTime: new Date("2024-07-13T09:00:00Z"),
    unreadCount: 0,
    messages: [
      {
        id: "m8",
        sender: "me",
        content: "I've uploaded the property documents to your portal.",
        timestamp: new Date("2024-07-13T08:55:00Z"),
      },
      {
        id: "m9",
        sender: "other",
        content: "Received the documents. Thanks!",
        timestamp: new Date("2024-07-13T09:00:00Z"),
      },
    ],
  },
]

export default function LawyerMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0])
  const [inputMessage, setInputMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [selectedConversation?.messages])

  const handleSendMessage = () => {
    if (inputMessage.trim() === "" || !selectedConversation) return

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "me",
      content: inputMessage,
      timestamp: new Date(),
    }

    setSelectedConversation((prev) => {
      if (!prev) return null
      const updatedMessages = [...prev.messages, newMessage]
      return {
        ...prev,
        messages: updatedMessages,
        lastMessage: newMessage.content,
        lastMessageTime: newMessage.timestamp,
      }
    })
    setInputMessage("")
  }

  return (
    <DashboardLayout userType="lawyer">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
            <p className="text-gray-400">Communicate securely with your clients</p>
          </div>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10 flex flex-col lg:flex-row h-[80vh]">
          {/* Conversation List */}
          <div className="w-full lg:w-1/3 border-r border-white/10 p-4 flex flex-col">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
            <ScrollArea className="flex-1">
              <div className="space-y-2">
                {mockConversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation?.id === conv.id
                        ? "bg-blue-500/20 border border-blue-500/30"
                        : "hover:bg-white/10"
                    }`}
                    onClick={() => setSelectedConversation(conv)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conv.avatar || "/placeholder.svg"} alt={`${conv.name} Avatar`} />
                      <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white">{conv.name}</h3>
                        <span className="text-xs text-gray-400">{format(conv.lastMessageTime, "HH:mm")}</span>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unreadCount > 0 && (
                      <Badge className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">{conv.unreadCount}</Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                <CardHeader className="border-b border-white/10 p-4 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={selectedConversation.avatar || "/placeholder.svg"}
                        alt={`${selectedConversation.name} Avatar`}
                      />
                      <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-white">{selectedConversation.name}</CardTitle>
                      <p className="text-sm text-gray-400">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <Phone className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <Video className="w-5 h-5" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700 text-white">
                        <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                          <Info className="w-4 h-4 mr-2" /> View Contact Info
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                          <Search className="w-4 h-4 mr-2" /> Search in Chat
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-6 overflow-hidden flex flex-col">
                  <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-6">
                      {selectedConversation.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex items-start gap-3 ${
                            message.sender === "me" ? "justify-end" : "justify-start"
                          }`}
                        >
                          {message.sender === "other" && (
                            <Avatar className="h-8 w-8 border border-blue-400">
                              <AvatarImage
                                src={selectedConversation.avatar || "/placeholder.svg"}
                                alt={`${selectedConversation.name} Avatar`}
                              />
                              <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`max-w-[70%] p-4 rounded-lg ${
                              message.sender === "me"
                                ? "bg-blue-600 text-white rounded-br-none"
                                : "bg-gray-800 text-gray-200 rounded-bl-none"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <span className="block text-xs text-gray-400 mt-1">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          {message.sender === "me" && (
                            <Avatar className="h-8 w-8 border border-gray-400">
                              <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                              <AvatarFallback>You</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-6">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <PlusCircle className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <ImageIcon className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <Gift className="w-5 h-5" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    />
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <Smile className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <Mic className="w-5 h-5" />
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={inputMessage.trim() === ""}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold"
                    >
                      <Send className="w-5 h-5" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <MessageSquare className="w-20 h-20 mb-4" />
                <p className="text-lg">Select a conversation to start chatting</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
