import axios from "axios";

const BASE_API_URL = "http://localhost:5000";

export const addCharacter = async (newCharacter) => {
   try {
      const response = await axios.post(`${BASE_API_URL}/character/add`, newCharacter, {
         headers: {
            "Content-Type": "application/json",
         },
      });
      console.log(`${response.status}: ${response.data.message}`);
      return response.data;
   } catch (error) {
      if (error.response) {
         console.error(`${error.response.status}: ${error.response.data.error}`);
      } else {
         console.error("Error Adding Character:", error.message);
      }
      throw error;
   }
};
