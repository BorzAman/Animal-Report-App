import { NavLink } from "react-router-dom";
import React from 'react';

const MobileMenu = ({ setMenuOpen }) => {
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Report an Animal", path: "/report-animal" },
    { label: "Nearby Reports", path: "/cases/nearby" },
    { label: "My Reports", path: "/cases/my" },
    { label: "First Aid", path: "/first-aid" },
    { label: "Rescue Info", path: "/rescue-info" },
    { label: "Safety Tips", path: "/safety-tips" },
    { label: "Profile", path: "/profile" },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-30"
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-[#111] z-40 p-4">
        <h2 className="font-bold mb-4">Menu</h2>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-red-600" : "hover:bg-gray-800"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default MobileMenu;
