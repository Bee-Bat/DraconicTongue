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
  
  // Update header text in the main game UI
  document.getElementById("display-dragon-name").textContent = `/${playerDragonName}/`;

  // Hide Naming Screen, Show Main Game Screen
  document.getElementById("dragon-naming-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
}




// Grimoire Modal Handlers
function openGrimoire() {
  document.getElementById("grimoire-modal").classList.remove("hidden");
}

function closeGrimoire() {
  document.getElementById("grimoire-modal").classList.add("hidden");
}

// Play Audio for Current Word Specimen
function playCurrentWordAudio() {
  if (draconicArchive && draconicArchive[currentIndex]) {
    const audio = new Audio(draconicArchive[currentIndex].file);
    audio.play().catch(err => console.log("Audio play error:", err));
  }
}