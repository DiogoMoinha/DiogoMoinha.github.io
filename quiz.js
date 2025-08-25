function showQuiz(planet) {
  const modal = document.getElementById("quizModal");
  document.getElementById("quizPlanetName").textContent = planet.name;
  document.getElementById("quizQuestion").textContent = planet.quiz.question;

  const answersDiv = document.getElementById("quizAnswers");
  answersDiv.innerHTML = "";

  planet.quiz.answers.forEach((ans) => {
    const btn = document.createElement("button");
    btn.textContent = ans.text;
    btn.onclick = () => checkAnswer(planet, ans.correct);
    answersDiv.appendChild(btn);
  });

  modal.style.display = "block";
}

function checkAnswer(planet, correct) {
  const modal = document.getElementById("quizModal");
  modal.style.display = "none";

  if (correct) {
    updateScore(10);
    showCompletionMark(planet.name);
  } else {
    updateScore(-5);
  }
}
