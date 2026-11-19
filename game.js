const STORAGE_KEY = "dracolingua_save_v1";

// Add a transition lock flag near the top of game.js (with your other let variables)
let isTransitioning = false;
let currentStage = 1;
let stageQueue = [];
let currentWord = null;
let attemptsLeft = 5;
let unlockedWordIds = new Set();
let activeAudio = null;

// 8-Bit Chiptune Synthesizer State
let audioCtx = null;
let bgmTimer = null;
let isBgmPlaying = false;
let noteIndex = 0;

const shortcutMap = {};
IPA_KEYS.forEach(k => { shortcutMap[k.shortcut] = k; });

const inputEl = document.getElementById("ipa-input");
const feedbackEl = document.getElementById("feedback-banner");
const triesEl = document.getElementById("tries-pill");
const spriteStageEl = document.getElementById("sprite-stage");
const speechBubbleEl = document.getElementById("speech-bubble");

// =========================================================================
// SAVE & LOAD PROGRESS (localStorage)
// =========================================================================
function saveProgress() {
  const payload = {
    currentStage,
    unlockedWordIds: Array.from(unlockedWordIds)
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function loadSavedProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (data && Array.isArray(data.unlockedWordIds)) {
      unlockedWordIds = new Set(data.unlockedWordIds);
      currentStage = data.currentStage || 1;
      return true;
    }
  } catch (e) {
    console.warn("Could not read saved state:", e);
  }
  return false;
}

function resetProgress() {
  if (!confirm("Reset your Dragon back to Stage 1 (Egg) and clear your Grimoire?")) return;
  localStorage.removeItem(STORAGE_KEY);
  unlockedWordIds.clear();
  startStage(1);
}

// =========================================================================
// 8-BIT DRACONIC CHIPTUNE BACKGROUND MUSIC (D-Dorian Fantasy Loop)
// =========================================================================
// Frequencies (Hz) for a cozy medieval/dragon 8-bit loop in D Dorian
const DRACONIC_MELODY = [
  293.66, 349.23, 440.00, 392.00, 349.23, 329.63, 293.66, 220.00,
  293.66, 349.23, 440.00, 523.25, 493.88, 440.00, 392.00, 329.63,
  349.23, 392.00, 440.00, 349.23, 329.63, 293.66, 261.63, 220.00,
  246.94, 293.66, 329.63, 392.00, 349.23, 329.63, 293.66, 0
];

function toggleChiptune(e) {
  const btn = document.getElementById("btn-bgm");
  // Prevent Space/Enter from re-triggering the music button after clicking it
  if (e && e.currentTarget) e.currentTarget.blur();

  if (isBgmPlaying) {
    clearInterval(bgmTimer);
    isBgmPlaying = false;
    btn.textContent = "🎵 Music: Off";
    btn.classList.remove("playing");
    return;
  }

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();

  isBgmPlaying = true;
  btn.textContent = "🎵 Music: On";
  btn.classList.add("playing");

  bgmTimer = setInterval(() => {
    const freq = DRACONIC_MELODY[noteIndex % DRACONIC_MELODY.length];
    noteIndex++;
    if (freq > 0) playChiptuneNote(freq, 0.24, "square", 0.035);
  }, 280);
}

function playChiptuneNote(freq, duration, wave = "square", volume = 0.05) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = wave;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gain.gain.setValueAtTime(volume, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function playSfx(type) {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();

  if (type === "correct") {
    playChiptuneNote(523.25, 0.12, "triangle", 0.08);
    setTimeout(() => playChiptuneNote(659.25, 0.18, "triangle", 0.08), 110);
  } else if (type === "wrong") {
    playChiptuneNote(196.00, 0.22, "sawtooth", 0.06);
  } else if (type === "evolve") {
    [293.66, 349.23, 440.00, 587.33].forEach((f, idx) => {
      setTimeout(() => playChiptuneNote(f, 0.2, "square", 0.06), idx * 120);
    });
  }
}

// =========================================================================
// VOCALIZATION AUDIO PLAYBACK (.wav with Web Speech fallback)
// =========================================================================
function playAudio(wavPath, fallbackText) {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
  }
  const audio = new Audio(wavPath);
  activeAudio = audio;
  audio.play().catch(() => {
    if ("speechSynthesis" in window && fallbackText) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(fallbackText);
      utter.rate = 0.85;
      window.speechSynthesis.speak(utter);
    }
  });
}

// =========================================================================
// STAGE & PROGRESSION LOGIC
// =========================================================================
function startStage(stageNum) {
  currentStage = stageNum;
  const stageData = DRAGON_DICTIONARY[stageNum];

  // Only queue words in this stage that haven't been solved yet
  const remaining = stageData.words.filter(w => !unlockedWordIds.has(w.id));
  stageQueue = [...remaining].sort(() => Math.random() - 0.5);

  document.getElementById("stage-badge").textContent = `STAGE ${stageNum}: ${stageData.stageName.toUpperCase()}`;
  document.getElementById("rule-summary").textContent = stageData.ruleSummary;
  spriteStageEl.innerHTML = DRAGON_SPRITES[stageNum];

  renderKeyboard();
  updateProgressUI();
  saveProgress();
  loadNextWord();
}

