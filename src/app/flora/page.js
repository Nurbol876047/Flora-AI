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

  const families = useMemo(() => distinctValues(plants, "family"), []);
  const habitats = useMemo(() => distinctHabitats(plants), []);

  const visible = useMemo(() => {
    return plants.filter((p) => {
      if (!matchesSearch(p, query)) return false;
      if (family && p.family !== family) return false;
      if (habitat && !p.habitat.includes(habitat)) return false;
      return true;
    });
  }, [query, family, habitat]);

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
