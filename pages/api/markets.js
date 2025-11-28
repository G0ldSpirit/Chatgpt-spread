export default async function handler(req, res) {
  try {
    const url =
      "https://gamma-api.polymarket.com/events?order=id&ascending=false&closed=false&limit=50";

    const response = await fetch(url);
    const data = await response.json();

    let markets = [];

    (data.events || []).forEach((ev) => {
      (ev.markets || []).forEach((m) => {
        if (!m.bestBid || !m.bestAsk) return;

        markets.push({
          slug: m.slug,
          question: m.question,
          bestBid: m.bestBid,
          bestAsk: m.bestAsk,
          spread: m.bestAsk - m.bestBid,
          volume: m.volumeNum || 0
        });
      });
    });

    markets.sort((a, b) => b.spread - a.spread);

    res.json({ markets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "API failed", details: err.message });
  }
}
