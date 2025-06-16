document.getElementById("build-email-btn").addEventListener("click", function() {
    const templateBox = document.getElementById("message-templates");
    templateBox.classList.toggle("hidden");
    if (!templateBox.classList.contains("hidden")) {
      templateBox.scrollIntoView({ behavior: 'smooth' });
    }
  });
  document.getElementById("close-template-btn").addEventListener("click", function() {
    const templateBox = document.getElementById("message-templates");
    templateBox.classList.add("hidden");
  });  
  document.getElementById("edit-linkedin-btn").addEventListener("click", function() {
    document.getElementById("linkedin-helper").classList.toggle("hidden");
  });
  