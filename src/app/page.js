"use client";

import { useEffect, useRef, useState } from "react";
import { gps as exifGps } from "exifr";
import { useLanguage } from "@/lib/i18n";
import { addEntry, getEntries, makeThumbnail } from "@/lib/journalStorage";
import HerbariumCard from "@/components/HerbariumCard";

function todayLabel() {
  const d = new Date();
  return d.toLocaleDateString("ru-RU");
}

export default function IdentifyPage() {
  const { t } = useLanguage();
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [organ, setOrgan] = useState("leaf");
  const [place, setPlace] = useState("");
  const [coords, setCoords] = useState(null);
  const [coordsSource, setCoordsSource] = useState(null); // "exif" | "geo" | null
  const [geolocating, setGeolocating] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [saved, setSaved] = useState(false);

  const [draftNumber, setDraftNumber] = useState("FA-0001");

  useEffect(() => {
    const n = getEntries().length + 1;
    setDraftNumber("FA-" + String(n).padStart(4, "0"));
  }, [saved]);

  async function onPickFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setResponse(null);
    setError(null);
    setSaved(false);
    setCoords(null);
    setCoordsSource(null);

    try {
      const gpsData = await exifGps(f);
      if (gpsData && typeof gpsData.latitude === "number" && typeof gpsData.longitude === "number") {
        setCoords({ lat: gpsData.latitude, lon: gpsData.longitude });
        setCoordsSource("exif");
        setPlace((prev) => prev || `${gpsData.latitude.toFixed(4)}, ${gpsData.longitude.toFixed(4)}`);
      }
    } catch {
      // в фото нет читаемых EXIF-координат — попробуем геолокацию или ручной ввод
    }
  }

  function onGeolocate() {
    if (!navigator.geolocation) return;
    setGeolocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lon: longitude });
        setCoordsSource("geo");
        setPlace(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        setGeolocating(false);
      },
      () => setGeolocating(false),
      { timeout: 8000 }
    );
  }

  async function onSubmit() {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResponse(null);
    setSaved(false);

    try {
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("organ", organ);

      const res = await fetch("/api/identify", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.message || t.identify.errorTitle);
      } else {
        setResponse(data);
      }
    } catch {
      setError(t.identify.errorTitle);
    } finally {
      setLoading(false);
    }
  }

  async function onSaveToJournal() {
    if (!response || !file) return;
    const thumbDataUrl = await makeThumbnail(file).catch(() => null);
    addEntry({
      place,
      coords,
      thumbDataUrl,
      confidence: response.confidence,
      fallbackUsed: response.fallbackUsed,
      result: response.result,
    });
    setSaved(true);
  }

  return (
    <div>
      <h1 className="page-title">{t.nav.identify}</h1>
      <p className="page-intro">{t.appSubtitle}</p>

      <div className="panel">
        <div className="upload-grid">
          <div>
            <div className="upload-preview">
              {previewUrl ? <img src={previewUrl} alt="" /> : <span>{t.identify.noPhoto}</span>}
            </div>
            <div className="btn-row">
              <button type="button" className="btn" onClick={() => fileInputRef.current?.click()}>
                {previewUrl ? t.identify.changePhoto : t.identify.uploadPhoto}
              </button>
              <button type="button" className="btn" onClick={() => cameraInputRef.current?.click()}>
                {t.identify.takePhoto}
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden-input"
              onChange={onPickFile}
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden-input"
              onChange={onPickFile}
            />
          </div>

          <div>
            <div className="field-row">
              <span className="label-mono">{t.identify.sampleNumber}</span>
              <span className="confidence-value">{draftNumber}</span>
            </div>
            <div className="field-row">
              <span className="label-mono">{t.identify.date}</span>
              <span className="confidence-value">{todayLabel()}</span>
            </div>
            <div className="field-row">
              <span className="label-mono">{t.identify.place}</span>
              <input
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder={t.identify.placePlaceholder}
              />
            </div>
            {coordsSource && (
              <p className="footer-note" style={{ marginTop: -4, marginBottom: 10 }}>
                {coordsSource === "exif" ? t.identify.coordsFromExif : t.identify.coordsFromGeo}
              </p>
            )}
            <div className="field-row">
              <span className="label-mono">{t.identify.organLabel}</span>
              <select value={organ} onChange={(e) => setOrgan(e.target.value)}>
                {Object.entries(t.identify.organs).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="btn-row">
              <button type="button" className="btn" onClick={onGeolocate} disabled={geolocating}>
                {geolocating ? t.identify.geolocating : t.identify.geolocate}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSubmit}
                disabled={!file || loading}
              >
                {loading ? t.identify.submitting : t.identify.submit}
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="panel">
          <div className="notice notice--error">
            <strong>{t.identify.errorTitle}.</strong> {error}
          </div>
          <button type="button" className="btn" onClick={onSubmit}>
            {t.identify.retry}
          </button>
        </div>
      )}

      {response && (
        <div className="panel">
          <div className="label-mono" style={{ marginBottom: 10 }}>
            {t.identify.resultTitle}
          </div>
          <HerbariumCard
            photoSrc={previewUrl}
            sampleNumber={draftNumber}
            date={todayLabel()}
            result={response.result}
            confidence={response.confidence}
            lowConfidence={response.lowConfidence}
            fallbackUsed={response.fallbackUsed}
            plantnetResults={response.plantnetResults}
          />
          <div className="btn-row">
            <button type="button" className="btn btn-primary" onClick={onSaveToJournal} disabled={saved}>
              {saved ? t.identify.savedToJournal : t.identify.saveToJournal}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
