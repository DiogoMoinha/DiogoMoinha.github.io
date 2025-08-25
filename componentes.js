function showDescription(name, text) {
  document.getElementById("descPlanetName").textContent = name;
  document.getElementById("descPlanetText").textContent = text;
  document.getElementById("descriptionModal").style.display = "block";
}

function closeDescription() {
  document.getElementById("descriptionModal").style.display = "none";
}
