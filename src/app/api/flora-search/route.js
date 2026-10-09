import { NextResponse } from "next/server";
import { searchPlantsByDescription } from "@/lib/llm";
import plants from "@/data/plants.json";

export const runtime = "nodejs";

const MAX_QUERY_LENGTH = 300;

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Ожидается JSON-запрос." }, { status: 400 });
  }

  const query = typeof payload.query === "string" ? payload.query.trim() : "";
  const langRaw = payload.lang;
  const lang = ["ru", "kk", "en"].includes(langRaw) ? langRaw : "ru";

  if (!query) {
    return NextResponse.json({ ok: false, message: "Пустой запрос." }, { status: 400 });
  }
  if (query.length > MAX_QUERY_LENGTH) {
    return NextResponse.json(
      { ok: false, message: `Запрос слишком длинный (максимум ${MAX_QUERY_LENGTH} символов).` },
      { status: 400 }
    );
  }

  const candidates = plants.map((p) => ({
    id: p.id,
    nameRu: p.nameRu,
    nameKz: p.nameKz,
    latin: p.latin,
    family: p.family,
    habitat: p.habitat,
    lifeForm: p.lifeForm,
    flowerColor: p.flowerColor,
    leafType: p.leafType,
    description: p.description,
  }));

  try {
    const ids = await searchPlantsByDescription({ query, lang, candidates });
    return NextResponse.json({ ok: true, ids });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: `Поиск недоступен: ${err.message}` },
      { status: 502 }
    );
  }
}
