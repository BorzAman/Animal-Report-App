import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./authContext";
import Logging from "./logging.jsx";
import logo from "./logo.png";
import {ChevronDown} from 'lucide-react'

const Google = () => {
const [signingIn, setSigningIn] = useState(false);
const { loginWithGoogle } = useAuth();
const navigate = useNavigate();

 const handleAlerts=()=>{
navigate('/map',{replace:true})
 }
const handleGoogle = async () => {
try {
 setSigningIn(true);
await loginWithGoogle();
toast.success("Successfully logged in");
navigate("/home", { replace: true });
 } catch (err) {
console.error(err);
toast.error("Failed to login");
} finally {
setSigningIn(false);
}
 };

return (
<>
{signingIn && <Logging />}

<div className="min-h-screen flex justify-center items-center bg-[#0F0F0F]">
<div className="w-72 p-6 rounded-lg bg-[#1F1F1F] flex flex-col items-center gap-5">
<img src={logo} className="animate-bounce-once h-24 w-24 rounded-xl" />
<p className="text-center font-semibold text-white">
Pashu Jagarak
</p>
<p className="text-center font-semibold text-white">
Report Animals. Empower Safety
 </p>
 <button type='button'
onClick={handleAlerts}
className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition"
>
Show Alerts
</button>
 <p className="flex text-center font-semibold text-white">
To Report an Animal
</p>
 <button
onClick={handleGoogle}
className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition"
 >
Continue with Google
</button>
</div>
</div>
</>
);
};

export default Google;