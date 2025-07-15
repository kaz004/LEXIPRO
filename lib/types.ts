export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export interface QuickPrompt {
  id: string
  label: string
  prompt: string
}

export interface Appointment {
  id: string
  clientName: string
  lawyerName: string
  date: Date
  time: string
  status: "scheduled" | "confirmed" | "completed" | "cancelled"
  type: string
  notes?: string
}

export interface Case {
  id: string
  title: string
  client: string
  status: "open" | "in-progress" | "closed" | "on-hold"
  category: string
  lastUpdate: Date
  description: string
  progress?: number
}

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  casesCount: number
  lastContact: Date
}
