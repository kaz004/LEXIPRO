"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface PredictionResult {
  winProbability: number
  timeline: string
  estimatedCost: string
  riskFactors: string[]
  favorableFactors: string[]
  recommendedStrategy: string
  confidence: number
}

export async function predictCaseOutcome(
  caseDetails: string,
  caseType: string,
  jurisdiction: string,
): Promise<{ success: boolean; result?: PredictionResult; error?: string }> {
  try {
    const prompt = `You are a legal AI outcome predictor. Analyze the following case details and provide a structured prediction result.
    The output should be a JSON object with the following properties:
    - 'winProbability': (number) A percentage (0-100) representing the probability of winning.
    - 'timeline': (string) An estimated timeline for the case resolution (e.g., "8-12 months").
    - 'estimatedCost': (string) An estimated cost range for the case (e.g., "₹2,50,000 - ₹4,00,000").
    - 'riskFactors': (string[]) An array of 2-4 key risk factors.
    - 'favorableFactors': (string[]) An array of 2-4 key favorable factors.
    - 'recommendedStrategy': (string) A concise recommended strategy.
    - 'confidence': (number) A confidence score (0-100) for the prediction.

    Case Type: ${caseType || "Not specified"}
    Jurisdiction: ${jurisdiction || "Not specified"}
    Case Details: ${caseDetails}
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      temperature: 0.6,
      maxTokens: 800,
      response_format: { type: "json_object" },
    })

    const parsedResponse = JSON.parse(text)
    // Basic validation for the structure
    if (
      parsedResponse &&
      typeof parsedResponse.winProbability === "number" &&
      parsedResponse.timeline &&
      parsedResponse.estimatedCost &&
      Array.isArray(parsedResponse.riskFactors) &&
      Array.isArray(parsedResponse.favorableFactors) &&
      parsedResponse.recommendedStrategy &&
      typeof parsedResponse.confidence === "number"
    ) {
      return { success: true, result: parsedResponse as PredictionResult }
    } else {
      console.error("AI response did not contain expected prediction result structure:", parsedResponse)
      return { success: false, error: "AI did not return a valid prediction result. Please try again." }
    }
  } catch (error) {
    console.error("Error predicting case outcome:", error)
    return { success: false, error: "Failed to predict outcome. Please try again later." }
  }
}

export async function predictOutcome(caseDetails: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"), // Using gpt-4o for complex predictive analysis
      system: `You are an AI legal outcome predictor. Analyze the provided case details and predict potential outcomes, including probabilities if possible, and key factors influencing the outcome. Emphasize that this is an AI prediction and not a guarantee. Focus on Indian legal context.`,
      prompt: `Predict the outcome for the following legal case details:\n\n${caseDetails}\n\nOutput format:\nPredicted Outcome: [Outcome description]\nProbability: [e.g., High, Medium, Low, or percentage range]\nKey Factors: [List of influencing factors]\nDisclaimer: [Standard AI disclaimer]`,
    })
    return { success: true, prediction: text }
  } catch (error: any) {
    console.error("Error predicting outcome:", error)
    return { success: false, error: error.message || "Failed to predict outcome." }
  }
}
