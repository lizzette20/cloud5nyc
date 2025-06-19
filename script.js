// Functionality for the chatbot and message templates
document.getElementById("build-email-btn").addEventListener("click", function() {
  const templateBox = document.getElementById("message-templates");
  templateBox.classList.toggle("hidden");
  if (!templateBox.classList.contains("hidden")) {
    templateBox.scrollIntoView({ behavior: 'smooth' });
  }
});
// Close template box
document.getElementById("close-template-btn").addEventListener("click", function() {
  const templateBox = document.getElementById("message-templates");
  templateBox.classList.add("hidden");
});
// Theme toggle
window.onload = function() {
  const themeButton = document.getElementById("theme-button");
  themeButton.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
  });
};

// Launcher toggle
document.getElementById("chatbot-launcher").addEventListener("click", function() {
  const chatbot = document.getElementById("chatbot-container");
  chatbot.classList.toggle("hidden");
});

// Expand button toggle
document.getElementById("expand-btn").addEventListener("click", function() {
  const chatbot = document.getElementById("chatbot-container");
  chatbot.classList.toggle("expanded");
});

// Track current context
let currentContextType = "";

// Show chatbot with sub-questions
function showChatbotForContext(contextType) {
  currentContextType = contextType;
  const chatbot = document.getElementById("chatbot-container");
  const messages = document.getElementById("chat-messages");
  const options = document.querySelector(".chatbot-options");
  // Reset chatbot state
  chatbot.classList.remove("hidden");
  messages.innerHTML = "";
  options.innerHTML = "";
  // Set context type
  const topicMap = {
    professionalPresence: ["Body Language", "Wardrobe Tips", "First Impressions"],
    communication: ["Email Etiquette", "Confidence in Public Speaking", "Active Listening Skills"],
    communityCulture: ["Adapting To Company Culture", "Bonding With Colleagues", "Inclusive Workplace Practices"],
    resume: ["Formatting Resumes", "Action Words", "ATS Tailoring"],
    interview: ["Common Interview Questions", "STAR Method", "Interview Confidence"],
    coverLetter: ["Cover Letter Intro", "Key Aspects", "Tone"],
    linkedin: ["Headline", "About Me Section", "LinkedIn banner image"],
    reachingOut: ["Approaching Professionals", "Coffee chats", "Following up"]
  };
  // Set title
  const subQuestions = topicMap[contextType] || ["How can I help you today?"];
  // Set chatbot title
  subQuestions.forEach(q => {
    const btn = document.createElement("button");
    btn.className = "chat-option";
    btn.textContent = q;
    btn.onclick = () => handleUserClick(q);
    options.appendChild(btn);
  });
}

// Handle user click on sub-question
function handleUserClick(question) {
  appendUserMessage(question);
  fetchChatbotReply(question, currentContextType);
}

// Input enter key handler
async function handleInput(event) {
  if (event.key === "Enter") {
    const inputBox = event.target;
    const userInput = inputBox.value.trim();
    if (!userInput) return;

    appendUserMessage(userInput);
    inputBox.value = "";

    fetchChatbotReply(userInput, currentContextType);
  }
}

