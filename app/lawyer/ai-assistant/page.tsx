"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Bot, FileText, Search, Scale, Lightbulb, Mic, Volume2, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useChat } from "ai/react" // Using Vercel AI SDK for chat

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  type?: "text" | "legal-research" | "document-draft" | "case-analysis"
}

export default function LawyerAIAssistant() {
  const { user } = useAuth()
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: "/api/chat", // This would be your API route for AI chat
  })
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickPrompts = [
    {
      category: "Legal Research",
      icon: <Search className="h-4 w-4" />,
      prompts: [
        "Research recent cases on employment discrimination",
        "Find precedents for contract breach in tech industry",
        "Analyze current intellectual property laws",
        "Research corporate merger regulations",
      ],
    },
    {
      category: "Document Drafting",
      icon: <FileText className="h-4 w-4" />,
      prompts: [
        "Draft a non-disclosure agreement",
        "Create an employment contract template",
        "Write a cease and desist letter",
        "Draft a partnership agreement",
      ],
    },
    {
      category: "Case Analysis",
      icon: <Scale className="h-4 w-4" />,
      prompts: [
        "Analyze strengths and weaknesses of my case",
        "Evaluate settlement vs trial options",
        "Assess damages calculation methods",
        "Review case timeline and deadlines",
      ],
    },
    {
      category: "Legal Strategy",
      icon: <Lightbulb className="h-4 w-4" />,
      prompts: [
        "Suggest negotiation strategies",
        "Recommend discovery approach",
        "Advise on client communication",
        "Plan case presentation structure",
      ],
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message: string = input) => {
    if (!message.trim()) return

    append({ role: "user", content: message })
    const setIsLoading = (loading: boolean) => {} // Declare setIsLoading here
    setIsLoading(true)
  }

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("research") || lowerMessage.includes("precedent")) {
      return `Based on my analysis of recent legal precedents and case law, here are the key findings:

**Relevant Cases:**
• Smith v. TechCorp (2023) - Established new standards for employment discrimination
• Johnson Industries v. State (2022) - Clarified regulatory compliance requirements
• Davis v. Innovation Labs (2023) - Set precedent for intellectual property disputes

**Key Legal Principles:**
1. The burden of proof remains with the plaintiff in discrimination cases
2. Recent amendments to employment law favor employee protections
3. Courts are increasingly scrutinizing corporate compliance programs

**Recommendations:**
- Focus on documentation and evidence gathering
- Consider alternative dispute resolution methods
- Review recent regulatory changes that may impact your case

Would you like me to dive deeper into any specific aspect of this research?`
    }

    if (lowerMessage.includes("draft") || lowerMessage.includes("contract") || lowerMessage.includes("agreement")) {
      return `I'll help you draft that document. Here's a professional template structure:

**Document Structure:**
1. **Header & Parties** - Identification of all parties involved
2. **Recitals** - Background and purpose of the agreement
3. **Terms & Conditions** - Core obligations and rights
4. **Performance Standards** - Specific requirements and deadlines
5. **Compensation** - Payment terms and conditions
6. **Termination** - Conditions for ending the agreement
7. **Dispute Resolution** - Mediation and arbitration clauses
8. **Signatures** - Execution requirements

**Key Clauses to Include:**
- Force majeure provisions
- Confidentiality requirements
- Intellectual property rights
- Limitation of liability
- Governing law specification

Would you like me to draft specific sections or provide more detailed language for any particular clause?`
    }

    if (lowerMessage.includes("analyze") || lowerMessage.includes("case") || lowerMessage.includes("strength")) {
      return `Here's my comprehensive case analysis:

**Case Strengths:**
✅ Strong documentary evidence supporting your position
✅ Favorable precedents in similar jurisdictions
✅ Clear timeline of events and communications
✅ Expert witness testimony available
✅ Opposing party's inconsistent statements

**Potential Weaknesses:**
⚠️ Statute of limitations concerns for some claims
⚠️ Jurisdictional challenges may arise
⚠️ Discovery costs could be substantial
⚠️ Opposing counsel has strong litigation history

**Strategic Recommendations:**
1. **Settlement Consideration**: 70% chance of favorable outcome if settled
2. **Trial Preparation**: Focus on documentary evidence presentation
3. **Timeline**: Estimated 8-12 months to resolution
4. **Cost Analysis**: $25,000-$40,000 in legal fees expected

**Next Steps:**
- Conduct thorough discovery review
- Prepare witness statements
- Consider mediation as alternative
- Develop comprehensive trial strategy

Would you like me to elaborate on any specific aspect of this analysis?`
    }

    return `I understand you're asking about "${userMessage}". As your AI legal assistant, I can provide comprehensive support in several areas:

**Legal Research & Analysis**
- Case law research and precedent analysis
- Statutory interpretation and regulatory guidance
- Jurisdiction-specific legal requirements

**Document Preparation**
- Contract drafting and review
- Legal briefs and memoranda
- Client correspondence and legal notices

**Case Strategy**
- Risk assessment and case evaluation
- Settlement negotiation strategies
- Trial preparation and presentation planning

**Practice Management**
- Client communication templates
- Deadline tracking and case management
- Billing and time management optimization

Please let me know which specific area you'd like to explore, and I'll provide detailed, actionable guidance tailored to your needs.`
  }

  const getMessageType = (message: string): Message["type"] => {
    const lowerMessage = message.toLowerCase()
    if (lowerMessage.includes("research") || lowerMessage.includes("precedent")) return "legal-research"
    if (lowerMessage.includes("draft") || lowerMessage.includes("contract")) return "document-draft"
    if (lowerMessage.includes("analyze") || lowerMessage.includes("case")) return "case-analysis"
    return "text"
  }

  const getMessageIcon = (type: Message["type"]) => {
    switch (type) {
      case "legal-research":
        return <Search className="h-4 w-4 text-blue-500" />
      case "document-draft":
        return <FileText className="h-4 w-4 text-green-500" />
      case "case-analysis":
        return <Scale className="h-4 w-4 text-purple-500" />
      default:
        return <Bot className="h-4 w-4 text-gray-400" />
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleVoiceInput = () => {
    // Placeholder for voice-to-text functionality (e.g., "Case to Voice")
    // In a real application, you would integrate a Web Speech API or a third-party service.
    setIsListening(!isListening)
    if (!isListening) {
      console.log("Starting voice input...")
      // Simulate voice input
      setTimeout(() => {
        const voiceText = "Summarize the recent amendments to the Indian Companies Act."
        append({ role: "user", content: voiceText })
        setIsListening(false)
        console.log("Voice input received:", voiceText)
      }, 2000)
    } else {
      console.log("Stopping voice input.")
    }
  }

  const handleTextToSpeech = (text: string) => {
    // Placeholder for text-to-speech functionality (e.g., "Voice to Case" output)
    // In a real application, you would integrate a Web Speech API or a third-party service.
    setIsSpeaking(true)
    console.log("Speaking:", text)
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.onend = () => setIsSpeaking(false)
    speechSynthesis.speak(utterance)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <Card className="flex-1 flex flex-col bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-white">Lexi AI Assistant</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-400 py-10">
                    <p>Start a conversation with Lexi, your AI legal assistant.</p>
                    <p>Ask me anything about legal topics, document drafting, or case research.</p>
                  </div>
                )}
                {messages.map((m) => (
                  <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    {m.role === "assistant" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-logo.png" alt="Lexi AI" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        m.role === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-800 text-gray-50 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{m.content}</p>
                      {m.role === "assistant" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="mt-2 h-6 w-6 text-gray-400 hover:text-white"
                          onClick={() => handleTextToSpeech(m.content)}
                          disabled={isSpeaking}
                        >
                          {isSpeaking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Volume2 className="h-4 w-4" />}
                          <span className="sr-only">Read aloud</span>
                        </Button>
                      )}
                    </div>
                    {m.role === "user" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" alt="User" />
                        <AvatarFallback>YOU</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && messages.length > 0 && (
                  <div className="flex justify-start">
                    <div className="max-w-[70%] p-3 rounded-lg bg-gray-800 text-gray-50 rounded-bl-none">
                      <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-4 border-t border-white/10">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleVoiceInput}
                className={`text-gray-400 hover:text-white ${isListening ? "text-red-500 animate-pulse" : ""}`}
                aria-label="Voice input"
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Input
                className="flex-1 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-yellow-400"
                placeholder="Type your legal question here..."
                value={input}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Send className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
