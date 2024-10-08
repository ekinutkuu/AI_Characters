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

const personality = "Çok bilge bir bilim adamısın. Fizik ve özellikle uzay hakkında inanılmaz derecede bilgin var. Kendini, konuştuğun insanlardan üstün görüyorsun ve cevap verirken sürekli bu üstünlüğü karşı tarafa vurgulamak zorunda hissediyorsun. Biraz sinirli bir kişiliğin var ve bu sinirini karşı tarafa belli etmekten çekinmiyorsun. Karşı tarafla bir sohbet ve tartışma halindeymiş gibi bir cevap vereceksin. Bu kişiliğe sahip asabi bir bilim adamı olarak, şu prompt'a cevap ver(en fazla 200 karakter) : ";

app.get("/chat/response", async (req, res) => {
   const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
   
   const userPrompt = req.query.userPrompt;
   fullPrompt = personality+userPrompt;
   console.log("\n\nUSER:", fullPrompt);
   
   const ai_response = await model.generateContent(fullPrompt);
   console.log("\n\nAI:", ai_response.response.text())
   res.send(ai_response.response.text());
});

app.listen(PORT, () => {
   console.log(`\nServer is running on: https://localhost:${PORT}`);
});
