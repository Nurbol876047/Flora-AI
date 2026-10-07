import { useLanguage } from "@/lib/i18n";
import { isRedBookSpecies } from "@/lib/redbook";
import ConfidenceBar from "./ConfidenceBar";

export default function HerbariumCard({
  photoSrc,
  sampleNumber,
  date,
  result,
  confidence,
  lowConfidence,
  fallbackUsed,
  plantnetResults,
}) {
  const { t } = useLanguage();
  const f = t.identify.fields;
  const protectedSpecies = isRedBookSpecies(result.name_latin);

  const growsLabel =
    result.grows_in_region === "да"
      ? t.common.yes
      : result.grows_in_region === "нет"
      ? t.common.no
      : t.common.maybe;

  return (
    <div>
      {protectedSpecies && <div className="notice notice--danger">{t.identify.redBookWarning}</div>}
      {fallbackUsed && <div className="notice">{t.identify.preliminary}</div>}
      {lowConfidence && <div className="notice">{t.identify.lowConfidence}</div>}

      <div className="herbarium-card">
        <div className="herbarium-card__photo">
          {photoSrc && <img src={photoSrc} alt={result.name_ru} />}
          <div className="herbarium-card__stamp">
            <span>{sampleNumber}</span>
            <span>{date}</span>
          </div>
        </div>
        <div className="herbarium-card__body">
          <table className="data-table">
            <tbody>
              <tr>
                <th>{f.name_ru}</th>
                <td>{result.name_ru}</td>
              </tr>
              <tr>
                <th>{f.name_kk}</th>
                <td>{result.name_kk}</td>
              </tr>
              <tr>
                <th>{f.name_latin}</th>
                <td className="name-latin">{result.name_latin}</td>
              </tr>
              <tr>
                <th>{f.family}</th>
                <td>{result.family}</td>
              </tr>
              <tr>
                <th>{f.description}</th>
                <td>{result.description}</td>
              </tr>
              <tr>
                <th>{f.habitat}</th>
                <td>{result.habitat}</td>
              </tr>
              <tr>
                <th>{f.grows_in_region}</th>
                <td>{growsLabel}</td>
              </tr>
              <tr>
                <th>{f.toxicity}</th>
                <td>{result.toxicity}</td>
              </tr>
              <tr>
                <th>{f.protected_status}</th>
                <td>{result.protected_status}</td>
              </tr>
              <tr>
                <th>{f.similar}</th>
                <td>
                  <ul className="similar-list">
                    {result.similar_species.map((s, i) => (
                      <li key={i}>
                        <span className="name-latin">{s.name_latin}</span>
                        {s.name_ru ? ` (${s.name_ru})` : ""} — {s.difference}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="confidence-block">
            <ConfidenceBar value={confidence} label={t.identify.confidenceLabel} />
          </div>

          {!fallbackUsed && plantnetResults && plantnetResults.length > 1 && (
            <div className="alt-list">
              <div className="label-mono">{t.identify.alternatives}</div>
              {plantnetResults.slice(1).map((r, i) => (
                <div className="alt-row" key={i}>
                  <span className="name-latin">{r.name_latin}</span>
                  <span className="confidence-value">{Math.round(r.score * 100)}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
