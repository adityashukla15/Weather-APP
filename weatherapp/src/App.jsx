import React from "react";
import Home from "./pages/TempHome"
import bgVideo from "./assets/bg2.mp4";
import TempHome from "./pages/TempHome";

export default function App() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* 🌌 Animated Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover brightness-50"
        autoPlay
        loop
        muted
        playsInline
        src={bgVideo} // ✅ Keep bg.mp4 inside "public" folder
      />

      {/* 🌙 Dark Overlay (for better contrast) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>

      {/* 💨 Main Content (Your Home Page) */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <TempHome/>
      </div>

      {/* ✨ Optional Floating Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1),transparent_40%)] pointer-events-none"></div>
    </div>
  );
}
