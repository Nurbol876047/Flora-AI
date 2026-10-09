"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { deleteEntry, exportCsv, getEntries } from "@/lib/journalStorage";
import { regionLabel } from "@/lib/kzRegions";

export default function JournalPage() {
  const { t, lang } = useLanguage();
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  useEffect(() => {
    setEntries(getEntries());
  }, []);

  function onSort(key) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function onDelete(id) {
    if (!window.confirm(t.journal.confirmDelete)) return;
    setEntries(deleteEntry(id));
  }

  const visible = useMemo(() => {
    const q = filter.trim().toLowerCase();
    let list = entries;
    if (q) {
      list = list.filter(
        (e) =>
          e.name_ru.toLowerCase().includes(q) ||
          e.name_latin.toLowerCase().includes(q) ||
          e.place.toLowerCase().includes(q)
      );
    }
    const dir = sortDir === "asc" ? 1 : -1;
    return [...list].sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv), "ru") * dir;
    });
  }, [entries, filter, sortKey, sortDir]);

  const c = t.journal.columns;

  return (
    <div>
      <h1 className="page-title">{t.journal.title}</h1>
      <p className="page-intro">{t.appSubtitle}</p>

      {entries.length === 0 ? (
        <div className="panel">
          <p className="empty-state">{t.journal.empty}</p>
        </div>
      ) : (
        <div className="panel">
          <div className="table-toolbar">
            <input
              type="text"
              placeholder={t.journal.filterPlaceholder}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <button type="button" className="btn" onClick={() => exportCsv(visible)}>
              {t.journal.exportCsv}
            </button>
          </div>

          <table className="journal">
            <thead>
              <tr>
                <th onClick={() => onSort("sampleNumber")}>{c.number}</th>
                <th onClick={() => onSort("date")}>{c.date}</th>
                <th onClick={() => onSort("place")}>{c.place}</th>
                <th onClick={() => onSort("region")}>{c.region}</th>
                <th onClick={() => onSort("name_ru")}>{c.species}</th>
                <th onClick={() => onSort("confidence")}>{c.confidence}</th>
                <th>{c.photo}</th>
                <th aria-hidden="true" />
              </tr>
            </thead>
            <tbody>
              {visible.map((e) => (
                <tr key={e.id}>
                  <td className="mono">{e.sampleNumber}</td>
                  <td className="mono">{e.date}</td>
                  <td>{e.place || "—"}</td>
                  <td>{regionLabel(e.region, lang) || "—"}</td>
                  <td>
                    {e.name_ru} <span className="name-latin">({e.name_latin})</span>
                  </td>
                  <td className="mono">
                    {typeof e.confidence === "number" ? `${e.confidence}%` : "—"}
                    {e.fallbackUsed ? " *" : ""}
                  </td>
                  <td>
                    {e.thumbDataUrl ? (
                      <img className="thumb" src={e.thumbDataUrl} alt="" />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="row-actions">
                    <button type="button" onClick={() => onDelete(e.id)}>
                      {t.journal.deleteEntry}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {visible.some((e) => e.fallbackUsed) && (
            <p className="footer-note" style={{ marginTop: 12 }}>
              * — {t.identify.preliminary}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
