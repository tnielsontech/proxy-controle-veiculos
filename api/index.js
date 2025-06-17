export default async function handler(req, res) {
  const url = 'https://script.google.com/macros/s/AKfycbymvlZV1ffXO9w_Q71Rn4LW8b8kVdFsXhs8gdSdwMDtNxwGKhS8_ECMBpp8oaZXAdY/exec' + req.url;

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
