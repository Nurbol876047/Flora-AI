// Области Республики Казахстан (после реформы 2022 года: добавлены Абай, Жетісу, Ұлытау).

export const kzRegions = [
  { id: "abai", ru: "область Абай", kk: "Абай облысы", en: "Abai Region" },
  { id: "akmola", ru: "Акмолинская область", kk: "Ақмола облысы", en: "Akmola Region" },
  { id: "aktobe", ru: "Актюбинская область", kk: "Ақтөбе облысы", en: "Aktobe Region" },
  { id: "almaty", ru: "Алматинская область", kk: "Алматы облысы", en: "Almaty Region" },
  { id: "atyrau", ru: "Атырауская область", kk: "Атырау облысы", en: "Atyrau Region" },
  { id: "west-kz", ru: "Западно-Казахстанская область", kk: "Батыс Қазақстан облысы", en: "West Kazakhstan Region" },
  { id: "zhambyl", ru: "Жамбылская область", kk: "Жамбыл облысы", en: "Zhambyl Region" },
  { id: "zhetisu", ru: "область Жетісу", kk: "Жетісу облысы", en: "Zhetisu Region" },
  { id: "karaganda", ru: "Карагандинская область", kk: "Қарағанды облысы", en: "Karaganda Region" },
  { id: "kostanay", ru: "Костанайская область", kk: "Қостанай облысы", en: "Kostanay Region" },
  { id: "kyzylorda", ru: "Кызылординская область", kk: "Қызылорда облысы", en: "Kyzylorda Region" },
  { id: "mangystau", ru: "Мангистауская область", kk: "Маңғыстау облысы", en: "Mangystau Region" },
  { id: "pavlodar", ru: "Павлодарская область", kk: "Павлодар облысы", en: "Pavlodar Region" },
  { id: "north-kz", ru: "Северо-Казахстанская область", kk: "Солтүстік Қазақстан облысы", en: "North Kazakhstan Region" },
  { id: "turkistan", ru: "Туркестанская область", kk: "Түркістан облысы", en: "Turkistan Region" },
  { id: "ulytau", ru: "область Ұлытау", kk: "Ұлытау облысы", en: "Ulytau Region" },
  { id: "east-kz", ru: "Восточно-Казахстанская область", kk: "Шығыс Қазақстан облысы", en: "East Kazakhstan Region" },
  { id: "astana", ru: "г. Астана", kk: "Астана қ.", en: "Astana City" },
  { id: "almaty-city", ru: "г. Алматы", kk: "Алматы қ.", en: "Almaty City" },
  { id: "shymkent", ru: "г. Шымкент", kk: "Шымкент қ.", en: "Shymkent City" },
];

export function regionLabel(id, lang) {
  const r = kzRegions.find((x) => x.id === id);
  if (!r) return "";
  return r[lang] || r.ru;
}
