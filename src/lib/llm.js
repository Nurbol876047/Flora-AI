// Серверный клиент OpenAI. Вызывается только из src/app/api/identify/route.js.
// Ключ OPENAI_API_KEY никогда не передаётся на фронтенд.

const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";

const RESPONSE_LANGUAGE_NAMES = {
  ru: "русском",
  kk: "казахском",
  en: "английском",
};

function buildSystemPrompt(lang) {
  const textLang = RESPONSE_LANGUAGE_NAMES[lang] || RESPONSE_LANGUAGE_NAMES.ru;

  return `Ты — ботанический ассистент школьного исследовательского проекта по флоре
Кызылординской области и Приаралья (Казахстан: пустыни, полупустыни, засолённые почвы,
тугайные и прибрежные сообщества бассейна Сырдарьи и Аральского моря).

Тебе дают фотографию растения и (если доступны) гипотезы системы Pl@ntNet с оценкой уверенности.
Проанализируй фотографию и верни СТРОГО JSON без markdown и без пояснений вне JSON,
со следующими полями:

{
  "name_ru": "название на русском языке",
  "name_kk": "атауы на казахском языке",
  "name_latin": "латинское научное название (род и вид)",
  "family": "название семейства на ${textLang} языке + латинское название семейства в скобках",
  "description": "внешний вид растения, характерные признаки, на какие похожие растения похоже — текст на ${textLang} языке",
  "habitat": "условия обитания (тип почвы, пустыня/степь/побережье и т.п.) — текст на ${textLang} языке",
  "grows_in_region": "да" | "нет" | "возможно",
  "toxicity": "характеристика ядовитости — текст на ${textLang} языке (укажи, ядовито растение или нет, и почему; если данных нет — так и напиши на ${textLang} языке)",
  "protected_status": "охранный статус — текст на ${textLang} языке (укажи, относится ли вид к охраняемым/краснокнижным или нет; если данных нет — так и напиши на ${textLang} языке)",
  "similar_species": [
    { "name_ru": "...", "name_latin": "...", "difference": "чем отличается от определяемого вида — на ${textLang} языке" },
    { "name_ru": "...", "name_latin": "...", "difference": "чем отличается от определяемого вида — на ${textLang} языке" }
  ],
  "self_confidence": число от 0 до 100 или null
}

Правила:
- Если тебе передали результаты Pl@ntNet — используй их как основную гипотезу, выбери наиболее
  вероятный вид из предложенных (или обоснованно уточни), поле "self_confidence" оставь null
  (уверенность в этом случае берётся из оценки Pl@ntNet, а не от тебя).
- Если результатов Pl@ntNet нет — определяй вид самостоятельно по фотографии и заполни
  "self_confidence" своей честной оценкой уверенности в процентах (0-100). Будь строг:
  если признаков на фото недостаточно, ставь низкое число, а не придумывай уверенность.
- "name_ru" и "similar_species[].name_ru" всегда пиши на русском языке, "name_kk" всегда на
  казахском (кириллица, казахский алфавит) — это фиксированные поля, они не зависят от языка ответа.
- Поле "grows_in_region" заполняй только одним из трёх значений: "да", "нет" или "возможно"
  (именно этими русскими словами, без перевода — это служебный код, а не текст для чтения).
- Все остальные текстовые поля ("family", "description", "habitat", "toxicity",
  "protected_status", "similar_species[].difference") ЦЕЛИКОМ пиши на ${textLang} языке —
  включая "toxicity" и "protected_status": это обычный читаемый текст для пользователя,
  а не фиксированный код, и готовых русских шаблонных фраз в них быть не должно, если
  запрошен другой язык.
- Ровно 2 элемента в "similar_species".
- Никогда не придумывай охранный статус или ядовитость — если не уверен, честно напиши
  об этом на ${textLang} языке.
- Ответ — только JSON, одним объектом, без текста до или после.`;
}

export async function enrichWithLLM({ imageBase64, mimeType, plantnetResults, lang }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY не задан в .env.local");
  }
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const contextText = plantnetResults && plantnetResults.length
    ? `Гипотезы Pl@ntNet (вид — уверенность):\n${plantnetResults
        .map((r) => `- ${r.name_latin} (${r.commonNames?.join(", ") || "без общего названия"}) — ${Math.round(r.score * 100)}%`)
        .join("\n")}`
    : "Результаты Pl@ntNet недоступны. Определи вид самостоятельно по фотографии и заполни self_confidence.";

  const body = {
    model,
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: buildSystemPrompt(lang) },
      {
        role: "user",
        content: [
          { type: "text", text: contextText },
          { type: "image_url", image_url: { url: `data:${mimeType};base64,${imageBase64}` } },
        ],
      },
    ],
  };

  const response = await fetch(OPENAI_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`OpenAI ответил с ошибкой ${response.status}: ${text.slice(0, 300)}`);
  }

  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) {
    throw new Error("OpenAI вернул пустой ответ");
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Не удалось разобрать JSON от языковой модели");
  }

  return normalizeLLMResult(parsed);
}

function normalizeLLMResult(raw) {
  const similar = Array.isArray(raw.similar_species) ? raw.similar_species.slice(0, 2) : [];
  while (similar.length < 2) {
    similar.push({ name_ru: "—", name_latin: "—", difference: "данные отсутствуют" });
  }

  return {
    name_ru: raw.name_ru || "—",
    name_kk: raw.name_kk || "—",
    name_latin: raw.name_latin || "—",
    family: raw.family || "—",
    description: raw.description || "—",
    habitat: raw.habitat || "—",
    grows_in_region: ["да", "нет", "возможно"].includes(raw.grows_in_region)
      ? raw.grows_in_region
      : "возможно",
    toxicity: raw.toxicity || "данные отсутствуют",
    protected_status: raw.protected_status || "данные отсутствуют",
    similar_species: similar,
    self_confidence:
      typeof raw.self_confidence === "number"
        ? Math.max(0, Math.min(100, Math.round(raw.self_confidence)))
        : null,
  };
}
