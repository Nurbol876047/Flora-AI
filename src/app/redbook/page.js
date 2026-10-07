"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import plants from "@/data/plants.json";
import { redbookDisclaimer, redbookPlants } from "@/lib/redbook";
import PlantCard from "@/components/PlantCard";
import PlantModal from "@/components/PlantModal";

export default function RedBookPage() {
  const { t } = useLanguage();
  const [active, setActive] = useState(null);
  const catalogued = plants.filter((p) => p.redBook);

  return (
    <div>
      <h1 className="page-title">{t.redbook.title}</h1>
      <p className="page-intro">{t.redbook.intro}</p>

      <div className="panel">
        <div className="label-mono" style={{ marginBottom: 10 }}>
          {t.redbook.catalogTitle}
        </div>
        {catalogued.length === 0 ? (
          <p className="empty-state">{t.redbook.catalogEmpty}</p>
        ) : (
          <div className="flora-grid">
            {catalogued.map((plant) => (
              <PlantCard key={plant.id} plant={plant} onOpen={setActive} />
            ))}
          </div>
        )}
      </div>

      <div className="panel">
        <div className="label-mono" style={{ marginBottom: 10 }}>
          {t.redbook.referenceTitle}
        </div>
        <div className="flora-grid">
          {redbookPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} onOpen={setActive} />
          ))}
        </div>
        <p className="footer-note">{redbookDisclaimer || t.redbook.referenceNote}</p>
      </div>

      <PlantModal plant={active} onClose={() => setActive(null)} />
    </div>
  );
}
