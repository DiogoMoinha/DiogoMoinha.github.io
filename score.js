let score = 0;

function updateScore(points) {
  score += points;
  updateScoreDisplay();
}

function updateScoreDisplay() {
  document.getElementById("scoreDisplay").textContent = `Pontuação: ${score}`;
}
