const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ApiKey = require('./api_key');

app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;
const GEMINI_API_KEY = ApiKey.GEMINI_API_KEY;

app.get('/', (req, res) => {
   res.send('Backend is running without any problems');
});

app.get("/chat/response", async (req, res) => {
   const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

   const { characterPersonality, userPrompt, chatHistory } = req.query;
   const fullPrompt = `${characterPersonality}\n\n${chatHistory}\nUSER: ${userPrompt}`;
   console.clear();
   console.log(fullPrompt);

   const ai_response = await model.generateContent(fullPrompt);
   const cleanedResponse = ai_response.response.text().replace(/\*/g, "");
   console.log("AI: "+cleanedResponse, "\n");
   res.send(cleanedResponse);
});

app.get("/chat/emotion", async (req, res) => {
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

app.listen(PORT, () => {
   console.log(`\nServer is running on: http://localhost:${PORT}`);
});
