const username = localStorage.getItem("username")?.toUpperCase();
if (username) {
    const welcomeElement = document.getElementById("welcome");
    if (welcomeElement) {
      welcomeElement.innerHTML = `<h1>Ravi de vous avoir, ${username}!</h1>`;
    } 
}

document.getElementById("logout").addEventListener("click", function(e) {
    e.preventDefault();
    fetch("/auth/logout")
      .then(() => {
        localStorage.clear();
        window.location.href = "index.html";
      })
      .catch(err => console.error("Erreur lors de la déconnexion :", err));
});