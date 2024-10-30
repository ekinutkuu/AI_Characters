import React, { useState, useEffect } from "react";
import "./CharacterCard.css";

const CharacterCard = ({ name, description, emotions, customAvatar, onClick }) => {
   const [avatar, setAvatar] = useState(emotions.includes("normal") ? "normal" : emotions[0]);
   const [avatarUrl, setAvatarUrl] = useState("");

   const getAvatarUrl = () => {
      const cleanedCharacterName = name.toLowerCase().trim().replace(/\s+/g, "_");

      const avatarPath = customAvatar === 1
         ? `/avatars/${cleanedCharacterName}/${avatar}.png`
         : `/avatars/default/${avatar}.png`;

      const img = new Image();
      img.src = avatarPath;
      img.onerror = () => {
         console.error(`${avatar} emotion not found for '${name}'\nAttempted File Path: ${avatarPath}`);
      };

      return `url(${avatarPath})`;
   };

   useEffect(() => {
      setAvatarUrl(getAvatarUrl());
   }, []);

   return (
      <div className="characterCard" onClick={onClick}>
         <div className="character-image" style={{ backgroundImage: avatarUrl }}></div>
         <div className="character-text">
            <div className="character-name">{name}</div>
            <div className="character-description">{description}</div>
         </div>
      </div>
   );
};

export default CharacterCard;
