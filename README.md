# 🌍 Earthquake Visualizer

### Real-Time Global Seismic Activity 

## 📌 Overview

Earthquake Visualizer is an interactive web application that maps recent
global earthquakes using live data. Users can explore seismic events
with details such as magnitude, location, depth, and time --- visually
displayed using dynamic markers, animation, and filtering options.

It helps bring awareness to natural seismic events happening around the
world in real time.

## ✨ Features

✅ Real-time earthquake data using USGS live API\
✅ Map visualization with scaled magnitude markers\
✅ Filters by magnitude, region & timeframe\
✅ Heatmap + Timeline animation of seismic activity\
✅ Responsive UI for desktop & mobile\
✅ User-friendly tooltips and popup details

## 🛠️ Tech Stack

  Layer                  Technologies
  ---------------------- ----------------------------------------
  Frontend               React 
  Maps & Visualization   Leaflet / Mapbox / Google Maps API
  Data Source            USGS Earthquake Live Feed API
  Styling                TailwindCSS / Material UI / Custom CSS
  Deployment             Vercel / Netlify / CodeSandbox

## 📂 Project Structure

    earthquake-visualizer/
     ├── src/
     │   ├── components/
     │   ├── services/
     │   ├── assets/
     │   └── App.(js|ts)
     ├── public/
     ├── package.json
     └── README.md

## 🔧 Setup & Installation

    git clone 
    cd earthquake-visualizer
    npm install
    npm start

Runs at: http://localhost:3000

# 🚀 Deployment

## Vercel

    npm i -g vercel
    vercel
    vercel --prod

## Netlify

    npm run build

Drag & drop build/ into Netlify dashboard\
or:

    netlify deploy

## CodeSandbox

Import repo at: https://codesandbox.io

## 🧾 Credits

Data: USGS --- Earthquake Hazards Program API\
Maps: Leaflet / Mapbox

