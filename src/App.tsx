import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { CalendarPage, DetailPage } from "./pages";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/booking/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}
