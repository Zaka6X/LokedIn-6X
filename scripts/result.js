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
            showToast("Veuillez sélectionner une option correcte.", false);
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
          showToast(result.message || "Erreur de connexion", false);
          return;
        }
      }

      // Success flow
      if (form.action.includes("/signup")) {
        localStorage.setItem("toastMessage", JSON.stringify({ text: "Inscription réussie !", type: "success" }));
        window.location.href = "../login.html";
      } else if (form.action.includes("/login")) {
        localStorage.setItem("username", result.username);
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("toastMessage", JSON.stringify({ text: "Connexion réussie !", type: "success" }));
        window.location.href = "../dashboard.html";
      } else if (form.action.includes("/creerexam")) {
        localStorage.setItem("examId", result.id);
        document.querySelectorAll("#examIdQCM, #examIdDQ").forEach(input => input.value = result.id);
        document.getElementById("examLinkDisplay").value = result.link;
        typequestion(result.examTitle); // show question section
        showToast("Exam est bien créer !", true);

      } else if (form.action.includes("/addquestion")) {
        showToast(result.message, true);
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

    const oneChecked = Array.from(document.querySelectorAll('#Qcm-question input[name="answer"]')).some(cb => cb.checked);
    if (!oneChecked) {
      return;
    }

    try {
      console.log(examLinkInput)
      const response = await fetch("/auth/validateExam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: examLinkInput.value }),
      });

      const result = await response.json();
      if (response.ok) {
        showToast(result.message || "Examen validé avec succès !", true);
        document.getElementById("Qcm-question").style.display = "none";
        document.getElementById("Dq-question").style.display = "none";
        document.getElementById("afterCreationContainer").style.display = "none";
        document.getElementById("examCreatedBox").style.display = "block";
        document.querySelector(".form-container").classList.remove("wide-container");
      } else {
        showToast(result.message || "Échec de la validation.", false);
      }
    } catch (error) {
      showToast("Erreur serveur. Veuillez réessayer.", false);
    }
  });
}


// ✅ Finalize DQ exam
const creationDoneDQ = document.getElementById("creationDoneDQ");
if (creationDoneDQ) {
  creationDoneDQ.addEventListener("click", async () => {
    const examLinkInput = document.getElementById("examLinkDisplay");

    try {
      const response = await fetch("/auth/validateExam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: examLinkInput.value }),
      });

      const result = await response.json();
      if (response.ok) {
        showToast(result.message || "Examen validé avec succès !", true);
        document.getElementById("Qcm-question").style.display = "none";
        document.getElementById("Dq-question").style.display = "none";
        document.getElementById("afterCreationContainer").style.display = "none";
        document.getElementById("examCreatedBox").style.display = "block";
        document.querySelector(".form-container").classList.remove("wide-container");
      } else {
        showToast(result.message || "Échec de la validation.", false);
      }
    } catch (error) {
      showToast("Erreur serveur. Veuillez réessayer.", false);
    }
  });
}

function showToast(message, isSuccess = true) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast-message ${isSuccess ? "toast-success" : "toast-error"}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (toast.parentElement === container) {
      container.removeChild(toast);
    }
  }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
  const toastData = localStorage.getItem("toastMessage");
  if (toastData) {
    const { text, type } = JSON.parse(toastData);
    showToast(text, type === "success");
    localStorage.removeItem("toastMessage");
  }
});
