import developer from "./assets/developer.jpg";

const PANELS = [0, 1, 2, 3, 4];
const OUT_ORDER = [0, 2, 0, 3, 1];

export default function App() {
  return (
    <main className="reveal">
      <div className="reveal-wipe" />
      {PANELS.map((i) => (
        <div
          key={i}
          className={i === 2 ? "reveal-panel reveal-panel--main" : "reveal-panel"}
          style={{ "--i": i, "--o": i - 2, "--k": OUT_ORDER[i] }}
        >
          <img src={developer} alt={i === 2 ? "Developer portrait with flowers" : ""} draggable={false} />
        </div>
      ))}
      <h1 className="reveal-word">developer</h1>
    </main>
  );
}
