export default async function handler(req, res) {
  const baseURL = "https://script.google.com/macros/s/AKfycbymvlZV1ffXO9w_Q71Rn4LW8b8kVdFsXhs8gdSdwMDtNxwGKhS8_ECMBpp8oaZXAdY/exec";

  const queryString = req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : "";
  const url = `${baseURL}${queryString}`;

  const fetchOptions = {
    method: req.method,
  };

  if (req.method === "POST") {
    fetchOptions.body = new URLSearchParams(await req.text());
    fetchOptions.headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
  }

  try {
    const response = await fetch(url, fetchOptions);
    const text = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({ error: "Erro ao conectar com o Apps Script" });
  }
}
