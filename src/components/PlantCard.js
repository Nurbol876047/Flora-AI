import { useLanguage } from "@/lib/i18n";
import { translatePlant } from "@/lib/plantTranslations";

export default function PlantCard({ plant, onOpen }) {
  const { t, lang } = useLanguage();
  const f = t.flora;
  const p = translatePlant(plant, lang);

  return (
    <button type="button" className="plant-card" onClick={() => onOpen(plant)}>
      <div className="plant-card__image">
        <img src={p.image} alt={p.nameRu} loading="lazy" />
      </div>
      <div className="plant-card__body">
        <div className="species-card__name">{p.nameRu}</div>
        <div className="species-card__latin">{p.latin}</div>
        <div className="species-card__family">
          {f.fields.family}: {p.family}
        </div>
        <div className="plant-card__badges">
          <span className="tag">{p.lifeForm}</span>
          {p.habitat.map((h) => (
            <span className="tag" key={h}>
              {h}
            </span>
          ))}
          {p.toxic && <span className="tag tag--toxic">{f.toxicYes}</span>}
          {p.redBook && <span className="tag tag--redbook">{f.redBookYes}</span>}
        </div>
      </div>
    </button>
  );
}
