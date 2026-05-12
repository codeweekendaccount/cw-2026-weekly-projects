// --- Grab the pieces of the page we will update ---
const jokeParagraph = document.getElementById("dailyJoke");
const statusParagraph = document.getElementById("statusText");
const jokeButton = document.getElementById("jokeBtn");

// Turn "today" into a simple string so we can compare it with saved data.
function getTodayAsString() {
  return new Date().toLocaleDateString();
}

// If we already have a joke saved for TODAY, show it and return true.
// If not, return false (so the caller knows to fetch a new one).
function loadJokeFromStorageIfSavedToday() {
  const today = getTodayAsString();
  const savedJson = localStorage.getItem("dailyJoke");

  if (savedJson === null) {
    return false;
  }

  let saved;
  try {
    // localStorage only stores text, so we turn the JSON string back into an object.
    saved = JSON.parse(savedJson);
  } catch (parseError) {
    // If the saved text is broken, ignore it and fetch a fresh joke later.
    return false;
  }

  if (saved.date === today) {
    jokeParagraph.textContent = saved.joke;
    statusParagraph.textContent = "Loaded from local storage.";
    return true;
  }

  return false;
}

// Ask the Joke API for one joke, show it, and remember it for today.
async function fetchJokeFromInternetAndSave() {
  const today = getTodayAsString();

  try {
    jokeParagraph.textContent = "Fetching a funny joke...";

    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Any?type=single",
    );

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();

    jokeParagraph.textContent = data.joke;
    statusParagraph.textContent = "Freshly fetched from API!";

    const toSave = {
      date: today,
      joke: data.joke,
    };
    localStorage.setItem("dailyJoke", JSON.stringify(toSave));
  } catch (error) {
    console.error("Error:", error);
    jokeParagraph.textContent = "Oops! Could not load joke.";
    statusParagraph.textContent = "";
  }
}

// When the page loads: if we saved a joke earlier today, show it right away.
loadJokeFromStorageIfSavedToday();

// When the user clicks: use the saved joke if it is still "today"; otherwise fetch.
jokeButton.addEventListener("click", async () => {
  const foundSavedJokeForToday = loadJokeFromStorageIfSavedToday();

  if (foundSavedJokeForToday) {
    return;
  }

  await fetchJokeFromInternetAndSave();
});
