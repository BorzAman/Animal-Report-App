import { collection, getDocs } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RefreshCw, 
  Map as MapIcon, 
  Loader2, 
  AlertCircle, 
  Layers 
} from "lucide-react";
import { useState, useEffect } from "react";
import { db } from "./firebase.jsx";
import MapView from "./mapView.jsx";

function Mapp() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulate a slight delay for smooth animation impact if data is cached/fast
      const snapshot = await getDocs(collection(db, "reports"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReports(data);
    } catch (err) {
      console.error("Map Data Error:", err);
      setError("Unable to retrieve live sightings.");
    } finally {
      // Small timeout to ensure the loading transition isn't jarring
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="relative h-full w-full bg-background-dark overflow-hidden group">
      
      {/* --- FLOATING CONTROLS OVERLAY --- */}
      <div className="absolute top-4 left-4 z-[400] flex items-center gap-3">
         
         {/* Live Stats Badge */}
         <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel bg-black/60 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl flex items-center gap-3 shadow-lg"
         >
            <div className="p-1.5 bg-primary/20 rounded-lg text-primary border border-primary/20">
               <MapIcon size={16} />
            </div>
            <div>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">Active</p>
               <p className="text-white font-mono font-bold text-sm leading-none">{reports.length} Reports</p>
            </div>
         </motion.div>

         {/* Refresh Button */}
         <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            onClick={fetchReports}
            disabled={loading}
            className="p-2.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-primary hover:border-primary transition-all shadow-lg group/refresh"
            title="Refresh Map Data"
         >
            <RefreshCw size={18} className={`transition duration-700 ${loading ? "animate-spin text-white" : "group-hover/refresh:rotate-180"}`} />
         </motion.button>
      </div>

      {/* --- ERROR TOAST --- */}
      <AnimatePresence>
        {error && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-red-500/90 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-red-400/50 flex items-center gap-3 shadow-2xl"
            >
                <AlertCircle size={18} />
                <span className="text-xs font-bold">{error}</span>
                <button onClick={fetchReports} className="ml-2 text-[10px] bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition uppercase font-bold">Retry</button>
            </motion.div>
        )}
      </AnimatePresence>

      {/* --- LOADING OVERLAY --- */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-[500] flex flex-col items-center justify-center bg-[#111]/80 backdrop-blur-sm"
          >
             <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                <Loader2 size={48} className="relative z-10 text-primary animate-spin" />
             </div>
             <p className="mt-4 text-white font-mono text-xs font-bold tracking-[0.2em] animate-pulse">SATELLITE SYNC...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ACTUAL MAP --- */}
      {/* The map stays mounted but hidden/covered by loader to prevent re-render flickering */}
      <div className="h-full w-full opacity-100 transition-opacity duration-500">
          <MapView reports={reports} />
      </div>

    </div>
  );
}

export default Mapp;