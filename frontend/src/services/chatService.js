import axios from "axios";

const BASE_API_URL = "http://localhost:5000";

export const getUserLanguage = async (userPrompt) => {
   try {
      const userLanguage = await axios.get(`${BASE_API_URL}/chat/language`, {
         params: {
            userPrompt: userPrompt,
         },
      });
      return userLanguage.data;
   } catch (error) {
      if (error.response) {
         console.error(`${error.response.status}: ${error.response.data}`);
      } else {
         console.error("Error fetching user language:", error.message);
      }
      throw error;
   }
};

export const getAIResponse = async (characterPersonality, userPrompt, userLanguage, chatHistory) => {
   try {
      const response = await axios.get(`${BASE_API_URL}/chat/response`, {
         params: {
            characterPersonality: characterPersonality,
            userPrompt: userPrompt,
            userLanguage: userLanguage,
            chatHistory: chatHistory
         },
      });
      return response.data;
   } catch (error) {
      if (error.response) {
         console.error(`${error.response.status}: ${error.response.data}`);
      } else {
         console.error("Error fetching response:", error.message);
      }
      throw error;
   }
};

export const getAIEmotion = async (characterName, AIResponse, userLanguage) => {
   try {
      const emotion = await axios.get(`${BASE_API_URL}/chat/emotion`, {
         params: {
            characterName: characterName,
            AIResponse: AIResponse,
            userLanguage: userLanguage
         },
      });
      return emotion.data;
   } catch (error) {
      if (error.response) {
         console.error(`${error.response.status}: ${error.response.data}`);
      } else {
         console.error("Error fetching emotion:", error.message);
      }
      throw error;
   }
};

export const getAvatarEmotion = async (characterEmotionText, hasEmotions) => {
   try {
      const avatarEmotion = await axios.get(`${BASE_API_URL}/chat/avatar`, {
         params: {
            characterEmotionText: characterEmotionText,
            hasEmotions: JSON.stringify(hasEmotions)
         },
      });
      return avatarEmotion.data;
   } catch (error) {
      if (error.response) {
         console.error(`${error.response.status}: ${error.response.data}`);
      } else {
         console.error("Error fetching avatar emotion:", error.message)
      }
      throw error;
   }
};
