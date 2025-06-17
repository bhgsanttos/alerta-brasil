// Carrega os alertas da API
async function carregarAlertas() {
  try {
    const resposta = await fetch('/api/avisos');
    const dados = await resposta.json();

    const lista = document.getElementById("alertList");
    lista.innerHTML = '';

    dados.forEach(alerta => {
      const item = document.createElement("li");
      item.textContent = `${alerta.municipio} - ${alerta.uf}: ${alerta.descricao}`;
      lista.appendChild(item);
    });
  } catch (erro) {
    console.error("Erro ao carregar alertas:", erro);
  }
}

// Filtra alertas com base na busca
function buscarAlertasPorTexto(texto) {
  const textoLower = texto.toLowerCase();
  const alertas = document.querySelectorAll("#alertList li");

  alertas.forEach(alerta => {
    const visivel = alerta.textContent.toLowerCase().includes(textoLower);
    alerta.style.display = visivel ? "block" : "none";
  });
}

// Ações ao clicar no botão "Buscar"
document.getElementById("searchBtn").addEventListener("click", () => {
  const texto = document.getElementById("search").value;
  buscarAlertasPorTexto(texto);
});

// Ações ao pressionar Enter no campo de busca
document.getElementById("search").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const texto = document.getElementById("search").value;
    buscarAlertasPorTexto(texto);
  }
});

// Carrega os alertas ao iniciar
carregarAlertas();
