/* ================================================================
   EASY-TO-EDIT BIRTHDAY CONFIGURATION
   Change dinner, concert and text details here. Image filenames are
   listed in README.md; replace the files in /assets to update images.
   ================================================================ */
const CONFIG = {
  birthdayUnlockDate: "2026-10-08",
  dinnerDate: "8 October 2026",              // Change dinner date here
  dinnerTime: "7:00 PM",                     // Change dinner time here
  dinnerLocation: "To be revealed 2 days before", // Change location here
  concertArtist: "BIGBANG",                  // Change concert details below
  concertTour: "2026–2027 WORLD TOUR",
  concertTourName: "XX : COSMOS",
  concertCity: "Kuala Lumpur",
  concertDate: "9 January 2027",
  concertTime: "8:00 PM",
  concertVenue: "TM Stadium Nasional",
  concertTicketType: "PS1 Seated × 2"
};

// Set this to true to view the full experience before 8 October 2026.
// IMPORTANT: change it back to false before publishing the real surprise.
const TEST_UNLOCK_BIRTHDAY_EXPERIENCE = false;

// FINAL_BIRTHDAY_MESSAGE — replace only the text inside the backticks.
const FINAL_BIRTHDAY_MESSAGE = `Happy Birthday, my love ♡

I hope you love everything I planned for you.

Here’s to more dinners, more trips, more concerts, more silly photos, and many more adventures together.

Love,
Simyee`;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const lockScreen = $("#lock-screen");
const experience = $("#experience");
const scenes = $$(".scene");
let currentScene = 0;
let noCount = 0;

function birthdayIsUnlocked() {
  if (TEST_UNLOCK_BIRTHDAY_EXPERIENCE) return true;
  const now = new Date();
  const parts = CONFIG.birthdayUnlockDate.split("-").map(Number);
  const unlock = new Date(parts[0], parts[1] - 1, parts[2]);
  return now >= unlock;
}

function showScene(index) {
  scenes[currentScene]?.classList.remove("active");
  currentScene = Math.max(0, Math.min(index, scenes.length - 1));
  scenes[currentScene].classList.add("active");
  scenes[currentScene].scrollTop = 0;
  $("#progress-fill").style.width = `${14 + currentScene * 13}%`;
  if (currentScene === 5) sprinkle($("#concert-confetti"), 24, true);
}

function sprinkle(container, count, falling = false) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) count = Math.min(count, 6);
  const colors = ["#f2c968", "#e9a8c1", "#bca4e9", "#9fcbe0", "#fff3c5"];
  for (let i = 0; i < count; i++) {
    const bit = document.createElement("span");
    bit.className = falling ? "confetti-bit" : "heart-pop";
    bit.textContent = falling ? "" : ["♡", "♥", "✦"][i % 3];
    bit.style.left = `${5 + Math.random() * 90}%`;
    bit.style.color = colors[i % colors.length];
    bit.style.background = falling ? colors[i % colors.length] : "transparent";
    bit.style.animationDelay = `${Math.random() * .7}s`;
    bit.style.animationDuration = `${1.5 + Math.random() * 1.4}s`;
    container.appendChild(bit);
    setTimeout(() => bit.remove(), 3300);
  }
}

function fillContent() {
  $("#dinner-date").textContent = CONFIG.dinnerDate;
  $("#dinner-time").textContent = CONFIG.dinnerTime;
  $("#dinner-location").textContent = CONFIG.dinnerLocation;
  $("#concert-tour").textContent = `${CONFIG.concertArtist} ${CONFIG.concertTour}`;
  $("#concert-name").textContent = CONFIG.concertTourName;
  $("#concert-city-date").textContent = `${CONFIG.concertCity} · ${CONFIG.concertDate}`;
  $("#concert-venue-time").textContent = `${CONFIG.concertVenue} · ${CONFIG.concertTime}`;
  $("#concert-ticket").textContent = CONFIG.concertTicketType;
  $("#final-message").textContent = FINAL_BIRTHDAY_MESSAGE;
}

function setupImageFallbacks() {
  $$("img[data-fallback]").forEach(img => {
    const fallback = () => {
      const wrap = img.closest(".asset-wrap");
      if (wrap) { wrap.classList.add("is-missing"); wrap.dataset.placeholder = img.dataset.fallback; }
    };
    img.addEventListener("error", fallback);
    if (img.complete && !img.naturalWidth) fallback();
  });
}

$$('[data-next]').forEach(button => button.addEventListener("click", () => showScene(currentScene + 1)));

$("#no-button").addEventListener("click", event => {
  noCount += 1;
  const feedback = $("#dinner-feedback");
  if (noCount === 1) feedback.textContent = "Wrong answer 😌";
  else if (noCount === 2) { feedback.textContent = "Nice try…"; event.currentTarget.classList.add("dodge"); }
  else { feedback.textContent = "I knew you meant yes ♡"; event.currentTarget.textContent = "Fine, yes ♡"; event.currentTarget.classList.remove("dodge"); event.currentTarget.onclick = () => $("#yes-button").click(); }
});

$("#yes-button").addEventListener("click", () => {
  $("#dinner-feedback").textContent = "Reservation confirmed ♡";
  setTimeout(() => showScene(3), 750);
});

const wrongAnswers = ["Not this time 😌", "Again?! Be serious.", "Good guess… but nope."];
$$('[data-answer]').forEach(button => button.addEventListener("click", () => {
  const answer = Number(button.dataset.answer);
  if (answer === 3) { showScene(4); return; }
  $("#guess-feedback").textContent = wrongAnswers[answer];
  button.setAttribute("aria-pressed", "true");
}));

$("#final-button").addEventListener("click", () => {
  sprinkle($("#final-confetti"), 22);
  $("#final-answer").textContent = "Correct answer 😌♡";
  $("#final-button").disabled = true;
});

fillContent();
setupImageFallbacks();
if (birthdayIsUnlocked()) {
  experience.hidden = false;
  lockScreen.hidden = true;
  showScene(0);
} else {
  lockScreen.hidden = false;
  experience.hidden = true;
}
