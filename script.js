async function askQuestion() {
  const question = document.getElementById("question").value;
  const answerBox = document.getElementById("answer");

  if (!question.trim()) {
    answerBox.innerText = "Please type a question first 🙏";
    return;
  }

  answerBox.innerText = "Thinking... 🤖🌾";

  try {
    const res = await fetch(`http://127.0.0.1:8000/ask?q=${encodeURIComponent(question)}`);
    const data = await res.json();
    answerBox.innerText = data.answer;
  } catch (error) {
    console.error(error);
    answerBox.innerText = "Could not connect to server. Is backend running?";
  }
}
