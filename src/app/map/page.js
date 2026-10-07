"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { entryCoords, getEntries } from "@/lib/journalStorage";

const KYZYLORDA_CENTER = [44.848, 65.482];

export default function MapPage() {
  const { t, lang } = useLanguage();
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [markerCount, setMarkerCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const map = L.map(containerRef.current).setView(KYZYLORDA_CENTER, 7);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);

      const entries = getEntries();
      let count = 0;

      entries.forEach((entry) => {
        const coords = entryCoords(entry);
        if (!coords) return;
        count += 1;

        const marker = L.circleMarker([coords.lat, coords.lon], {
          radius: 7,
          color: "#2f4f3a",
          weight: 1,
          fillColor: "#2f4f3a",
          fillOpacity: 0.85,
        }).addTo(map);

        const popup = document.createElement("div");

        if (entry.thumbDataUrl) {
          const img = document.createElement("img");
          img.src = entry.thumbDataUrl;
          img.alt = entry.name_ru || "";
          img.style.width = "100%";
          img.style.maxWidth = "160px";
          img.style.display = "block";
          img.style.marginBottom = "6px";
          popup.appendChild(img);
        }

        const species = document.createElement("div");
        species.innerText = `${t.map.popupSpecies}: ${entry.name_ru || "—"}`;
        popup.appendChild(species);

        const dateEl = document.createElement("div");
        dateEl.innerText = `${t.map.popupDate}: ${entry.date || "—"}`;
        popup.appendChild(dateEl);

        if (entry.place) {
          const placeEl = document.createElement("div");
          placeEl.innerText = `${t.map.popupPlace}: ${entry.place}`;
          popup.appendChild(placeEl);
        }

        marker.bindPopup(popup);
      });

      setMarkerCount(count);
    }

    init();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lang, t]);

  return (
    <div>
      <h1 className="page-title">{t.map.title}</h1>
      <p className="page-intro">{t.map.intro}</p>

      {markerCount === 0 && <p className="empty-state">{t.map.empty}</p>}

      <div ref={containerRef} className="map-container" />
    </div>
  );
}
