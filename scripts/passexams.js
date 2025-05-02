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
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            await fetch("/auth/save-location", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ latitude, longitude })
            });
      
            // Now start exam only after location is sent
            examData = data.questions;
            document.getElementById("getlinkform").style.display = "none";
            document.getElementById("questionarea").style.display = "block";
            document.querySelector(".form-container").classList.add("show-questions");
            showQuestion();
      
          } catch (err) {
            console.error("Erreur d'envoi de la géolocalisation :", err);
          }
        },
        (error) => {
          console.error("Géolocalisation refusée ou échouée :", error);
          alert("Vous devez accepter la géolocalisation pour commencer l'examen.");
        }
      );
      
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
        const inputWrapper = document.createElement("div");
        inputWrapper.className = "border rounded p-3 mb-3 bg-light";

        const input = document.createElement("input");
        input.type = "text";
        input.name = "answer";
        input.id = "directAnswer";
        input.className = "form-control";           
        input.placeholder = "Votre réponse ici...";

        inputWrapper.appendChild(input);
        answersDiv.appendChild(inputWrapper);

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
      // Direct question case with tolerance
      const correctAnswer = q.reponse.trim().toLowerCase();
      const user = userAnswer.trim().toLowerCase();
    
      const tolerance = parseFloat(q.tolerance);  // "10%" => 10
      if (!isNaN(tolerance) && tolerance > 0) {
        const distance = levenshteinDistance(correctAnswer, user);
        const percentDiff = (distance / correctAnswer.length) * 100;
    
        if (percentDiff <= tolerance) {
          totalUserPoints += q.note;
        }
      } else {
        // Exact match
        if (user === correctAnswer) {
          totalUserPoints += q.note;
        }
      }
    }
    
  
    currentQuestion++;
    showQuestion();
  }
  

function endExam() {
  document.getElementById("questionarea").style.display = "none";
  document.getElementById("final_note").style.display = "block";

  // Remove the special layout class from form-container
  document.querySelector(".form-container").classList.remove("show-questions");

  let finalScore = Math.round((totalUserPoints / totalMaxPoints) * 100);
  document.getElementById("affichenote").innerText = `Votre Note Finale: ${finalScore}/100`;
}

function enregistrerGeolocalisation() {
  if (!navigator.geolocation) {
    console.log("La géolocalisation n'est pas supportée par ce navigateur.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Afficher dans la console (ou sur la page si tu veux)
      console.log("Latitude:", latitude, "Longitude:", longitude);

      // Envoi vers le serveur (ex. : pour enregistrement en BDD)
      fetch("/auth/save-location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ latitude, longitude })
      }).then(res => res.json())
        .then(data => {
          console.log("Coordonnées enregistrées :", data);
        })
        .catch(err => {
          console.error("Erreur lors de l'envoi des coordonnées :", err);
        });
    },
    (error) => {
      console.error("Erreur de géolocalisation :", error);
    }
  );
}

function levenshteinDistance(a, b) {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}
