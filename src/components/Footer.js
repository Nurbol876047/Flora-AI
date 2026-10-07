"use client";

import { useLanguage } from "@/lib/i18n";

const APP_VERSION = "0.3.0";

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__col">
          <div className="site-footer__title">{t.appName}</div>
          <p>{f.about}</p>
          <p>
            © {year} · {f.version} {APP_VERSION}
          </p>
        </div>
        <div className="site-footer__col">
          <div className="site-footer__label">{f.sourcesLabel}</div>
          <ul>
            {f.sources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
