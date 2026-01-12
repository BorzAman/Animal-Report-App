import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.jsx";
import { useAuth } from "../authContext.jsx";
import {useNavigate} from 'react-router-dom';

const TopNavbar = ({ menuOpen, setMenuOpen }) => {
  const navigate=useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProfile(snap.data());
      }
    };

    fetchProfile();
  }, [user]);

const handleProfile=()=>{
  navigate('/profile',{replace:true});
}
  const initials =
    profile?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-40 bg-[#111] border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3">

        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            className="cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <h1 className="font-semibold">Home Dashboard</h1>
        </div>

        {/* Right – Profile Avatar */}
        {profile?.photoUrl ? (
          <img onClick={handleProfile}
            src={profile.photoUrl}
            alt="Profile"
            className="h-9 w-9 rounded-full object-cover border border-gray-700 cursor-pointer"
          />
        ) : (
          <div
            className="cursor-pointer h-9 w-9 rounded-full bg-red-600
                       flex items-center justify-center
                       text-sm font-bold uppercase"
          >
            {initials}
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNavbar;
