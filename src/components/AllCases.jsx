import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search,
  LayoutGrid,
  Calendar,
  ChevronRight,
  Database,
  MapPin
} from "lucide-react";
import { db } from "../firebase.jsx";

const AllCases = () => {
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllReports = async () => {
      try {
        const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReports(data);
      } catch (err) {
        console.error("Error loading all cases:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllReports();
  }, []);

  const filteredReports = reports.filter((r) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      r.name?.toLowerCase().includes(searchLower) ||
      r.description?.toLowerCase().includes(searchLower) ||
      r.address?.toLowerCase().includes(searchLower)
    );
  });

  return (
    /* APPLIED BACKGROUND COLOR HERE */
    <div className="relative min-h-screen bg-[#1e1010] font-display text-gray-100 p-4 md:p-12 transition-colors duration-500">
      
      {/* ADAPTED BACKGROUND DECORATION */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1e1010] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2 text-sm font-bold tracking-widest uppercase">
              <Database size={14} /> Global Archive
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              All <span className="text-primary">Reports</span>
            </h1>
          </div>

          {/* SEARCH BAR - BLENDED WITH NEW BG */}
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search reports..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all backdrop-blur-xl text-white placeholder:text-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {[...Array(8)].map((_, i) => (
                <div key={i} className="h-72 bg-white/5 rounded-3xl animate-pulse border border-white/5"></div>
             ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredReports.map((report) => (
                <SimpleCaseCard key={report.id} data={report} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* EMPTY STATE */}
        {!loading && filteredReports.length === 0 && (
           <div className="text-center py-32 border border-dashed border-white/10 rounded-3xl bg-black/20">
              <p className="text-gray-500">No matching records found in the archive.</p>
           </div>
        )}
      </div>
    </div>
  );
};

/* ------------------ CARD COMPONENT ------------------ */
const SimpleCaseCard = ({ data }) => {
  const date = data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
  const formattedDate = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      /* CARDS NOW POP AGAINST THE DARK RED-BROWN BG */
      className="group bg-[#2a1a1a]/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden hover:border-primary/40 hover:bg-[#2a1a1a]/60 transition-all duration-300 flex flex-col"
    >
      <div className="relative h-44 overflow-hidden">
        <img 
          src={data.media || "https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=2072&auto=format&fit=crop"} 
          alt="Animal" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
        />
      </div>

      <div className="p-5 flex flex-col gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-100 group-hover:text-primary transition-colors truncate">
            {data.name || "Unknown Case"}
          </h3>
          <div className="flex items-center gap-1 text-gray-500 text-[11px] mt-1 uppercase tracking-wider">
            <MapPin size={10} className="text-primary"/> {data.address || "Location Hidden"}
          </div>
        </div>

        <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed h-8">
          {data.description || "Reported via PashuJagarak network."}
        </p>

        <div className="mt-2 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
            <Calendar size={12} /> {formattedDate}
          </div>
          <button className="bg-primary/10 hover:bg-primary p-2 rounded-full transition-all group/btn">
            <ChevronRight size={16} className="text-primary group-hover/btn:text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AllCases;