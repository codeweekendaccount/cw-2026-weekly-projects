// Small helper functions we can reuse from main.js (see: export / import).

// Example transform: "sara" -> "SARA"
export function formatName(name) {
  return name.toUpperCase();
}

// scores should be an array of numbers, e.g. [85, 72, 92]
export function calculateAverage(scores) {
  if (scores.length === 0) {
    return 0;
  }

  const sum = scores.reduce((runningTotal, score) => runningTotal + score, 0);
  return sum / scores.length;
}
