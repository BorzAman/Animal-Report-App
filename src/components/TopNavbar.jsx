import { Menu, X, User } from "lucide-react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.jsx";
import { useAuth } from "../authContext.jsx";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

const TopNavbar = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProfile(snap.data());
      }
    };

    fetchProfile();
  }, [user]);

  const handleProfile = () => {
    navigate('/profile', { replace: true });
  }

  const initials =
    profile?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 bg-background-dark/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        {/* Left - Menu Trigger */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl bg-white/5 border border-white/5 text-gray-300 hover:text-white hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <AnimatePresence mode="wait">
                {menuOpen ? (
                    <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <X size={20} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Menu size={20} />
                    </motion.div>
                )}
            </AnimatePresence>
          </motion.button>
          
          <h1 className="font-display font-bold text-lg text-white tracking-tight hidden sm:block">
            Menu
          </h1>
        </div>

        {/* Right – Profile Avatar */}
        <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleProfile}
            className="relative cursor-pointer group"
        >
          {profile?.photoUrl ? (
            <div className="relative">
                <div className="absolute inset-0 bg-primary blur-md opacity-0 group-hover:opacity-40 transition duration-300 rounded-full"></div>
                <img
                src={profile.photoUrl}
                alt="Profile"
                className="relative h-10 w-10 rounded-full object-cover border-2 border-white/10 group-hover:border-primary transition-colors duration-300"
                />
            </div>
          ) : (
            <div
              className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-red-700
                         flex items-center justify-center border-2 border-white/10
                         text-sm font-bold text-white shadow-lg shadow-primary/20"
            >
              {initials}
            </div>
          )}
        </motion.div>
        
      </div>
    </motion.header>
  );
};

export default TopNavbar;