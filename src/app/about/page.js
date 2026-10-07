"use client";

import { useLanguage } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <div>
      <h1 className="page-title">{a.title}</h1>

      <div className="panel">
        <div className="about-section">
          <h2>{a.goalTitle}</h2>
          <p>{a.goal}</p>
        </div>
        <div className="about-section">
          <h2>{a.methodTitle}</h2>
          <p>{a.method}</p>
        </div>
        <div className="about-section">
          <h2>{a.limitsTitle}</h2>
          <p>{a.limits}</p>
        </div>
        <div className="about-section">
          <h2>{a.disclaimerTitle}</h2>
          <p>{a.disclaimer}</p>
        </div>
        <div className="about-section" style={{ marginBottom: 0 }}>
          <h2>{a.dataNoteTitle}</h2>
          <p>{a.dataNote}</p>
        </div>
      </div>
    </div>
  );
}
