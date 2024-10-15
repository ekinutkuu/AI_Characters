import React, {useState, useRef, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import style from "./ChatPage.module.css";
import MessageBubble from "../../components/MessageBubble/MessageBubble";
import { getAIResponse, getAIEmotion } from "../../services/chatService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const ChatPage = () => {
   const location = useLocation();
   const { character } = location.state || {};
   const [userInput, setUserInput] = useState('');
   const [messages, setMessages] = useState([]);
   const [emotion, setEmotion] = useState('Amadeus is waiting for you to start a conversation...');
   const messagesEndRef = useRef(null);

   console.log(character); /* for testing */

   useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);

   const changeUserInputHandler = (event) => {
      setUserInput(event.target.value);
   };

   const sendMessageHandler = async () => {
      if (!userInput.trim()) return;

      setUserInput('');

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
         const aiEmotion = await getAIEmotion(aiResponse);
         setEmotion(aiEmotion);
         console.log("Emotion:", aiEmotion);
      } catch(error) {
         console.error("Failed to send message:", error);
         setEmotion("Emotion could not be analyzed");
      }
   }

   return (
      <div className={style.container}>
         <div className={style.avatarContainer}>
            <div className={style.emotionBox}>
               <p>{emotion}</p>
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
                  <div ref={messagesEndRef} />
               </div>
            </div>
            <div className={style.chatBox}>
               <input
                  type="text"
                  placeholder="Type something to start conversation"
                  value={userInput} 
                  onChange={changeUserInputHandler}
                  onKeyDown={(e) => {
                     if (e.key === 'Enter') sendMessageHandler();
                  }}
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