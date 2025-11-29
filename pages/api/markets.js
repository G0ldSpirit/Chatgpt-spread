
export default async function handler(req, res) {
  try {
    const url = "https://gamma-api.polymarket.com/markets?limit=200&offset=0";

    const response = await fetch(url);
    const data = await response.json();

    // Sécurité : vérifier le format
    const list = data.markets || [];

    const markets = list
      .filter(m => m.bestBid !== null && m.bestAsk !== null)
      .map(m => ({
        slug: m.slug,
        question: m.question,
        bestBid: m.bestBid,
        bestAsk: m.bestAsk,
        spread: m.bestAsk - m.bestBid,
        volume: m.volumeNum ?? 0
      }))
      .sort((a, b) => b.spread - a.spread);

    res.status(200).json({ markets });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "API failed", details: err.toString() });
  }
}
