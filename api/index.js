export default async function handler(req, res) {
  const baseURL = "https://script.google.com/macros/s/AKfycbymvlZV1ffXO9w_Q71Rn4LW8b8kVdFsXhs8gdSdwMDtNxwGKhS8_ECMBpp8oaZXAdY/exec";
  const query = req.url.split('?')[1] || '';
  const url = `${baseURL}?${query}`;

  const fetchOptions = {
    method: req.method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  if (req.method === "POST") {
    fetchOptions.body = await req.text();
  }

  try {
    const response = await fetch(url, fetchOptions);
    const text = await response.text();

    // ✅ Cabeçalhos para CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    res.status(200).send(text);
  } catch (error) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).send("Erro no proxy: " + error.toString());
  }
}

