"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import plants from "@/data/plants.json";
import { distinctHabitats, distinctValues, matchesSearch } from "@/lib/plantFilters";
import { familyLabels, habitatLabels, translateLabel } from "@/lib/plantTranslations";
import PlantCard from "@/components/PlantCard";
import PlantModal from "@/components/PlantModal";

export default function FloraPage() {
  const { t, lang } = useLanguage();
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("");
  const [habitat, setHabitat] = useState("");
  const [active, setActive] = useState(null);

  const [aiQuery, setAiQuery] = useState("");
  const [aiIds, setAiIds] = useState(null); // null = ИИ-поиск не активен
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  const families = useMemo(() => distinctValues(plants, "family"), []);
  const habitats = useMemo(() => distinctHabitats(plants), []);

  const visible = useMemo(() => {
    let list = plants.filter((p) => {
      if (!matchesSearch(p, query)) return false;
      if (family && p.family !== family) return false;
      if (habitat && !p.habitat.includes(habitat)) return false;
      return true;
    });
    if (aiIds) {
      const rank = new Map(aiIds.map((id, i) => [id, i]));
      list = list.filter((p) => rank.has(p.id)).sort((a, b) => rank.get(a.id) - rank.get(b.id));
    }
    return list;
  }, [query, family, habitat, aiIds]);

  async function onAiSearch() {
    const q = aiQuery.trim();
    if (!q || aiLoading) return;
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await fetch("/api/flora-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, lang }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setAiError(data.message || t.flora.aiSearchError);
        setAiIds(null);
      } else {
        setAiIds(data.ids);
      }
    } catch {
      setAiError(t.flora.aiSearchError);
      setAiIds(null);
    } finally {
      setAiLoading(false);
    }
  }

  function onAiClear() {
    setAiIds(null);
    setAiError(null);
    setAiQuery("");
  }

  return (
    <div>
      <h1 className="page-title">{t.flora.title}</h1>
      <p className="page-intro">{t.flora.intro}</p>

      <div className="flora-toolbar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.flora.searchPlaceholder}
        />
        <select value={family} onChange={(e) => setFamily(e.target.value)}>
          <option value="">{t.flora.familyAll}</option>
          {families.map((f) => (
            <option key={f} value={f}>
              {translateLabel(familyLabels, f, lang)}
            </option>
          ))}
        </select>
        <select value={habitat} onChange={(e) => setHabitat(e.target.value)}>
          <option value="">{t.flora.habitatAll}</option>
          {habitats.map((h) => (
            <option key={h} value={h}>
              {translateLabel(habitatLabels, h, lang)}
            </option>
          ))}
        </select>
      </div>

      <div className="flora-toolbar" style={{ marginTop: -8 }}>
        <input
          type="text"
          value={aiQuery}
          onChange={(e) => setAiQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAiSearch()}
          placeholder={t.flora.aiSearchPlaceholder}
        />
        <button type="button" className="btn" onClick={onAiSearch} disabled={!aiQuery.trim() || aiLoading}>
          {aiLoading ? t.flora.aiSearching : t.flora.aiSearchButton}
        </button>
        {aiIds && (
          <button type="button" className="btn" onClick={onAiClear}>
            {t.flora.aiSearchClear}
          </button>
        )}
      </div>

      {aiError && (
        <div className="notice notice--error" style={{ marginBottom: 16 }}>
          {aiError}
        </div>
      )}
      {aiIds && !aiError && (
        <p className="footer-note" style={{ marginTop: -8, marginBottom: 16 }}>
          {aiIds.length > 0 ? t.flora.aiSearchActive : t.flora.aiSearchNoResults}
        </p>
      )}

      {visible.length === 0 ? (
        <p className="empty-state">{t.flora.noResults}</p>
      ) : (
        <div className="flora-grid">
          {visible.map((plant) => (
            <PlantCard key={plant.id} plant={plant} onOpen={setActive} />
          ))}
        </div>
      )}

      <PlantModal plant={active} onClose={() => setActive(null)} />
    </div>
  );
}
