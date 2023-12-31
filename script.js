
async function main() {
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
            songs.push(element.href);
        }
    }

    console.log(songs);
}

// Call the main function
main();












