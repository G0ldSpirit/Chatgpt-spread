export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://gamma-api.polymarket.com/markets?limit=200&offset=0",
      {
        headers: {
          accept: "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    const marketsRaw = data.markets || [];

    const markets = marketsRaw
      .filter((m) => m.bestBid != null && m.bestAsk != null)
      .map((m) => ({
        slug: m.slug,
        question: m.question,
        bestBid: m.bestBid,
        bestAsk: m.bestAsk,
        spread: m.bestAsk - m.bestBid,
        volume: m.volumeNum || 0,
      }))
      .sort((a, b) => b.spread - a.spread);

    res.status(200).json({ markets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
