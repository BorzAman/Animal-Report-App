import React from 'react';
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Home, 
  AlertTriangle, 
  Map, 
  FileText, 
  HeartPulse, 
  LifeBuoy, 
  Shield, 
  User, 
  X,
  Menu
} from "lucide-react";

const MobileMenu = ({ setMenuOpen }) => {
  const menuItems = [
    { label: "Home", path: "/", icon: <Home size={20} /> },
    { label: "Report an Animal", path: "/report-animal", icon: <AlertTriangle size={20} /> },
    { label: "Nearby Reports", path: "/cases/nearby", icon: <Map size={20} /> },
    { label: "My Reports", path: "/cases/my", icon: <FileText size={20} /> },
    { label: "First Aid", path: "/first-aid", icon: <HeartPulse size={20} /> },
    { label: "Rescue Info", path: "/rescue-info", icon: <LifeBuoy size={20} /> },
    { label: "Safety Tips", path: "/safety-tips", icon: <Shield size={20} /> },
    { label: "Profile", path: "/profile", icon: <User size={20} /> },
  ];

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full w-72 bg-surface-dark/95 backdrop-blur-xl border-r border-white/10 z-50 p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-primary/20 rounded-lg border border-primary/50 text-primary">
                <Menu size={20} />
             </div>
             <h2 className="text-xl font-bold text-white tracking-tight">Menu</h2>
          </div>
          <button 
            onClick={() => setMenuOpen(false)}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition"
          >
             <X size={20} />
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${
                  isActive
                    ? "bg-primary text-white shadow-[0_4px_15px_rgba(238,43,43,0.3)] border border-primary"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300"}>
                    {item.icon}
                  </span>
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        
        {/* Footer Decoration */}
        <div className="absolute bottom-6 left-6 right-6 text-center">
           <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Pashu Jaagrak v1.0</p>
        </div>
      </motion.aside>
    </>
  );
};

export default MobileMenu;