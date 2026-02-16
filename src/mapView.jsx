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
import { AlertTriangle, X, Plus, Maximize2, Map as MapIcon } from "lucide-react";
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
      {/* Container with fixed min-height for visibility and vintage border */}
      <div className="relative h-full min-h-[550px] w-full z-0 rounded-2xl overflow-hidden border-4 border-[#d4c3a1] shadow-xl bg-[#f4f1ea]">
        
        {/* Vintage Paper Texture Overlay (Non-interactive) */}
        <div className="absolute inset-0 pointer-events-none z-[400] opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

        <MapContainer
          center={[18.5204, 73.8567]}
          zoom={12}
          className="h-full w-full"
        >
          {/* VINTAGE / OFF-WHITE TILE LAYER */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" 
            // This 'HOT' style has a cleaner, slightly warmer palette than standard OSM
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
                       <AlertTriangle size={14} /> {report.name}
                    </h3>
                    <p className="text-xs text-gray-700 italic mb-3 leading-tight">
                       {report.description || "No specific details provided."}
                    </p>

                    {report.media && (
                      <div className="relative rounded overflow-hidden border border-[#d4c3a1]">
                        <img
                          src={report.media}
                          alt="report"
                          className="w-full h-24 object-cover cursor-pointer hover:sepia-[0.3] transition-all"
                          onClick={() => setFullImage(report.media)}
                        />
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}

          {selectMode && <ClickMarker onSelect={onLocationSelect} />}
        </MapContainer>

        {/* Vintage Float Button */}
        {!selectMode && (
          <div className="absolute bottom-6 right-6 z-[1000]">
            <Link to="/report-animal">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 bg-[#ee2b2b] text-white px-5 py-3 rounded-full font-bold shadow-lg border-2 border-white transition-colors hover:bg-[#c42424]"
              >
                <Plus size={20} />
                <span className="text-sm uppercase tracking-wider">Report</span>
              </motion.button>
            </Link>
          </div>
        )}

        {/* Compass / Branding Deco */}
        <div className="absolute top-4 right-4 z-[400] opacity-40 grayscale pointer-events-none">
           <MapIcon size={40} className="text-[#8b4513]" />
        </div>
      </div>

      {/* IMAGE MODAL */}
      <AnimatePresence>
        {fullImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setFullImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition"
              onClick={() => setFullImage(null)}
            >
              <X size={28} />
            </button>

            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={fullImage}
              alt="Evidence"
              className="max-h-[85vh] max-w-[90vw] rounded-lg border-4 border-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .vintage-popup .leaflet-popup-content-wrapper {
          background: #fdfaf3 !important;
          color: #2d2d2d !important;
          border: 2px solid #d4c3a1 !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;
        }
        .vintage-popup .leaflet-popup-tip {
          background: #fdfaf3 !important;
          border: 2px solid #d4c3a1 !important;
        }
      `}</style>
    </>
  );
}

export default MapView;