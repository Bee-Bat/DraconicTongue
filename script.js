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