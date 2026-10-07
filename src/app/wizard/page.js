"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import plants from "@/data/plants.json";
import { distinctHabitats, distinctValues } from "@/lib/plantFilters";
import {
  flowerColorLabels,
  habitatLabels,
  leafTypeLabels,
  lifeFormLabels,
  translateLabel,
} from "@/lib/plantTranslations";
import PlantCard from "@/components/PlantCard";
import PlantModal from "@/components/PlantModal";

const STEPS = [
  { key: "lifeForm", field: "lifeForm", labelKey: "stepLifeForm", isArray: false, dict: lifeFormLabels },
  { key: "habitat", field: "habitat", labelKey: "stepHabitat", isArray: true, dict: habitatLabels },
  { key: "flowerColor", field: "flowerColor", labelKey: "stepFlowerColor", isArray: false, dict: flowerColorLabels },
  { key: "leafType", field: "leafType", labelKey: "stepLeafType", isArray: false, dict: leafTypeLabels },
];

function applyAnswers(answers) {
  return plants.filter((p) =>
    STEPS.every((s) => {
      const val = answers[s.key];
      if (val == null) return true;
      return s.isArray ? p[s.field].includes(val) : p[s.field] === val;
    })
  );
}

export default function WizardPage() {
  const { t, lang } = useLanguage();
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState([]); // answered step keys, in order
  const [forceFinish, setForceFinish] = useState(false);
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => applyAnswers(answers), [answers]);
  const finished = forceFinish || history.length >= STEPS.length || filtered.length <= 3;
  const currentStep = STEPS[history.length];

  const options = useMemo(() => {
    if (!currentStep || finished) return [];
    return currentStep.isArray ? distinctHabitats(filtered) : distinctValues(filtered, currentStep.field);
  }, [currentStep, filtered, finished]);

  function choose(value) {
    if (!currentStep) return;
    setAnswers((prev) => ({ ...prev, [currentStep.key]: value }));
    setHistory((prev) => [...prev, currentStep.key]);
  }

  function goBack() {
    if (forceFinish) {
      setForceFinish(false);
      return;
    }
    if (history.length === 0) return;
    const lastKey = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[lastKey];
      return next;
    });
  }

  function restart() {
    setAnswers({});
    setHistory([]);
    setForceFinish(false);
  }

  const canGoBack = forceFinish || history.length > 0;
  const canShowAnyway = !finished && history.length > 0;

  return (
    <div>
      <h1 className="page-title">{t.wizard.title}</h1>
      <p className="page-intro">{t.wizard.intro}</p>

      <div className="panel">
        <div className="wizard-steps">
          {STEPS.map((s, i) => (
            <span key={s.key} className={i === history.length && !finished ? "active" : undefined}>
              {t.wizard[s.labelKey]}
            </span>
          ))}
        </div>

        <div className="wizard-remaining">
          {t.wizard.remaining}: {filtered.length}
        </div>

        {!finished && currentStep && (
          <>
            <p style={{ marginTop: 10, marginBottom: 0, fontWeight: 600 }}>{t.wizard[currentStep.labelKey]}</p>
            <div className="wizard-options">
              {options.map((opt) => (
                <button key={opt} type="button" className="wizard-option" onClick={() => choose(opt)}>
                  {translateLabel(currentStep.dict, opt, lang)}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="btn-row">
          {canGoBack && (
            <button type="button" className="btn" onClick={goBack}>
              {t.wizard.back}
            </button>
          )}
          {(history.length > 0 || forceFinish) && (
            <button type="button" className="btn" onClick={restart}>
              {t.wizard.restart}
            </button>
          )}
          {canShowAnyway && (
            <button type="button" className="btn" onClick={() => setForceFinish(true)}>
              {t.wizard.showAnyway}
            </button>
          )}
        </div>

        {finished && (
          <div className="wizard-results">
            <div className="label-mono">{t.wizard.resultsTitle}</div>
            {filtered.length === 0 ? (
              <p className="empty-state">{t.wizard.noMatches}</p>
            ) : (
              <div className="flora-grid">
                {filtered.map((plant) => (
                  <PlantCard key={plant.id} plant={plant} onOpen={setActive} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <PlantModal plant={active} onClose={() => setActive(null)} />
    </div>
  );
}
