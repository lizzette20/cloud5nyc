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
  function handleClick(section) {
  switch (section) {
    case 'resume':
      alert('Resume builder coming soon!');
      break;
    case 'coverLetter':
      alert('Cover letter builder coming soon!');
      break;
    case 'interview':
      alert('Interview prep coming soon!');
      break;
    default:
      alert('Coming soon!');
  }
}
function chat(topic) {
  alert(`Starting chat about: ${topic}`);
}
