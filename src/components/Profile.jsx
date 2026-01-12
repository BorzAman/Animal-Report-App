import { useEffect, useState } from "react";
import { User, MapPin, Mail, LogOut } from "lucide-react";
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

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Edit name state
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  // 🔹 Stats state (Spark-safe)
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
        } else {
          setProfile(null);
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
    return <div className="p-6 text-gray-400">Loading profile…</div>;
  }

  if (!profile) {
    return <div className="p-6 text-gray-400">Profile not found</div>;
  }

  const initials =
    profile.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">

      {/* PAGE TITLE */}
      <div className="flex items-center gap-2">
        <User className="text-red-500" />
        <h1 className="text-xl font-semibold">Profile</h1>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-[#111111] border border-gray-800 rounded-xl p-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

          {/* Avatar */}
          {profile.photoUrl ? (
            <img
              src={profile.photoUrl}
              alt="Profile"
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div
              className="h-20 w-20 rounded-full bg-red-600
                         flex items-center justify-center
                         text-2xl font-bold"
            >
              {initials}
            </div>
          )}

          {/* Basic Info */}
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">
              {profile.name || "Unnamed User"}
            </h2>

            {profile.location && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin size={14} />
                {profile.location}
              </div>
            )}
          </div>
        </div>

        {/* EMAIL */}
        <div className="mt-6 flex items-center gap-3 text-gray-300">
          <Mail size={16} className="text-red-500" />
          {profile.email || user.email}
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => {
              setNewName(profile.name || "");
              setEditing(true);
            }}
            className="flex-1 bg-gray-800 hover:bg-gray-700 transition
                       rounded-lg py-2 text-sm font-semibold"
          >
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 bg-red-600 hover:bg-red-700 transition
                       rounded-lg py-2 text-sm font-semibold
                       flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* ACTIVITY SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Reports Submitted" value={stats.total} />
        <StatCard title="Resolved Reports" value={stats.resolved} />
        <StatCard title="Pending Reports" value={stats.pending} />
      </div>

      {/* EDIT NAME MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#111] border border-gray-800 p-6 rounded-xl w-80 space-y-4">
            <h3 className="text-lg font-semibold">Edit Name</h3>

            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded px-3 py-2"
              placeholder="Your name"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setEditing(false)}
                className="flex-1 bg-gray-700 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveName}
                className="flex-1 bg-red-600 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;

/* 🔹 SUB COMPONENTS */

const StatCard = ({ title, value }) => (
  <div className="bg-[#111111] border border-gray-800 rounded-xl p-5 text-center">
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-sm text-gray-400 mt-1">{title}</p>
  </div>
);
