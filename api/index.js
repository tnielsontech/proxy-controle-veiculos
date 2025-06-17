export default async function handler(req, res) {
  const url = 'https://script.google.com/macros/s/AKfycbwUkYq3OGh_DB7ovV923MyXINmKKZM0fX8rChCs8T7U3lJn9YFbAsXW_PyPWDuJCgI/exec' + req.url;

  const response = await fetch(url, {
    method: req.method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: req.method === 'POST' ? await req.text() : undefined
  });

  const data = await response.text();
  res.status(200).send(data);
}
