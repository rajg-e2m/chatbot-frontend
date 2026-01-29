import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import ChatBubble from "./components/ChatBubble";

function App() {
  return (
    <BrowserRouter>
      <div className="relative h-full flex flex-col">
        <Navbar />
        <main className="flex-1 flex justify-center items-center overflow-hidden">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <ChatBubble />
      </div>
    </BrowserRouter>
  );
}

export default App;
