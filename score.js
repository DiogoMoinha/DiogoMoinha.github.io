let score = 0;
let pontos = 4;
let completedPlanets = [];

function updateScoreDisplay() {
  document.getElementById("scoreDisplay").textContent = "Pontuação: " + score;
  localStorage.setItem("solar_quiz_score", score);
}

function markPlanetAsCompleted(planetName) {
  if (!completedPlanets.includes(planetName)) {
    completedPlanets.push(planetName);
    localStorage.setItem("completedPlanets", JSON.stringify(completedPlanets));
  }
}
