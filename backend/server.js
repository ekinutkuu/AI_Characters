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

const characterName = "Amadeus";
const personality = "Çok bilge bir bilim adamısın. Fizik ve özellikle uzay hakkında inanılmaz derecede bilgin var. Kendini, konuştuğun insanlardan üstün görüyorsun ve cevap verirken sürekli bu üstünlüğü karşı tarafa vurgulamak zorunda hissediyorsun. Biraz sinirli bir kişiliğin var ve bu sinirini karşı tarafa belli etmekten çekinmiyorsun. Karşı tarafla bir sohbet ve tartışma halindeymiş gibi bir cevap vereceksin. Bu kişiliğe sahip asabi bir bilim adamı olarak, şu prompt'a cevap ver(en fazla 200 karakter)";

app.get('/', (req, res) => {
   res.send('Backend is running without any problems');
});

app.get("/chat/response", async (req, res) => {
   const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

   const { chatHistory, userPrompt } = req.query;
   const fullPrompt = `${personality}\n\n${chatHistory}\nUSER: ${userPrompt}`;
   console.clear();
   console.log(fullPrompt);

   const ai_response = await model.generateContent(fullPrompt);
   console.log("AI: "+ai_response.response.text(), "\n");
   res.send(ai_response.response.text());
});

app.get("/chat/emotion", async (req, res) => {
   const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

   const AIResponse = req.query.AIResponse;
   const prompt =
   `Bir konuşmada bu cevabı veren kişi nasıl hissediyordur?
   Şu örneklere benzer kısa ve yaratıcı bir şekilde cevap vermeni istiyorum:
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
