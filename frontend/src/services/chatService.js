import axios from "axios";

const BASE_API_URL = "http://localhost:5000";

export const getAIResponse = async (chatHistory, userPrompt) => {
   try {
      const response = await axios.get(`${BASE_API_URL}/chat/response`, {
         params: {
            chatHistory: chatHistory,
            userPrompt: userPrompt 
         },
      });
      return response.data;
   } catch (error) {
      console.error("Error fetching response:", error);
      throw error;
   }
};

export const getAIEmotion = async (AIResponse) => {
   try {
      const emotion = await axios.get(`${BASE_API_URL}/chat/emotion`, {
         params: {
            AIResponse: AIResponse
         },
      });
      return emotion.data;
   } catch (error) {
      console.error("Error fetching emotion:", error);
      throw error;
   }
};