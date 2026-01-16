import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Upload, MapPin, CheckCircle } from "lucide-react"; // Added CheckCircle

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

function Details() {
  const [preview, setPreview] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiUsed, setAiUsed] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [locationType, setLocationType] = useState(null); // 'gps' or 'custom'

  const {
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
      
      /* --- UPDATED INJURY MAPPING LOGIC --- */
      if (aiData.isInjured) {
        let formValue = "Don't know"; // Default for "Unknown" or unexpected strings
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

      alert("Report submitted successfully");
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };

  /* ================= TIME ================= */
  const fillCurrentDateTime = () => {
    const now = new Date();
    setValue("day", now.toISOString().split("T")[0], {
      shouldValidate: true,
    });
    setValue("time", now.toTimeString().slice(0, 5), {
      shouldValidate: true,
    });
  };

  /* ================= GPS LOCATION ================= */
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setValue("latitude", pos.coords.latitude, { shouldValidate: true });
        setValue("longitude", pos.coords.longitude, { shouldValidate: true });
        setValue("accuracy", pos.coords.accuracy, { shouldValidate: true });
        setLocationType("gps"); // Mark as GPS
        setShowMap(false);
      },
      () => alert("Location permission denied")
    );
  };

  const lat = watch("latitude");
  const lon = watch("longitude");
  const day = watch("day");
  const time = watch("time");

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      <form
        onSubmit={handleSubmit(subme)}
        className="bg-[#111111] border border-gray-800 rounded-xl p-6 space-y-6"
      >
        <h1 className="text-xl font-semibold text-white text-center">
          Report an Animal
        </h1>

        {/* ================= MEDIA ================= */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Upload Photo
            <p className="my-2">( Please upload image of animal and AI will autofill part of data.
            Be sure to recheck all sections before submission. Stay Safe!)</p>
          </label>

          <label
            className={`flex flex-col items-center justify-center gap-2
            border-2 border-dashed ${
              aiLoading ? "border-yellow-500" : "border-gray-700"
            }
            rounded-xl p-10 cursor-pointer
            hover:border-red-600 transition bg-[#0f0f0f]`}
          >
            <Upload size={28} className="text-gray-400" />
            <p className="text-sm text-gray-400">
              {aiLoading ? "Analyzing..." : "Click to upload image"}
            </p>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleMediaChange}
            />
          </label>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-4 h-40 rounded-xl border border-gray-700 object-cover"
            />
          )}
        </div>

        {/* ================= NAME ================= */}
          <label className="block text-sm text-gray-300 mb-2">
            Name
          </label>        <input
          {...register("name", { required: true })}
          placeholder="Animal name"
          className="w-full bg-[#0f0f0f] border border-gray-700 px-4 py-2 rounded-lg text-white"
        />

        {/* ================= DESCRIPTION ================= */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Description
          </label>
          <textarea
            {...register("desc")}
            rows={3}
            placeholder="Describe animal condition, behavior, surroundings..."
            className="w-full bg-[#0f0f0f] border border-gray-700 px-4 py-2 rounded-lg text-white resize-none"
          />
        </div>


        {/* ================= LOCATION (MUTUALLY EXCLUSIVE) ================= */}
        <div className="space-y-4  border-gray-800 pt-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-300 font-medium">Add Location (Required)</p>
            {locationType && (
                <span className="text-xs text-green-400 flex items-center gap-1 bg-green-900/20 px-2 py-1 rounded-full">
                    <CheckCircle size={12}/> {locationType === 'gps' ? 'Auto-detected' : 'Custom Picked'}
                </span>
            )}
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              type="button"
              onClick={getLocation}
              className={`px-4 py-2 rounded-lg text-sm transition flex items-center gap-2 ${
                locationType === 'gps' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <MapPin size={16} />
              Get Location
            </button>
            <p className="mt-1 text-gray-500">Or</p>
            <button
              type="button"
              onClick={() => {
                setShowMap((v) => !v);
              }}
              className={`px-4 py-2 rounded-lg text-sm transition flex items-center gap-2 ${
                locationType === 'custom' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <MapPin size={16} />
              Custom Location
            </button>
          </div>

          {showMap && (
            <div className="h-64 rounded-xl overflow-hidden border border-gray-700">
              <MapView
                selectMode
                onLocationSelect={(latlng) => {
                  setValue("latitude", latlng.lat, { shouldValidate: true });
                  setValue("longitude", latlng.lng, { shouldValidate: true });
                  setValue("accuracy", 10, { shouldValidate: true });
                  setLocationType("custom"); // Mark as Custom
                  setShowMap(false);
                }}
              />
            </div>
          )}

          {lat && (
            <div className="grid grid-cols-2 gap-4">
              <input readOnly value={`Lat: ${lat}`} className="bg-[#0f0f0f] border border-gray-700 px-3 py-2 text-xs text-white rounded-lg" />
              <input readOnly value={`Lon: ${lon}`} className="bg-[#0f0f0f] border border-gray-700 px-3 py-2 text-xs text-white rounded-lg" />
            </div>
          )}
        </div>

        {/* ================= TIME ================= */}
        <div className="space-y-2">
            <button
            type="button"
            onClick={fillCurrentDateTime}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm text-white"
            >
            Get Time
            </button>

            {(day || time) && (
            <div className="grid grid-cols-2 gap-4">
                <input readOnly value={day} className="bg-[#0f0f0f] border border-gray-700 px-4 py-2 rounded-lg text-white" />
                <input readOnly value={time} className="bg-[#0f0f0f] border border-gray-700 px-4 py-2 rounded-lg text-white" />
            </div>
            )}
        </div>

        {/* ================= IS ANIMAL INJURED ================= */}
        <div className="space-y-4 pt-5">
          <label className="block text-lg font-normal text-white">
            Is Animal Injured?
          </label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <input
                type="radio"
                value="Yes"
                {...register("isInjured", { required: true })}
                className="w-4 h-4 accent-red-600"
              />
              Yes
            </label>
            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <input
                type="radio"
                value="No"
                {...register("isInjured", { required: true })}
                className="w-4 h-4 accent-red-600"
              />
              No
            </label>
            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <input
                type="radio"
                value="Don't know"
                {...register("isInjured", { required: true })}
                className="w-4 h-4 accent-red-600"
              />
              Don't know
            </label>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                {...register("agreement", { required: true })}
                className="w-4 h-4 rounded border-gray-700 bg-[#0f0f0f] accent-red-600"
              />
              <span className="text-sm">I agree that the information shared is real</span>
            </label>
          </div>
        </div>


        {/* ================= SUBMIT ================= */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg text-white font-semibold transition"
        >
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </button>

        {/* ================= HIDDEN ================= */}
        <input type="hidden" {...register("media", { required: true })} />
        <input type="hidden" {...register("latitude", { required: true })} />
        <input type="hidden" {...register("longitude", { required: true })} />
        <input type="hidden" {...register("accuracy", { required: true })} />
        <input type="hidden" {...register("day", { required: true })} />
        <input type="hidden" {...register("time", { required: true })} />
      </form>
    </div>
  );
}

export default Details;