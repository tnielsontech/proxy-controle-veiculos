export default async function handler(req, res) {
  const baseURL = "https://script.google.com/macros/s/AKfycbymvlZV1ffXO9w_Q71Rn4LW8b8kVdFsXhs8gdSdwMDtNxwGKhS8_ECMBpp8oaZXAdY/exec";

  if (req.method === "GET") {
    try {
      const url = `${baseURL}?getDados=1`;
      const response = await fetch(url);
      const data = await response.json();

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar dados GET", detalhe: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const body = await req.json();

      const params = new URLSearchParams();
      for (const key in body) {
        params.append(key, body[key]);
      }

      const response = await fetch(baseURL, {
        method: "POST",
        body: params,
      });

      const text = await response.text();

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).send(text);
    } catch (error) {
      res.status(500).json({ error: "Erro ao enviar dados POST", detalhe: error.message });
    }
  }

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).end();
  }
}
