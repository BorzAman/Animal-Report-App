import {
  Bandage,
  AlertTriangle,
  PhoneCall,
  Shield,
  XCircle,
  CheckCircle,
} from "lucide-react";

const FirstAid = () => {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-8">

      {/* PAGE TITLE */}
      <div className="flex items-center gap-2">
        <Bandage className="text-red-500" />
        <h1 className="text-xl font-semibold">Human First Aid</h1>
      </div>

      {/* INTRO */}
      <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 text-sm text-gray-300">
        <p>
          Human first aid should be given immediately in case of animal injuries.
          <span className="text-red-400 font-medium">
            {" "}Never attempt to handle wild or aggressive animals directly.
          </span>
        </p>
      </div>

      {/* FIRST AID STEPS */}
      <section>
        <h2 className="text-sm font-semibold mb-4">Basic First Aid Steps</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard
            icon={<Shield />}
            title="Ensure Safety"
            text="Maintain a safe distance."
          />
          <InfoCard
            icon={<Bandage />}
            title="Stop Bleeding"
            text="Apply gentle pressure using clean cloth if safe."
          />
          <InfoCard
            icon={<AlertTriangle />}
            title="Immobilize Injuries"
            text="Do not move fractured limbs or spine."
          />
          <InfoCard
            icon={<PhoneCall />}
            title="Call Professionals"
            text="Contact wildlife rescue or veterinary services immediately."
          />
          <InfoCard
            icon={<Bandage />}
            title="Provide Water"
            text="Only if human is conscious and calm."
          />
          <InfoCard
            icon={<Shield />}
            title="Keep Calm"
            text="Reduce noise and crowd to avoid stress."
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
            <li>• Call trained rescue teams</li>
            <li>• Keep children and pets away</li>
            <li>• Observe from a distance</li>
            <li>• Provide shade if possible</li>
          </ul>
        </div>

        {/* DON'T */}
        <div className="bg-[#111111] border border-gray-800 rounded-xl p-6">
          <h3 className="flex items-center gap-2 text-red-400 font-semibold mb-4">
            <XCircle size={18} />
            Don’ts
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Do not feed wild animals</li>
            <li>• Do not attempt capture</li>
            <li>• Do not pour water forcefully</li>
            <li>• Do not crowd the animal</li>
          </ul>
        </div>
      </section>

      {/* EMERGENCY NOTICE */}
      <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 flex items-start gap-3">
        <AlertTriangle className="text-red-500 mt-1" />
        <p className="text-sm text-red-300">
          In case of serious injury, poisoning,
          <span className="font-semibold">
            {" "}do not attempt first aid.
          </span>
          Call Ambulance immediately.
        </p>
      </div>
    </div>
  );
};

export default FirstAid;


// 🔹 SUB COMPONENT
const InfoCard = ({ icon, title, text }) => (
  <div className="bg-[#111111] border border-gray-800 rounded-xl p-5 space-y-2 hover:bg-[#1a1a1a] transition">
    <div className="text-red-500">{icon}</div>
    <h4 className="font-semibold text-sm">{title}</h4>
    <p className="text-xs text-gray-400">{text}</p>
  </div>
);
