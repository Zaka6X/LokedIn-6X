document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Fix here: handle multiple options
    const options = formData.getAll('options[]');
    if (options.length > 0) {
      data.options = options;
    }

    const userId = localStorage.getItem("userId");
    if (userId) {
      data.userId = userId;
    }

    try {
      const response = await fetch(form.action, {
        method: form.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      const messageDiv = document.querySelector("#message");

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

          const examIdInputs = document.querySelectorAll("#examIdQCM, #examIdDQ");
          examIdInputs.forEach(input => {
              if (input) input.value = result.id;
          });

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
    }
  });
});


["creationDoneQCM", "creationDoneDQ"].forEach(id => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener("click", function() {
      const examLink = document.getElementById("examLinkDisplay").value;
      if (examLink) {
        document.getElementById("Qcm-question").style.display = "none";
        document.getElementById("Dq-question").style.display = "none";
        document.getElementById("examCreatedBox").style.display = "block";
      }
    });
  }
});


