import axios from "axios";

//const BASE_API_URL = "http://localhost:5000";

export const getAIResponse = async (chatHistory, userPrompt) => {
   try {
      const response = await axios.get("http://localhost:5000/chat/response", {
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
