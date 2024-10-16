import axios from "axios";

const BASE_API_URL = "http://localhost:5000";

export const getAIResponse = async (characterPersonality, userPrompt, chatHistory) => {
   try {
      const response = await axios.get(`${BASE_API_URL}/chat/response`, {
         params: {
            characterPersonality: characterPersonality,
            userPrompt: userPrompt ,
            chatHistory: chatHistory
         },
      });
      return response.data;
   } catch (error) {
      console.error("Error fetching response:", error);
      throw error;
   }
};

export const getAIEmotion = async (characterName, AIResponse) => {
   try {
      const emotion = await axios.get(`${BASE_API_URL}/chat/emotion`, {
         params: {
            characterName: characterName,
            AIResponse: AIResponse
         },
      });
      return emotion.data;
   } catch (error) {
      console.error("Error fetching emotion:", error);
      throw error;
   }
};