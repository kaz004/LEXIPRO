"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateStory(prompt: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"), // Using gpt-4o for creative story generation
      system: `You are a creative storyteller. Generate a compelling and imaginative story based on the user's prompt. Focus on narrative flow, character development, and engaging plot points.`,
      prompt: prompt,
    })
    return { success: true, story: text }
  } catch (error: any) {
    console.error("Error generating story:", error)
    return { success: false, error: error.message || "Failed to generate story." }
  }
}
