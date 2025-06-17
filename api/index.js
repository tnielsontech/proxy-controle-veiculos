export default async function handler(req, res) {
  const baseURL = "https://script.google.com/macros/s/AKfycbymvlZV1ffXO9w_Q71Rn4LW8b8kVdFsXhs8gdSdwMDtNxwGKhS8_ECMBpp8oaZXAdY/exec";

  const queryString = req.url.split('?')[1] || '';
  const url = `${baseURL}?${queryString}`;

  const fetchOptions = {
    method: req.method,
  };

  if (req.method === 'POST') {
    const body = await req.text();
    fetchOptions.body = body;
    fetchOptions.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  }

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }

  try {
    const response = await fetch(url, fetchOptions);
    const data = await response.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.status(200).send(data);
  } catch (error) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.status(500).send('Erro no proxy: ' + error.toString());
  }
}
