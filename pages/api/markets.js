export default async function handler(req, res) {
  try {
    const response = await fetch("https://clob.polymarket.com/markets", {
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    });

    const data = await response.json();

    // La liste des marchés est ici :
    const marketsRaw = data.data || [];

    // On filtre et reformate
    const markets = marketsRaw
      .filter((m) => m.best_bid != null && m.best_ask != null)
      .map((m) => ({
        slug: m.market_slug,
        question: m.question,
        bestBid: m.best_bid,
        bestAsk: m.best_ask,
        spread: m.best_ask - m.best_bid,
        volume: m.volume || 0,
      }))
      .sort((a, b) => b.spread - a.spread);

    res.status(200).json({ markets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
