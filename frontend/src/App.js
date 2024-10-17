import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterSelection from "./pages/CharacterSelection/CharacterSelection";
import ChatPage from "./pages/ChatPage/ChatPage";
import CharacterAdd from "./pages/CharacterAdd/CharacterAdd";

function App() {
   return (
      <Router>
         <div className="App">
            <Routes>
               <Route path="/" element={<CharacterSelection />} />
               <Route path="/chat/:characterName" element={<ChatPage />} />
               <Route path="/character/add" element={<CharacterAdd />} />
            </Routes>
         </div>
      </Router>
   );
}

export default App;
