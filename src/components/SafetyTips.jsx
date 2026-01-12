import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  PhoneCall,
} from "lucide-react";

const SafetyTips = () => {
  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-10">

      {/* PAGE TITLE */}
      <div className="flex items-center gap-2">
        <Shield className="text-red-500" />
        <h1 className="text-xl font-semibold">Safety Tips</h1>
      </div>

      {/* INTRO */}
      <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 text-sm text-gray-300">
        <p>
          Wild animals may enter human areas due to habitat loss or food search.
          <span className="text-red-400 font-medium">
            {" "}Your safety is the top priority.
          </span>
          Follow these safety tips to avoid dangerous situations.
        </p>
      </div>

      {/* GENERAL SAFETY TIPS */}
      <section>
        <h2 className="text-sm font-semibold mb-4">General Safety Guidelines</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TipCard
            icon={<Shield />}
            title="Maintain Distance"
            text="Always keep at least 50 meters away from wild animals."
          />
          <TipCard
            icon={<AlertTriangle />}
            title="Stay Calm"
            text="Do not shout, run suddenly, or provoke the animal."
          />
          <TipCard
            icon={<PhoneCall />}
            title="Call Authorities"
            text="Immediately contact forest department or emergency helpline."
          />
          <TipCard
            icon={<Shield />}
            title="Secure Area"
            text="Keep doors closed and pets indoors."
          />
          <TipCard
            icon={<AlertTriangle />}
            title="Avoid Night Movement"
            text="Do not roam outdoors at night in animal-prone zones."
          />
          <TipCard
            icon={<Shield />}
            title="Follow Instructions"
            text="Listen carefully to rescue teams and police."
          />
        </div>
      </section>

      {/* DO & DON'T */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* DO */}
        <div className="bg-[#111111] border border-gray-800 rounded-xl p-6">
          <h3 className="flex items-center gap-2 text-green-400 font-semibold mb-4">
            <CheckCircle size={18} />
            Do’s
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Inform neighbors calmly</li>
            <li>• Observe from a safe distance</li>
            <li>• Use flashlight at night</li>
            <li>• Share accurate location info</li>
          </ul>
        </div>

        {/* DON'T */}
        <div className="bg-[#111111] border border-gray-800 rounded-xl p-6">
          <h3 className="flex items-center gap-2 text-red-400 font-semibold mb-4">
            <XCircle size={18} />
            Don’ts
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Do not crowd the animal</li>
            <li>• Do not try to record close videos</li>
            <li>• Do not feed wild animals</li>
            <li>• Do not attempt rescue yourself</li>
          </ul>
        </div>
      </section>

      {/* HIGH RISK ZONES – VISUAL GUIDE */}
      <section>

        

      </section>

      {/* EMERGENCY WARNING */}
      <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 flex items-start gap-3">
        <AlertTriangle className="text-red-500 mt-1" />
        <p className="text-sm text-red-300">
          If a wild animal is aggressive or chasing someone,
          <span className="font-semibold">
            {" "}do not intervene.
          </span>
          Move to safety and call emergency services immediately.
        </p>
      </div>
    </div>
  );
};

export default SafetyTips;


// 🔹 SUB COMPONENT
const TipCard = ({ icon, title, text }) => (
  <div className="bg-[#111111] border border-gray-800 rounded-xl p-5 space-y-2 hover:bg-[#1a1a1a] transition">
    <div className="text-red-500">{icon}</div>
    <h4 className="font-semibold text-sm">{title}</h4>
    <p className="text-xs text-gray-400">{text}</p>
  </div>
);
