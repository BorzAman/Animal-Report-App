"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  X, 
  ChevronRight, 
  Siren, 
  Scan,
  Activity,
  AlertTriangle
} from "lucide-react";

const ANIMALS = [
  {
    id: "tiger",
    name: "Bengal Tiger",
    latin: "Panthera tigris",
    dangerLevel: "CRITICAL",
    // Reliable Unsplash ID for Tiger
    image: "https://images.unsplash.com/photo-1505566085149-6548a3e7925e?auto=format&fit=crop&w=1000&q=80",
    description: "Apex predator. Attacks from behind. If you see it, it has likely already seen you.",
    dos: [
      "Maintain eye contact (they prefer surprise attacks).",
      "Back away slowly while facing the animal.",
      "Make loud noises and shout aggressively.",
      "If attacked, fight for your life using any weapon."
    ],
    donts: [
      "Do NOT turn your back.",
      "Do NOT run (triggers chase reflex instantly).",
      "Do NOT climb a tree (tigers are agile climbers)."
    ]
  },
  {
    id: "leopard",
    name: "Indian Leopard",
    latin: "Panthera pardus fusca",
    dangerLevel: "HIGH",
    image: "https://images.unsplash.com/photo-1547975191-236b3644422f?auto=format&fit=crop&w=1000&q=80",
    description: "Stealth predator. Ambush hunter commonly found near settlements bordering forests.",
    dos: [
      "Freeze instantly. Sudden movement triggers chase instinct.",
      "Make yourself look larger (raise arms, open jacket).",
      "Back away slowly without turning your back.",
      "If attacked, fight back aggressively targeting eyes/nose."
    ],
    donts: [
      "Do NOT run. They are faster than you.",
      "Do NOT crouch or sit down (you look like prey).",
      "Do NOT make direct eye contact (seen as aggression)."
    ]
  },
  {
    id: "elephant",
    name: "Asian Elephant",
    latin: "Elephas maximus",
    dangerLevel: "CRITICAL",
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=80",
    description: "Extremely dangerous if protecting calves or in musth. Can outrun humans easily.",
    dos: [
      "Run in a zig-zag pattern (they have trouble turning fast).",
      "Seek high ground or climb a sturdy tree immediately.",
      "Throw objects (bag/jacket) to distract them.",
      "Stay downwind if hiding so they can't smell you."
    ],
    donts: [
      "Do NOT use flash photography (it enrages them).",
      "Do NOT turn your back until you are at a safe distance.",
      "Do NOT try to outrun them in a straight line."
    ]
  },
  {
    id: "crocodile",
    name: "Mugger Crocodile",
    latin: "Crocodylus palustris",
    dangerLevel: "HIGH",
    image: "https://images.unsplash.com/photo-1516568285984-71285324a689?auto=format&fit=crop&w=1000&q=80",
    description: "Ambush predator in water bodies. Capable of explosive speed over short distances.",
    dos: [
      "Stay at least 5m away from the water's edge.",
      "If bitten, target the eyes or nostrils forcefully.",
      "Run in a straight line away from the water (they tire fast on land)."
    ],
    donts: [
      "Do NOT dangle arms or legs from boats/banks.",
      "Do NOT return to the same spot to drink/wash daily.",
      "Do NOT enter murky or stagnant water."
    ]
  },
  {
    id: "bear",
    name: "Sloth Bear",
    latin: "Melursus ursinus",
    dangerLevel: "HIGH",
    image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=1000&q=80",
    description: "Unpredictable and aggressive. Will attack if surprised, especially with cubs.",
    dos: [
      "Make noise while walking to avoid surprising them.",
      "If spotted, stand your ground and make noise.",
      "If attacked, drop to ground, curl into ball, protect neck."
    ],
    donts: [
      "Do NOT run or climb trees (they are excellent climbers).",
      "Do NOT try to feed or approach them."
    ]
  },
  {
    id: "boar",
    name: "Wild Boar",
    latin: "Sus scrofa",
    dangerLevel: "MODERATE",
    image: "https://images.unsplash.com/photo-1533513367980-60b69107936a?auto=format&fit=crop&w=1000&q=80",
    description: "Highly aggressive if cornered or with piglets. Tusks can cause fatal injuries.",
    dos: [
      "Climb a tree or get to high ground (at least 4-5 feet).",
      "Stay calm and back away slowly.",
      "Leave an escape route open for the animal."
    ],
    donts: [
      "Do NOT block their path.",
      "Do NOT try to outrun them (they are surprisingly fast).",
      "Do NOT use a stick (it often angers them more)."
    ]
  },
  {
    id: "snake",
    name: "King Cobra",
    latin: "Ophiophagus hannah",
    dangerLevel: "MODERATE",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=1000&q=80",
    description: "Highly venomous. Generally avoids humans but strikes if cornered.",
    dos: [
      "Freeze. Most snakes strike only when threatened.",
      "Back away very slowly.",
      "Stomp feet to create vibrations (warns them off).",
      "Use a torch at night to scan the path ahead."
    ],
    donts: [
      "Do NOT try to kill or handle it.",
      "Do NOT suck the venom if bitten (it's a myth).",
      "Do NOT apply a tourniquet (concentrates venom)."
    ]
  }
];

