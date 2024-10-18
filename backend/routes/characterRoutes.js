const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");

router.post("/add", (req, res) => {
   const newCharacter = req.body;

   if (!newCharacter.name || !newCharacter.description  || !newCharacter.personality) {
      console.log("Character Add Error: Character informations missing!");
      return res.status(400).json({ error: "Character name, description, and personality must not be empty!" });
   }

   const filePath = path.join(__dirname, "../../frontend/src/characters.json");
   fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
         console.log("Character Add Error: Failed to read file!");
         return res.status(500).json({ error: "Failed to read file" });
      }

      const characters = JSON.parse(data);
      characters.push(newCharacter);
      fs.writeFile(filePath, JSON.stringify(characters, null, 3), (err) => {
         if (err) {
            console.log("Character Add Error: Failed to write to file!");
            return res.status(500).json({ error: "Failed to write to file" });
         }
         console.log("Character added successfullly!");
         res.status(200).json({ message: "Character added successfullly!" });
      });
   });
});

module.exports = router;
