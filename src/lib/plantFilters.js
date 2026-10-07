export function distinctValues(plants, field) {
  return Array.from(new Set(plants.map((p) => p[field]).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, "ru")
  );
}

export function distinctHabitats(plants) {
  const set = new Set();
  plants.forEach((p) => (p.habitat || []).forEach((h) => set.add(h)));
  return Array.from(set).sort((a, b) => a.localeCompare(b, "ru"));
}

export function matchesSearch(plant, query) {
  if (!query) return true;
  const q = query.trim().toLowerCase();
  return (
    plant.nameRu.toLowerCase().includes(q) ||
    plant.nameKz.toLowerCase().includes(q) ||
    plant.latin.toLowerCase().includes(q)
  );
}
