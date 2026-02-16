import React from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Globe, Activity } from "lucide-react";
import Mapp from './map.jsx';

function FullscreenMap({ reports }) {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-screen bg-background-dark overflow-hidden">
      
      {/* Map Component */}
      <div className="absolute inset-0 z-0">
         <Mapp reports={reports} />
      </div>

      {/* --- HUD CONTROLS --- */}
      
      {/* Back Button */}
      <motion.button
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-50
                   flex items-center gap-2 px-5 py-3 rounded-xl
                   bg-surface-dark/80 backdrop-blur-md border border-white/10
                   text-gray-200 font-bold text-sm shadow-2xl
                   hover:bg-primary hover:border-primary hover:text-white
                   transition-all duration-300 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform"/>
        Exit View
      </motion.button>

      {/* Status Badge */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute top-6 right-6 z-50
                   flex items-center gap-3 px-5 py-3 rounded-xl
                   bg-surface-dark/80 backdrop-blur-md border border-white/10 shadow-2xl"
      >
         <div className="flex items-center gap-2">
            <Globe size={16} className="text-primary"/>
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Live Tracking</span>
         </div>
         <div className="h-4 w-px bg-white/10"></div>
         <div className="flex items-center gap-2">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
             <span className="text-xs font-mono text-green-400 font-bold">ONLINE</span>
         </div>
      </motion.div>

      {/* Bottom Overlay Gradient (Optional for depth) */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-40"></div>
      
    </div>
  );
}

export default FullscreenMap;