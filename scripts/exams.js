function typequestion(){
    // Hide the initial form and show the after-creation form
    document.getElementById("examForm").style.display = "none";
    document.getElementById("Questiontype").style.display = "block";
    document.getElementById("form-title").innerHTML = "Type de Question";

}



document.getElementById("nextButton").addEventListener("click", function() {
    const selectedValue = document.getElementById("questionType").value;
    
    // Hide the type selection form
    document.getElementById("Questiontype").style.display = "none";
    
    // Show the appropriate form based on selection
    if (selectedValue === "QCM") {
        document.getElementById("Qcm-question").style.display = "block";
        document.getElementById("form-title").innerHTML = "Question choix Multiple";
    } else if (selectedValue === "DQ") {
        document.getElementById("Dq-question").style.display = "block";
        document.getElementById("form-title").innerHTML = "Question Directe";
    }
});

document.getElementById("goToDashboard").addEventListener("click", function() {
    window.location.href = "../dashboard.html";
});

function addOption() {
    const optionList = document.getElementById("optionList");
    const index = optionList.children.length + 3;
    
    const optionDiv = document.createElement("div");
    optionDiv.className = "input-group mb-2";
    optionDiv.innerHTML = `
      <input type="text" name="options[]" class="form-control" placeholder="Option ${index}" required>
      <button type="button" class="btn btn-danger" onclick="removeOption(this)">Supprimer</button>
    `;
    optionList.appendChild(optionDiv);
  
    updateAnswerSelect();
  }
  
  function removeOption(button) {
    const optionDiv = button.parentElement;
    optionDiv.remove();
    
    updateAnswerSelect();
  }
  
function updateAnswerSelect() {
    const select = document.getElementById("answer");

    // Clear old dynamic options (keep only the first "disabled selected" option)
    select.innerHTML = `<option value="" disabled selected>Reponse Correcte</option>`;

    // Add static OP1 and OP2
    select.innerHTML += `
      <option value="OP1">Option 1</option>
      <option value="OP2">Option 2</option>
    `;

    // Add new dynamic options starting with OP3
    const inputs = document.querySelectorAll('#optionList input[name="options[]"]');
    inputs.forEach((input, index) => {
        const opNumber = index + 3; // Start from 3
        select.innerHTML += `<option value="OP${opNumber}">Option ${opNumber}</option>`;
    });
}
  
  