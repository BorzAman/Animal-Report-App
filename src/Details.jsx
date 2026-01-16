import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";

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

function Details() {
  const [preview, setPreview] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiUsed, setAiUsed] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
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

      if (aiData.animal) {
        setValue("name", aiData.animal, { shouldValidate: true });
      }

      if (aiData.description) {
        setValue("desc", aiData.description);
      }

      if (aiData.isInjured) {
        setValue("isInjured", aiData.isInjured, { shouldValidate: true });
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

  /* ================= ERROR HANDLER ================= */
  const onError = (errors) => {
    const missingFields = [];

    if (errors.media) missingFields.push("Photo");
    if (errors.name) missingFields.push("Animal name");
    if (errors.isInjured) missingFields.push("Injury status");
    if (errors.latitude || errors.longitude) missingFields.push("Location");
    if (errors.day || errors.time) missingFields.push("Time");
    if (errors.agreement) missingFields.push("Agreement checkbox");

    alert(
      `Please fill all required fields before submitting:\n\n• ${missingFields.join(
        "\n• "
      )}`
    );
  };

  /* ================= SUBMIT ================= */
  const subme = async (data) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login first");
      return;
    }

    let innjured = "null";
    if (data.isInjured === "Yes") innjured = "True";
    if (data.isInjured === "No") innjured = "False";
    if (data.isInjured === "Unknown") innjured = "Unknown";

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
    setValue("day", now.toISOString().split("T")[0], { shouldValidate: true });
    setValue("time", now.toTimeString().slice(0, 5), { shouldValidate: true });
  };

  /* ================= LOCATION ================= */
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
        onSubmit={handleSubmit(subme, onError)}
        className="bg-[#111111] border border-gray-800 rounded-xl p-6 space-y-6"
      >
        <h1 className="text-xl font-semibold text-white">
          Report an Animal
        </h1>

        {/* ================= MEDIA ================= */}
        <div>
          <p className="text-sm text-gray-400 mb-3">
            Please upload image of animal and AI will autofill part of data.
            Be sure to recheck all sections before submission. Stay Safe!
          </p>

          <label className="block text-sm text-gray-300 mb-2">
            Upload Photo
          </label>

          <label
            className={`flex flex-col items-center justify-center gap-2
            border-2 border-dashed ${
              aiLoading ? "border-yellow-500" : "border-gray-700"
            }
            rounded-xl p-10 cursor-pointer
            hover:border-red-600 transition
            bg-[#0f0f0f]`}
          >
            <Upload
              className={
                aiLoading
                  ? "animate-bounce text-yellow-500"
                  : "text-gray-400"
              }
              size={28}
            />
            <p className="text-sm text-gray-400">
              {aiLoading
                ? "Analyzing using Gemini..."
                : "Click to upload or drag image"}
            </p>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleMediaChange}
            />
          </label>

          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Preview"
                className="h-40 rounded-xl object-cover border border-gray-700"
              />
              {aiUsed && (
                <p className="text-xs text-green-400 mt-2">
                  Details were filled by AI. Recheck them before submission
                </p>
              )}
            </div>
          )}
        </div>

        {/* ================= NAME ================= */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Animal Name
          </label>
          <input
            type="text"
            {...register("name", { required: true, maxLength: 16 })}
            className="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-2 text-white"
          />
        </div>

        {/* ================= DESCRIPTION ================= */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Description
          </label>
          <textarea
            {...register("desc")}
            rows="3"
            className="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-2 text-white"
          />
        </div>

        {/* ================= LOCATION ================= */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={getLocation}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm text-white"
          >
            Get Location
          </button>

          {lat && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                value={lat}
                readOnly
                className="bg-[#0f0f0f] border border-gray-700 px-3 py-2 text-xs text-white rounded-lg"
              />
              <input
                value={lon}
                readOnly
                className="bg-[#0f0f0f] border border-gray-700 px-3 py-2 text-xs text-white rounded-lg"
              />
            </div>
          )}
        </div>

        {/* ================= TIME ================= */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={fillCurrentDateTime}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm text-white"
          >
            Get Time
          </button>

          {(day || time) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                value={day}
                readOnly
                className="bg-[#0f0f0f] border border-gray-700 px-3 py-2 text-xs text-white rounded-lg"
              />
              <input
                value={time}
                readOnly
                className="bg-[#0f0f0f] border border-gray-700 px-3 py-2 text-xs text-white rounded-lg"
              />
            </div>
          )}
        </div>

        {/* ================= INJURED ================= */}
        <div>

        <p className="my-3">Is Animal Injured?</p>
        <div className="flex gap-6 text-sm text-gray-300">
          <label className="flex items-center gap-2">
            <input type="radio" value="Yes" {...register("isInjured", { required: true })} /> Yes
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="No" {...register("isInjured", { required: true })} /> No
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="Unknown" {...register("isInjured", { required: true })} /> Don’t know
          </label>
        </div>
        </div>

        {/* ================= AGREEMENT ================= */}
        <label className="flex gap-2 text-sm text-gray-300">
          <input type="checkbox" {...register("agreement", { required: true })} />
          I agree that the information shared is real
        </label>

        {/* ================= SUBMIT ================= */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 font-semibold"
        >
          Submit Report
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