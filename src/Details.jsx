import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  MapPin, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Loader2, 
  Calendar,
  Sparkles,
  Camera,
  Navigation,
  Crosshair,
  Map as MapIcon
} from "lucide-react";
import Toast from "./Toast.jsx";

import { db } from "./firebase.jsx";
import {
  collection,
  addDoc,
  GeoPoint,
  serverTimestamp,
} from "firebase/firestore";
import auth from "./firebase.jsx";

import { postImage } from "./postImage.js";
import { analyzeAnimalImage } from "./geminiVision";
import MapView from "./mapView.jsx";
import { s } from "motion/react-client";

function Details() {
  const [preview, setPreview] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiUsed, setAiUsed] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [locationType, setLocationType] = useState(null); // 'gps' or 'custom'
  const [toast,setToast]=useState(false);
  const [toastText,setToastText]=useState("");
  const[toastType,setToastType]=useState("");
  const{
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  /* ================= FILE HANDLER ================= */
  const handleMediaChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("media", file, { shouldValidate: true });
    setPreview(URL.createObjectURL(file));

    try {
      setAiLoading(true);
      setAiUsed(false);

      const aiData = await analyzeAnimalImage(file);
      if (!aiData) return;

      if (aiData.animal)
        setValue("name", aiData.animal, { shouldValidate: true });
      if (aiData.description)
        setValue("desc", aiData.description);
      
      if (aiData.isInjured) {
        let formValue = "Don't know";
        const response = aiData.isInjured.toLowerCase();
        
        if (response === "yes" || response === "true") formValue = "Yes";
        if (response === "no" || response === "false") formValue = "No";
        
        setValue("isInjured", formValue, { shouldValidate: true });
      }

      setAiUsed(true);
    } catch (err) {
      console.error("❌ Gemini failed:", err);
    } finally {
      setAiLoading(false);
    }
  };

  /* ================= CLEANUP ================= */
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /* ================= SUBMIT ================= */
  const subme = async (data) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login first");
      return;
    }

    let innjured = "Unknown";
    if (data.isInjured === "Yes") innjured = "True";
    if (data.isInjured === "No") innjured = "False";

    try {
      const mediaUrl = await postImage(data.media);

      await addDoc(collection(db, "reports"), {
        userId: user.uid,
        name: data.name,
        description: data.desc,
        injured: innjured,
        location: new GeoPoint(
          Number(data.latitude),
          Number(data.longitude)
        ),
        accuracy: data.accuracy,
        media: mediaUrl,
        status: "pending",
        createdAt: serverTimestamp(),
        resolvedAt: null,
      });

      setToast(true);
      setToastText("Report submitted successfully!");
      setToastType("success");
    } catch (err) {
      console.error(err);
      setToast(true);
      setToastText("Failed to submit report. Please try again."); 
      setToastType("error");
    }
  };

  /* ================= TIME ================= */
  const fillCurrentDateTime = () => {
    const now = new Date();
    setValue("day", now.toISOString().split("T")[0], { shouldValidate: true });
    setValue("time", now.toTimeString().slice(0, 5), { shouldValidate: true });
  };

  /* ================= GPS LOCATION ================= */
  const getLocation = () => {
    if (!navigator.geolocation) {
      setToast(true);
      setToastText("Geolocation is not supported by your browser.");
      setToastType("info");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setValue("latitude", pos.coords.latitude, { shouldValidate: true });
        setValue("longitude", pos.coords.longitude, { shouldValidate: true });
        setValue("accuracy", pos.coords.accuracy, { shouldValidate: true });
        setLocationType("gps");
        setShowMap(false);
      },
      () => {
        setToast(true);
        setToastText("Unable to retrieve location");
        setToastType("error");
      }
    );
  };

  const lat = watch("latitude");
  const lon = watch("longitude");
  const day = watch("day");
  const time = watch("time");

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
   
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8 bg-background-dark font-display text-gray-100 overflow-hidden">
      {toast && <Toast message={toastText} type={toastType} isVisible={toast} onClose={() => setToast(false)} />}
       
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393798-3828fb4090bb?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-overlay fixed"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/95 to-background-dark fixed"></div>
      
      {/* Reduced island gradient opacity so it doesn't tint the card */}
      <div className="absolute inset-0 bg-island-gradient opacity-10 fixed pointer-events-none"></div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative z-10 w-full max-w-2xl"
      >
        <form
          onSubmit={handleSubmit(subme)}
          // FIXED: Removed 'glass-panel' class to kill the red tint. 
          // Added 'bg-[#0a0a0a]/90' for a neutral dark card.
          className="bg-[#0a0a0a]/90 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#1a1a1a] flex items-center justify-center border border-white/5 text-primary shadow-lg group">
               <AlertTriangle size={24} className="group-hover:scale-110 transition duration-300 drop-shadow-[0_0_8px_rgba(238,43,43,0.5)]"/>
            </div>
            <div>
               <h1 className="text-2xl font-bold tracking-tight text-white">Report Sighting</h1>
               <p className="text-gray-400 text-sm font-medium">Help us track and protect wildlife.</p>
            </div>
          </div>

          {/* ================= MEDIA UPLOAD ================= */}
          <section className="mb-8">
             <div className="flex justify-between items-end mb-3 ml-1">
                <label className="block text-sm font-bold text-gray-300 flex items-center gap-2">
                   <Camera size={16} className="text-primary"/> Upload Evidence
                </label>
                {aiUsed && (
                   <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                      <Sparkles size={10} /> AI Analyzed
                   </div>
                )}
             </div>

             <div className="relative group">
                <label
                  className={`relative flex flex-col items-center justify-center gap-4
                  border border-dashed ${aiLoading ? "border-primary/50 bg-primary/5" : "border-white/10 bg-[#151515]"}
                  rounded-2xl h-64 cursor-pointer hover:border-white/30 hover:bg-[#1a1a1a] transition-all duration-300 overflow-hidden group/label`}
                >
                  {preview ? (
                    <>
                        <img
                        src={preview}
                        alt="preview"
                        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover/label:opacity-50 transition duration-500"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                    </>
                  ) : (
                    <div className="p-4 bg-white/5 rounded-full border border-white/5 group-hover/label:scale-110 group-hover/label:bg-white/10 transition duration-300">
                       <Upload size={28} className="text-gray-400 group-hover/label:text-white transition-colors" />
                    </div>
                  )}

                  <div className="relative z-10 text-center px-4">
                     {aiLoading ? (
                        <div className="flex flex-col items-center gap-2">
                           <Loader2 size={24} className="animate-spin text-primary"/>
                           <p className="text-primary font-bold text-sm">Analyzing Image...</p>
                        </div>
                     ) : (
                        !preview && (
                            <>
                            <p className="font-bold text-gray-200 group-hover/label:text-white transition">Click to upload image</p>
                            <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">AI will identify the animal & injuries.</p>
                            </>
                        )
                     )}
                  </div>
                  
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleMediaChange}
                  />
                </label>
             </div>
          </section>

          {/* ================= DETAILS GRID ================= */}
          <section className="grid md:grid-cols-2 gap-6 mb-8">
             
             {/* Name */}
             <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Animal Name</label>
                <input
                  {...register("name", { required: true })}
                  placeholder="e.g. Stray Dog"
                  className="w-full bg-[#151515] border border-white/10 focus:border-primary/50 focus:bg-[#1a1a1a] focus:ring-0 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition-all"
                />
             </div>

             {/* Description */}
             <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Details</label>
                <textarea
                  {...register("desc")}
                  rows={2}
                  placeholder="Describe condition, behavior, surroundings..."
                  className="w-full bg-[#151515] border border-white/10 focus:border-primary/50 focus:bg-[#1a1a1a] focus:ring-0 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition-all resize-none"
                />
             </div>
          </section>

          {/* ================= LOCATION SECTION ================= */}
          <section className="mb-8 bg-[#151515] rounded-2xl p-1 border border-white/5">
             {/* Location Toggle Switch */}
             <div className="grid grid-cols-2 p-1 gap-1">
                <button
                  type="button"
                  onClick={getLocation}
                  className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                    locationType === 'gps' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_-5px_rgba(16,185,129,0.3)]' 
                    : 'bg-transparent border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
                  }`}
                >
                   <Crosshair size={16} /> 
                   {locationType === 'gps' ? 'GPS Locked' : 'Auto-Detect'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowMap(!showMap)}
                  className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                    locationType === 'custom' 
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_15px_-5px_rgba(59,130,246,0.3)]' 
                    : 'bg-transparent border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
                  }`}
                >
                   <MapIcon size={16} /> 
                   {locationType === 'custom' ? 'Pin Dropped' : 'Select on Map'}
                </button>
             </div>

             <AnimatePresence>
               {showMap && (
                 <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden px-1 pb-1"
                 >
                   <div className="h-64 rounded-xl overflow-hidden border border-white/10 mt-2">
                    <MapView
                      selectMode
                      onLocationSelect={(latlng) => {
                        setValue("latitude", latlng.lat, { shouldValidate: true });
                        setValue("longitude", latlng.lng, { shouldValidate: true });
                        setValue("accuracy", 10, { shouldValidate: true });
                        setLocationType("custom");
                        setShowMap(false);
                      }}
                    />
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>

             {lat && !showMap && (
                <div className="flex justify-between items-center px-4 py-3 border-t border-white/5">
                   <div className="flex gap-4 text-[10px] font-mono text-gray-500">
                      <span>LAT: <span className="text-gray-300">{Number(lat).toFixed(4)}</span></span>
                      <span>LNG: <span className="text-gray-300">{Number(lon).toFixed(4)}</span></span>
                   </div>
                   <div className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                      <CheckCircle size={10} /> Location Acquired
                   </div>
                </div>
             )}
          </section>

          {/* ================= TIME & CONDITION ================= */}
          <section className="grid md:grid-cols-2 gap-8 mb-8">
             
             {/* Time */}
             <div className="space-y-3">
                <div className="flex justify-between items-center">
                   <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Time</label>
                   <button
                     type="button"
                     onClick={fillCurrentDateTime}
                     className="text-[10px] text-primary hover:text-white transition font-bold border border-primary/20 hover:border-primary/50 px-2 py-1 rounded-md"
                   >
                     SET TO NOW
                   </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                   <div className="relative">
                      <input 
                        readOnly 
                        value={day || ""} 
                        placeholder="YYYY-MM-DD"
                        className="w-full bg-[#151515] border border-white/10 rounded-xl py-2 px-3 text-xs text-center text-white" 
                      />
                   </div>
                   <div className="relative">
                      <input 
                        readOnly 
                        value={time || ""} 
                        placeholder="HH:MM"
                        className="w-full bg-[#151515] border border-white/10 rounded-xl py-2 px-3 text-xs text-center text-white" 
                      />
                   </div>
                </div>
             </div>

             {/* Injury Status */}
             <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Is Injured?</label>
                <div className="flex bg-[#151515] p-1 rounded-xl border border-white/5">
                   {['Yes', 'No', "Don't know"].map((opt) => (
                      <label 
                        key={opt}
                        className={`flex-1 cursor-pointer rounded-lg py-2 text-center text-xs font-bold transition-all duration-300 ${
                           watch("isInjured") === opt 
                           ? "bg-[#252525] text-white shadow-inner border border-white/5" 
                           : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                        }`}
                      >
                         <input
                           type="radio"
                           value={opt}
                           {...register("isInjured", { required: true })}
                           className="hidden"
                         />
                         {opt}
                      </label>
                   ))}
                </div>
             </div>
          </section>

          {/* ================= SUBMIT AREA ================= */}
          <div className="space-y-6 pt-6 border-t border-white/5">
             <label className="flex items-center gap-3 text-gray-400 cursor-pointer group select-none">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    {...register("agreement", { required: true })}
                    className="peer appearance-none w-5 h-5 border border-gray-600 rounded-md bg-[#151515] checked:bg-primary checked:border-primary transition duration-200"
                  />
                  <CheckCircle size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transform scale-75"/>
                </div>
                <span className="text-xs group-hover:text-white transition">I confirm this information is accurate.</span>
             </label>

             <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative overflow-hidden bg-gradient-to-br from-primary to-red-600 hover:to-red-500 text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(238,43,43,0.3)] hover:shadow-[0_8px_25px_rgba(238,43,43,0.5)] transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
             >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                {isSubmitting ? (
                   <span className="flex items-center justify-center gap-2">
                      <Loader2 size={20} className="animate-spin"/> Sending Report...
                   </span>
                ) : "Submit Report"}
             </button>
          </div>

          {/* Hidden Fields */}
          <input type="hidden" {...register("media", { required: true })} />
          <input type="hidden" {...register("latitude", { required: true })} />
          <input type="hidden" {...register("longitude", { required: true })} />
          <input type="hidden" {...register("accuracy", { required: true })} />
          <input type="hidden" {...register("day", { required: true })} />
          <input type="hidden" {...register("time", { required: true })} />

        </form>
      </motion.div>
    </div>
  );
}

export default Details;