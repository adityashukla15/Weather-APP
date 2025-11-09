import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Loader from "../components/Loader";
import { WiDaySunnyOvercast } from "react-icons/wi"; // 🌤️ main weather icon

const API_KEY = import.meta.env.VITE_OWM_API_KEY;

export default function Home() {
  const [city, setCity] = useState("Delhi");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch weather function
  async function fetchWeather(q) {
    if (!q) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_KEY}&units=metric`
      );

      if (!res.ok) throw new Error("City not found");

      const json = await res.json();
      setData(json);
      setCity(q);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Fetch weather for default city on mount
  useEffect(() => {
    fetchWeather(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 flex flex-col items-center font-[Poppins,sans-serif]">
      {/* 🌤️ Title Section */}
      <h1 className="text-4xl font-extrabold mb-8 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-500 drop-shadow-lg">
        <WiDaySunnyOvercast className="text-5xl text-yellow-400 animate-pulse" />
        Climate<span className="text-white">App</span>
      </h1>

      {/* 🔍 Search */}
      <SearchBar onSearch={(q) => fetchWeather(q)} />

      {/* ⏳ Loader */}
      {loading && <Loader />}

      {/* ⚠️ Error */}
      {error && (
        <div className="mt-4 text-red-400 font-medium tracking-wide">
          {error}
        </div>
      )}

      {/* 🌡️ Weather Card */}
      {data && !loading && !error && <WeatherCard data={data} />}
    </div>
  );
}
