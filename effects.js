function createOrbitWithCircles(scene, lat, lon, distance) {
  const orbit = document.createElement("a-entity");
  orbit.setAttribute("geometry", `primitive: torus; radius: ${distance}; radiusTubular: 0.05`);
  orbit.setAttribute("rotation", "-90 0 0");
  orbit.setAttribute("material", "color: gray; opacity: 0.5");
  orbit.setAttribute("gps-new-entity-place", `latitude: ${lat}; longitude: ${lon}`);
  scene.appendChild(orbit);
}

function showCompletionMark(planetName) {
  const planet = document.getElementById(planetName);
  if (!planet) return;

  const mark = document.createElement("a-entity");
  mark.setAttribute("geometry", "primitive: ring; radiusInner: 0.3; radiusOuter: 0.5");
  mark.setAttribute("material", "color: green; opacity: 0.8");
  mark.setAttribute("rotation", "-90 0 0");
  planet.appendChild(mark);
}
