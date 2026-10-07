import redbookData from "@/data/redbook.json";
import plantsData from "@/data/plants.json";
import redbookPlantsData from "@/data/redbookPlants.json";

/** Сводит латинское название к "Род вид" в нижнем регистре для сравнения. */
export function normalizeLatin(name) {
  if (!name) return "";
  const parts = name.trim().toLowerCase().replace(/[.,]/g, "").split(/\s+/);
  return parts.slice(0, 2).join(" ");
}

const redbookSet = new Set((redbookData.species || []).map(normalizeLatin));

/**
 * Проверяет, является ли вид охраняемым: по справочнику redbook.json
 * ИЛИ по полю redBook у совпадающей записи в каталоге plants.json.
 */
export function isRedBookSpecies(latinName) {
  const key = normalizeLatin(latinName);
  if (!key) return false;
  if (redbookSet.has(key)) return true;
  return plantsData.some((p) => p.redBook && normalizeLatin(p.latin) === key);
}

export function findPlantByLatin(latinName) {
  const key = normalizeLatin(latinName);
  if (!key) return null;
  return plantsData.find((p) => normalizeLatin(p.latin) === key) || null;
}

export const redbookDisclaimer = redbookData._disclaimer || "";
export const redbookSpeciesList = redbookData.species || [];
export const redbookPlants = redbookPlantsData;
