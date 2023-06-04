const container = document.querySelector(".container");
const menuBtn = document.querySelector(".menu-btn");

menuBtn.addEventListener("click", ()=>{
    container.classList.toggle("active");
});

let playing = false,
    currentSong = 0,
    shuffle = false,
    repeat = false,
    favorites = []

let audio = new Audio();

const songs = [
    {
        title: "Song 1",
        artist: "Artist 1",
        img_src: "cover1.jpg",
        src: "1.mp3"
    },
    {
        title: "Song 2",
        artist: "Artist 2",
        img_src: "cover2.jpg",
        src: "2.mp3"
    },
    {
        title: "Song 3",
        artist: "Artist 3",
        img_src: "cover3.jpg",
        src: "3.mp3"
    }
];

const playlistContainer = document.querySelector("#playlist");
const infoWrapper = document.querySelector(".info");
const coverImage = document.querySelector(".cover-image");
const currentSongTitle = document.querySelector(".current-song-title");
const currentFavorite = document.querySelector("#current-favorite");

//Get Songs Time
const formatTime = (time)=>{
    //Format time Like 2:30
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    //Add traling zero if seconds less than 10
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${seconds}`;
};

//Add Audio Play Functionality
const loadSong = (num) => {

    //Change title artist and times to current song
    infoWrapper.innerHTML = `
        <h2>${songs[num].title}</h2>
        <h3>${songs[num].artist}</h3>
    `;

    //Current Song Title (ListSongs Menu)
    currentSongTitle.innerHTML = songs[num].title;

    //Change cover image
    coverImage.style.backgroundImage = `url(../data/img/${songs[num].img_src})`;

    //Add src of current song to "audio" variable
    audio.src = `data/music/${songs[num].src}`;

    //Check if song is in favorite highlight
    if (favorites.includes(num)){
        currentFavorite.classList.add("active");
    } else{
        currentFavorite.classList.remove("active");
    }
};

const updatePlaylist = (songs) => {
    //Remove any existing element
    playlistContainer.innerHTML = "";

    songs.forEach((song, index) => {
        //Extract data from song
        const {title, src} = song;

        //Checking favorite songs
        const isFavorite = favorites.includes(index);

        const tr = document.createElement("tr");
        tr.classList.add("song");
        tr.innerHTML = `
            <td class="no">
                <h4>${index + 1}</h4>
            </td>
            <td class="title">
                <h4>${title}</h4>
            </td>
            <td class="length">
                <h4>2:03</h4>
            </td>
            <td>
                <i class="fas fa-heart ${isFavorite ? "active" : ""}"></i>
            </td>
        `;

        playlistContainer.appendChild(tr);

        //Play song when clicked on playlist songs
        tr.addEventListener("click", (e)=> {
            //Add to favorites when clicked on heart icon
            if(e.target.classList.contains("fa-heart")){
                addToFavorites(index);
                e.target.classList.toggle("active");
                //If heart clicked just add, don't play
                return;
            }

            currentSong = index;
            loadSong(currentSong);
            audio.play();
            container.classList.remove("active");
            playPauseBtn.classList.replace("fa-play", "fa-pause");
            playing = true;
        })

        const audioDuration = new Audio(`../data/music/${src}`);

        audioDuration.addEventListener("loadedmetadata", () => {
            const duration = audioDuration.duration;

            let songDuration = formatTime(duration);
            tr.querySelector(".length h4").innerHTML = songDuration;
        });
    });

}

//Buttons Functionality
const playPauseBtn = document.querySelector("#playpause");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");

//Play Button
playPauseBtn.addEventListener("click", ()=>{
    if(playing){
        //Pause if already playing
        playPauseBtn.classList.replace("fa-pause", "fa-play");
        playing = false;
        audio.pause();
    } else {
        //If not playing play
        playPauseBtn.classList.replace("fa-play", "fa-pause");
        playing = true;
        audio.play();
    }
});

//Next Song
const nextSong = () => {

    //If current song is not last in playlist
    if(currentSong < songs.length - 1){
        currentSong++;
    } else {
        //If its last song the play the first one
        currentSong = 0;
    }
    loadSong(currentSong);

    //After load if song was playing keep playing the new current too
    if(playing){
        audio.play();
    }
};

nextBtn.addEventListener("click", nextSong);

//Prev Song
const prevSong = () => {
    if(currentSong > 0 && currentSong < songs.length){
        currentSong--;
    } else {
        currentSong = songs.length -1;
    }

    loadSong(currentSong);

    if(playing){
        audio.play();
    }
};

prevBtn.addEventListener("click", prevSong);

//Favorite Song
const addToFavorites = (index) => {
    //Check if already in favorites then remove
    if(favorites.includes(index)) {
        favorites = favorites.filter((item) => item !== index);

        //If current playing song is removed also remove currentFavorite
        currentFavorite.classList.remove("active");
    } else {
        //If not already in favorites add
        favorites.push(index);

        //If coming from current favorite mode that is index and current are equals
        if(index === currentSong){
            currentFavorite.classList.add("active");
        }
    }

    //After adding favorite render playlist to show favorites
    updatePlaylist(songs);
    console.log(favorites);
};

//Add to favorite when clicked heart un current playing mode
currentFavorite.addEventListener("click", () => {
    //Its important to first toggle de currentFarite heart icon
    currentFavorite.classList.toggle("active");
    addToFavorites(currentSong);
});

const init = () => {
    updatePlaylist(songs);
    loadSong(currentSong);
};

init();
//39:00