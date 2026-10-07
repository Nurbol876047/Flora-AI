"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScanSearch, ListChecks, BookOpen, Leaf, ShieldAlert, Info } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const NAV_ITEMS = [
  { href: "/", key: "identify", icon: ScanSearch },
  { href: "/wizard", key: "wizard", icon: ListChecks },
  // { href: "/map", key: "map", icon: MapPin }, — временно скрыто
  { href: "/journal", key: "journal", icon: BookOpen },
  { href: "/flora", key: "flora", icon: Leaf },
  { href: "/redbook", key: "redbook", icon: ShieldAlert },
  { href: "/about", key: "about", icon: Info },
];

export default function Header() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="site-header">
      <div className="container">
        <div className="site-header__top">
          <div className="site-header__brand">
            <p className="site-header__title">{t.appName}</p>
            <span className="site-header__subtitle">{t.appSubtitle}</span>
          </div>
          <div className="site-header__meta">
            <span className="lang-toggle" role="group" aria-label="Язык интерфейса">
              <button type="button" aria-pressed={lang === "ru"} onClick={() => setLang("ru")}>
                RU
              </button>
              <button type="button" aria-pressed={lang === "kk"} onClick={() => setLang("kk")}>
                ҚАЗ
              </button>
              <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
                EN
              </button>
            </span>
          </div>
        </div>
        <nav className="site-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                <Icon aria-hidden="true" />
                {t.nav[item.key]}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
