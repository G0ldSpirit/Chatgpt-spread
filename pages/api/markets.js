
export default async function handler(req, res) {
  try {
    const r = await fetch("https://gamma-api.polymarket.com/markets?limit=10&offset=0");
    const j = await r.json();

    console.log("RAW DATA:", j); // log vercel
    res.status(200).json(j);      // renvoie brut
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
}
