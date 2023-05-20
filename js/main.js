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
        img_src: "1.jpg",
        src: "1.mp3"
    },
    {
        title: "Song 2",
        artist: "Artist 2",
        img_src: "2.jpg",
        src: "2.mp3"
    }
];

const playlistContainer = document.querySelector("#playlist");


const updatePlaylist = (songs) => {

    playlistContainer.innerHTML = "";

    songs.forEach((song, index) => {

        const {title, src} = song;

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
            <i class="fas fa-heart"></i>
        </td>
        `;

        console.log(tr)
        playlistContainer.appendChild(tr);
    });

}


const init = () => {
    updatePlaylist(songs);
}

init();
//25:25