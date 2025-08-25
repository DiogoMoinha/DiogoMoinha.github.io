let originLat, originLon;

async function initPlanetas() {
  try {
    const response = await fetch('system2.json');
    const data = await response.json();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          originLat = position.coords.latitude;
          originLon = position.coords.longitude;
          createPlanets(originLat, originLon, data);
        },
        (error) => console.error("Erro ao obter localização:", error),
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocalização não suportada.");
    }
  } catch (error) {
    console.error("Erro ao carregar system2.json:", error);
  }
}

function createPlanets(lat, lon, data) {
  const scene = document.querySelector("a-scene");

  data.planets.forEach((planet) => {
    const entity = document.createElement("a-entity");
    entity.setAttribute("geometry", `primitive: sphere; radius: ${planet.size}`);
    entity.setAttribute("material", `src: ${planet.texture}`);
    entity.setAttribute("gps-new-entity-place", `latitude: ${lat}; longitude: ${lon + planet.distance}`);
    entity.setAttribute("scale", `${planet.scale} ${planet.scale} ${planet.scale}`);
    entity.setAttribute("id", planet.name);

    // Click → descrição
    entity.addEventListener("click", () => {
      showDescription(planet.name, planet.description);
    });

    scene.appendChild(entity);

    // Adicionar órbita
    createOrbitWithCircles(scene, lat, lon, planet.distance);
  });
}
