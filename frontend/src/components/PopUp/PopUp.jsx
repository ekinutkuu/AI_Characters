import React from "react";
import "./PopUp.css";

const PopUp = ({ message, closePopup }) => {
   return(
      <div className="popup-overlay">
         <div className="popup-content">
            <p>{message}</p>
            <button onClick={closePopup}>OK</button>
         </div>
      </div>
   );
};

export default PopUp;