function loadNextWord() {
  isTransitioning = false;

  // Rebuild queue from ANY unsolved words in the current stage so a word is never lost
  const unsolved = DRAGON_DICTIONARY[currentStage].words.filter(
    w => !unlockedWordIds.has(w.id)
  );

  if (unsolved.length === 0) {
    handleStageComplete();
    return;
  }

  // Keep current order if stageQueue still has valid unsolved items; otherwise refill
  stageQueue = stageQueue.filter(w => !unlockedWordIds.has(w.id));
  if (stageQueue.length === 0) {
    stageQueue = [...unsolved].sort(() => Math.random() - 0.5);
  }

  currentWord = stageQueue[0];
  attemptsLeft = 5;
  inputEl.value = "";
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback-banner";
  updateTriesUI();

  const stageName = DRAGON_DICTIONARY[currentStage].stageName;
  speechBubbleEl.innerHTML = `Your <strong>${stageName}</strong> lets out a vocalization! Click <em>Hear Vocalization</em> and transcribe its IPA.`;
  inputEl.focus();
}

function handleStageComplete() {
  // Double-check that all 15 words in this stage are actually unlocked
  const unsolved = DRAGON_DICTIONARY[currentStage].words.filter(
    w => !unlockedWordIds.has(w.id)
  );
  if (unsolved.length > 0) {
    loadNextWord();
    return;
  }

  if (currentStage < 4) {
    isTransitioning = true;
    const prevName = DRAGON_DICTIONARY[currentStage].stageName;
    const nextStage = currentStage + 1;
    const nextName = DRAGON_DICTIONARY[nextStage].stageName;

    playSfx("evolve");
    spriteStageEl.classList.add("happy");
    speechBubbleEl.innerHTML = `✨ <strong>EVOLUTION!</strong> Your ${prevName} mastered all 15 words and evolved into a <strong>${nextName}</strong>!`;
    feedbackEl.textContent = `New phonemes unlocked! Loading ${nextName} stage...`;
    feedbackEl.className = "feedback-banner success";

    setTimeout(() => {
      spriteStageEl.classList.remove("happy");
      startStage(nextStage);
    }, 2800);
  } else {
    isTransitioning = false;
    spriteStageEl.classList.add("happy");
    speechBubbleEl.innerHTML = `👑 <strong>MASTER DRAGON!</strong> You transcribed all 60 words and completed the entire Dragon Grimoire!`;
    feedbackEl.textContent = "Congratulations! Open the Dragon Grimoire to review all 60 translations.";
    feedbackEl.className = "feedback-banner success";
  }
}

function normalizeIPA(str) {
  return str.replace(/[\.\s\/\[\]]/g, "").trim();
}

function checkTranscription() {
  // Block duplicate submissions while celebrating a right answer
  if (!currentWord || isTransitioning) return;

  const userClean = normalizeIPA(inputEl.value);
  const targetClean = normalizeIPA(currentWord.ipa);

  if (!userClean) {
    feedbackEl.textContent = "Type or click the IPA symbols before submitting.";
    feedbackEl.className = "feedback-banner error";
    return;
  }

  if (userClean === targetClean) {
    isTransitioning = true;
    unlockedWordIds.add(currentWord.id);
    stageQueue.shift();
    saveProgress();
    updateProgressUI();
    playSfx("correct");

    spriteStageEl.classList.add("happy");
    setTimeout(() => spriteStageEl.classList.remove("happy"), 1200);

    feedbackEl.innerHTML = `✓ Correct! <strong>/${currentWord.ipa}/</strong> means <strong>"${currentWord.english}"</strong> — added to your Grimoire!`;
    feedbackEl.className = "feedback-banner success";

    setTimeout(() => {
      loadNextWord();
    }, 1700);
  } else {
    attemptsLeft = Math.max(0, attemptsLeft - 1);
    updateTriesUI();
    playSfx("wrong");

    if (attemptsLeft > 0) {
      const hint = buildGentleHint(userClean, targetClean);
      feedbackEl.innerHTML = `✗ Not quite (${attemptsLeft} ${attemptsLeft === 1 ? "try" : "tries"} left). ${hint}`;
      feedbackEl.className = "feedback-banner error";
    } else {
      feedbackEl.innerHTML = `Out of tries! The correct IPA is <strong>/${currentWord.ipa}/</strong> (<em>"${currentWord.english}"</em>). Type it above to continue!`;
      feedbackEl.className = "feedback-banner error";
    }
  }
}

function buildGentleHint(user, target) {
  if (target.includes("ˈ") && !user.includes("ˈ")) {
    return "Hint: Don't forget the primary stress mark (ˈ) before the stressed syllable.";
  }
  if (target.includes("ː") && !user.includes("ː")) {
    return "Hint: Listen for a long vowel (ː).";
  }
  if (user.length !== target.length) {
    return `Hint: Target has ${target.length} IPA characters (you entered ${user.length}).`;
  }
  return "Hint: Listen closely to the consonants and cardinal vowels again.";
}

