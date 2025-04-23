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
    if (!response.ok) {
      // Display error message
      messageDiv.innerHTML = `<span style="color: red;">${result.message}</span>`;
    } else {
      window.location.href = "../index.html"; // Change to your desired redirect URL
    }
  } catch (error) {
    console.error("Error:", error);
  }
});