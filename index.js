// Oscar Best Picture quiz!!!!
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Questions for the quiz
const questions = [
  { text: "Which movie won best picture at the 2020 Oscars?", answer: "Parasite" },
  { text: "Which movie won best picture at the 2021 Oscars?", answer: "Nomadland" },
  { text: "Which movie won best picture at the 2022 Oscars?", answer: "CODA" },
  { text: "Which movie won best picture at the 2023 Oscars?", answer: "Everything Everywhere All at Once" },
  { text: "Which movie won best picture at the 2024 Oscars?", answer: "Oppenheimer" },
];

// Quiz rules
let i = 0;
let results = [];
const TOTAL_SECONDS = 30;
let left = TOTAL_SECONDS;
let tick, cutoff;
let over = false;

// This function allows the user to give case insensitive answer
function norm(s) {
  return s.trim().toLowerCase();
}

// Messages for the user when the quiz begins
function start() {
  console.log("This is the Oscar Best Picture quiz!!!!");
  console.log("Type the winning film title for each year!");
  console.log(`You have ${TOTAL_SECONDS} seconds to answer all 5 questions. Good luck!\n`);
  rl.question("Press Enter to start!", () => {
    startTimer();
    ask();
  });
}

// Timer
function startTimer() {
  tick = setInterval(() => {
    if (over) return;
    left--;
    console.log(`Time left: ${left}s`);
    if (left <= 0) clearInterval(tick);
  }, 1000);

  cutoff = setTimeout(() => {
    if (!over) {
      console.log("\nTime's up!");
      end();
    }
  }, TOTAL_SECONDS * 1000);
}

// Questions being asked
function ask() {
  if (over) return;
  if (i >= questions.length) return end();

  const q = questions[i];
  console.log(`\nQ${i + 1}/${questions.length}: ${q.text}`);
  rl.question("Your answer: ", (a) => {
    if (over) return;
    const correct = norm(a) === norm(q.answer);

    if (correct) console.log("Correct!");
    else console.log(`Incorrect. Correct: ${q.answer}`);

    results.push({ q: q.text, user: a.trim(), correct });
    i++;
    ask();
  });
}

function end() {
  if (over) return;
  over = true;
  clearInterval(tick);
  clearTimeout(cutoff);

  const score = results.filter(r => r.correct).length;

  // Messages for the user when the quiz ends
  console.log("\nThat was it!");
  console.log(`Your score was: ${score}/${questions.length} correct Oscar winners`);
  console.log(`You used: ${TOTAL_SECONDS - Math.max(0, left)} seconds`);
  console.log("The end!\n");

  // Results for each of the questions
  console.log("Recap:");
  results.forEach((r, idx) => {
    const mark = r.correct ? "✔" : "✘";
    console.log(`${idx + 1}. ${mark} ${r.q}`);
    console.log(`   You: ${r.user || "(blank)"} | Answer: ${questions[idx].answer}`);
  });

  console.log("\nThanks for playing!");
  rl.close();
}

start();