let originLat = null;
let originLon = null;

function computeOffset(lat, lon, distance, angle) {
  const earthRadius = 6378137;
  const deltaLat = (distance * Math.cos(angle * Math.PI / 180)) / earthRadius * (180 / Math.PI);
  const deltaLon = (distance * Math.sin(angle * Math.PI / 180)) / (earthRadius * Math.cos(lat * Math.PI / 180)) * (180 / Math.PI);
  return { lat: lat + deltaLat, lon: lon + deltaLon };
}

function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1 * Math.PI/180) *
            Math.cos(lat2 * Math.PI/180) *
            Math.sin(dLon/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

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
    }
  } catch (error) {
    console.error("Erro ao carregar system2.json:", error);
  }
}

function createPlanets(originLat, originLon, data) {
  const scene = document.querySelector("a-scene");

  data.planets.forEach((planet, index) => {
    const coords = computeOffset(originLat, originLon, planet.distance, index * 40);

    const planetEl = document.createElement("a-sphere");
    planetEl.setAttribute("gps-new-entity-place", { latitude: coords.lat, longitude: coords.lon });
    planetEl.setAttribute("radius", planet.size);
    planetEl.setAttribute("src", planet.texture);
    planetEl.setAttribute("name", planet.name);
    planetEl.setAttribute("dynamic-movement", {
      type: "spin",
      speed: planet.orbitSpeed,
      originLat: originLat,
      originLon: originLon,
      distance: planet.distance
    });
    planetEl.setAttribute("proximity-check", {
      range: 10,
      questions: JSON.stringify(planet.questions)
    });

    scene.appendChild(planetEl);
  });
}
