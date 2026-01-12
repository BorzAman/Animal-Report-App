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
import { isOlderThanOneDay } from "../reportUtils.js"; // ✅ ADD THIS

const MyReports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

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
    try {
      const ref = doc(db, "reports", id);

      await updateDoc(ref, {
        status: "resolved",
        resolvedAt: serverTimestamp(),
      });

      // ✅ Update UI instantly
      setReports((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: "resolved" } : r
        )
      );
    } catch (err) {
      console.error("Failed to update report:", err);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-400">Loading your reports…</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      <h1 className="mt-8 text-2xl font-semibold">My Reported Animals</h1>

      {reports.length === 0 ? (
        <div className="text-gray-400">
          You haven’t reported any animals yet.
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((r) => (
            <div
              key={r.id}
              className="bg-[#111] border border-gray-800 rounded-xl p-5
                         flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{r.name}</h3>
                <p className="text-sm text-gray-400">
                  {r.locationName || "Unknown location"} •{" "}
                  {r.createdAt?.toDate().toLocaleDateString()}
                </p>
              </div>

              {r.status === "resolved" ? (
                <span
                  className="px-4 py-1 rounded-full text-sm
                             bg-green-600/20 text-green-400"
                >
                  Resolved
                </span>
              ) : (
                <button
                  onClick={() => {
    const confirmed = window.confirm(
      "Are you sure this case is resolved? It can’t be changed once set to resolved."
    );

    if (confirmed) {
      markAsResolved(r.id);
    }
  }}
                  className="px-4 py-1 rounded-full text-sm
                             bg-red-600/20 text-red-400
                             hover:bg-red-600/30 transition"
                >
                  Mark Resolved
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReports;
