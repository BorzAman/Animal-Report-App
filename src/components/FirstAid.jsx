import {
  Bandage,
  AlertTriangle,
  PhoneCall,
  Shield,
  XCircle,
  CheckCircle,
  HeartPulse,
  Activity,
  Siren,
  Droplets,
  VolumeX
} from "lucide-react";
import { motion } from "framer-motion";

const FirstAid = () => {
  
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
        className="relative z-10 max-w-5xl mx-auto space-y-8"
      >

        {/* HEADER */}
        <motion.div variants={item} className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20 text-red-500">
                  <HeartPulse size={24} />
               </div>
               <h1 className="text-3xl font-bold tracking-tight text-white">First Aid <span className="text-primary">Protocols</span></h1>
            </div>
            <p className="text-gray-400 text-sm max-w-2xl">
              Essential guidelines for immediate assistance before professional help arrives.
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-900/20 border border-red-500/30 rounded-full text-xs font-bold text-red-400 animate-pulse">
             <Activity size={14} /> Emergency Mode Active
          </div>
        </motion.div>

        {/* CRITICAL WARNING */}
        <motion.div 
          variants={item}
          className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 text-center md:text-left backdrop-blur-sm"
        >
          <div className="p-3 bg-red-500 rounded-full text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]">
             <AlertTriangle size={24} />
          </div>
          <div className="flex-1">
             <h3 className="text-red-400 font-bold text-lg mb-1">Safety First</h3>
             <p className="text-gray-300 text-sm leading-relaxed">
               Human first aid should be administered with extreme caution.
               <span className="text-white font-bold"> Never attempt to handle wild or aggressive animals directly without proper training.</span> 
               Prioritize your own safety to avoid becoming a second victim.
             </p>
          </div>
        </motion.div>

        {/* STEPS GRID */}
        <motion.section variants={item}>
          <div className="flex items-center gap-2 mb-6">
             <span className="w-1 h-6 bg-primary rounded-full"></span>
             <h2 className="text-lg font-bold">Basic Response Steps</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard
              icon={<Shield size={24} />}
              title="Ensure Safety"
              text="Assess the scene. Maintain a safe distance from the animal."
            />
            <InfoCard
              icon={<Bandage size={24} />}
              title="Stop Bleeding"
              text="Apply gentle pressure using a clean cloth if safe to approach."
            />
            <InfoCard
              icon={<Activity size={24} />}
              title="Immobilize"
              text="Do not move fractured limbs or spine unless necessary."
            />
            <InfoCard
              icon={<PhoneCall size={24} />}
              title="Call Experts"
              text="Contact wildlife rescue or veterinary services immediately."
            />
            <InfoCard
              icon={<Droplets size={24} />}
              title="Hydration"
              text="Provide water only if the victim is conscious and calm."
            />
            <InfoCard
              icon={<VolumeX size={24} />}
              title="Reduce Stress"
              text="Keep noise levels low and disperse crowds."
            />
          </div>
        </motion.section>

        {/* DO & DON'T */}
        <motion.section variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* DO's */}
          <div className="bg-[#0a0a0a]/50 border border-green-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-green-500/40 transition duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition">
               <CheckCircle size={80} className="text-green-500"/>
            </div>
            
            <h3 className="flex items-center gap-3 text-green-400 font-bold text-lg mb-6">
              <CheckCircle size={20} /> Actions to Take
            </h3>
            
            <ul className="space-y-4">
               <ListItem type="do" text="Call trained rescue teams immediately." />
               <ListItem type="do" text="Keep children and pets at a safe distance." />
               <ListItem type="do" text="Observe from a distance and take photos for ID." />
               <ListItem type="do" text="Provide shade or cover if possible." />
            </ul>
          </div>

          {/* DON'Ts */}
          <div className="bg-[#0a0a0a]/50 border border-red-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-red-500/40 transition duration-300">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition">
               <XCircle size={80} className="text-red-500"/>
            </div>

            <h3 className="flex items-center gap-3 text-red-400 font-bold text-lg mb-6">
              <XCircle size={20} /> Actions to Avoid
            </h3>
            
            <ul className="space-y-4">
               <ListItem type="dont" text="Do not attempt to feed wild animals." />
               <ListItem type="dont" text="Do not attempt capture without equipment." />
               <ListItem type="dont" text="Do not pour water forcefully into mouth." />
               <ListItem type="dont" text="Do not crowd or surround the animal." />
            </ul>
          </div>
        </motion.section>

        {/* EMERGENCY FOOTER */}
        <motion.div 
          variants={item}
          className="bg-gradient-to-r from-red-900/40 to-background-dark border border-red-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
             <div className="p-3 bg-red-500/20 rounded-xl text-red-500 animate-pulse">
                <Siren size={28} />
             </div>
             <div>
                <h4 className="font-bold text-white text-lg">Critical Emergency?</h4>
                <p className="text-gray-400 text-sm max-w-md mt-1">
                   In case of serious human injury, poisoning, or unconsciousness, 
                   <span className="text-red-400 font-bold"> do not attempt first aid.</span>
                </p>
             </div>
          </div>
          
          <button className="whitespace-nowrap bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all transform hover:-translate-y-1 flex items-center gap-2">
             <PhoneCall size={18} /> Call Ambulance (112)
          </button>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default FirstAid;


// 🔹 SUB COMPONENTS

const InfoCard = ({ icon, title, text }) => (
  <div className="group bg-[#0a0a0a]/60 border border-white/5 rounded-2xl p-5 hover:bg-white/5 hover:border-primary/30 transition duration-300">
    <div className="text-gray-400 group-hover:text-primary transition-colors duration-300 mb-3 bg-white/5 w-fit p-3 rounded-xl group-hover:bg-primary/10">
      {icon}
    </div>
    <h4 className="font-bold text-white text-base mb-2 group-hover:translate-x-1 transition-transform">{title}</h4>
    <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors leading-relaxed">{text}</p>
  </div>
);

const ListItem = ({ type, text }) => (
   <li className="flex items-start gap-3 text-sm text-gray-300 group/item hover:text-white transition">
      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${type === 'do' ? 'bg-green-500' : 'bg-red-500'}`}></span>
      {text}
   </li>
);