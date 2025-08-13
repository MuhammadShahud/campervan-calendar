import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CalendarPage, DetailPage } from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/booking/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
