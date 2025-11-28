export default async function handler(req, res) {
  try {
    const response = await fetch("https://clob.polymarket.com/markets", {
      headers: { "accept": "application/json" },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Polymarket API returned " + response.status);
    }

    const data = await response.json();

    const markets = data
      .filter(m => m.bestBid != null && m.bestAsk != null)
      .map(m => ({
        slug: m.slug,
        question: m.question,
        bestBid: m.bestBid,
        bestAsk: m.bestAsk,
        spread: m.bestAsk - m.bestBid,
        volume: m.volume24hr || 0
      }))
      .sort((a, b) => b.spread - a.spread);

    res.status(200).json({ markets });

  } catch (err) {
    console.error("API ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}
