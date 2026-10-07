"use client";

import { useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { translatePlant } from "@/lib/plantTranslations";

export default function PlantModal({ plant, onClose }) {
  const { t, lang } = useLanguage();
  const f = t.flora;

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!plant) return null;

  const p = translatePlant(plant, lang);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-panel__header">
          <div>
            <div className="species-card__name">{p.nameRu}</div>
            <div className="species-card__latin">{p.latin}</div>
          </div>
          <button type="button" className="modal-panel__close" onClick={onClose}>
            {f.close} ✕
          </button>
        </div>
        <div className="modal-panel__body">
          <div className="modal-panel__image">
            <img src={p.image} alt={p.nameRu} />
          </div>
          <div className="modal-panel__fields">
            <table className="data-table">
              <tbody>
                <tr>
                  <th>{f.fields.nameKz}</th>
                  <td>{p.nameKz}</td>
                </tr>
                <tr>
                  <th>{f.fields.family}</th>
                  <td>{p.family}</td>
                </tr>
                <tr>
                  <th>{f.fields.description}</th>
                  <td>{p.description}</td>
                </tr>
                <tr>
                  <th>{f.fields.habitat}</th>
                  <td>{p.habitat.join(", ")}</td>
                </tr>
                <tr>
                  <th>{f.fields.lifeForm}</th>
                  <td>{p.lifeForm}</td>
                </tr>
                <tr>
                  <th>{f.fields.flowerColor}</th>
                  <td>{p.flowerColor}</td>
                </tr>
                <tr>
                  <th>{f.fields.leafType}</th>
                  <td>{p.leafType}</td>
                </tr>
                <tr>
                  <th>{f.fields.folkUse}</th>
                  <td>{p.folkUse}</td>
                </tr>
                <tr>
                  <th>{f.fields.toxic}</th>
                  <td>{p.toxic ? f.toxicYes : f.toxicNo}</td>
                </tr>
                <tr>
                  <th>{f.fields.redBook}</th>
                  <td>{p.redBook ? f.redBookYes : f.redBookNo}</td>
                </tr>
                {p.imageNote && (
                  <tr>
                    <th>{f.imageNoteLabel}</th>
                    <td>{p.imageNote}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
