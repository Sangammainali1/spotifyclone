
async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();
    console.log(response);

    // Create a temporary div to hold the HTML content
    let div = document.createElement("div");
    div.innerHTML = response;

    // Get the anchor elements within the dynamically created div
    let as = div.getElementsByTagName("a");
    console.log(as);

    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }

    // console.log(songs);
    return songs
}

// getSongs()

async function main(){
    //  get the list of all songs

    let songs = await getSongs()
    console.log(songs)


    //  show all the song in the playlist
    
    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
    songUl.innerHTML = songUl.innerHTML + `<li> 
    <img src="music.svg" width="20" class="invert" alt="music">
    <div class="info">
      <div>${song.replaceAll("%20"," ")}</div>
      <div>Sangam</div>
    </div>
    <div class="playNow">
      <span>Play Now</span>
      <img class="invert" src="play.svg" alt="play">
    </div>
  </li>
    
    
    
    
    
    </li>`        
    }

    // play the first songs
    var audio = new Audio(songs[0])
    // audio.play()
}

main()












