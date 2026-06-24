// Small labelled number used in the dashboard summary strip.
export default function Stat({ label, value }) {
  return (
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
