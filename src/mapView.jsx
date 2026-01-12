import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";
import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { isOlderThanOneDay } from "./reportUtils";

/* Fix Leaflet marker icons */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapView({ reports }) {
  const [fullImage, setFullImage] = useState(null);

  const activeReports = reports.filter(
    (report) =>
      report.status !== "resolved" &&
      report.status !== "archived" &&
      !isOlderThanOneDay(report.createdAt)
  );

  return (
    <>
      <div className="relative h-full w-full z-0 rounded-xl overflow-hidden border border-gray-800">
        <MapContainer
          center={[18.5204, 73.8567]}
          zoom={11}
          className="h-full w-full"
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {activeReports.map((report) => (
            <Marker
              key={report.id}
              position={[
                report.location.latitude,
                report.location.longitude,
              ]}
            >
              <Popup>
                <p className="font-semibold">{report.name}</p>
                <p className="text-sm">{report.description}</p>

                {report.media && (
                  <img
                    src={report.media}
                    alt="report"
                    className="w-32 rounded mt-2 cursor-pointer hover:opacity-80"
                    onClick={() => setFullImage(report.media)}
                  />
                )}
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* FLOATING ACTION CARD */}
        <Link
          to="/report-animal"
          className="absolute bottom-6 right-6 z-[1000]"
        >
          <ActionCard
            title="Report Animal"
            icon={
              <AlertTriangle className="w-5 h-5 mx-auto text-yellow-400" />
            }
            gradient="from-orange-900 to-gray-900"
          />
        </Link>
      </div>

      {/* ================= FULLSCREEN IMAGE MODAL ================= */}
      {fullImage && (
        <div
          className="fixed inset-0 z-[2000] bg-black/80
                     flex items-center justify-center"
          onClick={() => setFullImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setFullImage(null)}
          >
            <X size={28} />
          </button>

          <img
            src={fullImage}
            alt="Full view"
            className="max-h-[90vh] max-w-[90vw] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

export default MapView;

/* ================= ACTION CARD ================= */

const ActionCard = ({ title, icon, gradient }) => (
  <div
    className={`
      bg-linear-to-br ${gradient}
      rounded-xl p-2 w-28 shadow-xl
      cursor-pointer hover:scale-[1.03] transition
    `}
  >
    <div className="mb-1">{icon}</div>
    <h4 className="font-semibold text-sm text-white text-center">
      {title}
    </h4>
  </div>
);
