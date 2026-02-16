import {
  AlertCircle,
  PhoneCall,
  PlusCircle,
  Info,
  Shield,
  Maximize2,
  HeartPulse,
  Siren
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Added for animation
import Mapp from "../map.jsx";

const Dashboard = () => {
  const [activeDistance, setActiveDistance] = useState("25");
  const [activeTab, setActiveTab] = useState("Rescued");
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 md:p-6 space-y-8 bg-background-dark min-h-screen font-display text-gray-100"
    >

      <motion.div variants={itemVariants} className="flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-center tracking-tight">
          Home <span className="text-primary">Dashboard</span>
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-transparent via-primary to-transparent mt-2 opacity-50"></div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* LIVE MAP */}
        <motion.section 
          variants={itemVariants}
          className="h-[70vh] w-full relative lg:col-span-2 rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl"
        >
          <Mapp />

          {/* Fullscreen Button */}
          <button
            onClick={() => navigate("/map")}
            className="absolute top-4 right-4 z-50
                       bg-surface-dark/80 backdrop-blur-md text-white text-xs font-bold
                       px-4 py-2 rounded-lg border border-white/10
                       hover:bg-primary hover:border-primary transition duration-300
                       flex items-center gap-2 group"
          >
            <Maximize2 size={14} className="group-hover:scale-110 transition"/>
            Fullscreen
          </button>
        </motion.section>

      </div>

      {/* QUICK ACCESS */}
      <motion.section variants={itemVariants}>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full"></span>
          Quick Access
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <Link to="/report-animal">
            <QuickItem icon={<PlusCircle size={28} />} label="Report Sighting" />
          </Link>

          <Link to="/first-aid">
            <QuickItem icon={<HeartPulse size={28} />} label="First Aid" />
          </Link>

          <Link to="/rescue-info">
            <QuickItem icon={<Info size={28} />} label="Rescue Info" />
          </Link>

          <Link to="/safety-tips">
            <QuickItem icon={<Shield size={28} />} label="Safety Tips" />
          </Link>
        </div>
      </motion.section>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Emergency Contacts */}
        <motion.div 
          variants={itemVariants}
          className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
             <PhoneCall size={80} />
          </div>

          <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-red-400">
            <Siren className="animate-pulse" size={20} />
            Emergency Contacts
          </h3>

          <div className="space-y-4 text-sm relative z-10">
            <Row label="Wildlife Helpline" value="091725 11100" />
            <div className="h-px w-full bg-white/5"></div>
            <Row label="Emergency (Police/Fire)" value="112" highlight />
            <div className="h-px w-full bg-white/5"></div>
            <Row label="Forest Department" value="079961 04111" />
          </div>
        </motion.div>

        {/* Safety Tips */}
        <motion.div 
          variants={itemVariants}
          className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group"
        >
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
             <Shield size={80} />
          </div>

          <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-yellow-400">
            <AlertCircle size={20} />
            Safety Protocols
          </h3>

          <ul className="space-y-3 text-sm text-gray-300 relative z-10">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 bg-primary rounded-full shrink-0"></span>
              Stay calm and move away slowly; never run.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 bg-primary rounded-full shrink-0"></span>
              Do not touch or feed wild animals.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 bg-primary rounded-full shrink-0"></span>
              Maintain at least 50m safe distance.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 bg-primary rounded-full shrink-0"></span>
              Call the helpline immediately if the animal seems injured.
            </li>
          </ul>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Dashboard;

// 🔹 Helpers

const QuickItem = ({ icon, label }) => (
  <motion.div 
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    className="glass-panel border border-white/5 p-6 rounded-2xl
               flex flex-col items-center gap-3
               hover:bg-white/5 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(238,43,43,0.15)] 
               transition-all duration-300 cursor-pointer group h-full justify-center"
  >
    <div className="text-primary group-hover:text-white transition-colors duration-300 bg-primary/10 p-3 rounded-full group-hover:bg-primary">
      {icon}
    </div>
    <span className="text-sm font-semibold text-gray-300 group-hover:text-white">{label}</span>
  </motion.div>
);

const Row = ({ label, value, highlight }) => (
  <div className="flex justify-between items-center group cursor-default">
    <span className="text-gray-400 font-medium group-hover:text-gray-200 transition">{label}</span>
    <span className={`font-mono font-bold ${highlight ? 'text-red-400 text-lg' : 'text-primary'}`}>
      {value}
    </span>
  </div>
);