import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";
import { 
  AlertTriangle, 
  X, 
  Plus, 
  Maximize2, 
  Map as MapIcon, 
  Siren,
  Scan
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isOlderThanOneDay } from "./reportUtils";

/* ================= VINTAGE MARKER FIX ================= */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ================= CLICK MARKER (FOR PICK MODE) ================= */
function ClickMarker({ onSelect }) {
  const [pos, setPos] = useState(null);

  useMapEvents({
    click(e) {
      setPos(e.latlng);
      onSelect?.(e.latlng);
    },
  });

  return pos ? <Marker position={pos} /> : null;
}

function MapView({ reports = [], selectMode = false, onLocationSelect }) {
  const [fullImage, setFullImage] = useState(null);

  const activeReports = reports.filter(
    (report) =>
      report.status !== "resolved" &&
      report.status !== "archived" &&
      !isOlderThanOneDay(report.createdAt)
  );

  return (
    <>
      {/* Container with fixed min-height and vintage aesthetic */}
      <div className="relative h-full min-h-[550px] w-full z-0 rounded-2xl overflow-hidden border border-[#d4c3a1]/50 shadow-2xl bg-[#f4f1ea] group">
        
        {/* Vintage Paper Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none z-[400] opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] mix-blend-multiply"></div>

        <MapContainer
          center={[18.5204, 73.8567]}
          zoom={12}
          className="h-full w-full"
        >
          {/* MAP TILES */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" 
          />

          {!selectMode &&
            activeReports.map((report) => (
              <Marker
                key={report.id}
                position={[
                  report.location.latitude,
                  report.location.longitude,
                ]}
              >
                <Popup className="vintage-popup">
                  <div className="p-1 min-w-[160px] font-serif">
                    <h3 className="font-bold text-[#8b4513] border-b border-[#d4c3a1] mb-2 flex items-center gap-2">
                       <AlertTriangle size={14} className="text-[#ee2b2b]" /> {report.name}
                    </h3>
                    <p className="text-xs text-gray-700 italic mb-3 leading-tight">
                       {report.description || "No specific details provided."}
                    </p>

                    {report.media && (
                      <div className="relative rounded overflow-hidden border border-[#d4c3a1] group/image">
                        <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors pointer-events-none" />
                        <img
                          src={report.media}
                          alt="report"
                          className="w-full h-24 object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                          onClick={() => setFullImage(report.media)}
                        />
                        <div className="absolute bottom-1 right-1 bg-black/50 text-white p-1 rounded backdrop-blur-sm opacity-0 group-hover/image:opacity-100 transition-opacity pointer-events-none">
                            <Maximize2 size={12} />
                        </div>
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}

          {selectMode && <ClickMarker onSelect={onLocationSelect} />}
        </MapContainer>

        {/* ================= UPDATED REPORT BUTTON ================= */}
        {!selectMode && (
          <div className="absolute bottom-8 right-6 z-[1000] flex flex-col items-end gap-3 pointer-events-none">
            
            {/* The Button Container (Pointer events enabled here) */}
            <div className="pointer-events-auto relative">
                
                {/* Pulsing Rings (Attention Grabber) */}
                <span className="absolute inline-flex h-full w-full animate-[ping_2s_ease-in-out_infinite] rounded-full bg-[#ee2b2b] opacity-20"></span>
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#ee2b2b]/10 blur-xl"></span>

                <Link to="/report-animal">
                  <motion.button
                    whileHover={{ scale: 1.05, paddingRight: "2.5rem" }} // Expands slightly on hover
                    whileTap={{ scale: 0.95 }}
                    initial={{ width: "auto" }}
                    className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-[#ee2b2b] pl-5 pr-5 py-4 text-white shadow-[0_10px_30px_-10px_rgba(238,43,43,0.6)] border border-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-[#ff3333]"
                  >
                    {/* Background Scan Effect */}
                    <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />

                    {/* Icon Box */}
                    <div className="relative z-10 flex items-center justify-center">
                        <Siren className="h-6 w-6 animate-[pulse_3s_infinite]" strokeWidth={2.5} />
                    </div>

                    {/* Text Label */}
                    <div className="relative z-10 flex flex-col items-start leading-none">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-red-100 opacity-80 group-hover:text-white transition-colors">
                            Emergency
                        </span>
                        <span className="text-base font-bold tracking-wide font-display">
                            REPORT SIGHTING
                        </span>
                    </div>

                    {/* Hover Arrow (Reveals on hover) */}
                    <div className="absolute right-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <Scan size={18} />
                    </div>

                  </motion.button>
                </Link>
            </div>
            
            {/* Helper text below button */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-gray-300 font-mono tracking-wider pointer-events-auto"
            >
                
            </motion.div>

          </div>
        )}

        {/* Vintage Compass Overlay */}
        <div className="absolute top-6 right-6 z-[400] pointer-events-none opacity-60 mix-blend-multiply">
            <div className="relative w-16 h-16 flex items-center justify-center border-2 border-[#8b4513]/20 rounded-full">
                <MapIcon size={32} className="text-[#8b4513]/60" />
                <div className="absolute top-0 text-[8px] font-bold text-[#8b4513]">N</div>
            </div>
        </div>
      </div>

      {/* IMAGE MODAL */}
      <AnimatePresence>
        {fullImage && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[2000] bg-black/90 flex items-center justify-center p-6"
            onClick={() => setFullImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all border border-white/5"
              onClick={() => setFullImage(null)}
            >
              <X size={24} />
            </button>

            <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="relative"
            >
                <img
                    src={fullImage}
                    alt="Evidence"
                    className="max-h-[85vh] max-w-[90vw] rounded-xl border border-white/10 shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                />
                <div className="absolute -bottom-10 left-0 text-white/50 text-xs font-mono uppercase tracking-widest">
                    Evidence Log #00249
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* Custom Vintage Popup Styling */
        .vintage-popup .leaflet-popup-content-wrapper {
          background: #fdfaf3 !important;
          color: #2d2d2d !important;
          border: 1px solid #d4c3a1 !important;
          border-radius: 4px !important;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1) !important;
          padding: 0 !important;
        }
        .vintage-popup .leaflet-popup-content {
          margin: 0 !important;
          width: auto !important;
        }
        .vintage-popup .leaflet-popup-tip {
          background: #fdfaf3 !important;
          border: 1px solid #d4c3a1 !important;
          box-shadow: none !important;
        }
        .vintage-popup a.leaflet-popup-close-button {
          color: #8b4513 !important;
          font-size: 16px !important;
          padding: 4px !important;
        }
      `}</style>
    </>
  );
}

export default MapView;