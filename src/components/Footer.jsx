import { ShieldCheck, PhoneCall, MapPin, PawPrint, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-16 border-t border-primary/20 bg-background-dark/80 backdrop-blur-md font-display">
      
      {/* Decorative Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 group cursor-default">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/50 group-hover:bg-primary transition duration-300">
                  <PawPrint size={16} className="text-primary group-hover:text-white transition duration-300"/>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Pashu <span className="text-primary">Jaagrak</span>
                </h3>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              A wildlife safety & reporting platform empowering citizens to stay alert, protected, and coexist with nature.
            </p>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-wider text-xs opacity-80">
              <PhoneCall size={14} className="text-primary" />
              Emergency Lines
            </h4>

            <ul className="space-y-4">
              <ContactItem 
                label="Wildlife Helpline (RESQ)" 
                number="091725 11100" 
              />
              <ContactItem 
                label="Police / Fire" 
                number="112" 
                highlight 
              />
              <ContactItem 
                label="Forest Dept (Maharashtra)" 
                number="079961 04111" 
              />
            </ul>
          </div>

          {/* Coverage / Location */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-wider text-xs opacity-80">
              <MapPin size={14} className="text-primary" />
              Operational Zones
            </h4>

            <div className="bg-surface-dark border border-white/5 p-4 rounded-xl inline-flex items-center gap-3">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <div>
                   <p className="text-white font-bold">Pune Region</p>
                   <p className="text-xs text-gray-500">Live Coverage Active</p>
                </div>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-gray-600"/>
            <span>© {new Date().getFullYear()} Crashing Birds. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-1.5 opacity-75">
            <span>Built for public safety</span>
            
            <span>& awareness</span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;

// 🔹 Sub-Component for Contact Rows
const ContactItem = ({ label, number, highlight }) => (
  <li className="group flex flex-col cursor-default">
    <span className="text-gray-500 text-xs mb-0.5 group-hover:text-gray-300 transition">{label}</span>
    <span className={`font-mono font-bold text-base transition duration-300 ${highlight ? 'text-primary' : 'text-gray-200 group-hover:text-white'}`}>
      {number}
    </span>
  </li>
);