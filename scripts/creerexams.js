
function switchType() {
    const type = document.querySelector('input[name="questionType"]:checked').value;
    document.getElementById('qcmSection').classList.remove('active');
    document.getElementById('directSection').classList.remove('active');

    if (type === 'qcm') {
    document.getElementById('qcmSection').classList.add('active');
    } else {
    document.getElementById('directSection').classList.add('active');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.querySelector("#directSection button");
    const directSection = document.querySelector("#directSection");

    addButton.addEventListener("click", () => {
        // Get the question and answer values
        const questionInput = directSection.querySelector("input[name='directQuestion']");
        const answerInput = directSection.querySelector("textarea[name='directAnswer']");

        const question = questionInput.value.trim();
        const answer = answerInput.value.trim();

        if (!question || !answer) {
            alert("Please fill in both the question and the answer.");
            return;
        }

        // Create a container for the question and answer
        const questionContainer = document.createElement("div");
        questionContainer.classList.add("question-container");

        // Add the question
        const questionElement = document.createElement("p");
        questionElement.innerHTML = `<strong>Question:</strong> ${question}`;
        questionContainer.appendChild(questionElement);

        // Add the answer
        const answerElement = document.createElement("p");
        answerElement.innerHTML = `<strong>Answer:</strong> ${answer}`;
        questionContainer.appendChild(answerElement);

        // Append the container to the section
        directSection.appendChild(questionContainer);

        // Clear the input fields
        questionInput.value = "";
        answerInput.value = "";
    });
});