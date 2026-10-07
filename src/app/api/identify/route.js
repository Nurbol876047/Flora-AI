import { NextResponse } from "next/server";
import { identifyWithPlantnet } from "@/lib/plantnet";
import { enrichWithLLM } from "@/lib/llm";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 МБ

export async function POST(request) {
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Не удалось прочитать запрос (ожидается multipart/form-data)." },
      { status: 400 }
    );
  }

  const file = formData.get("photo");
  const organ = formData.get("organ") || "leaf";
  const langRaw = formData.get("lang");
  const lang = ["ru", "kk", "en"].includes(langRaw) ? langRaw : "ru";

  if (!file || typeof file === "string") {
    return NextResponse.json({ ok: false, message: "Фотография не найдена в запросе." }, { status: 400 });
  }

  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json(
      { ok: false, message: "Файл слишком большой (максимум 10 МБ)." },
      { status: 400 }
    );
  }

  const mimeType = file.type || "image/jpeg";
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const imageBase64 = buffer.toString("base64");

  let plantnetResults = null;
  let plantnetError = null;
  try {
    plantnetResults = await identifyWithPlantnet(buffer, mimeType, organ);
    if (!plantnetResults || plantnetResults.length === 0) {
      plantnetResults = null;
      plantnetError = "Pl@ntNet не вернул результатов";
    }
  } catch (err) {
    plantnetError = err.message;
  }

  const fallbackUsed = !plantnetResults;

  let llmResult;
  try {
    llmResult = await enrichWithLLM({
      imageBase64,
      mimeType,
      plantnetResults,
      lang,
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        message: `Определение недоступно: ${err.message}`,
        plantnetError,
      },
      { status: 502 }
    );
  }

  const confidence = fallbackUsed
    ? llmResult.self_confidence
    : Math.round(plantnetResults[0].score * 100);

  const lowConfidence = typeof confidence === "number" && confidence < 50;

  return NextResponse.json({
    ok: true,
    organ,
    fallbackUsed,
    plantnetError: fallbackUsed ? plantnetError : null,
    plantnetResults,
    confidence: typeof confidence === "number" ? confidence : null,
    lowConfidence,
    result: llmResult,
  });
}
