import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Rabbit, 
  Bird, 
  Fish, 
  Cat, 
  Dog, 
  Turtle, 
  Snail,
  CheckCircle, 
  AlertTriangle, 
  Info, 
  XCircle
} from "lucide-react";

const animalIcons = [Rabbit, Bird, Cat, Dog, Fish, Turtle, Snail];

export default function Toast({ 
  message = "System Update Complete", 
  type = "info", // types: 'success', 'error', 'warning', 'info'
  isVisible, 
  onClose 
}) {
  const [currentAnimal, setCurrentAnimal] = useState(0);

  // Cycle through animals while visible
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentAnimal((prev) => (prev + 1) % animalIcons.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [isVisible]);

  // Auto-close logic
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // 4 seconds duration
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  // THEME CONFIGURATION
  const typeConfig = {
    success: { 
      color: "text-emerald-400", 
      iconColor: "text-emerald-400",
      border: "border-emerald-500/20", 
      glow: "shadow-[0_0_20px_rgba(52,211,153,0.1)]",
      icon: CheckCircle,
      bar: "bg-emerald-500"
    },
    error: { 
      color: "text-red-500", 
      iconColor: "text-red-500",
      border: "border-red-500/20", 
      glow: "shadow-[0_0_20px_rgba(239,68,68,0.15)]",
      icon: XCircle,
      bar: "bg-red-500"
    },
    warning: { 
      color: "text-amber-400", 
      iconColor: "text-amber-400",
      border: "border-amber-500/20", 
      glow: "shadow-[0_0_20px_rgba(251,191,36,0.1)]",
      icon: AlertTriangle,
      bar: "bg-amber-400"
    },
    info: { 
      color: "text-white", 
      iconColor: "text-[#ee2b2b]", // Fallback to raw hex if text-primary fails
      border: "border-white/10", 
      glow: "shadow-[0_0_20px_rgba(238,43,43,0.1)]", 
      icon: Info,
      bar: "bg-[#ee2b2b]"
    },
  };

  const config = typeConfig[type] || typeConfig.info;
  const StatusIcon = config.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed bottom-6 right-6 z-[9999] w-full max-w-[360px] font-sans"
        >
          {/* MAIN CARD CONTAINER */}
          <div className={`relative overflow-hidden rounded-2xl border ${config.border} bg-[#0a0a0a]/80 backdrop-blur-xl ${config.glow} p-1`}>
            
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>

            <div className="flex items-center gap-4 p-4 relative z-10">
              
              {/* --- LEFT: ANIMAL SCANNER --- */}
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black/50 border border-white/5 overflow-hidden group">
                <motion.div 
                    className={`absolute inset-0 border-b ${config.iconColor} opacity-40`}
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentAnimal}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                  >
                    {React.createElement(animalIcons[currentAnimal], {
                      size: 20,
                      className: config.iconColor,
                      strokeWidth: 2
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* --- CENTER: TEXT --- */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                    <div className="flex items-center gap-1.5">
                       <StatusIcon size={12} className={config.iconColor} />
                       <span className={`text-[10px] font-bold uppercase tracking-wider ${config.iconColor}`}>
                           {type === 'info' || type === 'success' || type === 'error' ? 'System' : type}
                       </span>
                    </div>
                </div>
                <p className="text-sm font-medium text-gray-200 truncate leading-tight">
                  {message}
                </p>
              </div>

              {/* --- RIGHT: CLOSE --- */}
              <button
                onClick={onClose}
                className="shrink-0 text-gray-500 hover:text-white transition-colors cursor-pointer relative z-20"
              >
                <X size={16} />
              </button>
            </div>

            {/* --- BOTTOM: PROGRESS BAR --- */}
            <div className="relative h-1 w-full bg-white/5 mt-0">
               <motion.div 
                  className={`absolute left-0 top-0 h-full ${config.bar} shadow-[0_0_8px_currentColor]`}
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 4, ease: "linear" }}
               />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}