import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UploadPage from "./pages/UploadPage";
import NotFoundPage from "./pages/NotFoundPage";
import ChatWidget from "./components/ChatWidget";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Floating chat widget — pass onSendMessage when AI is wired up */}
      <ChatWidget />
    </BrowserRouter>
  );
}
