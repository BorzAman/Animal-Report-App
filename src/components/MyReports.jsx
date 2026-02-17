import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.jsx";
import { useAuth } from "../authContext.jsx";
import { isOlderThanOneDay } from "../reportUtils.js";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  Filter, 
  Loader2,
  Calendar
} from "lucide-react";
import Toast from "../Toast.jsx";

const MyReports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast,setToast]=useState(false);
   const [toastText,setToastText]=useState("");
   const[toastType,setToastType]=useState("");

  // 🔹 Fetch only MY reports
  useEffect(() => {
    if (!user) return;

    const fetchMyReports = async () => {
      try {
        const q = query(
          collection(db, "reports"),
          where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // ✅ HIDE reports older than 1 day (FREE UI-only logic)
        const visibleReports = data.filter(
          (r) => !isOlderThanOneDay(r.createdAt)
        );

        // Sort by newest first
        visibleReports.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());

        setReports(visibleReports);
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyReports();
  }, [user]);

  // 🔹 Mark report as resolved
  const markAsResolved = async (id) => {
    // Custom Confirm logic handled inside button or simple confirm for now
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;

    try {
      // Optimistic Update
      setReports((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: "resolved" } : r
        )
      );

      const ref = doc(db, "reports", id);
      await updateDoc(ref, {
        status: "resolved",
        resolvedAt: serverTimestamp(),
      });

      setToast(true);
      setToastText("Report marked as resolved!");
      setToastType("success");

    } catch (err) {
      console.error("Failed to update report:", err);
      // Revert if failed
      // (Simplified: In a real app, you'd re-fetch or rollback state)
    }
    
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-400 gap-3">
        <Loader2 className="animate-spin text-primary" size={32}/>
        <p>Loading your field reports...</p>
      </div>
    );
  }
  

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 bg-background-dark min-h-screen font-display text-gray-100">
      
      {toast && <Toast message={toastText} type={toastType} isVisible={toast} onClose={() => setToast(false)} />}
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-6 gap-4">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
             <div className="p-2 bg-primary/20 rounded-lg border border-primary/50 text-primary">
                <Filter size={24} />
             </div>
             My Reports
           </h1>
           <p className="text-gray-400 mt-2 text-sm">
             Tracking active cases you've submitted within the last 24 hours.
           </p>
        </div>
        <div className="text-xs font-mono text-gray-500 bg-black/20 px-3 py-1 rounded-md border border-white/5">
           VISIBLE: {reports.length}
        </div>
      </div>

      {reports.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel border border-white/5 rounded-2xl p-12 text-center flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 bg-surface-dark rounded-full flex items-center justify-center text-gray-600">
             <AlertTriangle size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-300">No Active Reports</h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            You haven't reported any animals recently, or your previous reports have expired (older than 24h).
          </p>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          <AnimatePresence>
            {reports.map((r, index) => (
              <ReportCard 
                 key={r.id} 
                 data={r} 
                 onResolve={() => markAsResolved(r.id)} 
                 index={index}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MyReports;

// 🔹 Sub-Component for individual card
function ReportCard({ data, onResolve, index }) {
  const isResolved = data.status === "resolved";
  
  // Format Date
  const dateObj = data.createdAt?.toDate();
  const dateStr = dateObj ? dateObj.toLocaleDateString() : "Unknown Date";
  const timeStr = dateObj ? dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      className={`relative group overflow-hidden rounded-2xl border transition-all duration-300
        ${isResolved 
          ? "bg-surface-dark/30 border-green-900/30 opacity-75" 
          : "bg-surface-dark border-white/10 hover:border-primary/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        }`}
    >
      {/* Background Gradient for Active State */}
      {!isResolved && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
      )}

      <div className="flex flex-col md:flex-row p-5 gap-6 items-center">
        
        {/* Image Thumbnail */}
        <div className="shrink-0 relative w-full md:w-32 h-32 md:h-24 rounded-xl overflow-hidden bg-black/40 border border-white/5">
           {data.media ? (
             <img src={data.media} alt={data.name} className="w-full h-full object-cover" />
           ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-600">
               <AlertTriangle size={24} />
             </div>
           )}
           {/* Status Badge on Image */}
           <div className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase backdrop-blur-md border ${
             isResolved ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"
           }`}>
             {isResolved ? "Closed" : "Active"}
           </div>
        </div>

        {/* Content */}
        <div className="flex-grow space-y-2 w-full text-center md:text-left">
           <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
             <h3 className={`text-lg font-bold ${isResolved ? "text-gray-400 line-through" : "text-white"}`}>
               {data.name || "Unknown Animal"}
             </h3>
             {data.injured === "True" && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-400 bg-red-900/20 px-2 py-0.5 rounded border border-red-900/30">
                   INJURED
                </span>
             )}
           </div>

           <div className="flex flex-col md:flex-row gap-4 text-xs text-gray-400 justify-center md:justify-start">
              <span className="flex items-center gap-1">
                 <MapPin size={12} className="text-primary"/> 
                 {/* Fallback for location name if not saved, usually we'd reverse geocode or show coords */}
                 {data.locationName || `Lat: ${data.location?.latitude?.toFixed(2)}, Lng: ${data.location?.longitude?.toFixed(2)}`}
              </span>
              <span className="flex items-center gap-1">
                 <Calendar size={12} className="text-gray-500"/> {dateStr}
              </span>
              <span className="flex items-center gap-1">
                 <Clock size={12} className="text-gray-500"/> {timeStr}
              </span>
           </div>

           <p className="text-sm text-gray-500 line-clamp-1 italic">
             {data.description ? `"${data.description}"` : "No description provided."}
           </p>
        </div>

        {/* Actions */}
        <div className="shrink-0 w-full md:w-auto">
          {isResolved ? (
            <div className="flex items-center justify-center gap-2 text-green-500 font-bold text-sm bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20">
               <CheckCircle size={16} /> Resolved
            </div>
          ) : (
            <button
              onClick={onResolve}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider
                         bg-surface-dark border border-white/10 text-gray-300
                         hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg
                         transition-all duration-300"
            >
              <CheckCircle size={14} /> Mark Resolved
            </button>
          )}
        </div>

      </div>
    </motion.div>
  );
}