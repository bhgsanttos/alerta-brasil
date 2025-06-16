export default async function handler(req, res) {
  try {
    const response = await fetch("https://apide.alerta.defesacivil.gov.br/api/public/alertas");
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.status}`);
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar os alertas", detalhe: error.message });
  }
}
