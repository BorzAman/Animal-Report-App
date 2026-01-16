import {
  AlertCircle,
  PhoneCall,
  PlusCircle,
  Info,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Mapp from "../map.jsx";

const Dashboard = () => {
  const [activeDistance, setActiveDistance] = useState("25");
  const [activeTab, setActiveTab] = useState("Rescued");
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 space-y-8">

      <h1 className="text-xl text-center   font-semibold">Home Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* LIVE MAP */}
        <section className="h-[70vh] w-full relative lg:col-span-2 rounded-xl overflow-hidden">
          <Mapp />

          {/* Fullscreen Button */}
          <button
            onClick={() => navigate("/map")}
            className="absolute top-3 right-3 z-1000
                       bg-black/70 text-white text-xs
                       px-3 py-1 rounded-md
                       hover:bg-black"
          >
            Fullscreen
          </button>
        </section>

      </div>

      {/* QUICK ACCESS */}
      <section>
        <h2 className="text-sm font-semibold mb-4">Quick Access</h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <Link to="/report-animal">
            <QuickItem icon={<PlusCircle />} label="Report Animal" />
          </Link>

          <Link to="/first-aid">
            <QuickItem icon={<PlusCircle />} label="First Aid" />
          </Link>

          <Link to="/rescue-info">
            <QuickItem icon={<Info />} label="Rescue Info" />
          </Link>

          <Link to="/safety-tips">
            <QuickItem icon={<Shield />} label="Safety Tips" />
          </Link>
        </div>
      </section>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Emergency Contacts */}
        <div className="bg-[#111111] border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold mb-6 flex justify-center gap-2">
            <PhoneCall className="text-green-400" size={16} />
            Emergency Contacts
          </h3>

          <div className="space-y-2 text-sm">
            <Row label="Wildlife Helpline" value="091725 11100" />
            <Row label="Emergency" value="112" />
            <Row label="Forest Department" value="079961 04111" />
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-[#111111] border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="text-yellow-400" size={16} />
            Safety Tips
          </h3>

          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Stay calm and move away slowly</li>
            <li>• Do not touch wild animals</li>
            <li>• Maintain at least 50m distance</li>
            <li>• Call helpline immediately</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

// 🔹 Helpers
const QuickItem = ({ icon, label }) => (
  <div className="bg-[#111111] border border-gray-800 rounded-xl p-4
                  flex flex-col items-center gap-2
                  hover:bg-[#1a1a1a] transition cursor-pointer">
    <div className="text-red-500">{icon}</div>
    <span className="text-xs text-gray-300">{label}</span>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-gray-300">{label}</span>
    <span className="text-green-400">{value}</span>
  </div>
);
