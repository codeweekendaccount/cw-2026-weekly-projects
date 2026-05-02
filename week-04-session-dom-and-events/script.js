// CHECKPOINT 1 (Slides 7-8): Select elements
const profileCard = document.querySelector("#profile-card");
const studentName = document.querySelector("#student-name");
const studentGrade = document.querySelector("#student-grade");
const studentStatus = document.querySelector("#student-status");

const updateNameBtn = document.querySelector("#update-name-btn");
const updateGradeBtn = document.querySelector("#update-grade-btn");
const updateStatusBtn = document.querySelector("#update-status-btn");
const toggleHighlightBtn = document.querySelector("#toggle-highlight-btn");

const newSubjectInput = document.querySelector("#new-subject-input");
const addSubjectBtn = document.querySelector("#add-subject-btn");
const subjectList = document.querySelector("#subject-list");
const subjectFeedback = document.querySelector("#subject-feedback");

const moodButtons = document.querySelector("#mood-buttons");
const currentMood = document.querySelector("#current-mood");
const toggleHintsBtn = document.querySelector("#toggle-hints-btn");

console.log("Selected student name:", studentName.textContent);

// CHECKPOINT 2 (Slides 9-11): Safe content updates with textContent
const sampleNames = [
  "Amina Rahimi",
  "Farid Ahmad",
  "Laila Noor",
  "Sahar Omari",
];
let nameIndex = 0;

updateNameBtn.addEventListener("click", function () {
  nameIndex = (nameIndex + 1) % sampleNames.length;
  studentName.textContent = sampleNames[nameIndex];
});

// CHECKPOINT 3 (Slides 12-13): Styling with classList.toggle
toggleHighlightBtn.addEventListener("click", function () {
  profileCard.classList.toggle("highlight");
});

// CHECKPOINT 4 (Slide 14): Create elements dynamically
function buildSubjectListItem(subjectName) {
  const listItem = document.createElement("li");
  listItem.className = "subject-item";

  const title = document.createElement("span");
  title.className = "subject-title";
  title.textContent = subjectName;

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-subject-btn";
  removeButton.textContent = "Remove";

  listItem.appendChild(title);
  listItem.appendChild(removeButton);

  return listItem;
}

addSubjectBtn.addEventListener("click", function () {
  const typedSubject = newSubjectInput.value.trim();

  if (typedSubject === "") {
    subjectFeedback.textContent = "Please type a subject name first.";
    return;
  }

  const newItem = buildSubjectListItem(typedSubject);
  subjectList.appendChild(newItem);
  subjectFeedback.textContent =
    typedSubject + " was added to the subject list.";
  newSubjectInput.value = "";
  newSubjectInput.focus();
});

// CHECKPOINT 5 (Slides 15-16): More event listeners
const sampleGrades = ["10", "11", "12"];
const sampleStatuses = [
  { label: "Ready to Learn", className: "status-active" },
  { label: "Reviewing Notes", className: "status-revising" },
  { label: "Project Updated", className: "status-updated" },
];

let gradeIndex = 0;
let statusIndex = 0;

updateGradeBtn.addEventListener("click", function () {
  gradeIndex = (gradeIndex + 1) % sampleGrades.length;
  studentGrade.textContent = sampleGrades[gradeIndex];
});

updateStatusBtn.addEventListener("click", function () {
  statusIndex = (statusIndex + 1) % sampleStatuses.length;
  studentStatus.classList.remove(
    "status-active",
    "status-revising",
    "status-updated",
  );
  studentStatus.classList.add(sampleStatuses[statusIndex].className);
  studentStatus.textContent = sampleStatuses[statusIndex].label;
});

moodButtons.addEventListener("click", function (event) {
  if (!event.target.matches("button[data-mood]")) {
    return;
  }

  const selectedMood = event.target.getAttribute("data-mood");
  currentMood.textContent = selectedMood;

  moodButtons.querySelectorAll("button").forEach(function (button) {
    button.classList.remove("active");
  });
  event.target.classList.add("active");
});

// CHECKPOINT 6 (Slide 17): Event delegation for remove buttons
subjectList.addEventListener("click", function (event) {
  if (!event.target.classList.contains("remove-subject-btn")) {
    return;
  }

  const parentItem = event.target.closest(".subject-item");

  if (!parentItem) {
    return;
  }

  const subjectTitle = parentItem.querySelector(".subject-title");
  const removedName = subjectTitle ? subjectTitle.textContent : "Subject";
  parentItem.remove();
  subjectFeedback.textContent = removedName + " was removed.";
});

// CHECKPOINT 7 (Slide 18): Optional professional upgrades
newSubjectInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addSubjectBtn.click();
  }
});

if (toggleHintsBtn) {
  toggleHintsBtn.addEventListener("click", function () {
    const isShowing = document.body.classList.toggle("show-hints");
    toggleHintsBtn.textContent = isShowing
      ? "Hide Selectors"
      : "Show Selectors";
  });
}
