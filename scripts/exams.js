function typequestion(examTitle){
    // Hide the initial form and show the after-creation form
    document.getElementById("examForm").style.display = "none";
    document.getElementById("afterCreationContainer").style.display = "block";
    // Expand .form-container width dynamically
    document.querySelector(".form-container").classList.add("wide-container");

    document.getElementById("form-title").innerHTML = examTitle;

}



// Listen for changes in the question type dropdown
document.getElementById("questionType").addEventListener("change", function () {
  const selectedValue = this.value;

  // Show the appropriate form based on the selected value
  document.getElementById("Qcm-question").style.display = (selectedValue === "QCM") ? "block" : "none";
  document.getElementById("Dq-question").style.display = (selectedValue === "DQ") ? "block" : "none";
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
      <input type="checkbox" name="answer" value="OP${index}" class="form-check-input ms-2" onchange="ensureSingleSelection(this)">
      <button type="button" class="btn p-1 btn-outline-danger ms-2" onclick="removeOption(this)" title="Supprimer" style="width: 30px; height: 30px;">
        <i class="bi bi-trash" style="font-size: 1rem;"></i>
      </button>
    </div>
  `;
  optionList.appendChild(optionDiv);
}

  
  function removeOption(button) {
    const outerWrapper = button.closest('.mb-2'); // find the full wrapper div
    if (outerWrapper) {
      outerWrapper.remove();
      updateCheckboxAnswer();
    }
  }
  
  
  function updateCheckboxAnswer() {
    const checkboxContainer = document.getElementById("checkboxOptionList");
    checkboxContainer.innerHTML = "";

    const inputs = document.querySelectorAll('#optionList input[name="options[]"]');
    inputs.forEach((input, index) => {
        const opNumber = index + 3; // Starts from OP3
        const div = document.createElement("div");
        div.className = "d-flex align-items-center justify-content-between border rounded p-2 mb-2";
        div.innerHTML = `
            <span>Option ${opNumber}</span>
            <input type="checkbox" name="answer" value="OP${opNumber}" class="form-check-input" onchange="ensureSingleSelection(this)">
        `;
        checkboxContainer.appendChild(div);
    });
}

function copyExamLink() {
    const input = document.getElementById("examLinkDisplay");
    navigator.clipboard.writeText(input.value)
  }
  
document.addEventListener("DOMContentLoaded", function () {
  // Empêche soumission sans réponse cochée
  const qcmForm = document.getElementById("Qcm-question");
  if (qcmForm) {
    qcmForm.addEventListener("submit", function (e) {
      const checkboxes = qcmForm.querySelectorAll('input[name="answer"]');
      const oneChecked = Array.from(checkboxes).some(cb => cb.checked);

      if (!oneChecked) {
        e.preventDefault(); // Stop la soumission
      }
    });
  }

  // Forcer une seule sélection de checkbox
  window.ensureSingleSelection = function (clicked) {
    const checkboxes = document.querySelectorAll('input[name="answer"]');
    checkboxes.forEach(box => {
      if (box !== clicked) box.checked = false;
    });
  };
});

