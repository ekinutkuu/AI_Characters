import React, {useState} from "react";
import style from "./ChatPage.module.css";
import MessageBubble from "../../components/MessageBubble/MessageBubble";
import { chatService, getAIResponse } from "../../services/chatService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const ChatPage = () => {

   const [userInput, setUserInput] = useState('');
   const [messages, setMessages] = useState([]);

   const changeUserInputHandler = (event) => {
      setUserInput(event.target.value);
   };

   const sendMessageHandler = async () => {
      if (!userInput.trim()) return;

      setMessages((prevMessages) => [
         ...prevMessages,
         { text: userInput, isUser: true },
      ]);

      try {
         const chatHistory = messages.map(msg => `${msg.isUser ? 'USER' : 'AI'}: ${msg.text}`).join('\n');
         const aiResponse = await getAIResponse(chatHistory, userInput);
         setMessages((prevMessages) => [
            ...prevMessages,
            { text: aiResponse, isUser: false },
         ]);
         console.log(`${chatHistory}\nUSER: ${userInput}\nAI: ${aiResponse}`);
      } catch(error) {
         console.error("Failed to send message:", error)
      } finally {
         setUserInput('');
      }
   }

   return (
      <div className={style.container}>
         <div className={style.avatarContainer}>
            <div className={style.emotionBox}>
               <p>Amadeus is waiting for you to start a conversation...</p>
            </div>
            <div className={style.avatar}></div>
         </div>
         <div className={style.chatContainer}>
            <div className={style.messages}>
               <div className={style.messageBubbles}>
                  {messages.map((message, index) => (
                     <MessageBubble
                        key={index}
                        message={message.text}
                        isUser={message.isUser}
                     />
                  ))}
               </div>
            </div>
            <div className={style.chatBox}>
               <input
                  type="text"
                  placeholder="Type something to start conversation"
                  value={userInput} 
                  onChange={changeUserInputHandler}
               />
               <button onClick={sendMessageHandler}>
                  <FontAwesomeIcon icon={faArrowRight} />
               </button>
            </div>
         </div>
      </div>
   );
};

export default ChatPage;