// This file is a module. index.html loads it with: <script type="module" src="main.js">
// That lets us import helper functions from another file (utils.js).
import { formatName, calculateAverage } from "./utils.js";

// Sample class data (in a real app this might come from a server).
const students = [
  { name: "Sara", score: 85 },
  { name: "Ali", score: 72 },
  { name: "Zahra", score: 92 },
  { name: "Omar", score: 58 },
  { name: "Laila", score: 100 },
];

const showDashboardButton = document.getElementById("showDashboard");
const dashboardList = document.getElementById("dashboard");

showDashboardButton.addEventListener("click", () => {
  // Start with an empty list each time the button is clicked.
  dashboardList.innerHTML = "";

  // 1) FILTER — keep only students who passed (score 60 or higher).
  const passingStudents = students.filter((student) => student.score >= 60);

  // 2) MAP — build a new array of formatted names from the passing students.
  const passingStudentNames = passingStudents.map((student) =>
    formatName(student.name),
  );

  // 3) REDUCE — walk the whole class and remember the student with the highest score.
  //    We start comparing from students[0], then update "best so far" as we go.
  const startingStudent = students[0];
  const topScorer = students.reduce((bestSoFar, currentStudent) => {
    if (currentStudent.score > bestSoFar.score) {
      return currentStudent;
    }
    return bestSoFar;
  }, startingStudent);

  // 4) SOME — true if at least one student has a perfect score.
  const hasPerfectScore = students.some((student) => student.score === 100);

  // 5) EVERY — true only if all students passed.
  const everyonePassed = students.every((student) => student.score >= 60);

  // 6) REDUCE — add every score into one running total (starts at 0).
  const totalScore = students.reduce((runningTotal, student) => {
    return runningTotal + student.score;
  }, 0);

  // 7) MAP + helper — turn students into plain scores, then average them in utils.js.
  const allScores = students.map((student) => student.score);
  const averageScore = calculateAverage(allScores);

  const linesToShow = [
    `Passed Students: ${passingStudentNames.join(", ")}`,
    `Top Scorer: ${formatName(topScorer.name)} (${topScorer.score} pts)`,
    `Any perfect scores? ${hasPerfectScore ? "Yes!" : "No"}`,
    `Did all pass? ${everyonePassed ? "Yes!" : "No, some need help"}`,
    `Total Class Points: ${totalScore}`,
    `Class Average: ${averageScore.toFixed(2)}`,
  ];

  // 8) forEach — for each line of text, create a <li> and add it to the page.
  linesToShow.forEach((line) => {
    const listItem = document.createElement("li");
    listItem.textContent = line;
    dashboardList.appendChild(listItem);
  });
});
