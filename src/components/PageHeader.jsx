export default function PageHeader({ title, subtitle }) {
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">VNBean Executive Dashboard</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </header>
  );
}
