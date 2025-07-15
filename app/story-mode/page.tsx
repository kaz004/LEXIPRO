"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, BookOpen, Sparkles, Lightbulb, MessageSquare } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { generateStory } from "./actions" // Import the server action

interface StorySegment {
  id: string
  role: "user" | "ai"
  content: string
  timestamp: Date
}

const quickPrompts = [
  {
    id: "1",
    label: "Fantasy Adventure",
    prompt: "Write a fantasy adventure story about a young wizard discovering a hidden power.",
  },
  {
    id: "2",
    label: "Sci-Fi Mystery",
    prompt: "Generate a sci-fi mystery set on a distant space station where something has gone terribly wrong.",
  },
  {
    id: "3",
    label: "Historical Drama",
    prompt: "Create a historical drama about a pivotal moment in ancient Indian history.",
  },
  {
    id: "4",
    label: "Modern Romance",
    prompt: "Develop a modern romance story about two strangers who meet in an unexpected way in a bustling city.",
  },
]

export default function StoryModePage() {
  const [storySegments, setStorySegments] = useState<StorySegment[]>([
    {
      id: "intro",
      role: "ai",
      content: "Welcome to Story Mode! Tell me a premise, and I'll help you craft a unique story.",
      timestamp: new Date(),
    },
  ])
  const [inputPrompt, setInputPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const storyEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    storyEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [storySegments])

  const handleGenerateStory = async () => {
    if (inputPrompt.trim() === "") return

    const newUserSegment: StorySegment = {
      id: Date.now().toString(),
      role: "user",
      content: inputPrompt,
      timestamp: new Date(),
    }
    setStorySegments((prevSegments) => [...prevSegments, newUserSegment])
    setInputPrompt("")
    setIsGenerating(true)

    try {
      const aiResponse = await generateStory(inputPrompt)

      const newAiSegment: StorySegment = {
        id: Date.now().toString() + "-ai",
        role: "ai",
        content: aiResponse.story || "I'm sorry, I couldn't generate a story segment at this time. Please try again.",
        timestamp: new Date(),
      }
      setStorySegments((prevSegments) => [...prevSegments, newAiSegment])
    } catch (error) {
      console.error("Error generating story:", error)
      const errorMessage: StorySegment = {
        id: Date.now().toString() + "-error",
        role: "ai",
        content: "An error occurred while generating the story. Please try again later.",
        timestamp: new Date(),
      }
      setStorySegments((prevSegments) => [...prevSegments, errorMessage])
    } finally {
      setIsGenerating(false)
    }
  }

  const handleQuickPrompt = (prompt: string) => {
    setInputPrompt(prompt)
  }

  return (
    <DashboardLayout userType="client">
      {" "}
      {/* Assuming Story Mode is accessible to clients */}
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">AI Story Mode</h1>
            <p className="text-gray-400">Unleash your creativity with AI-powered storytelling</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Story Display */}
          <Card className="lg:col-span-2 bg-white/5 backdrop-blur-sm border-white/10 flex flex-col h-[70vh]">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Your Story
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-6 overflow-hidden flex flex-col">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-6 prose prose-invert max-w-none">
                  {storySegments.map((segment) => (
                    <div
                      key={segment.id}
                      className={`flex items-start gap-3 ${segment.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {segment.role === "ai" && (
                        <div className="w-8 h-8 flex-shrink-0 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold">
                          AI
                        </div>
                      )}
                      <div
                        className={`max-w-[70%] p-4 rounded-lg ${
                          segment.role === "user"
                            ? "bg-purple-600 text-white rounded-br-none"
                            : "bg-gray-800 text-gray-200 rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm">{segment.content}</p>
                        <span className="block text-xs text-gray-400 mt-1">
                          {segment.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      {segment.role === "user" && (
                        <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs font-bold">
                          You
                        </div>
                      )}
                    </div>
                  ))}
                  {isGenerating && (
                    <div className="flex items-start gap-3 justify-start">
                      <div className="w-8 h-8 flex-shrink-0 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold">
                        AI
                      </div>
                      <div className="max-w-[70%] p-4 rounded-lg bg-gray-800 text-gray-200 rounded-bl-none">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span className="text-sm">Generating story...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={storyEndRef} />
                </div>
              </ScrollArea>

              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-6">
                <Textarea
                  placeholder="Continue the story or give me a new prompt..."
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleGenerateStory()
                    }
                  }}
                  className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[50px] max-h-[150px] resize-y"
                  rows={1}
                />
                <Button
                  onClick={handleGenerateStory}
                  disabled={inputPrompt.trim() === "" || isGenerating}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
                >
                  <Send className="w-5 h-5" />
                  <span className="sr-only">Generate</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Prompts */}
          <div className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  Story Ideas
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                {quickPrompts.map((prompt) => (
                  <Button
                    key={prompt.id}
                    variant="outline"
                    className="justify-start text-left h-auto py-3 bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                    onClick={() => handleQuickPrompt(prompt.prompt)}
                  >
                    {prompt.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                  How it Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-300">
                <p>**Start with a premise**: Give me a brief idea or a few keywords to kick off the story.</p>
                <p>**Collaborate**: I'll generate a segment, and you can guide the narrative with your next input.</p>
                <p>
                  **Explore genres**: From fantasy to sci-fi, historical to romance, let's create something amazing
                  together!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
