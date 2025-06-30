console.log("Welcome to Spotify");

function loadSong(index) {
    audioElement.pause();
    progressBar.value = 0;
    audioElement.src = songs[index].filePath;
    audioElement.onloadedmetadata=()=>{  //waits until duration is known before calling play()
        audioElement.currentTime = 0;
        audioElement.play();
        
   

    // Switch icon to pause
    masterButton.classList.remove('fa-play-circle');
    masterButton.classList.add('fa-pause-circle');

    // Update song name in UI
    songInfo.innerHTML = `<img src="playing.gif" width="42px" alt="play"> ${songs[index].songName}`;
    };
}

let songs = [
    { songName: "Tune 1", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},    
    { songName: "Tune 2", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"}    
];
let currentSongIndex = 0;

//DOM elements
let audioElement = new Audio(songs[currentSongIndex].filePath);
let masterButton= document.getElementById('masterButton');
let progressBar = document.getElementById('myProgressBar');
let prevBtn = document.getElementById('prevButton');
let nextBtn = document.getElementById('nextButton');
let songInfo = document.querySelector('.songInfo');

//  play/pause toggle
masterButton.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterButton.classList.remove('fa-play-circle');
        masterButton.classList.add('fa-pause-circle');
    } else {
        audioElement.pause();
        masterButton.classList.remove('fa-pause-circle');
        masterButton.classList.add('fa-play-circle');
    }
});

//Update Progress bar as the song plays
audioElement.addEventListener('timeupdate', () => {  //Prevents jumps when duration is not ready
    if(audioElement.duration && !NaN(audioElement.duration)){
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
    }
});

//when user changes the bar
progressBar.addEventListener('input', () => {
    audioElement.currentTime = (progressBar.value / 100) * audioElement.duration;
});

//  Previous Button
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

//  Next Button
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

//Reset icon when the song ends
audioElement.addEventListener('ended', ()=> {
    masterButton.classList.remove('fa-pause-circle'),
    masterButton.classList.add('fa-play-circle');
    progressBar.value = 0;
});
