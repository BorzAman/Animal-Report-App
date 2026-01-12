import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. CHECK API KEY
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  console.error("🚨 ERROR: VITE_GEMINI_API_KEY is missing from your .env file!");
  alert("API Key missing! Check console.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function analyzeAnimalImage(file) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const base64 = await fileToBase64(file);

    const prompt = `
      Analyze this image and output ONLY valid JSON. 
      Do not use Markdown. Do not use code blocks.
      Return this exact structure:
      {
        "animal": "Name of animal",
        "isInjured": "Yes/No/Unknown",
        "description": "Short description"
      }
    `;

    console.log("🚀 Sending to Gemini...");
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: file.type,
          data: base64,
        },
      },
    ]);

    const rawText = result.response.text();
    console.log("🧠 RAW GEMINI RESPONSE:", rawText);

    // 2. CLEANUP (The Fix: Remove ```json and ```)
    const cleanedText = rawText
      .replace(/```json/gi, "") // Remove ```json
      .replace(/```/g, "")      // Remove closing ```
      .trim();                  // Remove extra whitespace

    const parsed = JSON.parse(cleanedText);
    
    // 3. NORMALIZE
    return {
      animal: parsed.animal || parsed.name || "",
      isInjured: normalizeInjured(parsed.isInjured),
      description: parsed.description || "",
    };

  } catch (error) {
    console.error("❌ VISION API ERROR:", error);
    alert("AI Failed: " + error.message); // Alert so you see it on phone/screen
    return null;
  }
}

function normalizeInjured(val) {
  if (!val) return "Unknown";
  const v = val.toLowerCase();
  if (v.includes("yes") || v.includes("injur")) return "Yes";
  if (v.includes("no") || v.includes("health")) return "No";
  return "Unknown";
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
