const BACKEND_URL = "http://127.0.0.1:8000";
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const chat = document.getElementById("chat");
const micBtn = document.getElementById("micBtn");
const themeToggle = document.getElementById("themeToggle");
const languageSelect = document.getElementById("language");

themeToggle.onclick = () => document.body.classList.toggle("light");

// Animate language change
languageSelect.onchange = () => {
  languageSelect.style.transform = "scale(1.1)";
  setTimeout(()=> languageSelect.style.transform = "scale(1)", 200);
}

function addBubble(text, who) {
  const div = document.createElement("div");
  div.className = `bubble ${who}`;
  div.textContent = who === "ai" ? "🤖 "+text : "👨‍🌾 "+text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function startVoice() {
  if (!SpeechRecognition) return alert("Voice input not supported.");
  const recognition = new SpeechRecognition();
  const lang = languageSelect.value;
  recognition.lang = lang==="te"?"te-IN":lang==="hi"?"hi-IN":"en-IN";
  micBtn.classList.add("listening");
  recognition.start();
  recognition.onresult = e => {
    const text = e.results[0][0].transcript;
    document.getElementById("question").value = text;
    micBtn.classList.remove("listening");
    askQuestion();
  };
  recognition.onerror = ()=> micBtn.classList.remove("listening");
}

async function askQuestion() {
  const q = document.getElementById("question").value.trim();
  if(!q) return;
  addBubble(q,"user");
  document.getElementById("question").value="";
  try{
    const res = await fetch(`${BACKEND_URL}/ask?q=${encodeURIComponent(q)}&lang=${languageSelect.value}`);
    const data = await res.json();
    addBubble(data.answer,"ai");
    speakAnswer(data.answer,languageSelect.value);
  }catch{
    addBubble("Backend not connected. Please start server.","ai");
  }
}

function speakAnswer(text, lang){
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang==="te"?"te-IN":lang==="hi"?"hi-IN":"en-IN";
  window.speechSynthesis.speak(u);
}

// Image upload placeholder (can integrate backend later)
function uploadImage(event){
  const file = event.target.files[0];
  if(file){
    addBubble("📷 Crop image uploaded. AI analysis coming soon.","ai");
  }
}
