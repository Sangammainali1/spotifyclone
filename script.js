
let currentSong = new Audio();


function secondsToMinutesAndSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "Invalid input";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

// Example usage:
const totalSeconds = 125;
const formattedTime = secondsToMinutesAndSeconds(totalSeconds);
console.log(formattedTime); // Output: "02:05"


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



const playMusic = (track,pause=false)=> {
  // let audio = new Audio("/songs/" + track)
  currentSong.src = "/songs/" + track
  if(!pause){
    currentSong.play()
    play.src="pause.svg"
  }
  document.querySelector(".songinfo").innerHTML=decodeURI(track)
  document.querySelector(".songtime").innerHTML="00:00 / 00:00"
  currentSong.play()
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

    // attach an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=> {
      e.addEventListener("click", element => {
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
      })
      
    })


    // attach an eventlistener to play , next and previous

    play.addEventListener("click",()=>{
      if(currentSong.paused){
        currentSong.play()
        play.src = "pause.svg"
      } else {
        currentSong.pause()
        play.src = "play.svg"
      }
    })


    // Listen for timeupdate event
    currentSong.addEventListener("timeupdate", ()=>{
      console.log(currentSong.currentTime,currentSong.duration)
      document.querySelector(".songtime").innerHTML = `${secondsToMinutesAndSeconds(currentSong.currentTime)}/${secondsToMinutesAndSeconds(currentSong.duration)}`
      document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%"
    })

    //add an event listener to seek bar

    document.querySelector(".seekbar").addEventListener("click", e=>{
      document.querySelector(".circle").style.left= (e.offsetX/e.target.getBoundingClientRect().width)*100  + "%"
    })

    // play the first songs
    var audio = new Audio(songs[0])
    // audio.play()
}

main()












