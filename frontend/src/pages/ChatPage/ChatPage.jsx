import React from "react";
import style from "./ChatPage.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const ChatPage = () => {
   return (
      <div className={style.container}>
         <div className={style.avatarContainer}>
            <div className={style.emotionBox}>
               <p>Amadeus is waiting for you to start a conversation...</p>
            </div>
            <div className={style.avatar}></div>
         </div>
         <div className={style.chatContainer}>
            <div className={style.chatBox}>
               <input type="text" placeholder="Type something to start conversation" />
               <button><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
         </div>
      </div>
   );
};

export default ChatPage;