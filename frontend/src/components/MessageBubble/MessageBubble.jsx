import React from "react";
import "./MessageBubble.css";

const MessageBubble = ({ message, isUser }) => {
   return (
      <div className={`message-bubble ${isUser ? "user" : "ai"}`}>
         {message}
      </div>
   );
};

export default MessageBubble;
