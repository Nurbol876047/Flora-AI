export default function ConfidenceBar({ value, label }) {
  const pct = typeof value === "number" ? Math.max(0, Math.min(100, value)) : null;

  return (
    <div>
      {label && (
        <div className="label-mono" style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{label}</span>
          <span className="confidence-value">{pct !== null ? `${pct}%` : "—"}</span>
        </div>
      )}
      <div className="confidence-bar">
        <div className="confidence-bar__fill" style={{ width: `${pct ?? 0}%` }} />
      </div>
    </div>
  );
}
