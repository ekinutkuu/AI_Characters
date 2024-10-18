const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ApiKey = require('./api_key');
const path = require("path");
const fs = require("fs");

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

   const responseRequest = `Bu kişiliğe sahip birisi olarak, şu prompt'a cevap ver: `;
   const rules = `KURALLAR: Cevap verirken en fazla 200-250 karakter kullan.`;

   const { characterPersonality, userPrompt, chatHistory } = req.query;
   const fullPrompt = `${rules}\n\n${characterPersonality}\n${responseRequest}\n\n${chatHistory}\nUSER: ${userPrompt}`;
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

app.post("/character/add", (req, res) => {
   const newCharacter = req.body;

   if (!newCharacter.name || !newCharacter.description  || !newCharacter.personality) {
      console.log("Character Add Error: Character informations missing!");
      return res.status(400).json({ error: "Character name, description, and personality must not be empty!" });
   }

   const filePath = path.join(__dirname, "../frontend/src/characters.json");
   fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
         console.log("Character Add Error: Failed to read file!");
         return res.status(500).json({ error: "Failed to read file" });
      }

      const characters = JSON.parse(data);
      characters.push(newCharacter);
      fs.writeFile(filePath, JSON.stringify(characters, null, 3), (err) => {
         if (err) {
            console.log("Character Add Error: Failed to write to file!");
            return res.status(500).json({ error: "Failed to write to file" });
         }
         console.log("Character added successfullly!");
         res.status(200).json({ message: "Character added successfullly!" });
      });
   });
});

app.listen(PORT, () => {
   console.log(`\nServer is running on: http://localhost:${PORT}`);
});