// Append user message
function appendUserMessage(msg) {
  const chatBox = document.getElementById("chat-messages");
  const div = document.createElement("div");
  div.className = "user-msg";
  div.innerHTML = `<strong>You:</strong> ${msg}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Append bot message + feedback + new buttons
function appendBotMessage(msg) {
  const chatBox = document.getElementById("chat-messages");
  const div = document.createElement("div");
  div.className = "ai-response";
  div.innerHTML = `
    <p>${msg.replace(/\n/g, "<br>")}</p>
    <div class="feedback">
      <button onclick="logFeatureUse('helpful'); sendFeedback('${currentContextType}', 'helpful')">👍 Helpful</button>
      <button onclick="logFeatureUse('needs_work'); sendFeedback('${currentContextType}', 'needs_work')">👎 Needs Work</button>
    </div>
  `;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Fetch bot reply
async function fetchChatbotReply(userInput, contextType) {
  try {
    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_input: userInput,
        context_type: contextType
      })
    });

    const data = await response.json();
    if (data.response) {
      appendBotMessage(data.response);
    } else {
      appendBotMessage("Sorry, something went wrong!");
    }
  } catch (err) {
    appendBotMessage("Error connecting to chatbot.");
  }
}

// Feedback + logging
function sendFeedback(contextType, feedback) {
  const feedbackLog = JSON.parse(localStorage.getItem("feedbackLog")) || {};
  if (!feedbackLog[contextType]) {
    feedbackLog[contextType] = { helpful: 0, needsWork: 0 };
  }
  if (feedback === "helpful") {
    feedbackLog[contextType].helpful += 1;
  } else if (feedback === "needs_work") {
    feedbackLog[contextType].needsWork += 1;
  }
  localStorage.setItem("feedbackLog", JSON.stringify(feedbackLog));
  
  console.log(`Feedback stored: ${feedback} for ${contextType}`);
  alert("Thanks for your feedback!");
}

function logFeatureUse(featureName) {
  console.log(`User clicked: ${featureName}`);
}

function askFollowUp() {
  document.getElementById("chat-input").focus();
}

// Close button
document.getElementById("close-btn").addEventListener("click", function() {
  document.getElementById("chatbot-container").classList.add("hidden");
});

// Message template selector
document.getElementById("messageType").addEventListener("change", function() {
  const value = this.value;
  const textarea = document.querySelector(".template-editor textarea");
  const templates = {
    recruiter: "Hi [Name],\n\nI'm interested in opportunities at [Company]. Could we connect to chat?\n\nBest,\n[Your Name]",
    peer: "Hey [Name],\n\nIt was great meeting you at [Event]. Would you like to grab coffee soon?\n\nBest,\n[Your Name]",
    followup: "Hi [Name],\n\nThanks again for your time yesterday. Following up as discussed!\n\nBest,\n[Your Name]",
    thankyou: "Hi [Name],\n\nThank you so much for your help with [Topic]. I really appreciate it!\n\nBest,\n[Your Name]",
    reconnect: "Hi [Name],\n\nIt’s been a while! I’d love to catch up. Are you free next week?\n\nBest,\n[Your Name]"
  };
  textarea.value = templates[value] || "";
});

// Tone check button
document.querySelector(".tone-check-btn").addEventListener("click", async function() {
  const textarea = document.querySelector(".template-editor textarea");
  const userInput = textarea.value.trim();
  const feedbackBox = document.getElementById("tone-feedback");

  if (!userInput) {
    feedbackBox.style.display = "block";
    feedbackBox.innerHTML = `<em>Please enter a message to check the tone.</em>`;
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8002/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_input: userInput,
        context_type: "tone_check"
      })
    });

    const data = await response.json();
    if (data.response) {
      feedbackBox.style.display = "block";
      feedbackBox.innerHTML = `<strong>Tone Feedback:</strong> ${data.response}`;
    } else {
      feedbackBox.style.display = "block";
      feedbackBox.innerHTML = `<em>Sorry, tone check failed. Please try again.</em>`;
    }
  } catch (err) {
    feedbackBox.style.display = "block";
    feedbackBox.innerHTML = `<em>Error connecting to tone checker.</em>`;
  }
});

// Speech bubble buttons
document.querySelectorAll(".speech-bubble-btn")[0].addEventListener("click", function() {
  document.querySelector(".template-editor textarea").value = "Hi [Name],\n\nI hope you’re well! I’m reaching out because ...";
});

document.querySelectorAll(".speech-bubble-btn")[1].addEventListener("click", function() {
  document.getElementById("messageType").focus();
});

document.getElementById("chat-input").addEventListener("keydown", handleInput);

function trackFeatureClick(contextType) {
  const usage = JSON.parse(localStorage.getItem("featureUsage")) || {};
  usage[contextType] = (usage[contextType] || 0) + 1;
  localStorage.setItem("featureUsage", JSON.stringify(usage));
  console.log(`Feature click tracked: ${contextType}`);
}

function showAnalyticsSummary() {
  const usage = JSON.parse(localStorage.getItem("featureUsage")) || {};
  const feedback = JSON.parse(localStorage.getItem("feedbackLog")) || {};
  
  console.log("=== Feature Usage ===");
  console.table(usage);
  
  console.log("=== Feedback Summary ===");
  console.table(feedback);
}
