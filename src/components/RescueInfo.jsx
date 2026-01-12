import {
  LifeBuoy,
  PhoneCall,
  Truck,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

const RescueInfo = () => {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-8">

      {/* PAGE TITLE */}
      <div className="flex items-center gap-2">
        <LifeBuoy className="text-red-500" />
        <h1 className="text-xl font-semibold">Rescue Information</h1>
      </div>

      {/* INTRO */}
      <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 text-sm text-gray-300">
        <p>
          Animal rescue is handled by trained professionals such as the
          Forest Department, wildlife NGOs, and veterinary teams.
          <span className="text-red-400 font-medium">
            {" "}Public cooperation is critical for safe rescue operations.
          </span>
        </p>
      </div>

      {/* RESCUE PROCESS */}
      <section>
        <h2 className="text-sm font-semibold mb-4">
          How the Rescue Process Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StepCard
            icon={<PhoneCall />}
            title="Report"
            text="User reports animal via app and calls helpline."
          />

          <StepCard
            icon={<Truck />}
            title="Rescue Team"
            text="Trained team is dispatched to site."
          />
          <StepCard
            icon={<LifeBuoy />}
            title="Safe Outcome"
            text="Animal is rescued or relocated safely."
          />
        </div>
      </section>

      {/* WHO HANDLES RESCUE */}
      <section>
        <h2 className="text-sm font-semibold mb-4">
          Who Handles the Rescue?
        </h2>

        <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 text-sm text-gray-300 space-y-2">
          <p>• Forest Department Wildlife Teams</p>
          <p>• Certified Wildlife Rescue NGOs</p>
          <p>• Veterinary Emergency Units</p>
          <p>• Local Disaster Response Teams</p>
        </div>
      </section>

      {/* DO & DON'T */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* DO */}
        <div className="bg-[#111111] border border-gray-800 rounded-xl p-6">
          <h3 className="flex items-center gap-2 text-green-400 font-semibold mb-4">
            <CheckCircle size={18} />
            What You Should Do
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Maintain a safe distance</li>
            <li>• Keep area clear of crowd</li>
            <li>• Share accurate location</li>
            <li>• Follow official instructions</li>
          </ul>
        </div>

        {/* DON'T */}
        <div className="bg-[#111111] border border-gray-800 rounded-xl p-6">
          <h3 className="flex items-center gap-2 text-red-400 font-semibold mb-4">
            <XCircle size={18} />
            What You Should NOT Do
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Do not chase or corner animal</li>
            <li>• Do not attempt capture</li>
            <li>• Do not feed wild animals</li>
            <li>• Do not spread panic</li>
          </ul>
        </div>
      </section>

      {/* EMERGENCY NOTICE */}
      <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 flex items-start gap-3">
        <AlertTriangle className="text-red-500 mt-1" />
        <p className="text-sm text-red-300">
          If the animal is aggressive, injured, or posing immediate danger,
          <span className="font-semibold">
            {" "}contact emergency services immediately.
          </span>
          
        </p>
      </div>
    </div>
  );
};

export default RescueInfo;


// 🔹 SUB COMPONENT
const StepCard = ({ icon, title, text }) => (
  <div className="bg-[#111111] border border-gray-800 rounded-xl p-5 space-y-2 hover:bg-[#1a1a1a] transition">
    <div className="text-red-500">{icon}</div>
    <h4 className="font-semibold text-sm">{title}</h4>
    <p className="text-xs text-gray-400">{text}</p>
  </div>
);
