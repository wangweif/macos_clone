import { GoogleGenAI } from "@google/genai";
import { GeminiModel } from '../types';

let client: GoogleGenAI | null = null;

export const initializeGemini = () => {
  if (!client && process.env.API_KEY) {
    client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
};

export const askSiri = async (query: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "I need an API Key to function. Please configure the environment.";
  }
  
  if (!client) initializeGemini();

  try {
    const response = await client!.models.generateContent({
      model: GeminiModel.FLASH,
      contents: query,
      config: {
        systemInstruction: "You are Siri, Apple's intelligent virtual assistant. Answer briefly, wittily, and helpfuly. Keep responses under 50 words unless asked for more details. Do not use markdown formatting, just plain text.",
      }
    });

    return response.text || "I'm having trouble connecting to the network right now.";
  } catch (error) {
    console.error("Siri Error:", error);
    return "Sorry, something went wrong.";
  }
};