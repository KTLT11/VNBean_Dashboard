export default function InsightBox({ title = "Góc nhìn điều hành", items }) {
  return (
    <aside className="insight-box">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
