import { useEffect, useState } from "react";
import { 
  User, 
  MapPin, 
  Mail, 
  LogOut, 
  Edit3, 
  Save, 
  X, 
  Shield, 
  Activity, 
  CheckCircle, 
  Clock, 
  Loader2 
} from "lucide-react";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase.jsx";
import { useAuth } from "../authContext.jsx";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Edit name state
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  // 🔹 Stats state
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
  });

  // 🔹 Fetch profile + stats
  useEffect(() => {
    if (!user) return;

    const fetchProfileAndStats = async () => {
      try {
        /* ---------- PROFILE ---------- */
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          setProfile(snap.data());
          setNewName(snap.data().name || "");
        } else {
          setProfile({ name: user.displayName, email: user.email, photoUrl: user.photoURL });
          setNewName(user.displayName || "");
        }

        /* ---------- STATS ---------- */
        const q = query(
          collection(db, "reports"),
          where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        let total = 0;
        let resolved = 0;
        let pending = 0;

        snapshot.forEach((doc) => {
          total++;
          const status = doc.data().status;
          if (status === "resolved") resolved++;
          if (status === "pending") pending++;
        });

        setStats({ total, resolved, pending });
      } catch (err) {
        console.error("Error fetching profile/stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndStats();
  }, [user]);

  // 🔹 Save edited name
  const handleSaveName = async () => {
    if (!newName.trim()) return;

    try {
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, { name: newName });

      setProfile((prev) => ({ ...prev, name: newName }));
      setEditing(false);
    } catch (err) {
      console.error("Failed to update name:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
       <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400 gap-3">
          <Loader2 className="animate-spin text-primary" size={32}/>
          <p>Accessing Personnel File...</p>
       </div>
    );
  }

  if (!profile) {
    return <div className="p-6 text-center text-gray-400">Profile data unavailable.</div>;
  }

  const initials =
    profile.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

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
        className="relative z-10 max-w-4xl mx-auto px-4 py-8 md:p-12 space-y-8"
      >

        {/* HEADER */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 border-b border-white/5 pb-6">
          <div className="p-2 bg-primary/20 rounded-xl border border-primary/50 text-primary">
             <User size={24} />
          </div>
          <div>
             <h1 className="text-2xl font-bold tracking-tight text-white">Ranger Profile</h1>
             <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Personnel ID: {user.uid.slice(0,8)}...</p>
          </div>
        </motion.div>

        {/* PROFILE CARD */}
        <motion.div 
          variants={itemVariants}
          className="glass-panel border border-white/10 rounded-3xl p-8 relative overflow-hidden group shadow-2xl"
        >
           {/* Abstract Decoration */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

           <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              
              {/* Avatar Section */}
              <div className="relative">
                 <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                 {profile.photoUrl ? (
                    <img
                      src={profile.photoUrl}
                      alt="Profile"
                      className="relative h-32 w-32 rounded-full object-cover border-4 border-surface-dark shadow-xl"
                    />
                 ) : (
                    <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-primary to-red-900 flex items-center justify-center text-4xl font-bold text-white border-4 border-surface-dark shadow-xl">
                      {initials}
                    </div>
                 )}
                 <div className="absolute bottom-1 right-1 bg-green-500 border-4 border-surface-dark w-6 h-6 rounded-full" title="Online"></div>
              </div>

              {/* Info Section */}
              <div className="flex-grow text-center md:text-left space-y-4">
                 <div>
                    <h2 className="text-3xl font-bold text-white mb-1">{profile.name || "Anonymous Ranger"}</h2>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm">
                       <Mail size={14} className="text-primary"/> {profile.email || user.email}
                    </div>
                    {profile.location && (
                       <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm mt-1">
                          <MapPin size={14} className="text-primary"/> {profile.location}
                       </div>
                    )}
                 </div>

                 <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <button
                      onClick={() => setEditing(true)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition text-sm font-bold"
                    >
                       <Edit3 size={16} /> Edit Details
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition text-sm font-bold"
                    >
                       <LogOut size={16} /> Sign Out
                    </button>
                 </div>
              </div>

           </div>
        </motion.div>

        {/* ACTIVITY STATS */}
        <motion.div variants={itemVariants}>
           <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity size={16} /> Activity Log
           </h3>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard 
                 label="Total Reports" 
                 value={stats.total} 
                 icon={<Shield className="text-blue-400" size={24}/>}
                 color="border-blue-500/30 bg-blue-500/5"
              />
              <StatCard 
                 label="Resolved Cases" 
                 value={stats.resolved} 
                 icon={<CheckCircle className="text-green-400" size={24}/>}
                 color="border-green-500/30 bg-green-500/5"
              />
              <StatCard 
                 label="Pending Action" 
                 value={stats.pending} 
                 icon={<Clock className="text-yellow-400" size={24}/>}
                 color="border-yellow-500/30 bg-yellow-500/5"
              />
           </div>
        </motion.div>

        {/* EDIT NAME MODAL */}
        <AnimatePresence>
          {editing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-surface-dark border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl relative"
              >
                <button 
                  onClick={() => setEditing(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-white transition"
                >
                   <X size={20} />
                </button>

                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                   <Edit3 size={20} className="text-primary"/> Update Identity
                </h3>

                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Display Name</label>
                      <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 focus:border-primary/50 focus:ring-0 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition-all"
                        placeholder="Enter full name"
                        autoFocus
                      />
                   </div>

                   <div className="flex gap-3">
                      <button
                        onClick={() => setEditing(false)}
                        className="flex-1 py-3 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-white/5 transition"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={handleSaveName}
                        className="flex-1 bg-primary hover:bg-red-600 text-white py-3 rounded-xl font-bold shadow-lg transition flex items-center justify-center gap-2"
                      >
                        <Save size={18} /> Save Changes
                      </button>
                   </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};

export default Profile;

/* 🔹 SUB COMPONENTS */

const StatCard = ({ label, value, icon, color }) => (
  <div className={`rounded-2xl p-6 border ${color} flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-1 duration-300`}>
    <div className="p-3 bg-black/20 rounded-full">{icon}</div>
    <div className="text-center">
       <p className="text-3xl font-bold text-white">{value}</p>
       <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mt-1">{label}</p>
    </div>
  </div>
);