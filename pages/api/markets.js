
export default async function handler(req, res) {
  try {
    const response = await fetch("https://clob.polymarket.com/markets", {
      headers: { accept: "application/json" },
      cache: "no-store"
    });

    const data = await response.json();

    // Pour debug : on renvoie TOUT ce que Polymarket envoie
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
