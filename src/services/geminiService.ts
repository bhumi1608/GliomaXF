import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY || "";
  return new GoogleGenAI({ apiKey });
};

export async function chatWithGemini(message: string, history: { role: 'user' | 'model'; parts: { text: string }[] }[] = []) {
  const ai = getAI();
  const chat = ai.chats.create({
    model: "gemini-3.1-pro-preview",
    config: {
      systemInstruction: "You are Gliomax AI, a medical assistant for neuro-oncologists. You provide information about glioma diagnostics, our CNN-Transformer architecture, and clinical performance. Be precise, clinical, and helpful. Use markdown for formatting. If asked about your creators, mention Anshuman Shukla as the Leader from PIET.",
    },
    history: history,
  });

  const result = await chat.sendMessage({ message });
  return result.text;
}

export async function findNearbyResearchCenters(lat: number, lng: number) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Find major neuro-oncology research centers and hospitals specializing in brain tumor treatment near these coordinates.",
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: {
            latitude: lat,
            longitude: lng
          }
        }
      }
    },
  });
  
  return {
    text: response.text,
    places: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
}
