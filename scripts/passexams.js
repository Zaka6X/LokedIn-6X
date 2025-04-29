let examData = [];    // Will store all questions
let currentQuestion = 0;
let totalUserPoints = 0;
let totalMaxPoints = 0;
let timerInterval;
let timeLeft;

document.getElementById("getlinkform").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const link = document.getElementById("link").value.trim();
  if (!link) return;

  try {
    const response = await fetch("/auth/getquestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ link })
    });
    
    const data = await response.json();

    if (response.ok) {
      examData = data.questions;
      document.getElementById("getlinkform").style.display = "none";
      document.getElementById("questionarea").style.display = "block";
      showQuestion();
    } else {
      document.getElementById("message").innerHTML = `<span style="color: red;">${data.message}</span>`;
    }

  } catch (error) {
    console.error(error);
  }
});

function showQuestion() {
  if (currentQuestion >= examData.length) {
    endExam();
    return;
  }
  console.log("Received exam data:", examData);

  const q = examData[currentQuestion];

  document.getElementById("question-title").innerText = q.question_text;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = '';

  if (q.options && q.options.length > 0) {
    q.options.forEach(opt => {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "answer";
      radio.value = opt;
      radio.id = opt;

      const label = document.createElement("label");
      label.htmlFor = opt;
      label.innerText = opt;

      answersDiv.appendChild(radio);
      answersDiv.appendChild(label);
      answersDiv.appendChild(document.createElement("br"));
    });
  } else {
    const input = document.createElement("input");
    input.type = "text";
    input.name = "answer";
    input.id = "directAnswer";
    input.className = "form-control";

    answersDiv.appendChild(input);
  }

  startTimer(q.duree);
}

function startTimer(seconds) {
  clearInterval(timerInterval);
  timeLeft = seconds;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      validateAnswer();
    }
  }, 1000);
}

function updateTimerDisplay() {
  document.getElementById("timer").innerText = `Temps restant: ${timeLeft}s`;
}

document.getElementById("next-question").addEventListener("click", () => {
  clearInterval(timerInterval);
  validateAnswer();
});

function validateAnswer() {
    const q = examData[currentQuestion];
    let userAnswer = "";
  
    const selectedRadio = document.querySelector('input[name="answer"]:checked');
    const directInput = document.getElementById("directAnswer");
  
    if (selectedRadio) {
      userAnswer = selectedRadio.value;  // text of option
    } else if (directInput) {
      userAnswer = directInput.value.trim(); // user typed answer
    }
  
    totalMaxPoints += q.note;
  
    if (q.options && q.options.length > 0) {
      // QCM case
      const selectedIndex = Array.from(document.querySelectorAll('input[name="answer"]')).findIndex(r => r.checked);
      const selectedOpNbr = `OP${selectedIndex + 1}`; // example: OP1, OP2, OP3
  
      if (selectedOpNbr === q.reponse) {
        totalUserPoints += q.note;
      }
  
    } else {
      // Direct question case
      if (userAnswer.toLowerCase() === q.reponse.toLowerCase()) {
        totalUserPoints += q.note;
      }
    }
  
    currentQuestion++;
    showQuestion();
  }
  

function endExam() {
  document.getElementById("questionarea").style.display = "none";
  document.getElementById("final_note").style.display = "block";

  let finalScore = Math.round((totalUserPoints / totalMaxPoints) * 100);
  document.getElementById("affichenote").innerText = `Votre Note Finale: ${finalScore}%`;
}
