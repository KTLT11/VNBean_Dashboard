export default function MetricCard({ label, value, caption, tone = "primary" }) {
  return (
    <section className={`metric-card metric-card--${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{caption}</small>
    </section>
  );
}
