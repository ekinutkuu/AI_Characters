const express = require('express');
const router = express.Router();
const ApiKey = require('../api_key');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = ApiKey.GEMINI_API_KEY;

router.get("/response", async (req, res) => {
   const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

   const responseRequest = `Bu kişiliğe sahip birisi olarak, şu prompt'a cevap ver: `;
   const rules = `KURALLAR: Cevap verirken en fazla 200-250 karakter kullan.`;

   const { characterPersonality, userPrompt, chatHistory } = req.query;
   const fullPrompt = `${rules}\n\n${characterPersonality}\n${responseRequest}\n\n${chatHistory}\nUSER: ${userPrompt}`;
   console.clear();
   console.log(fullPrompt);

   const ai_response = await model.generateContent(fullPrompt);
   //remove text styles (e.g. ** for bold) from gemini api response
   const cleanedResponse = ai_response.response.text().replace(/\*/g, "");
   console.log("AI: "+cleanedResponse, "\n");
   res.send(cleanedResponse);
});

router.get("/emotion", async (req, res) => {
   const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

   const { characterName, AIResponse } = req.query;
   const prompt =
   `Bir konuşmada bu cevabı veren kişi nasıl hissediyordur?
   Şu örneklere benzer kısa (bir cümle) ve yaratıcı bir şekilde cevap vermeni istiyorum:
   "${characterName} kendine güveniyor.", "${characterName} küçümseyici bir şekilde bakıyor."
   Konuşmada verilen cevap: "${AIResponse}"`;
   emotion = await model.generateContent(prompt);

   //remove text styles (e.g. ** for bold) from gemini api response
   const cleanedText = emotion.response.text().replace(/\*/g, "");
   console.log("Emotion:", cleanedText);
   res.send(cleanedText);
});

module.exports = router;
