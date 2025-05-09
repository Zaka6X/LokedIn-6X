document.addEventListener("DOMContentLoaded", () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
  
    fetch(`/auth/myexams?userId=${userId}`)
      .then(response => response.json())
      .then(exams => {
        const examContainer = document.getElementById("myExamList");
        if (!examContainer) return;
  
        if (exams.length === 0) {
          examContainer.innerHTML = "<p>No exams found.</p>";
        } else {
          examContainer.innerHTML = exams.map(exam => `
            <div class="exam-card bg-dark" data-exam-id="${exam.id}">
              <h3>${exam.titre}</h3>
              <p>${exam.description}</p>
              <p><strong>Target:</strong> ${exam.target}</p>
              <p>
                <strong>Link:</strong> 
                <span id="link-${exam.id}">${exam.link}</span>
                <button class="copy-btn" onclick="copyToClipboard('link-${exam.id}', event)">
                  <i class="fas fa-copy"></i>
                </button>
                <br>
                <br>
                <button class="btn btn-sm btn-danger delete-exam-btn" data-exam-id="${exam.id}" onclick="event.stopPropagation(); deleteExam(${exam.id})">
                  <i class="fas fa-trash-alt"></i>  Delete Exam
                </button>

              </p>
            </div>
          `).join('');
          
          }          
      })
      .catch(error => {
        console.error("Error fetching exams:", error);
      });
  });
  
  function showQuestionsContainer(questions, examTitle) {
    const examList = document.getElementById("myExamList");
    const questionContainer = document.getElementById("questionContainer");
  
    examList.style.display = "none";
  
    const html = `
      <div class="exam-card bg-dark position-relative">
        <button class="btn btn-link text-white position-absolute top-0 start-0 m-2" onclick="goBackToExams()" title="Back" style="text-decoration: none; font-size: 1.5rem;">←</button>
        <h3 class="text-center">Questions for: <strong>${examTitle}</strong></h3>
        <table class="table table-bordered table-dark mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Reponse</th>
              <th>Note</th>
              <th>Duree</th>
              <th>Tolerance</th> 
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${questions.map((q, i) => `
              <tr data-question-id="${q.Id_question}">
                <td>${i + 1}</td>
                <td>${q.question_text}</td>
                <td>${q.reponse}</td>
                <td>${q.note}</td>
                <td>${q.duree}</td>
                <td>${q.tolerance || '-'}</td>
                <td>
                  <button class="btn btn-sm btn-warning me-1" title="Modify"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-sm btn-danger" title="Delete"><i class="fas fa-trash-alt"></i></button>
                </td>
              </tr>
              ${q.options.length > 0 ? `
                <tr class="child-row bg-secondary text-white" data-question-id="${q.Id_question}">
                  <td colspan="7">
                    <div class="ps-3" data-options-view>
                      <strong>Options:</strong><br>
                      ${q.options.map(opt => `
                        <div>
                          ${opt.OP_nbr}: <span data-option-id="${opt.id}" data-op-nbr="${opt.OP_nbr}">${opt.option_text}</span>
                        </div>
                      `).join('')}
                    </div>
                  </td>
                </tr>
              ` : ''}
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  
    questionContainer.innerHTML = html;
    questionContainer.style.display = "block";
  }
  
  
  setTimeout(() => {
    document.querySelectorAll('.exam-card').forEach(card => {
      card.addEventListener('click', async () => {
        const examId = card.getAttribute('data-exam-id');
        const title = card.querySelector('h3')?.textContent || "Selected Exam";
        try {
          const res = await fetch(`/auth/getquestions?examId=${examId}`);
          const questions = await res.json();
          showQuestionsContainer(questions, title);
        } catch (error) {
          console.error("Error loading questions:", error);
        }
      });
    });
  }, 100);
  
  function goBackToExams() {
    document.getElementById("questionContainer").style.display = "none";
    document.getElementById("myExamList").style.display = "block";
  }
  

  function copyToClipboard(elementId, event) {
      event.stopPropagation(); // Prevent triggering parent click
      const text = document.getElementById(elementId).textContent;
      navigator.clipboard.writeText(text);
}


  document.addEventListener("click", (e) => {
    if (e.target.closest(".fa-edit")) {
      const row = e.target.closest("tr");
      const cells = row.children;
      const questionId = row.getAttribute("data-question-id");
  
      const oldValues = {
        question_text: cells[1].textContent,
        reponse: cells[2].textContent,
        note: cells[3].textContent,
        duree: cells[4].textContent,
        tolerance: cells[5].textContent,
      };
  
      cells[1].innerHTML = `<input name="question_text" value="${oldValues.question_text}" class="form-control form-control-sm" />`;
      cells[2].innerHTML = `<input name="reponse" value="${oldValues.reponse}" class="form-control form-control-sm" />`;
      cells[3].innerHTML = `<input name="note" type="number" value="${oldValues.note}" class="form-control form-control-sm" />`;
      cells[4].innerHTML = `<input name="duree" value="${oldValues.duree}" class="form-control form-control-sm" />`;
      cells[5].innerHTML = `<input name="tolerance"    value="${oldValues.tolerance}" class="form-control form-control-sm" />`;
      cells[6].innerHTML = `
        <div class="d-flex justify-content-start gap-1">
          <button class="btn btn-sm btn-success save-question">Save</button>
          <button class="btn btn-sm btn-secondary cancel-edit">Cancel</button>
        </div>
      `;
  
      const optionRow = row.nextElementSibling;
      const optionDiv = optionRow?.querySelector("[data-options-view]");
      const spans = optionDiv?.querySelectorAll("span[data-op-nbr]");
  
      const oldOptions = [];
      spans?.forEach(span => {
        const opNbr = span.dataset.opNbr;
        const text = span.textContent;
        oldOptions.push({ OP_nbr: opNbr, option_text: text });
  
        span.parentElement.innerHTML = `
          <div class="d-flex align-items-center gap-2 mb-1">
            ${opNbr}: <input name="${opNbr}" value="${text}" class="form-control form-control-sm w-75" />
          </div>
        `;
      });
  
      row.querySelector(".save-question").addEventListener("click", async () => {
        const updatedQuestion = {
          id: questionId,
          question_text: row.querySelector('input[name="question_text"]').value,
          reponse: row.querySelector('input[name="reponse"]').value,
          note: row.querySelector('input[name="note"]').value,
          duree: row.querySelector('input[name="duree"]').value,
          tolerance: row.querySelector('input[name="tolerance"]').value,
        };
  
        const updatedOptions = oldOptions.map(opt => {
          const input = optionDiv.querySelector(`input[name="${opt.OP_nbr}"]`);
          return {
            OP_nbr: opt.OP_nbr,
            Id_question: questionId,
            option_text: input?.value || ""
          };
        });
  
        try {
          await fetch("/auth/updatequestion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedQuestion)
          });
  
          await fetch("/auth/updateoptions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ options: updatedOptions })
          });
  
          showToast("Changes saved!", true);


            // Update question display
            cells[1].textContent = updatedQuestion.question_text;
            cells[2].textContent = updatedQuestion.reponse;
            cells[3].textContent = updatedQuestion.note;
            cells[4].textContent = updatedQuestion.duree;
            cells[5].textContent = updatedQuestion.tolerance;
            cells[6].innerHTML = `
              <button class="btn btn-sm btn-warning me-1" title="Modify"><i class="fas fa-edit"></i></button>
              <button class="btn btn-sm btn-danger" title="Delete"><i class="fas fa-trash-alt"></i></button>
            `;

            // Update options display
            if (optionDiv) {
              optionDiv.innerHTML = `
                <strong>Options:</strong><br>
                ${updatedOptions.map(opt => `
                  <div>
                    ${opt.OP_nbr}: <span data-op-nbr="${opt.OP_nbr}">${opt.option_text}</span>
                  </div>
                `).join('')}
              `;
            }

        } catch (err) {
          console.error("Error saving changes:", err);
          alert("Error saving.");
        }
      });
  
      row.querySelector(".cancel-edit").addEventListener("click", () => {
        cells[1].textContent = oldValues.question_text;
        cells[2].textContent = oldValues.reponse;
        cells[3].textContent = oldValues.note;
        cells[4].textContent = oldValues.duree;
        cells[5].textContent = oldValues.tolerance;
        cells[6].innerHTML = `
          <button class="btn btn-sm btn-warning me-1" title="Modify"><i class="fas fa-edit"></i></button>
          <button class="btn btn-sm btn-danger" title="Delete"><i class="fas fa-trash-alt"></i></button>
        `;
  
        if (optionDiv) {
          optionDiv.innerHTML = `
            <strong>Options:</strong><br>
            ${oldOptions.map(opt => `
              <div>
                ${opt.OP_nbr}: <span data-op-nbr="${opt.OP_nbr}">${opt.option_text}</span>
              </div>
            `).join('')}
          `;
        }
      });
    }
  });
  
  document.addEventListener("click", (e) => {
    if (e.target.closest(".fa-trash-alt")) {
      const row = e.target.closest("tr");
      const questionId = row.getAttribute("data-question-id");
      console.log(questionId)
      showCustomAlert("Are you sure you want to delete this question?", () => {
        fetch("/auth/deletequestion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: questionId })
        })
        .then(res => res.json())
        .then(data => {
          showToast("Question deleted.", true);
          const childRow = row.nextElementSibling?.classList.contains("child-row") ? row.nextElementSibling : null;
          row.remove(); 
          if (childRow) childRow.remove();
        })
        .catch(err => {
          console.error("Delete error:", err);
          alert("Failed to delete question.");
        });
      })
    }
  });

 function deleteExam(examId) {
  showCustomAlert("Are you sure you want to delete this exam?", () => {
    fetch("/auth/deleteexam", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: examId })
    })
    .then(res => res.json())
    .then(data => {
      showToast("Exam deleted successfully.", false);
      
      const card = document.querySelector(`.exam-card[data-exam-id='${examId}']`);
      if (card) card.remove();
    })
    .catch(err => {
      console.error("Failed to delete exam:", err);
      showCustomAlert("Failed to delete exam.");
    });
  });
}


function showCustomAlert(message, onConfirm, onCancel = null) {
  const alertBox = document.getElementById("customAlertBox");
  const messageDiv = document.getElementById("customAlertMessage");
  const confirmBtn = document.getElementById("customAlertConfirm");
  const cancelBtn = document.getElementById("customAlertCancel");

  messageDiv.textContent = message;
  alertBox.style.display = "block";

  // Clear previous handlers
  confirmBtn.onclick = null;
  cancelBtn.onclick = null;

  confirmBtn.onclick = () => {
    alertBox.style.display = "none";
    if (onConfirm) onConfirm();
  };

  cancelBtn.onclick = () => {
    alertBox.style.display = "none";
    if (onCancel) onCancel();
  };
}