function updateTriesUI() {
  triesEl.textContent = `Attempts left: ${attemptsLeft}`;
  triesEl.classList.toggle("low", attemptsLeft <= 2);
}

function updateProgressUI() {
  const stageWords = DRAGON_DICTIONARY[currentStage].words;
  const solvedInStage = stageWords.filter(w => unlockedWordIds.has(w.id)).length;
  const pct = (solvedInStage / stageWords.length) * 100;

  document.getElementById("progress-fill").style.width = `${pct}%`;
  document.getElementById("progress-text").textContent = `${solvedInStage} / ${stageWords.length} Words`;
  document.getElementById("grim-count").textContent = unlockedWordIds.size;
}

// =========================================================================
// KEYBOARD & GRIMOIRE UI
// =========================================================================
function renderKeyboard() {
  document.getElementById("row-stops").innerHTML = "";
  document.getElementById("row-fricatives").innerHTML = "";
  document.getElementById("row-vowels").innerHTML = "";

  IPA_KEYS.forEach(keyObj => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ipa-key";
    btn.disabled = keyObj.stage > currentStage;
    btn.title = `/${keyObj.symbol}/ (Key: ${keyObj.shortcut})`;

    btn.innerHTML = `
      <span class="ipa-char">${keyObj.symbol}</span>
      <span class="ipa-hint">[${keyObj.shortcut}]</span>
    `;

    btn.addEventListener("click", () => {
      insertSymbol(keyObj.symbol);
      if (document.getElementById("toggle-audition").checked && keyObj.file) {
        playAudio(`audio/phonemes/${keyObj.file}`, keyObj.symbol);
      }
    });

    document.getElementById(`row-${keyObj.row}`).appendChild(btn);
  });
}

function insertSymbol(sym) {
  const start = inputEl.selectionStart;
  const end = inputEl.selectionEnd;
  const val = inputEl.value;
  inputEl.value = val.slice(0, start) + sym + val.slice(end);
  const pos = start + sym.length;
  inputEl.focus();
  inputEl.setSelectionRange(pos, pos);
}

inputEl.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (["Backspace", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) return;

  if (e.key === "Enter") {
    e.preventDefault();
    checkTranscription();
    return;
  }

  const mapped = shortcutMap[e.key];
  if (mapped) {
    e.preventDefault();
    if (mapped.stage <= currentStage) insertSymbol(mapped.symbol);
  } else if (e.key.length === 1 && e.key !== ".") {
    e.preventDefault();
  }
});

function renderGrimoire() {
  const body = document.getElementById("grimoire-body");
  body.innerHTML = "";

  for (let s = 1; s <= 4; s++) {
    const stageData = DRAGON_DICTIONARY[s];
    const section = document.createElement("div");
    section.className = "grimoire-stage-section";
    section.innerHTML = `<h3>Stage ${s}: ${stageData.stageName}</h3>`;

    const grid = document.createElement("div");
    grid.className = "grimoire-grid";

    stageData.words.forEach(w => {
      const isUnlocked = unlockedWordIds.has(w.id);
      const card = document.createElement("div");
      card.className = `grim-entry ${isUnlocked ? "" : "locked"}`;
      card.innerHTML = isUnlocked
        ? `<span>${w.english}</span><span class="grim-ipa">/${w.ipa}/</span>`
        : `<span>???</span><span>/••••/</span>`;
      grid.appendChild(card);
    });

    section.appendChild(grid);
    body.appendChild(section);
  }
}

// Event Wiring
document.getElementById("btn-play-cry").addEventListener("click", () => {
  if (currentWord) playAudio(currentWord.audio, currentWord.synth);
});
document.getElementById("btn-submit").addEventListener("click", checkTranscription);
document.getElementById("btn-bgm").addEventListener("click", toggleChiptune);
document.getElementById("btn-reset-save").addEventListener("click", resetProgress);

document.getElementById("btn-backspace").addEventListener("click", () => {
  const start = inputEl.selectionStart;
  const end = inputEl.selectionEnd;
  const val = inputEl.value;
  if (start !== end) {
    inputEl.value = val.slice(0, start) + val.slice(end);
    inputEl.setSelectionRange(start, start);
  } else if (start > 0) {
    const twoChar = val.slice(start - 2, start);
    const delLen = (twoChar === "tʃ" || twoChar === "dʒ") ? 2 : 1;
    inputEl.value = val.slice(0, start - delLen) + val.slice(start);
    inputEl.setSelectionRange(start - delLen, start - delLen);
  }
  inputEl.focus();
});

document.getElementById("btn-clear").addEventListener("click", () => {
  inputEl.value = "";
  inputEl.focus();
});

document.getElementById("open-grimoire").addEventListener("click", () => {
  renderGrimoire();
  document.getElementById("grimoire-modal").classList.add("open");
});

document.getElementById("close-grimoire").addEventListener("click", () => {
  document.getElementById("grimoire-modal").classList.remove("open");
});

// Boot Game (restore save if available)
loadSavedProgress();
startStage(currentStage);