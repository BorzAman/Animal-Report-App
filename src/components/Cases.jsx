import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Filter, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Navigation,
  Loader2,
  SearchX,
  Calendar
} from "lucide-react";
import { db } from "../firebase.jsx";
import { isOlderThanOneDay } from "../reportUtils.js";

const distanceOptions = [25, 50, 100];

/* ------------------ Distance Helper ------------------ */
const getDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

/* ------------------ Safe Location Fetch ------------------ */
const getUserLocationSafe = () =>
  new Promise((resolve) => {
    if (!navigator.geolocation) return resolve(null);

    navigator.geolocation.getCurrentPosition(
      pos => resolve(pos.coords),
      () => resolve(null),
      { timeout: 5000 }
    );
  });

/* ------------------ Component ------------------ */
const Cases = () => {
  const [reports, setReports] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const userCoords = await getUserLocationSafe();
        const snapshot = await getDocs(collection(db, "reports"));
        
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (!userCoords) {
          setReports(data);
          setLocationEnabled(false);
          return;
        }

        const withDistance = data.map(r => ({
          ...r,
          distance: r.location ? Math.round(
            getDistanceKm(
              userCoords.latitude,
              userCoords.longitude,
              r.location.latitude,
              r.location.longitude
            )
          ) : null,
        }));

        setReports(withDistance);
        setLocationEnabled(true);
      } catch (err) {
        console.error("Error loading cases:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const filteredReports = reports.filter((r) => {
    // Ensure we handle timestamp objects correctly if they exist
    const createdAt = r.createdAt?.toDate ? r.createdAt.toDate() : new Date(r.createdAt);
    if (isOlderThanOneDay(createdAt)) return false;

    if (selectedDistance && locationEnabled && r.distance !== null) {
      return r.distance <= selectedDistance;
    }
    return true;
  });

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative min-h-screen bg-background-dark font-display text-gray-100 overflow-x-hidden p-4 md:p-8">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393798-3828fb4090bb?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-overlay fixed"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/95 to-background-dark fixed"></div>
      <div className="absolute inset-0 bg-island-gradient opacity-10 fixed pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              Nearby <span className="text-primary">Cases</span>
              <span className="text-xs font-mono bg-white/5 px-2 py-1 rounded-md text-gray-400 border border-white/5">
                {filteredReports.length} Active
              </span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">Real-time wildlife incident reports in your vicinity.</p>
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-2 items-center bg-[#0a0a0a]/50 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            <Filter size={14} className="ml-3 mr-1 text-gray-500" />
            
            <button
              onClick={() => setSelectedDistance(null)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedDistance === null
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              All
            </button>

            {distanceOptions.map(d => (
              <button
                key={d}
                disabled={!locationEnabled}
                onClick={() => setSelectedDistance(d)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  selectedDistance === d && locationEnabled
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                    : "bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                } ${!locationEnabled && "opacity-30 cursor-not-allowed"}`}
              >
                {d} km
              </button>
            ))}
          </div>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[1,2,3,4,5,6].map(i => (
                <div key={i} className="h-48 bg-white/5 rounded-2xl animate-pulse border border-white/5"></div>
             ))}
          </div>
        ) : (
          /* GRID CONTENT */
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredReports.length > 0 ? (
                filteredReports.map((r) => (
                  <CaseCard key={r.id} data={r} locationEnabled={locationEnabled} variants={item} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 flex flex-col items-center justify-center text-gray-500 gap-4"
                >
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                    <SearchX size={40} className="text-gray-600"/>
                  </div>
                  <p className="text-lg font-medium">No active cases found nearby.</p>
                  <button onClick={() => setSelectedDistance(null)} className="text-primary text-sm hover:underline">
                    Clear distance filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  );
};

/* ------------------ Sub-Component: Case Card ------------------ */
const CaseCard = ({ data, locationEnabled, variants }) => {
  const isInjured = data.injured === "True" || data.injured === "Yes";
  
  // Format Date
  let dateStr = "Just now";
  if (data.createdAt) {
      const date = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
      dateStr = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  return (
    <motion.div 
      variants={variants}
      layout
      className="group relative bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 hover:border-primary/50 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col"
    >
      {/* Image Area */}
      <div className="relative h-48 overflow-hidden bg-black/50">
        {data.media ? (
          <img 
            src={data.media} 
            alt={data.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 bg-white/5">
            <AlertTriangle size={32} opacity={0.5} />
          </div>
        )}
        
        {/* Distance Badge */}
        {locationEnabled && data.distance !== null && (
           <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
              <Navigation size={10} className="text-primary"/>
              {data.distance} km
           </div>
        )}

        {/* Status Badge */}
        <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${
           data.status === 'resolved' 
           ? 'bg-green-500/20 border-green-500/30 text-green-400' 
           : 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
        }`}>
           {data.status || 'Pending'}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
           <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
             {data.name || "Unknown Animal"}
           </h3>
           
           {isInjured && (
              <span className="shrink-0 flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded-full border border-red-500/20 animate-pulse">
                 <AlertTriangle size={10} /> INJURED
              </span>
           )}
        </div>

        <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">
          {data.description || "No description provided."}
        </p>

        {/* Footer info */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
           <div className="flex items-center gap-1.5">
              <Calendar size={12} /> {dateStr}
           </div>
           
           <button className="flex items-center gap-1 hover:text-white transition-colors">
              Details <span className="text-primary">→</span>
           </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Cases;