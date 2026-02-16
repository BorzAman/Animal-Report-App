import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  PhoneCall,
  Siren,
  Eye,
  Megaphone,
  Moon,
  Home,
  Users,
  Map
} from "lucide-react";
import { motion } from "framer-motion";

const SafetyTips = () => {

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative min-h-screen bg-background-dark font-display text-gray-100 p-4 md:p-8 overflow-hidden">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393798-3828fb4090bb?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-overlay fixed"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/95 to-background-dark fixed"></div>
      <div className="absolute inset-0 bg-island-gradient opacity-10 fixed pointer-events-none"></div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-6xl mx-auto space-y-10"
      >

        {/* HEADER */}
        <motion.div variants={item} className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-500">
                  <Shield size={24} />
               </div>
               <h1 className="text-3xl font-bold tracking-tight text-white">Public <span className="text-blue-500">Safety</span></h1>
            </div>
            <p className="text-gray-400 text-sm max-w-2xl">
              Proactive measures to minimize conflict and ensure coexistence with local wildlife.
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-900/20 border border-blue-500/30 rounded-full text-xs font-bold text-blue-400">
             <Shield size={14} /> Protection Protocols Active
          </div>
        </motion.div>

        {/* INTRO ALERT */}
        <motion.div 
          variants={item}
          className="bg-[#0a0a0a]/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex gap-4"
        >
          <div className="shrink-0 p-3 bg-white/5 rounded-full">
             <AlertTriangle className="text-yellow-500" size={24} />
          </div>
          <div>
             <h3 className="text-white font-bold mb-1">Wildlife Encounter Warning</h3>
             <p className="text-gray-400 text-sm leading-relaxed">
               Wild animals may enter human settlements due to habitat loss.
               <span className="text-primary font-bold"> Your safety is paramount. </span>
               Never approach, provoke, or corner a wild animal.
             </p>
          </div>
        </motion.div>

        {/* GENERAL SAFETY TIPS GRID */}
        <motion.section variants={item}>
          <div className="flex items-center gap-2 mb-6">
             <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
             <h2 className="text-lg font-bold">Core Guidelines</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TipCard
              icon={<Shield size={24} />}
              title="Maintain Distance"
              text="Always keep at least 50 meters away from wild animals to prevent defensive aggression."
            />
            <TipCard
              icon={<Eye size={24} />}
              title="Stay Calm"
              text="Do not run. Avoid sudden movements. Back away slowly while facing the animal."
            />
            <TipCard
              icon={<PhoneCall size={24} />}
              title="Alert Authorities"
              text="Immediately contact the forest department or local police. Do not attempt to handle it."
            />
            <TipCard
              icon={<Home size={24} />}
              title="Secure Premises"
              text="Lock doors and windows. Bring pets and children indoors immediately."
            />
            <TipCard
              icon={<Moon size={24} />}
              title="Night Caution"
              text="Avoid walking alone in unlit areas at night, especially near forest fringes."
            />
            <TipCard
              icon={<Megaphone size={24} />}
              title="Follow Orders"
              text="Strictly adhere to instructions from rescue teams and law enforcement."
            />
          </div>
        </motion.section>

        {/* DO & DON'T SECTION */}
        <motion.section variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* DO's */}
          <div className="bg-[#0a0a0a]/50 border border-green-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-green-500/40 transition duration-300">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition">
               <CheckCircle size={80} className="text-green-500"/>
            </div>
            
            <h3 className="flex items-center gap-3 text-green-400 font-bold text-lg mb-6">
              <CheckCircle size={20} /> Correct Actions
            </h3>
            
            <ul className="space-y-4">
               <ListItem type="do" text="Inform neighbors calmly to ensure community awareness." />
               <ListItem type="do" text="Observe from a safe, elevated vantage point (balcony/terrace)." />
               <ListItem type="do" text="Use a flashlight while moving outdoors at night." />
               <ListItem type="do" text="Share precise location data with rescue teams." />
            </ul>
          </div>

          {/* DON'Ts */}
          <div className="bg-[#0a0a0a]/50 border border-red-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-red-500/40 transition duration-300">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition">
               <XCircle size={80} className="text-red-500"/>
            </div>

            <h3 className="flex items-center gap-3 text-red-400 font-bold text-lg mb-6">
              <XCircle size={20} /> Hazardous Actions
            </h3>
            
            <ul className="space-y-4">
               <ListItem type="dont" text="Do not form crowds or surround the animal." />
               <ListItem type="dont" text="Do not approach for photos, selfies, or videos." />
               <ListItem type="dont" text="Do not throw stones or food at the animal." />
               <ListItem type="dont" text="Do not attempt to chase or capture it yourself." />
            </ul>
          </div>
        </motion.section>

        {/* HIGH RISK ZONES VISUAL */}
        <motion.section variants={item} className="bg-[#0a0a0a]/40 border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
                <Map size={20} className="text-gray-400"/>
                <h3 className="font-bold text-white">High Risk Zones</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <RiskZone 
                    title="Water Bodies" 
                    desc="Lakes & river banks often attract wildlife for hydration." 
                    level="High"
                />
                <RiskZone 
                    title="Dense Vegetation" 
                    desc="Overgrown bushes and tall grass provide hiding spots." 
                    level="Medium"
                />
                <RiskZone 
                    title="Garbage Dumps" 
                    desc="Food waste attracts scavengers and predators." 
                    level="Critical"
                />
            </div>
        </motion.section>

        {/* EMERGENCY FOOTER */}
        <motion.div 
          variants={item}
          className="bg-gradient-to-r from-red-900/40 to-background-dark border border-red-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="p-3 bg-red-500/20 rounded-xl text-red-500 animate-pulse shrink-0">
             <Siren size={32} />
          </div>
          <div>
             <h4 className="font-bold text-white text-lg">Immediate Danger?</h4>
             <p className="text-gray-400 text-sm mt-1">
                If an animal is aggressive or actively chasing, <span className="text-red-400 font-bold">do not intervene.</span> Evacuate to a secure indoor location and lock all entry points. Call 112 immediately.
             </p>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default SafetyTips;


// 🔹 SUB COMPONENTS

const TipCard = ({ icon, title, text }) => (
  <div className="group bg-[#0a0a0a]/60 border border-white/5 rounded-2xl p-5 hover:bg-white/5 hover:border-blue-500/30 transition duration-300">
    <div className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300 mb-3 bg-white/5 w-fit p-3 rounded-xl group-hover:bg-blue-500/10">
      {icon}
    </div>
    <h4 className="font-bold text-white text-base mb-2">{title}</h4>
    <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors leading-relaxed">{text}</p>
  </div>
);

const ListItem = ({ type, text }) => (
   <li className="flex items-start gap-3 text-sm text-gray-300 group/item hover:text-white transition">
      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${type === 'do' ? 'bg-green-500' : 'bg-red-500'}`}></span>
      {text}
   </li>
);

const RiskZone = ({ title, desc, level }) => (
    <div className="bg-black/20 p-4 rounded-xl border border-white/5">
        <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-sm text-gray-200">{title}</h4>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                level === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                level === 'High' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
            }`}>
                {level}
            </span>
        </div>
        <p className="text-xs text-gray-500">{desc}</p>
    </div>
);