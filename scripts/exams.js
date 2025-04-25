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