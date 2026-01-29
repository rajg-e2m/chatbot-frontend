import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import ChatBubble from "./components/ChatBubble";

function App() {
  return (
    <BrowserRouter>
      <div className="relative h-full flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={
              <div className="h-full flex items-center justify-center p-8">
                <LandingPage />
              </div>
            } />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <ChatBubble />
      </div>
    </BrowserRouter>
  );
}

export default App;
