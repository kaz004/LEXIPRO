"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateLegalAdvice(prompt: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"), // Using gpt-4o as a powerful model for legal advice
      system: `You are Lexi, an AI Legal Assistant for the LexiPro platform. Your purpose is to provide helpful, informative, and legally relevant responses based on the user's queries. Always emphasize that your advice is AI-generated and not a substitute for professional legal counsel. Focus on Indian legal context where applicable.`,
      prompt: prompt,
    })
    return { success: true, response: text }
  } catch (error: any) {
    console.error("Error generating legal advice:", error)
    return { success: false, error: error.message || "Failed to generate legal advice." }
  }
}
