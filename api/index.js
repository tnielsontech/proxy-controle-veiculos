export default async function handler(req, res) {
  const baseURL = "https://script.google.com/macros/s/AKfycbymvlZV1ffXO9w_Q71Rn4LW8b8kVdFsXhs8gdSdwMDtNxwGKhS8_ECMBpp8oaZXAdY/exec";

  if (req.method === "GET") {
    const { getDados } = req.query;
    const url = getDados ? `${baseURL}?getDados=1` : baseURL;

    try {
      const response = await fetch(url);
      const dados = await response.json();
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json(dados);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar dados." });
    }
  }

  if (req.method === "POST") {
    const params = new URLSearchParams(req.body).toString();
    const url = `${baseURL}?${params}`;

    try {
      const response = await fetch(url, { method: "POST" });
      const text = await response.text();
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).send(text);
    } catch (error) {
      res.status(500).json({ error: "Erro ao enviar dados." });
    }
  }
}
