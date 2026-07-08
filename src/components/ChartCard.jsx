export default function ChartCard({ title, subtitle, children, className = "" }) {
  return (
    <section className={`chart-card ${className}`}>
      <div className="chart-card__header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>
      <div className="chart-card__body">{children}</div>
    </section>
  );
}
