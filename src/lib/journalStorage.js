"use client";

import { regionLabel } from "@/lib/kzRegions";

const STORAGE_KEY = "flora_ai_journal";
const MAX_THUMB_SIDE = 480; // хранить в localStorage уменьшенную копию фото

const COORDS_PATTERN = /^\s*(-?\d{1,3}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)\s*$/;

/** Если поле "место" содержит текст вида "45.4047, 61.6189" — извлекает координаты. */
export function parsePlaceCoords(place) {
  if (!place) return null;
  const m = String(place).match(COORDS_PATTERN);
  if (!m) return null;
  const lat = parseFloat(m[1]);
  const lon = parseFloat(m[2]);
  if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;
  return { lat, lon };
}

/** Возвращает координаты записи: явные (EXIF/геолокация) или распознанные из текста места. */
export function entryCoords(entry) {
  return entry.coords || parsePlaceCoords(entry.place);
}

export function getEntries() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveEntries(entries) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return true;
  } catch {
    return false;
  }
}

function formatSampleNumber(n) {
  return `FA-${String(n).padStart(4, "0")}`;
}

/**
 * @param {{ place: string, region: string, coords: {lat: number, lon: number}|null, thumbDataUrl: string, confidence: number|null, fallbackUsed: boolean, result: object }} entry
 */
export function addEntry(entry) {
  const entries = getEntries();
  const nextNumber = entries.length + 1;
  const record = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    sampleNumber: formatSampleNumber(nextNumber),
    date: new Date().toISOString().slice(0, 10),
    place: entry.place || "",
    region: entry.region || "",
    coords:
      entry.coords && typeof entry.coords.lat === "number" && typeof entry.coords.lon === "number"
        ? { lat: entry.coords.lat, lon: entry.coords.lon }
        : null,
    thumbDataUrl: entry.thumbDataUrl || null,
    confidence: entry.confidence,
    fallbackUsed: !!entry.fallbackUsed,
    name_ru: entry.result?.name_ru || "—",
    name_kk: entry.result?.name_kk || "—",
    name_latin: entry.result?.name_latin || "—",
    family: entry.result?.family || "—",
  };
  entries.push(record);
  saveEntries(entries);
  return record;
}

export function deleteEntry(id) {
  const entries = getEntries().filter((e) => e.id !== id);
  saveEntries(entries);
  return entries;
}

/** Уменьшает изображение до разумного размера перед сохранением в localStorage. */
export function makeThumbnail(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Не удалось прочитать файл"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Не удалось загрузить изображение"));
      img.onload = () => {
        const scale = Math.min(1, MAX_THUMB_SIDE / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.72));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export function exportCsv(entries) {
  const header = [
    "Номер",
    "Дата",
    "Место",
    "Область",
    "Широта",
    "Долгота",
    "Вид (рус.)",
    "Вид (лат.)",
    "Семейство",
    "Уверенность, %",
    "Предварительно",
  ];
  const rows = entries.map((e) => [
    e.sampleNumber,
    e.date,
    csvSafe(e.place),
    csvSafe(regionLabel(e.region, "ru")),
    e.coords ? e.coords.lat : "",
    e.coords ? e.coords.lon : "",
    csvSafe(e.name_ru),
    csvSafe(e.name_latin),
    csvSafe(e.family),
    e.confidence ?? "",
    e.fallbackUsed ? "да" : "нет",
  ]);

  const csv = [header, ...rows].map((row) => row.join(";")).join("\r\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `flora_ai_journal_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function csvSafe(value) {
  const s = String(value ?? "");
  return s.includes(";") || s.includes('"') || s.includes("\n")
    ? `"${s.replace(/"/g, '""')}"`
    : s;
}
