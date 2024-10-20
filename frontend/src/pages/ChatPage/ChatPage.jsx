import React, {useState, useRef, useEffect, useCallback} from "react";
import { useLocation } from 'react-router-dom';
import style from "./ChatPage.module.css";
import MessageBubble from "../../components/MessageBubble/MessageBubble";
import { getAIResponse, getAIEmotion, getAvatarEmotion } from "../../services/chatService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const ChatPage = () => {
   const location = useLocation();
   const { character } = location.state || {};
   const [avatar, setAvatar] = useState(character.emotions.includes("normal") ? 'normal' : `${character.emotions[0]}`);
   const [emotion, setEmotion] = useState(`${character.name} is waiting for you to start a conversation...`);
   const [userInput, setUserInput] = useState('');
   const [messages, setMessages] = useState([]);
   const messagesEndRef = useRef(null);

   const getAvatarUrl = useCallback((avatar) => {
      const avatarPath = character.customAvatar === 1 
      ? `/avatars/${character.name.toLowerCase()}/${avatar}.png` 
      : `/avatars/default/${avatar}.png`;

      const img = new Image();
      img.src = avatarPath;
      img.onerror = () => {
         console.error(`${avatar} emotion not found for ${character.name}\nAttempted File Path: ${avatarPath}`);
      }
      return `url(${avatarPath})`;
   }, [character.customAvatar, character.name]);

   const [avatarUrl, setAvatarUrl] = useState(getAvatarUrl(avatar));

   useEffect(() => {
      if (character.emotions.includes(avatar)) {
         setAvatarUrl(getAvatarUrl(avatar));
      } else console.error("Avatar Change Error: Avatar with the appropriate emotion could not be found!");
   }, [avatar, character.emotions, character.customAvatar, getAvatarUrl]);

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
         // Chat Response (and chat history)
         const chatHistory = messages.map(msg => `${msg.isUser ? 'USER' : 'AI'}: ${msg.text}`).join('\n');
         const aiResponse = await getAIResponse(character.personality, userInput, chatHistory);
         setMessages((prevMessages) => [
            ...prevMessages,
            { text: aiResponse, isUser: false },
         ]);
         console.log(`${chatHistory}\nUSER: ${userInput}\nAI: ${aiResponse}`);
         // Character Emotion Text
         const aiEmotion = await getAIEmotion(character.name, aiResponse);
         setEmotion(aiEmotion);
         console.log("Emotion:", aiEmotion);
         // Avatar Emotion
         if (character.emotions.length > 0) { // remove the if block in the future when each character will have at least one emotion
            const avatarEmotion = await getAvatarEmotion(aiEmotion, character.emotions);
            console.log("Avatar Emotion:", avatarEmotion);
            setAvatar(avatarEmotion);
         } else console.log("Avatar has no emotion!");
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
            <div className={style.avatar} style={{ backgroundImage: avatarUrl }}></div>
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