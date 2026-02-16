import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Map, ArrowRight, LogIn, ShieldCheck } from "lucide-react";
import { useAuth } from "./authContext";
import Logging from "./logging.jsx";
import logo from "./logo.png";

const Google = () => {
  const [signingIn, setSigningIn] = useState(false);
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleAlerts = () => {
    navigate('/map', { replace: true });
  };

  const handleGoogle = async () => {
    try {
      setSigningIn(true);
      await loginWithGoogle();
      toast.success("Successfully logged in");
      navigate("/home", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Failed to login");
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <>
      {signingIn && <Logging />}

      <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-background-dark font-display">
        
        {/* --- BACKGROUND LAYERS --- */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393798-3828fb4090bb?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/90 to-background-dark"></div>
        <div className="absolute inset-0 bg-island-gradient opacity-60"></div>

        {/* --- MAIN CARD --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="glass-panel border border-primary/20 p-10 rounded-3xl shadow-2xl island-shadow flex flex-col items-center gap-8">
            
            {/* Header / Logo */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary blur-2xl opacity-20 group-hover:opacity-40 transition duration-500 rounded-full"></div>
                <img 
                  src={logo} 
                  className="relative h-28 w-28 rounded-2xl shadow-lg border border-white/10 animate-bounce-once object-cover" 
                  alt="Pashu Jagarak Logo"
                />
              </div>
              
              <div className="text-center space-y-1">
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  Pashu <span className="text-primary">Jagarak</span>
                </h1>
                <p className="text-gray-400 font-medium">
                  Report Animals. Empower Safety.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="w-full space-y-4">
              
              {/* Show Alerts Button */}
              <button 
                type='button'
                onClick={handleAlerts}
                className="w-full group relative flex items-center justify-center gap-3 px-6 py-4 rounded-xl border border-gray-600 hover:border-primary/50 bg-surface-dark/50 hover:bg-surface-dark transition-all duration-300"
              >
                <Map size={20} className="text-gray-400 group-hover:text-primary transition-colors"/>
                <span className="font-semibold text-gray-300 group-hover:text-white">View Live Alerts</span>
                <ArrowRight size={16} className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary"/>
              </button>

              {/* Divider */}
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink-0 mx-4 text-gray-500 text-xs font-bold uppercase tracking-wider">To Report Sighting</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              {/* Google Login Button */}
              <button
                onClick={handleGoogle}
                className="w-full group relative overflow-hidden flex items-center justify-center gap-3 px-6 py-4 bg-primary rounded-xl font-bold text-white shadow-[0_4px_20px_rgba(238,43,43,0.3)] hover:shadow-[0_4px_25px_rgba(238,43,43,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                <div className="bg-white p-1 rounded-full flex items-center justify-center">
                   <LogIn className="text-primary" size={16} strokeWidth={3}/> 
                </div>
                <span>Continue with Google</span>
              </button>

              {/* Secure Authentication Badge */}
              <div className="pt-2 flex items-center justify-center gap-2 text-xs text-gray-500 opacity-80">
                 <ShieldCheck size={14} className="text-green-500"/>
                 <span>Secure Authentication via Google</span>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Google;