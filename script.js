//your JS code here. If required.
const video = document.getElementById("video");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");

const soundPicker = {
    beach: { sound: "Sounds/beach.mp3", video: "Sounds/beach.mp4" },
    rain: { sound: "Sounds/rain.mp3", video: "Sounds/rain.mp4" }
};

let currentSound = new Audio(soundPicker.beach.sound);
let duration = 600; // Default 10 min
let isPlaying = false;

// Function to play/pause
playBtn.addEventListener("click", () => {
    if (isPlaying) {
        video.pause();
        currentSound.pause();
        playBtn.textContent = "Play";
    } else {
        video.play();
        currentSound.play();
        countdown(duration);
        playBtn.textContent = "Pause";
    }
    isPlaying = !isPlaying;
});

// Function to switch sound/video
document.getElementById("beach-btn").addEventListener("click", () => changeMode("beach"));
document.getElementById("rain-btn").addEventListener("click", () => changeMode("rain"));

function changeMode(mode) {
    currentSound.pause();
    video.src = soundPicker[mode].video;
    currentSound = new Audio(soundPicker[mode].sound);
    if (isPlaying) {
        video.play();
        currentSound.play();
    }
}

// Function to set time
document.getElementById("smaller-mins").addEventListener("click", () => setTime(120));
document.getElementById("medium-mins").addEventListener("click", () => setTime(300));
document.getElementById("long-mins").addEventListener("click", () => setTime(600));

function setTime(time) {
    duration = time;
    timeDisplay.textContent = `${Math.floor(time / 60)}:00`;
}

// Countdown Timer
function countdown(time) {
    let interval = setInterval(() => {
        if (!isPlaying) {
            clearInterval(interval);
            return;
        }
        time--;
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if (time <= 0) {
            clearInterval(interval);
            isPlaying = false;
            playBtn.textContent = "Play";
            video.pause();
            currentSound.pause();
        }
    }, 1000);
}
