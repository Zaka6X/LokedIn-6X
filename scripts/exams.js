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
  <div class="d-flex align-items-center justify-content-between w-100 border rounded px-2 py-2">
    <input type="text" name="options[]" class="form-control" placeholder="Option ${index}" required style="max-width: 90%;">
    <button type="button" class="btn p-1 btn-outline-danger d-flex align-items-center justify-content-center" 
            onclick="removeOption(this)" title="Supprimer" style="width: 30px; height: 30px;">
      <i class="bi bi-trash" style="font-size: 1rem;"></i>
    </button>
  </div>
`;


    optionList.appendChild(optionDiv);
  
    updateAnswerSelect();
  }
  
  function removeOption(button) {
    const outerWrapper = button.closest('.mb-2'); // find the full wrapper div
    if (outerWrapper) {
      outerWrapper.remove();
      updateAnswerSelect();
    }
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

function copyExamLink() {
    const input = document.getElementById("examLinkDisplay");
    navigator.clipboard.writeText(input.value)
  }
  
  