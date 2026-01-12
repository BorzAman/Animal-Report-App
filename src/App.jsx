import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Google from "./Google.jsx";
import Details from "./Details.jsx";

import Dashboard from "./components/Dashboard.jsx";
import Cases from "./components/Cases.jsx";
import FirstAid from "./components/FirstAid.jsx";
import MyReports from "./components/MyReports.jsx";
import Profile from "./components/Profile.jsx";
import RescueInfo from "./components/RescueInfo.jsx";
import SafetyTips from "./components/SafetyTips.jsx";
import FullscreenMap from "./FullscreenMap.jsx";

import TopNavbar from "./components/TopNavbar.jsx";
import MobileMenu from "./components/MobileMenu.jsx";
import Footer from "./components/Footer.jsx";

import ProtectedRoutes from "./ProtectedRoutes.jsx";
import PublicRoutes from "./PublicRoutes.jsx";
import { Outlet } from "react-router-dom";

// 🔹 Layout for authenticated pages
const AppLayout = ({ menuOpen, setMenuOpen }) => {
  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white flex flex-col">
      <TopNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {menuOpen && <MobileMenu setMenuOpen={setMenuOpen} />}

      <main className="flex-1 lg:ml-6 lg:mr-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
                  <Route path="/map" element={<FullscreenMap />} />
        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Google />} />
          <Route path="/login" element={<Google />} />

        </Route>

        {/* ---------- PROTECTED ROUTES ---------- */}
        <Route element={<ProtectedRoutes />}>
          <Route
            element={
              <AppLayout
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
              />
            }
          >
            <Route path="/home" element={<Dashboard />} />
            <Route path="/report-animal" element={<Details />} />
            <Route path="/first-aid" element={<FirstAid />} />
            <Route path="/rescue-info" element={<RescueInfo />} />
            <Route path="/safety-tips" element={<SafetyTips />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cases/my" element={<MyReports />} />
            <Route path="/cases/nearby" element={<Cases />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
