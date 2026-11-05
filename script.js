// 1. Array of your 8 background music files
const bgPlaylist = [
  "audio/background/13_Cave_of_Time.mp3",
  "audio/background/55_Ice_Cavern.mp3",
  "audio/background/139_Sunken_Temple.mp3",
  "audio/background/184_Underground_Lake.mp3",
  "audio/background/263_Mysterious_Grotto.mp3",
  "audio/background/358_Egg_Chamber.mp3",
  "audio/background/400_Whispering_Caverns.mp3",
  "audio/background/527_Prismatic_Halls.mp3"
];

// 2. Track which song is currently playing (starting at 0)
let currentBgIndex = 0;

// 3. Grab the audio player and set the volume nice and low
const bgPlayer = document.getElementById("bg-music");
bgPlayer.volume = 0.15; 

// 4. The function to start the music for the very first time
function startMusic() {
  bgPlayer.src = bgPlaylist[currentBgIndex]; // Load track 1
  bgPlayer.play();
  
  // Hide the start button
  document.getElementById("start-btn").style.display = "none";
}

// 5. THE MAGIC TRICK: Listen for the 'ended' event
bgPlayer.addEventListener("ended", function() {
  // Move to the next song in the playlist
  currentBgIndex++;
  
  // If we reach the end of the 8 tracks, loop back to the first one
  if (currentBgIndex >= bgPlaylist.length) {
    currentBgIndex = 0;
  }
  
  // Load the new song and play it
  bgPlayer.src = bgPlaylist[currentBgIndex];
  bgPlayer.play();
});

function enterArchive() {
  const landingScreen = document.getElementById("landing-screen");
  const gameScreen = document.getElementById("game-screen");

  // 1. Start the music playlist (since this click satisfies browser autoplay rules)
  if (typeof startMusic === "function") {
    startMusic();
  }

  // 2. Hide the landing screen
  landingScreen.classList.add("hidden");

  // 3. Show the main game interface
  gameScreen.classList.remove("hidden");
}



const ipaInput = document.getElementById("ipa-input");

// Insert selected symbol at cursor position or end of string
function insertIPA(symbol) {
  ipaInput.value += symbol;
}

// Remove last entered character
function backspaceInput() {
  ipaInput.value = ipaInput.value.slice(0, -1);
}

// Clear the entire display line
function clearInput() {
  ipaInput.value = "";
}

// Verify player input against the active word answer
function verifyTranscription() {
  const userSubmission = ipaInput.value.trim();
  const currentTarget = draconicArchive[currentIndex].ipa;

  if (userSubmission === currentTarget) {
    alert("Transcription Verified! Archive updated.");
    clearInput();
    loadNextWord(); // Advance to next word
  } else {
    alert(`Incorrect Transcription.\nExpected: /${currentTarget}/\nReceived: /${userSubmission}/`);
  }
}





// --- Magical Sparkle Cursor Trail ---
(function initSparkleCursor() {
  // 1. Create a transparent canvas covering the full browser window
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);

  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none"; // Keeps UI elements clickable!
  canvas.style.zIndex = "9999";

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const particles = [];

  // 2. Spawn particles on mouse movement
  window.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 3; i++) {
    particles.push({
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5 - 0.5,
      // Shift hue to Red (0° - 12° for subtle crimson variation)
      hue: Math.random() * 12, 
      alpha: 1
    });
  }
});

  // 3. Render and animate the particles
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = `hsl(${p.hue}, 90%, 55%)`;   // Glowing crimson particle
      ctx.shadowColor = `hsl(${p.hue}, 100%, 35%)`; // Deep crimson glow (#8b0000 match)
      ctx.shadowBlur = 6;

      // Draw diamond-shaped sparkles
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - p.size * 2);
      ctx.lineTo(p.x + p.size, p.y);
      ctx.lineTo(p.x, p.y + p.size * 2);
      ctx.lineTo(p.x - p.size, p.y);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Particle physics
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.025; // Fade speed

      // Remove faded particles
      if (p.alpha <= 0) {
        particles.splice(i, 1);
        i--;
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
})();





let playerDragonName = "χaɬ"; // Default fallback name

// Step 1: Click "Begin Transcription" -> Start Music & Show Naming Screen
function goToNamingScreen() {
  if (typeof startMusic === "function") {
    startMusic();
  }
  document.getElementById("landing-screen").classList.add("hidden");
  document.getElementById("dragon-naming-screen").classList.remove("hidden");
}

// IPA Naming Input Handlers
function insertNamingIPA(symbol) {
  const input = document.getElementById("dragon-ipa-input");
  input.value += symbol;
}

function clearNamingInput() {
  document.getElementById("dragon-ipa-input").value = "";
}

// Step 2: Click "Confirm Subject" -> Save Name & Show Game Screen

