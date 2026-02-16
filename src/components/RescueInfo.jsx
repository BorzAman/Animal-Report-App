import {
  LifeBuoy,
  PhoneCall,
  Truck,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Siren,
  Users,
  Info,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

const RescueInfo = () => {
  
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="relative min-h-screen bg-background-dark font-display text-gray-100 overflow-hidden">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393798-3828fb4090bb?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-overlay fixed"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/95 to-background-dark fixed"></div>
      <div className="absolute inset-0 bg-island-gradient opacity-20 fixed pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl mx-auto px-6 py-12 space-y-12"
      >

        {/* HEADER */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end gap-4 border-b border-white/5 pb-8">
          <div>
             <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/20 rounded-lg border border-primary/50 text-primary">
                  <LifeBuoy size={28} />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                  Rescue <span className="text-primary">Protocols</span>
                </h1>
             </div>
             <p className="text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed">
               Understanding how professional rescue operations work ensures safety for both humans and wildlife.
             </p>
          </div>
        </motion.div>

        {/* CRITICAL INFO BANNER */}
        <motion.div 
          variants={itemVariants}
          className="glass-panel border-l-4 border-primary bg-surface-dark/50 p-6 rounded-r-xl relative overflow-hidden group"
        >
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition transform rotate-12">
              <Siren size={120} />
           </div>
           <div className="flex items-start gap-4 relative z-10">
              <Info className="text-primary mt-1 shrink-0" size={24} />
              <div className="space-y-2">
                 <h3 className="font-bold text-lg text-white">Professional Intervention Only</h3>
                 <p className="text-sm text-gray-300 leading-relaxed">
                    Animal rescue is a specialized task handled by the <span className="text-white font-bold">Forest Department, Wildlife NGOs, and Veterinary Teams</span>. 
                    Untrained attempts to rescue wild animals can lead to severe injury or legal consequences.
                 </p>
              </div>
           </div>
        </motion.div>

        {/* RESCUE PROCESS STEPS */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-2 mb-6">
             <span className="w-1 h-6 bg-primary rounded-full"></span>
             <h2 className="text-xl font-bold">Operational Workflow</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard
              number="01"
              icon={<PhoneCall size={24} />}
              title="Report Sighting"
              text="User reports location & condition via the App or Helpline."
            />
            <StepCard
              number="02"
              icon={<Truck size={24} />}
              title="Deployment"
              text="Nearest Rapid Response Team is dispatched to the coordinates."
            />
            <StepCard
              number="03"
              icon={<ShieldCheck size={24} />}
              title="Safe Resolution"
              text="Animal is rescued, treated, or relocated to a safe habitat."
            />
          </div>
        </motion.section>

        {/* DO's & DON'Ts GRID */}
        <section className="grid md:grid-cols-2 gap-8">
          
          {/* DO's */}
          <motion.div variants={itemVariants} className="space-y-4">
             <div className="flex items-center gap-2 text-green-400 font-bold uppercase tracking-wider text-sm">
                <CheckCircle size={16} /> Recommended Actions
             </div>
             <div className="glass-panel bg-surface-dark/40 border border-green-500/20 p-6 rounded-2xl h-full hover:border-green-500/40 transition duration-300">
                <ul className="space-y-4">
                   <ListItem type="do" text="Maintain a safe distance (min 50m)." />
                   <ListItem type="do" text="Keep the area clear of crowds and noise." />
                   <ListItem type="do" text="Share accurate location & photos." />
                   <ListItem type="do" text="Follow instructions from Forest Officials." />
                </ul>
             </div>
          </motion.div>

          {/* DON'Ts */}
          <motion.div variants={itemVariants} className="space-y-4">
             <div className="flex items-center gap-2 text-red-400 font-bold uppercase tracking-wider text-sm">
                <XCircle size={16} /> Strictly Prohibited
             </div>
             <div className="glass-panel bg-surface-dark/40 border border-red-500/20 p-6 rounded-2xl h-full hover:border-red-500/40 transition duration-300">
                <ul className="space-y-4">
                   <ListItem type="dont" text="Do NOT chase, corner, or pelt stones." />
                   <ListItem type="dont" text="Do NOT attempt to capture or feed." />
                   <ListItem type="dont" text="Do NOT use flash photography." />
                   <ListItem type="dont" text="Do NOT spread unverified panic." />
                </ul>
             </div>
          </motion.div>

        </section>

        {/* AUTHORITY SECTION */}
        <motion.section variants={itemVariants} className="pt-4">
           <div className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                 <div className="shrink-0 p-4 bg-surface-dark rounded-full border border-white/10">
                    <Users size={32} className="text-gray-300" />
                 </div>
                 <div className="flex-grow text-center md:text-left">
                    <h3 className="text-xl font-bold text-white mb-2">Authorized Response Units</h3>
                    <p className="text-sm text-gray-400">
                       Our platform connects directly with the following agencies to ensure rapid action:
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
                    <AgencyTag label="Forest Dept." />
                    <AgencyTag label="Wildlife NGOs" />
                    <AgencyTag label="Veterinary ER" />
                    <AgencyTag label="Fire & Rescue" />
                 </div>
              </div>
           </div>
        </motion.section>

        {/* EMERGENCY FOOTER */}
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-red-900/40 to-surface-dark border border-red-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-[0_0_30px_rgba(238,43,43,0.1)]"
        >
           <div className="p-3 bg-red-500/20 rounded-full animate-pulse text-red-500">
              <AlertTriangle size={24} />
           </div>
           <div className="flex-grow text-center md:text-left">
              <h4 className="font-bold text-red-100 text-lg">Immediate Danger?</h4>
              <p className="text-sm text-red-200/70">
                 If the animal is aggressive, injured, or in a densely populated area, do not wait on the app.
              </p>
           </div>
           <button className="whitespace-nowrap px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2">
              <PhoneCall size={18} /> Call Emergency
           </button>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default RescueInfo;


// 🔹 SUB COMPONENTS

const StepCard = ({ number, icon, title, text }) => (
  <div className="glass-panel bg-surface-dark/50 border border-white/5 rounded-2xl p-6 relative group hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
    <div className="absolute top-4 right-4 text-4xl font-bold text-white/5 group-hover:text-primary/10 transition-colors">
      {number}
    </div>
    <div className="w-12 h-12 bg-black/40 rounded-xl flex items-center justify-center text-primary border border-white/5 mb-4 group-hover:scale-110 transition duration-300">
      {icon}
    </div>
    <h4 className="font-bold text-lg text-white mb-2 group-hover:text-primary transition-colors">{title}</h4>
    <p className="text-sm text-gray-400 leading-relaxed">{text}</p>
  </div>
);

const ListItem = ({ type, text }) => (
  <li className="flex items-start gap-3 text-sm text-gray-300">
     <div className={`mt-1 rounded-full p-0.5 ${type === 'do' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
        {type === 'do' ? <CheckCircle size={12} /> : <XCircle size={12} />}
     </div>
     <span>{text}</span>
  </li>
);

const AgencyTag = ({ label }) => (
  <span className="px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs font-bold text-gray-300 text-center whitespace-nowrap">
    {label}
  </span>
);