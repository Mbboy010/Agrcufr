import { GoogleGenAI, Type } from "@google/genai";
import { PestAnalysisResult } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const GeminiService = {
  /**
   * Chat with the AI Agronomist
   */
  async chatWithAgronomist(message: string, history: { role: string; parts: { text: string }[] }[]) {
    try {
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: "You are an expert Agronomist and farming assistant. Provide helpful, scientific, yet accessible advice to farmers. Keep answers concise.",
        },
        history: history.map(h => ({ role: h.role, parts: h.parts })),
      });

      const response = await chat.sendMessage({ message });
      return response.text;
    } catch (error) {
      console.error("Gemini Chat Error:", error);
      throw new Error("Failed to get response from AI Agronomist.");
    }
  },

  /**
   * Analyze an image for pests or diseases
   */
  async analyzePlantHealth(base64Image: string): Promise<PestAnalysisResult> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image', // Specialized for image inputs
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: 'image/jpeg', // Assuming JPEG for simplicity in this demo context
                data: base64Image
              }
            },
            {
              text: `Analyze this image of a plant. Identify any pests, diseases, or nutrient deficiencies. 
              Return the response in a structured JSON format with the following fields: 
              - diagnosis (string)
              - confidence (string, e.g. "High", "Medium")
              - treatment (array of strings, specific actionable steps)
              - prevention (array of strings)
              If the image is not a plant or is unclear, state that in the diagnosis.`
            }
          ]
        },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              diagnosis: { type: Type.STRING },
              confidence: { type: Type.STRING },
              treatment: { type: Type.ARRAY, items: { type: Type.STRING } },
              prevention: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['diagnosis', 'treatment', 'prevention']
          }
        }
      });

      if (!response.text) {
        throw new Error("No analysis generated.");
      }

      return JSON.parse(response.text) as PestAnalysisResult;

    } catch (error) {
      console.error("Gemini Vision Error:", error);
      throw new Error("Unable to analyze image. Please try again.");
    }
  },

  /**
   * Generate market insights based on raw data
   */
  async generateMarketInsight(cropName: string, currentPrice: number, trend: string) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a short, 2-sentence market insight for ${cropName} currently trading at $${currentPrice}. The trend is ${trend}. Mention potential factors influencing this.`,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Market Error:", error);
      return "Market analysis currently unavailable.";
    }
  }
};
