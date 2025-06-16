import fetch from 'node-fetch';

export default async function (req, res) {
  try {
    const response = await fetch('https://apiprevmet3.inmet.gov.br/avisos');
    const json = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(json);
  } catch (err) {
    res.status(500).json({ error: 'Falha ao buscar avisos' });
  }
}
