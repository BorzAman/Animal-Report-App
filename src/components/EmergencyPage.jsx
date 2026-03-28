import React from "react";
import { motion } from "framer-motion";
import { 
  Phone, 
  ShieldAlert, 
  Flame, 
  TreePine, 
  HeartPulse, 
  ChevronLeft,
  ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmergencyPage = () => {
  const navigate = useNavigate();

  const contacts = [
    {
      title: "Wildlife Helpline (RESQ)",
      number: "091725 11100",
      icon: <HeartPulse className="text-primary" />,
      desc: "Injured or distressed wildlife rescue",
      type: "Rescue"
    },
    {
      title: "Police / Fire",
      number: "112",
      icon: <ShieldAlert className="text-red-500" />,
      desc: "Emergency law enforcement or fire hazards",
      type: "General"
    },
    {
      title: "Forest Dept (Maharashtra)",
      number: "079961 04111",
      icon: <TreePine className="text-green-500" />,
      desc: "Wild animal sightings & forest violations",
      type: "Official"
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#221010] font-display text-gray-100 p-6 md:p-12 overflow-hidden">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-900/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl mx-auto">
        
        {/* BACK BUTTON */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30">
            <Phone className="text-primary animate-pulse" size={28} />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white uppercase">
              Emergency <span className="text-primary">Lines</span>
            </h1>
            <p className="text-gray-400 text-sm">Immediate assistance for wildlife and safety.</p>
          </div>
        </div>

        {/* CONTACT CARDS */}
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="group bg-[#2a1a1a]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => window.open(`tel:${contact.number.replace(/\s/g, '')}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {contact.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">
                      {contact.type}
                    </span>
                    <h3 className="text-xl font-bold text-gray-100 group-hover:text-primary transition-colors">
                      {contact.title}
                    </h3>
                    <p className="text-2xl md:text-3xl font-mono font-black text-white mt-2 tracking-tighter">
                      {contact.number}
                    </p>
                    <p className="text-gray-500 text-xs mt-3 italic">{contact.desc}</p>
                  </div>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={20} className="text-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
          <p className="text-gray-400 text-sm">
            In case of immediate threat to life, always contact <span className="text-white font-bold">112</span> first. 
            Ensure you stay at a safe distance from any wild animals while making the call.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;