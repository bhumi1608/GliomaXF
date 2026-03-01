import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY || "";
  return new GoogleGenAI({ apiKey });
};

export async function analyzeMRI(base64Image: string, mimeType: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: [
      {
        inlineData: {
          data: base64Image.split(',')[1],
          mimeType: mimeType
        }
      },
      {
        text: "You are the Gliomax Hybrid CNN-Transformer diagnostic model. Analyze this MRI scan for brain tumors. Your model is trained on four specific classes: 'Glioma', 'Meningioma', 'Pituitary', and 'No Tumor'. Provide a structured response in JSON format with: 'diagnosis' (must be one of the four classes), 'confidence' (number 0-1), 'tumorLocation' (string, or 'N/A' if No Tumor), 'clinicalSummary' (string), and 'suggestedNextSteps' (array of strings). Be professional and clinical. If the image is not an MRI, state 'Invalid Input'."
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          diagnosis: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          tumorLocation: { type: Type.STRING },
          clinicalSummary: { type: Type.STRING },
          suggestedNextSteps: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["diagnosis", "confidence", "tumorLocation", "clinicalSummary", "suggestedNextSteps"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error("Failed to parse MRI analysis", e);
    return null;
  }
}

export async function chatWithGemini(message: string, history: { role: 'user' | 'model'; parts: { text: string }[] }[] = []) {
  const ai = getAI();
  const chat = ai.chats.create({
    model: "gemini-3.1-pro-preview",
    config: {
      systemInstruction: "You are Gliomax AI, a medical assistant for neuro-oncologists. You provide information about brain tumor diagnostics (Glioma, Meningioma, Pituitary, and No Tumor), our CNN-Transformer architecture, and clinical performance. Be precise, clinical, and helpful. Use markdown for formatting. If asked about your creators, mention Anshuman Shukla as the Leader from PIET.",
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
