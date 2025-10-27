import React, { useState } from "react";
import "../styles/filters.css";

interface Props {
  minMag: number;
  setMinMag: (v: number) => void;
  hours: number;
  setHours: (h: number) => void;
}

export default function Filters({ minMag, setMinMag, hours, setHours }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* Toggle Button */}
      <button className="filter-toggle" onClick={() => setOpen(!open)}>
        {open ? "⬅ Hide Filters" : "➡ Filters"}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <h3 className="sidebar-title">Filters</h3>

        <div className="filter-row">
          <label>
            Min Magnitude: <strong>{minMag}</strong>
          </label>
          <input
            type="range"
            min={0}
            max={8}
            step={0.1}
            value={minMag}
            onChange={(e) => setMinMag(Number(e.target.value))}
          />
        </div>

        <div className="filter-row">
          <label>Time window:</label>
          <select
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          >
            <option value={1}>Last 1 hour</option>
            <option value={6}>Last 6 hours</option>
            <option value={12}>Last 12 hours</option>
            <option value={24}>Last 24 hours</option>
          </select>
        </div>

        <button
          className="locate-btn"
          onClick={() => window.dispatchEvent(new Event("locate-user"))}
        >
          📍 My location
        </button>
      </div>
    </>
  );
}
