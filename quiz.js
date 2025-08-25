function showQuizModal(planetName, questions, onAnswered) {
  const modal = document.getElementById("quizModal");
  const title = document.getElementById("quizPlanetName");
  const questionEl = document.getElementById("quizQuestion");
  const answersEl = document.getElementById("quizAnswers");

  title.textContent = planetName;
  const current = questions[0];
  questionEl.textContent = current.q;
  answersEl.innerHTML = "";

  current.answers.forEach((answer, i) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => {
      if (i === current.rightAnswer) {
        score += 10;
        updateScoreDisplay();
        modal.style.display = "none";
        onAnswered(true);
      } else {
        score -= 5;
        updateScoreDisplay();
        btn.style.backgroundColor = "red";
      }
    };
    answersEl.appendChild(btn);
  });

  modal.style.display = "block";
}
