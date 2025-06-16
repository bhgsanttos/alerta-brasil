document.addEventListener("DOMContentLoaded", async () => {
  const map = L.map("map").setView([-14.235, -51.9253], 4);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  try {
    const response = await fetch("/api/avisos");
    const data = await response.json();

    Object.values(data).forEach(alerta => {
      const { id, estado, municipio, latitude, longitude, texto } = alerta;
      if (latitude && longitude) {
        L.marker([parseFloat(latitude), parseFloat(longitude)])
          .addTo(map)
          .bindPopup(`<strong>${municipio || estado}</strong><br>${texto}`);
      }
    });
  } catch (error) {
    alert("Erro ao carregar dados da Defesa Civil.");
  }

  document.getElementById("notify").addEventListener("click", () => {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("Notificações ativadas para alertas da Defesa Civil.");
      }
    });
  });
});
