document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Handle multiple options (for QCM)
    const options = formData.getAll('options[]');
    if (options.length > 0) {
      data.options = options;
    }

    const userId = localStorage.getItem("userId");
    if (userId) {
      data.userId = userId;
    }

    const messageDiv = form.querySelector("#messageQCM") || form.querySelector("#messageDQ") || form.querySelector("#message");

    try {
      const response = await fetch(form.action, {
        method: form.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        messageDiv.innerHTML = `<span style="color: red;">${result.message}</span>`;
      } else {
        if (form.action.includes("/signup")) {
          window.location.href = "../login.html";
        } else if (form.action.includes("/login")) {
          localStorage.setItem("username", result.username);
          localStorage.setItem("userId", result.userId);
          window.location.href = "../dashboard.html";
        } else if (form.action.includes("/creerexam")) {
          localStorage.setItem("examId", result.id);
          document.querySelectorAll("#examIdQCM, #examIdDQ").forEach(input => input.value = result.id);
          document.getElementById("examLinkDisplay").value = result.link;
          typequestion();
        } else if (form.action.includes("/addquestion")) {
          messageDiv.innerHTML = `<span style="color: green;">${result.message}</span>`;
          form.reset();

          if (form.id === "Qcm-question") {
            document.getElementById("optionList").innerHTML = "";
            updateAnswerSelect();
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      messageDiv.innerHTML = `<span style="color: red;">${result.message}</span>`;
    }
  });
});

// Finalizing QCM
const creationDoneQCM = document.getElementById("creationDoneQCM");
if (creationDoneQCM) {
  creationDoneQCM.addEventListener("click", async function () {
    const examLinkInput = document.getElementById("examLinkDisplay");
    const messageDiv = document.querySelector("#messageQCM");

    const oneChecked = Array.from(document.querySelectorAll('#Qcm-question input[name="answer"]')).some(cb => cb.checked);
    if (!oneChecked) {
      messageDiv.innerHTML = `<span style="color: red;">Veuillez sélectionner une option correcte avant de finaliser l'examen.</span>`;
      return;
    }

    try {
      const response = await fetch("/auth/validateExam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: examLinkInput.value }),
      });

      const result = await response.json();

      if (response.ok) {
        messageDiv.innerHTML = `<span style="color: green;">${result.message || "Examen validé avec succès !"}</span>`;
        document.getElementById("Qcm-question").style.display = "none";
        document.getElementById("Dq-question").style.display = "none";
        document.getElementById("afterCreationContainer").style.display = "none";
        document.getElementById("examCreatedBox").style.display = "block";
        document.querySelector(".form-container").classList.remove("wide-container");
      } else {
        messageDiv.innerHTML = `<span style="color: red;">${result.message || "Échec de la validation."}</span>`;
      }
    } catch (error) {
      console.error("Error:", error);
      messageDiv.innerHTML = `<span style="color: red;">Erreur serveur. Veuillez réessayer.</span>`;
    }
  });
}

// Finalizing DQ
const creationDoneDQ = document.getElementById("creationDoneDQ");
if (creationDoneDQ) {
  creationDoneDQ.addEventListener("click", async function () {
    const examLinkInput = document.getElementById("examLinkDisplay");
    const messageDiv = document.querySelector("#messageDQ");

    try {
      const response = await fetch("/auth/validateExam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: examLinkInput.value }),
      });

      const result = await response.json();

      if (response.ok) {
        messageDiv.innerHTML = `<span style="color: green;">${result.message || "Examen validé avec succès !"}</span>`;
        document.getElementById("Qcm-question").style.display = "none";
        document.getElementById("Dq-question").style.display = "none";
        document.getElementById("afterCreationContainer").style.display = "none";
        document.getElementById("examCreatedBox").style.display = "block";
        document.querySelector(".form-container").classList.remove("wide-container");
      } else {
        messageDiv.innerHTML = `<span style="color: red;">${result.message || "Échec de la validation."}</span>`;
      }
    } catch (error) {
      console.error("Error:", error);
      messageDiv.innerHTML = `<span style="color: red;">Erreur serveur. Veuillez réessayer.</span>`;
    }
  });
}
