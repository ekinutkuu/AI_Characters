const express = require('express');
const router = express.Router();
const ApiKey = require('../api_key');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = ApiKey.GEMINI_API_KEY;

router.get("/language", async (req, res) => {
   try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const { userPrompt } = req.query;
      const prompt = `Bu metin hangi dilde yazılmıştır?\n"${userPrompt}"\nSadece cevabını ver, noktalama işaretleri kullanma!`;
      const reponse = await model.generateContent(prompt);
      const userLanguage = reponse.response.text().replace(/\s+/g, '');
      res.send(userLanguage);
   } catch (error) {
      console.error("Error in /chat/language API:", error);
      res.status(500).send("ERROR: Failed to receive user language!");
   }
});

router.get("/response", async (req, res) => {
   try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const { characterPersonality, userPrompt, userLanguage, chatHistory } = req.query;

      let responseLanguage = "English"; // default response language
      if (userLanguage) responseLanguage = userLanguage;

      const responseRequest = `Bu kişiliğe sahip birisi olarak, şu prompt'a cevap ver: `;
      const rules = `KURALLAR: Cevap verirken en fazla 200-250 karakter kullan. Cevap sadece "${responseLanguage}" dilinde olmalı!`;
   
      const fullPrompt = `${rules}\n\n${characterPersonality}\n${responseRequest}\n\n${chatHistory}\nUSER: ${userPrompt}`;
      console.clear();
      console.log(fullPrompt);
   
      const ai_response = await model.generateContent(fullPrompt);
      //remove text styles (e.g. ** for bold) from gemini api response
      const cleanedResponse = ai_response.response.text().replace(/\*/g, "");
      console.log("AI: "+cleanedResponse, "\n");
      console.log("User Language:", userLanguage);
      res.send(cleanedResponse);
   } catch (error) {
      console.error("Error in /chat/response API:", error);
      res.status(500).send("ERROR: Failed to receive response from character!");
   }
});

router.get("/emotion", async (req, res) => {
   try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });

      const { characterName, AIResponse, userLanguage } = req.query;

      let emotionLanguage = "English"; // default emotion language
      if (userLanguage) emotionLanguage = userLanguage;

      const rules = `KURALLAR: Cevap verirken sadece 1 cümle kullan. Cevap mutlaka "${emotionLanguage}" dilinde ve belirtilen formatta olmalı! Yanıtında yalnızca "${userLanguage}" dilinde ifadeler kullan; başka bir dil kesinlikle kullanma.`;
      const prompt =
      `${rules}\n
      Bir konuşmada bu cevabı veren kişi nasıl hissediyordur?
      Şu örneklere benzer formatta kısa ve yaratıcı bir şekilde cevap vermeni istiyorum:
      "{İsim}, kendine güveniyor.", "{İsim}, alaycı bir gülümseme ile bakıyor."\n
      Konuşmada verilen cevap: "${AIResponse.trim()}"
      İsim: "${characterName}"`;

      const emotion = await model.generateContent(prompt);

      //remove text styles (e.g. ** for bold) from gemini api response
      const cleanedText = emotion.response.text().trim().replace(/\*/g, "");
      console.log("Emotion:", cleanedText);
      res.send(cleanedText);
   } catch (error) {
      console.error("Error in /chat/emotion API:", error);
      res.status(500).send("ERROR: Failed to receive character's emotion!");
   }
});

router.get("/avatar", async (req, res) => {
   try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
   
      const hasEmotions = JSON.parse(req.query.hasEmotions);
   
      if (hasEmotions.length > 0) {
         const characterEmotionText = req.query.characterEmotionText.replace(/\n/g, '');
         const prompt =
         `Bir kişinin duygu durumu aşağıdaki gibi ifade edildi: "${characterEmotionText}"
         \nBu duygu durumunu analiz et ve aşağıdaki seçeneklerden en uygun olanını seç:
         \n- ${hasEmotions.join('\n- ')}
         \nCevap olarak sadece seçtiğin seçeneği ver, noktalama işaretleri kullanma.`;
   
         const avatarResponse = await model.generateContent(prompt);
         const avatarEmotion = avatarResponse.response.text().replace(/\s+/g, '').toLowerCase();
         console.log("Avatar Emotion:", avatarEmotion);
         res.send(avatarEmotion);
      } else {
         console.log("Character has no emotion!");
         res.status(500).send("ERROR: Character has no emotion!");
      }
   } catch (error) {
      console.error("Error in /chat/emotion API:", error);
      res.status(500).send("ERROR: Failed to receive character avatar's emotion!");
   }
});

module.exports = router;