export default function SafetyGuide() {
  const [selectedAnimal, setSelectedAnimal] = useState(ANIMALS[0]);

  return (
    <div className="relative w-full max-w-7xl mx-auto font-display">
      
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between mb-6 px-2">
        <div className='mt-4'>
          
          <h2 className="text-3xl font-bold text-white tracking-tight">Tactical Safety Guide</h2>
        </div>
        
        <div className="hidden md:flex items-center gap-4 text-xs font-mono text-gray-500">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ee2b2b] animate-pulse"></div>
              <span>LIVE UPDATES</span>
           </div>
           
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[700px] lg:h-[600px]">
        
        {/* --- LEFT: THUMBNAIL SELECTOR --- */}
        <div className="w-full lg:w-1/4 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:pr-2 custom-scrollbar pb-4 lg:pb-0">
          {ANIMALS.map((animal) => (
            <button
              key={animal.id}
              onClick={() => setSelectedAnimal(animal)}
              className={`group relative flex-shrink-0 w-64 lg:w-full h-24 lg:h-28 rounded-xl overflow-hidden border transition-all duration-300 ${
                selectedAnimal.id === animal.id 
                  ? "border-[#ee2b2b] shadow-[0_0_20px_rgba(238,43,43,0.3)]" 
                  : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
              }`}
            >
              {/* Background Image with Gradient */}
              <img src={animal.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={animal.name} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

              {/* Text Content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-start pl-5 pr-2 text-left">
                 <h3 className={`font-bold text-lg leading-none mb-1 ${selectedAnimal.id === animal.id ? "text-white" : "text-gray-300"}`}>
                   {animal.name}
                 </h3>
                 <span className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-sm ${
                    animal.dangerLevel === "CRITICAL" ? "text-red-500 border border-red-500/30" : "text-orange-400 border border-orange-400/30"
                 }`}>
                    {animal.dangerLevel}
                 </span>
              </div>

              {/* Active Indicator Strip */}
              {selectedAnimal.id === animal.id && (
                <motion.div layoutId="active-strip" className="absolute left-0 top-0 bottom-0 w-1 bg-[#ee2b2b] shadow-[0_0_10px_#ee2b2b]" />
              )}
            </button>
          ))}
        </div>

        {/* --- RIGHT: MAIN DISPLAY --- */}
        <div className="flex-1 relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#050505]">
           <AnimatePresence mode="wait">
             <motion.div
               key={selectedAnimal.id}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.4 }}
               className="absolute inset-0"
             >
                {/* 1. HERO BACKGROUND IMAGE */}
                <div className="absolute inset-0">
                   <img src={selectedAnimal.image} className="w-full h-full object-cover opacity-60" alt={selectedAnimal.name} />
                   {/* Gradient Overlays for readability */}
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
                   <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                   {/* Scanline Texture */}
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.02),rgba(255,0,0,0.06))] z-[1] bg-[length:100%_2px,3px_100%] pointer-events-none" />
                </div>

                {/* 2. CONTENT LAYER */}
                <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-end md:justify-center">
                   
                   {/* HUD ELEMENTS */}
                   <div className="absolute top-8 right-8 hidden md:block opacity-50">
                      <Scan size={48} className="text-[#ee2b2b] ml-4 animate-spin-slow" />
                      <div className="text-[10px] text-[#ee2b2b] font-mono mt-2 text-center">ANALYZING TARGET</div>
                   </div>

                   {/* ANIMAL TITLE */}
                   <div className="mb-8">
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-3 mb-2"
                      >
                         <span className={`px-3 py-1 rounded text-xs font-bold tracking-widest text-white ${
                             selectedAnimal.dangerLevel === "CRITICAL" ? "bg-[#ee2b2b]" : "bg-orange-500"
                         }`}>
                            THREAT: {selectedAnimal.dangerLevel}
                         </span>
                         <span className="text-gray-400 text-xs font-serif italic">
                            {selectedAnimal.latin}
                         </span>
                      </motion.div>
                      
                      <motion.h1 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4"
                      >
                         {selectedAnimal.name}
                      </motion.h1>
                      
                      <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-300 max-w-2xl text-lg leading-relaxed border-l-4 border-[#ee2b2b] pl-4 bg-black/20 backdrop-blur-sm py-2"
                      >
                         {selectedAnimal.description}
                      </motion.p>
                   </div>

                   {/* PROTOCOL CARDS */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* DOS CARD */}
                      <motion.div 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-black/50 transition-colors group"
                      >
                         <div className="flex items-center gap-2 mb-4 text-emerald-400">
                            <ShieldAlert size={20} />
                            <span className="font-bold tracking-widest text-sm">SURVIVAL PROTOCOL</span>
                         </div>
                         <ul className="space-y-3">
                            {selectedAnimal.dos.map((item, i) => (
                               <li key={i} className="flex items-start gap-3 text-sm text-gray-200">
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] flex-shrink-0" />
                                  {item}
                               </li>
                            ))}
                         </ul>
                      </motion.div>

                      {/* DONTS CARD */}
                      <motion.div 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-black/50 transition-colors group"
                      >
                         <div className="flex items-center gap-2 mb-4 text-[#ee2b2b]">
                            <AlertTriangle size={20} />
                            <span className="font-bold tracking-widest text-sm">FATAL ERRORS</span>
                         </div>
                         <ul className="space-y-3">
                            {selectedAnimal.donts.map((item, i) => (
                               <li key={i} className="flex items-start gap-3 text-sm text-gray-200">
                                  <X size={14} className="mt-0.5 text-[#ee2b2b] flex-shrink-0" strokeWidth={3} />
                                  {item}
                               </li>
                            ))}
                         </ul>
                      </motion.div>

                   </div>

                </div>
             </motion.div>
           </AnimatePresence>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        .animate-spin-slow {
            animation: spin 8s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}