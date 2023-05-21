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

const formatTime = (time)=>{
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${seconds}`;
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

        const audioDuration = new Audio(`../data/music/${src}`);

        audioDuration.addEventListener("loadedmetadata", () => {
            const duration = audioDuration.duration;

            let songDuration = formatTime(duration);
            tr.querySelector(".length h4").innerHTML = songDuration;
        });
    });

}


const init = () => {
    updatePlaylist(songs);
}

init();
//28:44