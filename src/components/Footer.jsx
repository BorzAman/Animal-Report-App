import { ShieldCheck, PhoneCall, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-800 bg-[#0f0f0f]">
      <div className="mx-auto max-w-6xl px-4 py-8">

        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">

          {/* Brand */}
          <div>
            <h3 className="text-white font-semibold mb-2">
              Pashu Jaagrak
            </h3>
            <p className="text-gray-400">
              A wildlife safety & reporting platform helping citizens
              stay alert and protected.
            </p>
          </div>

          {/* Emergency */}
          <div>
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <PhoneCall size={16} className="text-green-400" />
              Emergency
            </h4>

            <ul className="text-gray-400 space-y-1">
              <li>Wildlife Helpline: <span className="text-green-400">091725 11100(RESQ charitable trust)</span></li>
              <li>Emergency: <span className="text-green-400">112</span></li>
              <li>Forest Dept: <span className="text-green-400">079961 04111(Maharashtra Gov Forest Helpline)</span></li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <MapPin size={16} className="text-yellow-400" />
              Coverage
            </h4>

            <p className="text-gray-400">
              Currently active in Pune.
            </p>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="mt-8 pt-4 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-3">
          <div className="flex items-center gap-2">

            <span>© {new Date().getFullYear()} Crashing Birds.All Rights Reserved.</span>
          </div>

          <span>
            Built for public safety & awareness
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
