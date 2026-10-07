// Серверный клиент Pl@ntNet API. Вызывается только из src/app/api/identify/route.js.
// Документация: https://my-api.plantnet.org/

const PLANTNET_ENDPOINT = "https://my-api.plantnet.org/v2/identify/all";

/**
 * @param {Buffer} imageBuffer
 * @param {string} mimeType
 * @param {string} organ один из: leaf, flower, fruit, bark, habit, other
 * @returns {Promise<Array<{name_latin: string, commonNames: string[], score: number}>>}
 */
export async function identifyWithPlantnet(imageBuffer, mimeType, organ) {
  const apiKey = process.env.PLANTNET_API_KEY;
  if (!apiKey) {
    throw new Error("PLANTNET_API_KEY не задан");
  }

  const form = new FormData();
  form.append("images", new Blob([imageBuffer], { type: mimeType }), "sample.jpg");
  form.append("organs", organ || "leaf");

  const url = `${PLANTNET_ENDPOINT}?api-key=${encodeURIComponent(apiKey)}&lang=ru&nb-results=3`;

  const response = await fetch(url, {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Pl@ntNet ответил с ошибкой ${response.status}: ${text.slice(0, 200)}`);
  }

  const data = await response.json();
  const results = Array.isArray(data.results) ? data.results.slice(0, 3) : [];

  return results.map((r) => ({
    name_latin: r.species?.scientificNameWithoutAuthor || "—",
    commonNames: r.species?.commonNames || [],
    family: r.species?.family?.scientificNameWithoutAuthor || null,
    score: typeof r.score === "number" ? r.score : 0,
  }));
}