function confirmDragonName() {
  const inputVal = document.getElementById("dragon-ipa-input").value.trim();

  if (inputVal.length > 0) {
    playerDragonName = inputVal;
  }

  // 1. Save to browser storage
  localStorage.setItem("draconic_dragon_name", playerDragonName);

  // 2. Update UI header
  updateDragonNameDisplay();

  // 3. Transition to game screen
  document.getElementById("dragon-naming-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
}

function updateDragonNameDisplay() {
  const displayEl = document.getElementById("display-dragon-name");
  if (displayEl) {
    displayEl.textContent = playerDragonName.startsWith('/') ? playerDragonName : `/${playerDragonName}/`;
  }
}

// Automatically load saved data when page loads
window.addEventListener("DOMContentLoaded", () => {
  const savedName = localStorage.getItem("draconic_dragon_name");

  if (savedName) {
    playerDragonName = savedName;
    updateDragonNameDisplay();
  }
});

// Comprehensive Save State Manager
function saveGame() {
  const gameState = {
    dragonName: playerDragonName,
    dragonStage: "Stage 1: Hatchling",
    stats: dragonStats, // { love: 100, coins: 50, health: 100 }
    currentIndex: currentIndex
  };

  localStorage.setItem("draconic_save_data", JSON.stringify(gameState));
}

function loadGame() {
  const savedData = localStorage.getItem("draconic_save_data");

  if (savedData) {
    const gameState = JSON.parse(savedData);
    
    playerDragonName = gameState.dragonName;
    dragonStats = gameState.stats;
    currentIndex = gameState.currentIndex;

    // Refresh UI elements
    updateDragonNameDisplay();
    updateStatsDisplay();
    displayCurrentWord();
  }
}





// Play Audio for Current Word Specimen
function playCurrentWordAudio() {
  if (draconicArchive && draconicArchive[currentIndex]) {
    const audio = new Audio(draconicArchive[currentIndex].file);
    audio.play().catch(err => console.log("Audio play error:", err));
  }
}



const draconicArchive = [
  { 
    english: "Fire (Life-giving)", 
    ipa: "χaɬ", 
    thought: "The ancient embers still burn within the stone chamber...",
    file: "audio/track1.mp3",
    image: "assets/dragons/dragon1.png"
  },
  { 
    english: "Shadow",             
    ipa: "ɬuχ", 
    thought: "Light casts only temporary illusions upon the abyss.",
    file: "audio/track2.mp3",
    image: "assets/dragons/dragon2.png"
  },
  { 
    english: "Star",               
    ipa: "tsʼikʼ", 
    thought: "Needles of silver piercing through the midnight void.",
    file: "audio/track3.mp3",
    image: "assets/dragons/dragon3.png"
  }
  // ... continue for all 20 entries
];

let currentIndex = 0;

// Update the portrait, thought box, and audio when changing words
function displayCurrentWord() {
  const word = draconicArchive[currentIndex];
  
  // Update thought box text
  document.getElementById("dragon-thought-text").textContent = `"${word.thought}"`;
  
  // Update dragon portrait image (if image paths are set up)
  if (word.image) {
    document.getElementById("dragon-image").src = word.image;
  }
}

// Fullscreen Grimoire Modal Toggles
function openGrimoire() {
  document.getElementById("grimoire-modal").classList.remove("hidden");
}

function closeGrimoire() {
  document.getElementById("grimoire-modal").classList.add("hidden");
}


// State variables for stats
let dragonStats = {
  love: 100,
  coins: 50,
  health: 100
};

// Update UI stats on screen
function updateStatsDisplay() {
  document.getElementById("stat-love-value").textContent = dragonStats.love;
  document.getElementById("stat-coin-value").textContent = dragonStats.coins;
  document.getElementById("stat-health-value").textContent = `${dragonStats.health}%`;
}

// About & Credits Modal Handlers
function openAboutModal() {
  document.getElementById("about-modal").classList.remove("hidden");
}

function closeAboutModal() {
  document.getElementById("about-modal").classList.add("hidden");
}

function openCreditsModal() {
  document.getElementById("credits-modal").classList.remove("hidden");
}

function closeCreditsModal() {
  document.getElementById("credits-modal").classList.add("hidden");
}



// Open/Close About Modal
function openAboutModal() {
  document.getElementById("about-modal").classList.remove("hidden");
}

function closeAboutModal() {
  document.getElementById("about-modal").classList.add("hidden");
}

// Open/Close Credits Modal
function openCreditsModal() {
  document.getElementById("credits-modal").classList.remove("hidden");
}

function closeCreditsModal() {
  document.getElementById("credits-modal").classList.add("hidden");
}

// Close modal automatically if user clicks dark backdrop outside the popup card
function handleBackdropClick(event, modalId) {
  if (event.target.id === modalId) {
    document.getElementById(modalId).classList.add("hidden");
  }
}






const hatchlingFrames = [
  "sprites/Egg/spr_egg1.png",
  "sprites/Egg/spr_egg2.png",
  "sprites/Egg/spr_egg3.png",
  "sprites/Egg/spr_egg4.png",
  "sprites/Egg/spr_egg5.png",
  "sprites/Egg/spr_egg6.png",
  "sprites/Egg/spr_egg7.png",
  "sprites/Egg/spr_egg8.png"
];

let frameIndex = 0;

// Cycle frames at 8 FPS (125ms per frame)
setInterval(() => {
  frameIndex = (frameIndex + 1) % hatchlingFrames.length;
  document.getElementById("dragon-image").src = hatchlingFrames[frameIndex];
}, 125);


