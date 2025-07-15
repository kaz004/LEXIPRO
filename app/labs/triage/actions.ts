"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function analyzeLegalCase(caseDescription: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `You are an expert legal analyst. Analyze the following case description and provide a comprehensive legal triage analysis.

Case Description: "${caseDescription}"

Please provide a detailed analysis in the following format:

**LEGAL CATEGORY**
Identify the primary area of law (e.g., Corporate Law, Employment Law, Family Law, Criminal Law, etc.)

**URGENCY LEVEL**
Rate as High, Medium, or Low with explanation

**ESTIMATED COST RANGE**
Provide a realistic cost estimate in Indian Rupees

**ESTIMATED TIMELINE**
Expected duration to resolve the case

**KEY LEGAL ISSUES**
List the main legal issues involved

**RECOMMENDED ACTIONS**
Immediate steps the client should take

**REQUIRED DOCUMENTATION**
List documents needed for the case

**POTENTIAL OUTCOMES**
Possible scenarios and their likelihood

**LAWYER SPECIALIZATION NEEDED**
What type of lawyer expertise is required

**RISK ASSESSMENT**
Potential risks and how to mitigate them

Provide practical, actionable advice based on Indian legal system and current laws.`,
    })

    return { success: true, analysis: text }
  } catch (error) {
    console.error("Error analyzing case:", error)
    return {
      success: false,
      error: "Failed to analyze the case. Please try again.",
    }
  }
}
