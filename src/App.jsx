import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./assets/styles/main.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/service_details" element={<ServiceDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
