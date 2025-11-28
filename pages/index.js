import { useEffect, useState } from "react";

export default function Home() {
  const [markets, setMarkets] = useState([]);

  const refresh = () => {
    fetch("/api/markets")
      .then((res) => res.json())
      .then((data) => setMarkets(data.markets || []));
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>Top marchés Polymarket par spread</h1>

      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
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
          {markets.map((m) => (
            <tr key={m.slug}>
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
