import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
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
          distance: Math.round(
            getDistanceKm(
              userCoords.latitude,
              userCoords.longitude,
              r.location.latitude,
              r.location.longitude
            )
          ),
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
  if (isOlderThanOneDay(r.createdAt)) return false;

  if (selectedDistance && locationEnabled) {
    return r.distance <= selectedDistance;
  }

  return true;
});


  if (loading) {
    return <div className="p-6 text-gray-400">Loading nearby cases…</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">All Nearby Cases</h1>

      {!locationEnabled && (
        <div className="text-sm text-yellow-400">
          Enable location to filter cases by distance
        </div>
      )}

      {/* FILTER */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedDistance(null)}
          className={`px-4 py-1.5 rounded-full text-sm border
            ${selectedDistance === null
              ? "bg-red-600 text-white border-red-600"
              : "border-gray-700 text-gray-300"}`}
        >
          All
        </button>

        {distanceOptions.map(d => (
          <button
            key={d}
            disabled={!locationEnabled}
            onClick={() => setSelectedDistance(d)}
            className={`px-4 py-1.5 rounded-full text-sm border
              ${
                selectedDistance === d && locationEnabled
                  ? "bg-red-600 text-white border-red-600"
                  : "border-gray-700 text-gray-300"
              }
              ${!locationEnabled && "opacity-50 cursor-not-allowed"}
            `}
          >
            {d} km
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-800 rounded-xl">
          <thead className="bg-[#111] text-sm">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Distance</th>
              <th className="p-3">Injured</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {filteredReports.length ? (
              filteredReports.map(r => (
                <tr key={r.id} className="border-t border-gray-800">
                  <td className="p-3">{r.name}</td>
                  <td className="p-3">{r.status}</td>
                  <td className="p-3">
                    {locationEnabled ? `${r.distance} km` : "—"}
                  </td>
                  <td className="p-3">
                    {r.injured}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-400">
                  No cases found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cases;
