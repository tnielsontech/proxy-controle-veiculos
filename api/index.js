export default async function handler(req, res) {
  const baseURL = "https://script.google.com/macros/s/AKfycbymvlZV1ffXO9w_Q71Rn4LW8b8kVdFsXhs8gdSdwMDtNxwGKhS8_ECMBpp8oaZXAdY/exec";
  const queryString = req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : "";
  const url = `${baseURL}${queryString}`;

  const fetchOptions = {
    method: req.method,
  };

  if (req.method === "POST") {
    fetchOptions.body = await req.text();
    fetchOptions.headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
  }

  try {
    const response = await fetch(url, fetchOptions);
    const text = await response.text();

    // 🔥 Libera CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(text);
  } catch (e) {
    console.error(e);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).send("Erro no proxy.");
  }
}
