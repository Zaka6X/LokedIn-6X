document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the default form submission

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(form.action, {
      method: form.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    const messageDiv = document.querySelector("#message");
    const welcomemessage = document.querySelector("#welcome");
    if (!response.ok) {
      // Display error message
      messageDiv.innerHTML = `<span style="color: red;">${result.message}</span>`;
    } else {
      if (form.action.includes("/signup")) {
        window.location.href = "../login.html";
      } else if (form.action.includes("/login")) {
          // Store the username in localStorage
          localStorage.setItem("username", result.username);
      
          // Redirect to the dashboard
          window.location.href = "../dashboard.html";
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
});