
const playListContainerTag = document.getElementsByClassName("playListContainerTag")[0];
const audioTag = document.getElementsByClassName("audioTag")[0];

const playButtonTag = document.getElementsByClassName("playButton")[0];
const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
const previousButtonTag = document.getElementsByClassName("previousButton")[0];
const nextButtonTag = document.getElementsByClassName("nextButton")[0];

const currentAndTotalTag = document.getElementsByClassName("currentAndTotleTime")[0];
const currentProgressTag = document.getElementById("currentProgress");

const musicPlayer = [
    { musicId: "./music/'Candy'.mp3", title: " NCT-Dream (Candy) " },
    { musicId: "./music/BTS-Butter.mp3", title: " BTS (Butter) " },
    { musicId: "./music/IU AH PUH.mp3", title: " IU (AH PUH) " },
    { musicId: "./music/ThatThat.mp3", title: " PSY (That That) " },
    { musicId: "./music/IU(Celebrity).mp3", title: " IU (Celebrity) " },
];

for (let i = 0; i < musicPlayer.length; i++) {
    const musicTag = document.createElement("div");
    musicTag.classList.add("musicItem");
    musicTag.addEventListener("click", () => {
        currentPlayingIndex = i;
        songPlay();
    })
    const title = (i + 1).toString() + ". " + musicPlayer[i].title;
    musicTag.textContent = title;
    playListContainerTag.append(musicTag);

}

let duration = "0";
let durationText = "00:00";
audioTag.addEventListener("loadeddata", () => {
    duration = Math.floor(audioTag.duration);
    durationText = createMinutesAndSecondText(duration);
})

audioTag.addEventListener("timeupdate", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = createMinutesAndSecondText(currentTime);
    const currentTimeTextAndDurationText = currentTimeText + " / " + durationText;
    currentAndTotalTag.textContent = currentTimeTextAndDurationText;
    updateCurrentProgress(currentTime);
})

const updateCurrentProgress = (currentTime) => {
    const currentProgressWidth = (500 / duration) * currentTime;
    currentProgressTag.style.width = currentProgressWidth.toString() + "px";
}

const createMinutesAndSecondText = (totalSecond) => {
    const minutes = Math.floor(totalSecond / 60);
    const second = totalSecond % 60;

    const minutesText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const secondText = second < 10 ? "0" + second.toString() : second;
    return minutesText + ":" + secondText;
}

let currentPlayingIndex = 0;
let isPlaying = false;
playButtonTag.addEventListener("click", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    isPlaying = true;
    if (currentTime === 0) {
        songPlay();
    } else {
        audioTag.play();
        updatePlayAndPause();
    }
})

pauseButtonTag.addEventListener("click", () => {
    isPlaying = false;
    audioTag.pause();
    updatePlayAndPause();
})

previousButtonTag.addEventListener("click", () => {
    if (currentPlayingIndex === 0) {
        return;
    }
    currentPlayingIndex -= 1;
    songPlay();
})

nextButtonTag.addEventListener("click", () => {
    if (currentPlayingIndex === musicPlayer.length - 1) {
        return;
    }
    currentPlayingIndex += 1;
    songPlay();
})

const songPlay = () => {
    const songIdToPlay = musicPlayer[currentPlayingIndex].musicId;
    audioTag.src = songIdToPlay;
    audioTag.play();
    isPlaying = true;
    updatePlayAndPause();
}

const updatePlayAndPause = () => {
    if (isPlaying) {
        playButtonTag.style.display = "none";
        pauseButtonTag.style.display = "inline";
    } else {
        playButtonTag.style.display = "inline";
        pauseButtonTag.style.display = "none";
    }
}