import { useEffect, useState } from "react";

export default function Home() {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/markets");
        const data = await res.json();
        setMarkets(data.markets || []);
      } catch (e) {
        console.error("Erreur:", e);
      }
      setLoading(false);
    }

    load();
    const interval = setInterval(load, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Chargement…</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Top marchés Polymarket par spread</h1>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Slug</th>
            <th>Question</th>
            <th>Bid</th>
            <th>Ask</th>
            <th>Spread</th>
            <th>Volume</th>
          </tr>
        </thead>

        <tbody>
          {markets.map((m, i) => (
            <tr key={i}>
              <td>{m.slug}</td>
              <td>{m.question}</td>
              <td>{m.bestBid}</td>
              <td>{m.bestAsk}</td>
              <td>{m.spread}</td>
              <td>{m.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
