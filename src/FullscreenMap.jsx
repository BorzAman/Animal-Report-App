import React from 'react';
import { useNavigate } from "react-router-dom";
import Mapp from './map.jsx'

function FullscreenMap({ reports }) {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-screen">
      <Mapp reports={reports} />

      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-1000
                   px-3 py-1 rounded bg-black/70 text-white"
      >
        Exit
      </button>
    </div>
  );
}

export default FullscreenMap;