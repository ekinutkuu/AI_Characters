import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterSelection from "./pages/CharacterSelection/CharacterSelection";
import ChatPage from "./pages/ChatPage/ChatPage";

function App() {
   return (
      <Router>
         <div className="App">
            <Routes>
               <Route path="/" element={<CharacterSelection />} />
               <Route path="/chat" element={<ChatPage />} />
            </Routes>
         </div>
      </Router>
   );
}

export default App;
