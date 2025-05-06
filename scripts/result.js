document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const messageDiv = form.querySelector("#messageQCM") || form.querySelector("#messageDQ") || form.querySelector("#message");

    const isAddQuestion = form.action.includes("/addquestion");
    const isCreateExam = form.action.includes("/creerexam");
    const useFormData = isAddQuestion || isCreateExam;

    try {
      let result;

      if (useFormData) {
        const formData = new FormData(form);

        // Add userId from localStorage
        const userId = localStorage.getItem("userId");
        if (userId) formData.append("userId", userId);

        // Validate QCM checkbox
        if (form.id === "Qcm-question") {
          const checkboxes = form.querySelectorAll('input[name="answer"]');
          const oneChecked = Array.from(checkboxes).some(cb => cb.checked);
          if (!oneChecked) {
            messageDiv.innerHTML = `<span style="color: red;">Veuillez sélectionner une option correcte.</span>`;
            return;
          }
        }

        const response = await fetch(form.action, {
          method: form.method,
          body: formData
        });

        const text = await response.text();
        try {
          result = JSON.parse(text);
        } catch (e) {
          messageDiv.innerHTML = `<span style="color: red;">Erreur serveur : réponse invalide.</span>`;
          return;
        }

        if (!response.ok) {
          messageDiv.innerHTML = `<span style="color: red;">${result.message || "Erreur serveur."}</span>`;
          return;
        }

      } else {
        // Handle simple JSON-based forms (login, signup)
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const userId = localStorage.getItem("userId");
        if (userId) data.userId = userId;

        const response = await fetch(form.action, {
          method: form.method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        result = await response.json();
        if (!response.ok) {
          messageDiv.innerHTML = `<span style="color: red;">${result.message}</span>`;
          return;
        }
      }

      // Success flow
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
        typequestion(result.examTitle); // show question section

      } else if (form.action.includes("/addquestion")) {
        messageDiv.innerHTML = `<span style="color: green;">${result.message}</span>`;
        form.reset();
        if (form.id === "Qcm-question") {
          document.getElementById("optionList").innerHTML = "";
        }
      }

    } catch (error) {
      messageDiv.innerHTML = `<span style="color: red;">Erreur interne ou réseau.</span>`;
    }
  });
});


// ✅ Finalize QCM exam
const creationDoneQCM = document.getElementById("creationDoneQCM");
if (creationDoneQCM) {
  creationDoneQCM.addEventListener("click", async () => {
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
      messageDiv.innerHTML = `<span style="color: red;">Erreur serveur. Veuillez réessayer.</span>`;
    }
  });
}


// ✅ Finalize DQ exam
const creationDoneDQ = document.getElementById("creationDoneDQ");
if (creationDoneDQ) {
  creationDoneDQ.addEventListener("click", async () => {
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
      messageDiv.innerHTML = `<span style="color: red;">Erreur serveur. Veuillez réessayer.</span>`;
    }
  });
}
