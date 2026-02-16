import { motion } from "framer-motion";
import { PawPrint, ShieldCheck } from "lucide-react";
import React from "react";

function Logging() {
  const pawCount = 12; // Reduced slightly for cleaner look
  const radius = 60;   // Adjusted for the card size

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background-dark font-display overflow-hidden text-white">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393798-3828fb4090bb?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/95 to-background-dark"></div>
      <div className="absolute inset-0 bg-island-gradient opacity-20"></div>

      {/* --- LOADER CARD --- */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 glass-panel border border-white/10 p-12 rounded-3xl shadow-2xl flex flex-col items-center gap-8 backdrop-blur-xl bg-black/40"
      >
        
        {/* Spinner Container */}
        <div className="relative h-40 w-40 flex items-center justify-center">
            
            {/* Central Pulsing Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center border border-primary/50 animate-pulse">
                     <ShieldCheck size={32} className="text-primary" />
                </div>
            </div>

            {/* Orbiting Paws */}
            {/* We use a wrapper to center the ring */}
            <div className="absolute inset-0"> 
                {[...Array(pawCount)].map((_, i) => {
                    const angle = (i / pawCount) * 360;
                    const rad = (angle * Math.PI) / 180;
                    const x = Math.cos(rad) * radius;
                    const y = Math.sin(rad) * radius;

                    return (
                        <motion.div
                            key={i}
                            className="absolute left-1/2 top-1/2"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0.5, 1.2, 0.5],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * (1.5 / pawCount), // Evenly distributed delays
                                ease: "easeInOut",
                            }}
                            style={{
                                marginLeft: x, 
                                marginTop: y,
                                transform: `translate(-50%, -50%) rotate(${angle + 90}deg)` // Center the icon itself and rotate it
                            }}
                        >
                            <PawPrint size={18} className="text-primary drop-shadow-[0_0_5px_rgba(238,43,43,0.8)]"/>
                        </motion.div>
                    );
                })}
            </div>
        </div>

        {/* Text */}
        <div className="text-center space-y-2">
            <h1 className='font-bold text-2xl tracking-tight'>Logging In...</h1>
            <div className="flex items-center gap-2 justify-center text-xs text-gray-400 font-mono">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                Verifying Credentials
            </div>
        </div>

      </motion.div>
    </div>
  );
}

export default Logging;